import React, { Component } from 'react';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { LANGUAGES, CRUD_ACTIONS } from '../../../../utils/constant';
import { getDetailDoctor } from '../../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            listDoctor: [],
            selectedOption: '',
            hasOldData: false,

            // save to doctor doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }

    async componentDidMount() {
        this.props.getAllDoctor();
        this.props.getAllRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, nextProps) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'DOCTOR');
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
            const { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listDoctor: dataSelect,
            });
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            const { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectedSpecialty,
            });
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { lang } = this.props;
        if (type === 'DOCTOR') {
            if (inputData && inputData.length > 0) {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    object.label = lang === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    return result.push(object);
                });
            }
        } else if (type === 'PRICE') {
            if (inputData && inputData.length > 0) {
                inputData.map((item, index) => {
                    let object = {};
                    let valueEn = `${item.valueEn}`;
                    let valueVi = `${item.valueVi}`;
                    object.label = lang === LANGUAGES.VI ? valueVi + ' Đồng' : valueEn + ' USD';
                    object.value = item.keyMap;
                    return result.push(object);
                });
            }
        } else if (type === 'PAYMENT' || type === 'PROVINCE') {
            if (inputData && inputData.length > 0) {
                inputData.map((item, index) => {
                    let object = {};
                    let valueEn = `${item.valueEn}`;
                    let valueVi = `${item.valueVi}`;
                    object.label = lang === LANGUAGES.VI ? valueVi : valueEn;
                    object.value = item.keyMap;
                    return result.push(object);
                });
            }
        } else if (type === 'SPECIALTY') {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    ///////////////////////
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleSaveDetailDoctor = () => {
        let { hasOldData } = this.state;
        // save contentHTML, contentMarkdown, description

        this.props.createDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
        // save price, payment, province
        // this.props.createMoreInfor({});
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedOption: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        });
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    handleChangetext = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleChangeSelect = async (selectedOption) => {
        // this.props.getDetailDoctor(this.state.selectedOption.value);
        this.setState({ selectedOption });
        const { listPayment, listPrice, listProvince, listSpecialty } = this.state;

        let res = await getDetailDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentHTML !== null) {
            let markdown = res.data.Markdown;

            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '',
                selectedPayment = '',
                selectedPrice = '',
                selectedProvince = '',
                specialtyId = '',
                selectedSpecialty = '';

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                // selectedClinic: '',
                selectedSpecialty: '',
            });
        }
    };

    render() {
        let { hasOldData } = this.state;
        const { lang } = this.props;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-tilte">
                    <FormattedMessage id="manage-doctor.add-infor-doctor" />
                </div>
                <div className="more-infor">
                    <div className="content-left col-3">
                        <label>
                            <FormattedMessage id="manage-doctor.choose-doctor" />
                        </label>
                        <Select
                            placeholder={'Choose doctor'}
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <textarea
                        onChange={(event) => this.handleOnchangeText(event, 'description')}
                        value={this.state.description}
                        className="content-right form-control"
                        rows="4"
                    ></textarea>
                </div>
                <div className="more-infor-extra select-options">
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.choose-price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={lang === LANGUAGES.VI ? 'Chọn giá' : 'Choose price'}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.choose-payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={
                                lang === LANGUAGES.VI ? 'Chọn phương thức thanh toán' : 'Choose method payment'
                            }
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.choose-province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={lang === LANGUAGES.VI ? 'Chọn tỉnh' : 'Choose province'}
                            name="selectedProvince"
                        />
                    </div>
                </div>
                <div className="more-infor-extra select-input">
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.clinic-name" />
                        </label>
                        <input
                            onChange={(event) => this.handleChangetext(event, 'nameClinic')}
                            className="form-control"
                            value={this.state.nameClinic}
                            placeholder={lang === LANGUAGES.VI ? 'Tên phòng khám' : 'Clinic name'}
                        ></input>
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.clinic-address" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleChangetext(event, 'addressClinic')}
                            value={this.state.addressClinic}
                            placeholder={lang === LANGUAGES.VI ? 'Địa chỉ phòng khám' : 'Clinic address'}
                        ></input>
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.note" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="2"
                            placeholder={lang === LANGUAGES.VI ? 'Ghi chú' : 'Note'}
                            onChange={(event) => this.handleChangetext(event, 'note')}
                            value={this.state.note}
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 form-group select-specialty">
                        <label>Specialty</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder="Specialty"
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-3 form-group select-clinic">
                        <label>Clinic</label>
                        <Select
                            value={this.state.selectedClinic}
                            options={this.state.listClinic}
                            placeholder="Clinic"
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveDetailDoctor()}
                    className={
                        hasOldData === false
                            ? 'create-content-doctor btn-primary '
                            : 'update-content-doctor btn-primary '
                    }
                >
                    {hasOldData === false ? (
                        <span>
                            <FormattedMessage id="manage-doctor.create-detail" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="manage-doctor.update-detail" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        allDoctor: state.admin.allDoctor,
        // detailDoctor: state.admin.detailDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        createDetailDoctor: (data) => dispatch(actions.createDetailDoctorStart(data)),
        // getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
        getAllRequiredDoctorInfor: () => dispatch(actions.fetchAllRequiredDoctorInforStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
