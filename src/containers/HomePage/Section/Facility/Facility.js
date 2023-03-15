import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../Base.scss";
import "./Facility.scss";
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Facility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="section-facility">
        <div className="predict-container">
          <div className="predict-header">
            <div className="title-section">Cơ sở y tế nổi bật</div>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="predict-body">
            <Slider {...settings}>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">
                    text description cơ sở y tế nổi bât text description cơ sở y
                    tế nổi bât{" "}
                  </span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
              <div className="option">
                <a href="/" className="wrap-option">
                  <div
                    className="image-description"
                    style={{
                      backgroundImage: `url('https://cdn.bookingcare.vn/fr/w500/2021/04/11/162940-logo-sihg.png')`,
                    }}
                  ></div>
                  <span className="text-description">text description</span>
                </a>
              </div>
            </Slider>
          </div>
        </div>
        <div className="test"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
