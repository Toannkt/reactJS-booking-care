import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="section-about-header">
          Nhúng video youtobe vào website
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="96%"
              height="496"
              padding-left="20px"
              src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <span className="text-description">
              Các bạn có thể làm chủ công nghệ, cũng như học được, biết được
              những kiến thức thực tế dùng tại các công ty hiện nay. Sau khi kết
              thúc khóa học này, mình tin chắc rằng dự án này đủ lớn, đủ thực tế
              để cho các bạn mới ra trường viết vào CV xin việc của mình ^^ Các
              bạn hiểu được 1 FullStack Web Developer thì cần chuẩn bị những gì.
              Ở đây, mình không dám chắc 100% các bạn sẽ trở thành Fullstack
              Developer, nhưng nếu bạn chọn Frontend hay Backend thì khóa học
              này cũng cung cấp cho bạn nhiều điều bổ ích
            </span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
