import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                {this.props.doctorDetail === true && (
                    <div className="header-footer">
                        <div className="wrap-header-footer">
                            <span>Cần tìm hiểu thêm?</span>
                            <span style={{ color: '#FFF04B' }}>Câu hỏi thường gặp!</span>
                        </div>
                    </div>
                )}
                <div className="body-footer">
                    <div className="container">
                        <div className="content-left">
                            <div className="footer-logo"></div>
                            <div className="title-company">Công ty cổ phần công nghệ BOOKING CARE</div>
                            <div className="contact-infor">
                                <div className="address-company">
                                    <div
                                        className="icon-location"
                                        style={{
                                            backgroundImage: `url('https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-location-icon-png-image_956422.jpg')`,
                                        }}
                                    ></div>
                                    <span>Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội</span>
                                </div>
                                <div className="phone-number">
                                    <i className="fas fa-phone icon-phone"></i>
                                    <span>0000000000</span>
                                </div>
                                <div className="license">
                                    <i className="fas fa-check icon-license"></i>
                                    <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                                </div>
                            </div>
                        </div>
                        <div className="content-center">
                            <p>Liên hệ hợp tác</p>
                            <p>Gói chuyển đổi số doanh nghiệp</p>
                            <p>Tuyển dụng</p>
                            <p>Câu hỏi thường gặp</p>
                            <p>Điều khoản sử dụng</p>
                            <p>Chính sách Bảo mật</p>
                            <p>Quy trình hỗ trợ giải quyết khiếu nại</p>
                            <p>Quy chế hoạt động</p>
                        </div>
                        <div className="content-right">
                            <div className="depart">
                                <h4>Trụ sở tại Hà Nội</h4>
                                <p>Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội</p>
                            </div>
                            <div className="office">
                                <h4>Văn phòng tại TP Hồ Chí Minh</h4>
                                <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            </div>
                            <div className="support-customer">
                                <h4>Hỗ trợ khách hàng</h4>
                                <p>support@bookingcare.vn (7h - 20h)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="end-footer">
                    <h2>&copy;</h2>
                    <span> Nguyễn Khắc Toàn</span>
                    <h2>&rarr;</h2>
                    <a href="/">click here</a>
                    <h2>&larr;</h2>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
