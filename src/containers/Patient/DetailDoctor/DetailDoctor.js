import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import Footer from '../../HomePage/Footer/Footer';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
import './DetailDoctor.scss';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.props.getDetailDoctor(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.lang !== this.props.lang){
        // }
    }

    render() {
        let detailDoctor = this.props.detailDoctor;
        console.log(detailDoctor);
        const lang = this.props.lang;
        let positionVi = '';
        let positionEn = '';
        if (detailDoctor.positionData) {
            positionVi = detailDoctor.positionData.valueVi;
            positionEn = detailDoctor.positionData.valueEn;
        }
        console.log(detailDoctor.id);
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
                                        backgroundImage: `url(${
                                            detailDoctor && detailDoctor.image
                                                ? detailDoctor.image
                                                : 'https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg'
                                        })`,
                                    }}
                                ></div>
                            </div>
                            <div className="introduction-content">
                                <h2>
                                    {lang === LANGUAGES.VI
                                        ? `${detailDoctor.firstName} ${detailDoctor.lastName}, ${positionVi}`
                                        : `${detailDoctor.lastName} ${detailDoctor.firstName}, ${positionEn}`}
                                </h2>
                                <span>
                                    {detailDoctor && detailDoctor.Markdown ? detailDoctor.Markdown.description : ''}
                                </span>
                            </div>
                        </div>
                        <div className="schedule">
                            <div className="schedule-left">
                                <DoctorSchedule
                                    doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                                />
                            </div>
                            <div className="schedule-right">Địa chỉ khám</div>
                        </div>
                        <div className="content-markdown">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                            )}
                        </div>
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
        lang: state.app.language,
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
