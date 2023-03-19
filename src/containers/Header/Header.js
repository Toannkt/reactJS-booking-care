import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { LANGUAGES } from "../../utils/constant";
import { adminMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";

class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    const userInfo = this.props.userInfo;
    const { processLogout, lang } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="wrap">
          <div className="welcome">
            <span>
              <FormattedMessage id={"homeheader.welcome"} />,
              {userInfo && userInfo.user && userInfo.user.firstName
                ? userInfo.user.firstName + " !"
                : ""}
            </span>
          </div>
          <div className="language">
            <span
              className={
                lang === LANGUAGES.VI ? "language-vi action" : "language-vi"
              }
              onClick={() => {
                this.handleChangeLanguage(LANGUAGES.VI);
              }}
            >
              VN
            </span>
          </div>
          <div className="language">
            <span
              className={
                lang === LANGUAGES.EN ? "language-en action" : "language-en"
              }
              onClick={() => {
                this.handleChangeLanguage(LANGUAGES.EN);
              }}
            >
              EN
            </span>
          </div>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
