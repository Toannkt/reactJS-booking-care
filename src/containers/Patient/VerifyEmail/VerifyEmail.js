import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify, errCode } = this.state;
        console.log('errCode: ', errCode);
        return (
            <>
                <HomeHeader headerLeftDetailDoctor={true} contentCenter={true} contentRight={true} />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div className="loading">
                            <span>Loading data...</span>
                        </div>
                    ) : (
                        <div className="confirm">
                            {+errCode === 0 ? (
                                <div className="infor-booking">
                                    <span>Xác nhận lịch hẹn đặt khám thành công!</span>
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    <span>Lịch hẹn không tồn tại hoặc đã xác nhận, vui lòng kiểm tra lại!</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
