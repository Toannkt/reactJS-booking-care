import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../Base.scss';
import './Doctor.scss';
// Import css files
import { LANGUAGES } from '../../../../utils/constant';
import * as actions from '../../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        };
    }

    conponentDidUpdate(prevProps, prevState, snapahot) {
        if (prevProps.arrDoctor !== this.props.topArrDoctorFromRedux) {
            this.setState({
                arrDoctor: this.props.topArrDoctorFromRedux,
            });
        }
    }
    componentDidMount() {
        const limit = 10;
        this.props.fetchTopDoctor(limit);
    }

    handleViewDetailDoctor = (doctor) => {
        console.log('view detail doctor: ', doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };
    render() {
        const lang = this.props.lang;
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
        const arrDoctor = this.props.topArrDoctorFromRedux;
        return (
            <div className="section-doctor">
                <div className="predict-container">
                    <div className="predict-header">
                        <div className="title-section">
                            {<FormattedMessage id={'manage-user.outstanding-doctor'} />}
                        </div>
                        <button className="btn-section">{<FormattedMessage id={'manage-user.more-infor'} />}</button>
                    </div>
                    <div className="predict-body">
                        <Slider {...settings}>
                            {arrDoctor &&
                                arrDoctor.length > 0 &&
                                arrDoctor.map((doctor) => {
                                    let imageBase64 = '';
                                    if (doctor.image) {
                                        imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                    }
                                    const nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName}`;
                                    const nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                                    return (
                                        <div
                                            className={`option option-${doctor.id}`}
                                            onClick={() => this.handleViewDetailDoctor(doctor)}
                                            key={doctor.id}
                                        >
                                            <div
                                                className={`image-description doctor-${doctor.id}`}
                                                style={{
                                                    backgroundImage: `url('${imageBase64}')`,
                                                }}
                                            ></div>
                                            <span className="text-description">
                                                {lang === LANGUAGES.VI ? nameVi : nameEn}
                                            </span>
                                        </div>
                                    );
                                })}
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
        lang: state.app.Language,
        topArrDoctorFromRedux: state.admin.topArrDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopDoctor: (limit) => dispatch(actions.fetchTopDoctorStart(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
