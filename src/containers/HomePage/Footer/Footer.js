import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="content-footer">
          <h2>&copy;</h2>
          <span> Nguyễn Khắc Toàn</span>
          <h2>&rarr;</h2>
          <a href="/">click here</a>
          <h2>&larr;</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
