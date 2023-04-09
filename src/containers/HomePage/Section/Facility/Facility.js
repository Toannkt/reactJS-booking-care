import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../Base.scss';
import './Facility.scss';
// Import css files
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { getAllClinic } from '../../../../services/userService';
// import { withRouter } from 'react-router';
class Facility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }
    // async componentDidMount() {
    //     let res = await getAllClinic();
    //     if (res && res.errCode == 0) {
    //         this.setState({
    //             dataClinic: res.data ? res.data : [],
    //         });
    //     }
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };

    render() {
        let { dataClinic } = this.state;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };
        return (
            <div className="section-facility">
                <div className="predict-container">
                    <div className="predict-header">
                        <div className="title-section">Cơ sở y tế nổi bật</div>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                            <div className="option">
                                <div
                                    className="image-description"
                                    style={{
                                        backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                                    }}
                                ></div>
                                <span className="text-description">text description</span>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="test"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
