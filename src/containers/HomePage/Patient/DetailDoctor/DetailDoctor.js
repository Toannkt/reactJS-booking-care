import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader/HomeHeader';
import Footer from '../../Footer/Footer';
import './DetailDoctor.scss';
class DetailDoctor extends Component {
    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="detail-doctor">
                <HomeHeader headerLeftDetailDoctor={true} contentCenter={true} contentRight={true} />
                <div className="body-detail">
                    <div className="container">
                        <div className="introduction">
                            <div className="wrap-image">
                                <div
                                    className="introduction-image"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2020/01/03/090559-pgs-nguyen-thi-hoai-an.jpg')`,
                                    }}
                                ></div>
                            </div>
                            <div className="introduction-content">
                                <h2> Nguyễn Văn A</h2>
                                <span>Nguyên Trưởng khoa Tai mũi họng trẻ em, Bệnh viện Tai Mũi Họng Trung ương</span>
                            </div>
                        </div>
                        <div className="schedule">
                            <div className="schedule-left">left</div>
                            <div className="schedule-right">right</div>
                        </div>
                        <div className="content-markdown">content markdown</div>
                    </div>
                </div>
                <div className="footer-detail">
                    <Footer doctorDetail={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
