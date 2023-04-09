import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import DoctorSchedule from '../../Patient/DetailDoctor/DoctorSchedule/DoctorSchedule';
import DoctorExtra from '../../Patient/DetailDoctor/DoctorExtra/DoctorExtra';
import ProfileDoctor from '../../Patient/DetailDoctor/ProfileDoctor/ProfileDoctor';
import { getAllDetailSpecialty, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import './DetailSpecialty.scss';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataDetailSpecialty: [],
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialty({ id: id, location: 'ALL' });
            let resProvince = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    console.log('data: ', data);
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc',
                    });
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctor: arrDoctorId,
                    listProvince: dataProvince ? resProvince.data : [],
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailSpecialty({
                id: id,
                location: location,
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctor: arrDoctorId,
                    });
                }
            }
        }
    };
    render() {
        let { arrDoctor, dataDetailSpecialty, listProvince } = this.state;
        console.log(arrDoctor);
        let { lang } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader headerLeftDetailDoctor={true} contentCenter={true} contentRight={true} />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        )}
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleChangeSelect(event)}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctor &&
                        arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtra doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
