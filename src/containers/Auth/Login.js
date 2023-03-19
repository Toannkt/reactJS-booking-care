import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginApi } from "../../services/userService";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
    this.btnLogin = React.createRef();
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async (username, password) => {
    this.setState({
      errMessage: "",
    });
    console.log("username:", username, password);
    try {
      let data = await handleLoginApi(username, password);
      console.log(data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data);

        console.log("Login success");
      }
    } catch (e) {
      if (e.response) {
        this.setState({
          errMessage: e.response.data.message,
        });
      }
      console.log("KhacToan", e.response);
    }
  };
  handleShowPassword = () => {
    this.setState({
      isShowPassword: false ? true : false,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your enter user name"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Pass work</label>
              <div className="custom-form-password">
                <input
                  type="password"
                  className="form-control input-password"
                  placeholder="Your enter password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                ></input>
                <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
                <i
                  className="fas fa-eye-slash icon-eye"
                  onClick={() => {
                    this.handleShowPassword(this.state.isShowPassword);
                    const iconEye = document.querySelector(".icon-eye");
                    const isShow = iconEye.classList.contains("fa-eye");
                    if (isShow) {
                      document.querySelector(".input-password").type =
                        "password";
                      iconEye.classList.remove("fa-eye");
                      iconEye.classList.add("fa-eye-slash");
                    } else {
                      document.querySelector(".input-password").type = "text";
                      iconEye.classList.remove("fa-eye-slash");
                      iconEye.classList.add("fa-eye");
                    }
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() =>
                  this.handleLogin(this.state.username, this.state.password)
                }
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password"> Forgot your password?</span>
            </div>
            <div className="col-12">
              <p className="text-center">Or login with:</p>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook-f icon-facebook"></i>
              <i className="fab fa-google-plus-g icon-google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    addUserSuccess: (userInfo) => dispatch(actions.addUserSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
