import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-flatpickr';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

import ProfileDoctor from '../ProfileDoctor/ProfileDoctor';
import _ from 'lodash';
import './BookingModal.scss';
import { Modal } from 'reactstrap';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            gender: '',
            timeType: '',
        };
    }

    componentDidMount() {
        this.props.getGender();
    }

    buildDataGender = (data) => {
        let result = [];
        console.log(data);
        let lang = this.props.lang;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn;
                result.push(object);
            });
            return result;
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
            this.setState({
                gender: this.buildDataGender(this.props.gender),
            });
        }
        if (this.props.gender !== prevProps.gender) {
            this.setState({
                gender: this.buildDataGender(this.props.gender),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date,
        });
    };

    handleChangeSelect = (selectedGender) => {
        this.setState({
            selectedGender: selectedGender,
        });
    };

    buildTimeBooking = (dataTime) => {
        let { lang } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = lang === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date =
                lang === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('dddd - DD/MM/YYYY');
            return `${time} - ${date}`;
        }
        return '';
    };

    buildDoctorName = (dataTime) => {
        let { lang } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                lang === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return '';
    };

    handleConfirmBooking = async () => {
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            lang: this.props.lang,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully!');
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                doctorId: '',
                gender: '',
                timeType: '',
            });
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment failed!');
        }
    };

    render() {
        let { isOpenModal, closeBookingClose, dataTime, doctorId } = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" contered="true">
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span className="right" onClick={closeBookingClose}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ và tên</label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ email</label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Sinh nhật</label>
                                    <i className="fas fa-calendar-alt icon-calendar-alt"></i>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control form-birth-date"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    {/* <input
                                        className="form-control"
                                        value={this.state.gender}
                                        onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    /> */}
                                    <Select
                                        placeholder={'Choose gender'}
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.gender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm" onClick={() => this.handleConfirmBooking()}>
                                Xác nhận
                            </button>
                            <button className="btn-booking-cancel" onClick={closeBookingClose}>
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
