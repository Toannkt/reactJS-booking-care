import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../../services/userService';
import NumberFormat from 'react-number-format';

import './DoctorExtra.scss';

class DoctorExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfor: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            const res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            const res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShow: status,
        });
    };

    render() {
        const { isShow, extraInfor } = this.state;
        const { lang } = this.props;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ</div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShow === false && (
                        <div className="short-infor">
                            Price:
                            {extraInfor && extraInfor.priceTypeData && lang === LANGUAGES.VI && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            )}
                            {extraInfor && extraInfor.priceTypeData && lang === LANGUAGES.EN && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            )}
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    )}
                    {isShow === true && (
                        <>
                            <div className="title-price">GIÁ KHÁM .</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">Giá khám</span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceTypeData && lang === LANGUAGES.VI && (
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        )}
                                        {extraInfor && extraInfor.priceTypeData && lang === LANGUAGES.EN && (
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="note">{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                            </div>
                            <div className="payment">
                                Method payment:
                                {extraInfor && extraInfor.paymentTypeData && lang === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi
                                    : ''}
                                {extraInfor && extraInfor.paymentTypeData && lang === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn
                                    : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
                            </div>
                        </>
                    )}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
