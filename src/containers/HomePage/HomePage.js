import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader/HomeHeader";
import "./HomePage.scss";

//component options
import Search from "./Section/Search/Search";
import Speciality from "./Section/Speciality/Speciality";
import Facility from "./Section/Facility/Facility";
import Doctor from "./Section/Doctor/Doctor";
import Handbook from "./Section/Handbook/Handbook";
import About from "./Section/About/About";
import Footer from "./Footer/Footer";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <div className="body-home">
          <Search />
          <Speciality />
          <Facility />
          <Doctor />
          <Handbook />
          <About />
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
