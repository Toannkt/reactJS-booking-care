import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions";
import "./HomeHeader.scss";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    let language = this.props.lang;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeheader.speciality"} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={"homeheader.searchdoctor"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeheader.health-facilties"} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={"homeheader.choose-room"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeheader.doctor"} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={"homeheader.choose-good-doctor"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeheader.checkup-pakage"} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={"homeheader.genaral-health-check"} />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle">
                  {" "}
                  <FormattedMessage id={"homeheader.support"} />
                </i>
              </div>
              <div className="language">
                <span
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi action"
                      : "language-vi"
                  }
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.VI);
                  }}
                >
                  VI
                </span>
              </div>
              <div className="language">
                <span
                  className={
                    language === LANGUAGES.EN
                      ? "language-en action"
                      : "language-en"
                  }
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
  return {
    changeLanguage: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
