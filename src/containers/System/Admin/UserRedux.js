import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      arrPosition: [],
      arrRole: [],
      previewImage: "",
      isOpen: false,
      photoIndex: 0,

      email: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "",
      possition: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataGender !== this.props.dataGender) {
      this.setState({
        arrGender: this.state.dataGender,
      });
    }
    if (prevProps.dataPosition !== this.props.dataPosition) {
      this.setState({
        arrPosition: this.state.dataPosition,
      });
    }
    if (prevProps.dataRole !== this.props.dataRole) {
      this.setState({
        arrRole: this.state.dataRole,
      });
    }
  }
  //handle choose avatar
  handleChooseAvatar = (event) => {
    // const btn = document.querySelector("#choose-avatar");
    let files = event.target.files[0];
    if (files) {
      const objectURL = URL.createObjectURL(files);
      this.setState({
        previewImage: objectURL,
      });
    }
  };
  // handle open preview image (avatar)
  openPreview = () => {
    if (!this.state.previewImage) return;
    this.setState({
      isOpen: true,
    });
  };

  //handle change input
  handleChangeInput = (event, id) => {
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
      avatar,
    } = this.state;
  };

  render() {
    const lang = this.props.lang;
    //Gender
    const genders = this.props.dataGender;
    // console.log("check gender from UserRedux:", genders);
    const isLoadingGender = this.props.isLoadingGender;
    //Position
    const positions = this.props.dataPosition;
    // console.log("check position from UserRedux:", positions);
    const isLoadingPosition = this.props.isLoadingPosition;

    // console.log("isLoadingPosition ", isLoadingPosition);
    //Role
    const roles = this.props.dataRole;
    // console.log("check role from UserRedux:", roles);
    const isLoadingRole = this.props.isLoadingRole;

    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.title" />
        </div>
        <div className="user-redux-body">
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "email")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "password")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "rePassword")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "firstName")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "lastName")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "address")
                      }
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
                      onChange={(event) =>
                        this.handleChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                </div>
                <div className="form-group decentralization col-md-12">
                  <div className="col-md-2">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.gender" />
                      {isLoadingGender === false ? " Loading..." : ""}
                    </label>
                    <select id="genderId" className="form-control">
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index}>
                              {lang === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.role" />
                      {isLoadingRole !== true ? " Loading..." : ""}
                    </label>
                    <select id="roleId" className="form-control">
                      {roles.map((item, index) => {
                        return (
                          <option key={index}>
                            {lang === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.position" />
                      {isLoadingPosition !== true ? " Loading..." : ""}
                    </label>
                    <select id="positionId" className="form-control">
                      {positions.map((item, index) => {
                        return (
                          <option key={index}>
                            {lang === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
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
                            cursor: !this.state.previewImage ? "" : "pointer",
                          }}
                          onClick={() => this.openPreview()}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group submit col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create User Redux
                </button>
              </div>
            </form>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguage: (language) => dispatch(actions.changeLanguageApp(language)),

    //get Genderd
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    //get Position
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    //get Role
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
