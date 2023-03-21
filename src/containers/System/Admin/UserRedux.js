import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import './UserRedux.scss';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImage: '',
            isOpen: false,
            photoIndex: 0,

            email: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataGender !== this.props.dataGender) {
            let dataGender = this.props.dataGender;
            this.setState({
                arrGender: this.props.dataGender,
                gender: dataGender ? dataGender[0].key : '',
            });
        }
        if (prevProps.dataPosition !== this.props.dataPosition) {
            let dataPosition = this.props.dataPosition;
            this.setState({
                arrPosition: this.props.dataPosition,
                position: dataPosition ? dataPosition[0].key : '',
            });
        }
        if (prevProps.dataRole !== this.props.dataRole) {
            let dataRole = this.props.dataRole;
            this.setState({
                arrRole: this.props.dataRole,
                role: dataRole ? dataRole[0].key : '',
            });
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                rePassword: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                role: '',
                position: '',
                avatar: '',
            });
        }
    }

    handleChooseAvatar = (event) => {
        // const btn = document.querySelector("#choose-avatar");
        let files = event.target.files[0];
        if (files) {
            const objectURL = URL.createObjectURL(files);
            this.setState({
                previewImage: objectURL,
                avatar: files,
            });
        }
    };

    openPreview = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: true,
        });
    };

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleCheckIvalide = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'rePassword', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        const check = this.checkPassword(this.state['password'], this.state['rePassword']);
        if (check === false) {
            alert('Please enter password exactly');
        }
        return isValid;
    };

    checkPassword = (pw1, pw2) => {
        if (pw1 !== pw2) return false;
        return true;
    };

    handleSubmit = () => {
        const check = this.handleCheckIvalide();
        if (check === false) return;
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            image: this.state.previewImage,
        });
    };

    render() {
        const lang = this.props.lang;
        const genders = this.props.dataGender;
        const isLoadingGender = this.props.isLoadingGender;

        const positions = this.props.dataPosition;
        const isLoadingPosition = this.props.isLoadingPosition;

        const roles = this.props.dataRole;
        const isLoadingRole = this.props.isLoadingRole;

        const {
            email,
            password,
            rePassword,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            role,
            position,
            image,
        } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="manage-user.title" />
                </div>
                <div className="user-redux-body">
                    <div className="row">
                        <div className="container">
                            <form className="form-redux">
                                <div className="form-row wrap-form col-md-7">
                                    <div className="form-group form-email col-md-12">
                                        <div className="col-md-12">
                                            <label htmlFor="inputEmail">
                                                <FormattedMessage id="manage-user.email" />
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(event) => this.handleChangeInput(event, 'email')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-password col-md-12">
                                        <div className="col-md-5">
                                            <label htmlFor="inputPassword">
                                                <FormattedMessage id="manage-user.password" />
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputPassword4"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(event) => this.handleChangeInput(event, 'password')}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="inputReEnterPassword">
                                                <FormattedMessage id="manage-user.re-enter-password" />
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputReEnterPassword4"
                                                placeholder="Password"
                                                value={rePassword}
                                                onChange={(event) => this.handleChangeInput(event, 'rePassword')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-fullName col-md-12">
                                        <div className="col-md-5">
                                            <label htmlFor="inputFirstName">
                                                <FormattedMessage id="manage-user.first-name" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputFirstName"
                                                placeholder="eg: Nguyen Khac"
                                                value={firstName}
                                                onChange={(event) => this.handleChangeInput(event, 'firstName')}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="inputLastName">
                                                <FormattedMessage id="manage-user.last-name" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputLastName"
                                                placeholder="eg: Toan"
                                                value={lastName}
                                                onChange={(event) => this.handleChangeInput(event, 'lastName')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-info col-md-12">
                                        <div className="form-address col-md-7">
                                            <label htmlFor="inputAddress">
                                                <FormattedMessage id="manage-user.address" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress"
                                                placeholder="1234 Main St"
                                                value={address}
                                                onChange={(event) => this.handleChangeInput(event, 'address')}
                                            />
                                        </div>
                                        <div className="form-numberPhone col-md-3">
                                            <label htmlFor="inputAddress">
                                                <FormattedMessage id="manage-user.phone-number" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phoneNumber"
                                                placeholder="034-xxxxxxx"
                                                value={phoneNumber}
                                                onChange={(event) => this.handleChangeInput(event, 'phoneNumber')}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group decentralization col-md-12">
                                        <div className="col-md-2">
                                            <label htmlFor="inputState">
                                                <FormattedMessage id="manage-user.gender" />
                                                {isLoadingGender === false ? ' Loading...' : ''}
                                            </label>
                                            <select
                                                id="genderId"
                                                value={gender}
                                                className="form-control"
                                                onChange={(event) => this.handleChangeInput(event, 'gender')}
                                            >
                                                {genders &&
                                                    genders.length > 0 &&
                                                    genders.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.key}>
                                                                {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="inputState">
                                                <FormattedMessage id="manage-user.role" />
                                                {isLoadingRole !== true ? ' Loading...' : ''}
                                            </label>
                                            <select
                                                value={role}
                                                id="roleId"
                                                className="form-control"
                                                onChange={(event) => this.handleChangeInput(event, 'role')}
                                            >
                                                {roles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>
                                                            {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="inputState">
                                                <FormattedMessage id="manage-user.position" />
                                                {isLoadingPosition !== true ? ' Loading...' : ''}
                                            </label>
                                            <select
                                                value={position}
                                                id="positionId"
                                                className="form-control"
                                                onChange={(event) => this.handleChangeInput(event, 'position')}
                                            >
                                                {positions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>
                                                            {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="name-avatar">Name Avatar</label>
                                            <div className="wrap-choose-avatar">
                                                <label htmlFor="choose-avatar" className="upload-avatar">
                                                    <i className="fas fa-upload icon-upload"></i>
                                                </label>
                                                <input
                                                    onChange={(e) => this.handleChooseAvatar(e)}
                                                    type="file"
                                                    id="choose-avatar"
                                                    name="choose-avatar"
                                                    hidden
                                                ></input>
                                                <div className="contain-avatar">
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            backgroundImage: `url('${this.state.previewImage}')`,
                                                            cursor: !this.state.previewImage ? '' : 'pointer',
                                                        }}
                                                        onClick={() => this.openPreview()}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group submit col-md-7">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Check me out
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.handleSubmit()}
                                    >
                                        Create User Redux
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="table-manage-user col-md-10">
                            <TableManageUser />
                        </div>
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        //genders
        dataGender: state.admin.gender,
        isLoadingGender: state.admin.isLoadingGender,
        //positions
        dataPosition: state.admin.position,
        isLoadingPosition: state.admin.isLoadingPosition,
        //role
        dataRole: state.admin.role,
        isLoadingRole: state.admin.isLoadingRole,
        //get users
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.fetchCreateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
