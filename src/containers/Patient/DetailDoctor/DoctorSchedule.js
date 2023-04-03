import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
        };
    }

    componentDidMount() {
        let { lang } = this.props;
        this.setArrDays(lang);
    }

    setArrDays = (lang) => {
        const allDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (lang === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }
        this.setState({
            allDay: allDay,
        });
    };

    handleChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('getScheduleDoctorByDate: ', res);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
            this.setArrDays(this.props.lang);
        }
    }

    render() {
        const { allDay } = this.state;
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
                <div className="all-available-time"></div>
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
