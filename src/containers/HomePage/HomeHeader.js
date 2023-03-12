import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() {
        
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b>Chuyên Khoa</b></div>
                                <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="subs-title">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div><b>Bác sĩ</b></div>
                                <div className="subs-title">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div><b>Gói khám</b></div>
                                <div className="subs-title">Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i class="fas fa-question-circle"> Hỗ trợ</i>
                            </div>
                            <div className="flag">VN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="search">
                        <h1>Nền tảng y tế 
                            <br></br>
                            <b>chăm sóc sức khỏe toàn diện</b>
                        </h1>
                        <div className="on-search">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm"></input>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png")`}}></div>
                                    Khám
                                    <br></br>
                                    Chuyên khoa
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png")`}}></div>
                                    Khám
                                    <br></br>
                                    Từ xa
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png")`}}></div>
                                    Khám
                                    <br></br>
                                    Tổng quát
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png")`}}></div>
                                    Xét nghiệm
                                    <br></br>
                                    Y học
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png")`}}></div>
                                    Sức khỏe
                                    <br></br>
                                    Tinh thần
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png")`}}></div>
                                    Khám
                                    <br></br>
                                    Nha khoa
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg")`}}></div>
                                    Gói
                                    <br></br>
                                    Phẫu thuật
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png")`}}></div>
                                    Sản phẩm
                                    <br></br>
                                    Y tế
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg")`}}></div>
                                    Sức khỏe
                                    <br></br>
                                    Doanh nghiệp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
