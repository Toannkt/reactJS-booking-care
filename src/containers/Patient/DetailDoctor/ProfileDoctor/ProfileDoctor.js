import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { getDetailDoctor } from '../../../../services/userService';
import _ from 'lodash';
import moment from 'moment';
import './ProfileDoctor.scss';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: [],
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getDetailDoctor(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    renderTimeBooking = (dataTime) => {
        console.log('dataTime: ', dataTime);
        let { lang } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            console.log('check');
            let time = lang === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            console.log('time: ', time);
            let date =
                lang === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('dddd - DD/MM/YYYY');
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>Miễn phí đặt lịch</div>
                </>
            );
        }
    };
    render() {
        let nameVi = '',
            nameEn = '';
        let { dataProfile } = this.state;
        let { lang, isShowDescriptionDoctor, dataTime, isShowPrice, isShowLinkDetail, doctorId } = this.props;

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.first} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    ></div>
                    <div className="content-right">
                        <div className="up">{lang === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-detail-doctor">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                )}
                {isShowPrice === true && (
                    <span className="price">
                        Giá khám:
                        {dataProfile.Doctor_Infor && lang === LANGUAGES.VI && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        )}
                        {dataProfile.Doctor_Infor && lang === LANGUAGES.EN && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        )}
                    </span>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
