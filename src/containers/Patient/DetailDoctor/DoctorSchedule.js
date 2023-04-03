import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDate } from '../../../services/userService';
import './DoctorSchedule.scss';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvailableTime: [],
        };
    }

    componentDidMount() {
        let { lang } = this.props;
        const allDay = this.getArrDays(lang);
        this.setState({
            allDay: allDay,
        });
    }

    getArrDays = (lang) => {
        const allDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (lang === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `To day - ${ddMM}`;
                    object.label = today;
                }
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }
        return allDay;
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    handleChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('res: ', res);

            if (res && res.errCode === 0) {
                console.log('check');
                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                });
            }
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { lang } = this.props;
        if (this.props.lang !== prevProps.lang) {
            const allDay = this.getArrDays(lang);
            this.setState({
                allDay: allDay,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            const allDay = this.getArrDays(lang);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDay[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
        }
    }

    render() {
        const { allDay, allAvailableTime } = this.state;
        console.log('allAvailableTime: ', allAvailableTime);
        const lang = this.props.lang;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleChangeSelect(event)}>
                        {allDay &&
                            allDay.length > 0 &&
                            allDay.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fas fa-calendar-alt icon-calendar-alt"></i>
                        <span>
                            <FormattedMessage id="manage-schedule.calendar" />
                        </span>
                    </div>
                    <div className="time-content col-12">
                        {allAvailableTime && allAvailableTime.length > 0 ? (
                            allAvailableTime.map((item, index) => {
                                let timeDisplay =
                                    lang === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return <button key={index}>{timeDisplay}</button>;
                            })
                        ) : (
                            <div className="none-calendar">
                                <FormattedMessage id="manage-schedule.none-calendar" />
                            </div>
                        )}
                    </div>
                    <div className="calendar-free">
                        <span>
                            <FormattedMessage id="manage-schedule.choose" />
                        </span>
                        <i class="fas fa-hand-pointer icon-choose"></i>
                        <span>
                            <FormattedMessage id="manage-schedule.and-put" />
                            (<FormattedMessage id="manage-schedule.calendar-free" /> 0<sup>đ</sup>)
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
