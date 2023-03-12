import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils/constant'
import {changeLanguageApp} from '../../store/actions'
import './HomeHeader.scss'
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguage(language);
    }
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
                                <div><b><FormattedMessage id={"homeheader.speciality"}/></b></div>
                                <div className="subs-title"><FormattedMessage id={"homeheader.searchdoctor"}/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id={"homeheader.health-facilties"}/></b></div>
                                <div className="subs-title"><FormattedMessage id={"homeheader.choose-room"}/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id={"homeheader.doctor"}/></b></div>
                                <div className="subs-title"><FormattedMessage id={"homeheader.choose-good-doctor"}/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id={"homeheader.checkup-pakage"}/></b></div>
                                <div className="subs-title"><FormattedMessage id={"homeheader.genaral-health-check"}/></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"> <FormattedMessage id={"homeheader.support"}/></i>
                            </div>
                            <div className="language">
                                <span className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'} onClick={()=>{this.changeLanguage(LANGUAGES.VI)}}>VI</span>
                            </div>  
                            <div className="language">
                                <span className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'} onClick={()=>{this.changeLanguage(LANGUAGES.EN)}}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="search">
                        <h1>
                            <FormattedMessage id={"banner.medical-background"}/>
                            <br></br>
                            <b><FormattedMessage id={"banner.comprehensive-health-care"}/></b>
                        </h1>
                        <div className="on-search">
                            <i className="fas fa-search"></i>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png")`}}></div>
                                    <FormattedMessage id={"banner.examination"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.speciality"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png")`}}></div>
                                    <FormattedMessage id={"banner.examination"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.from-afar"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png")`}}></div>
                                    <FormattedMessage id={"banner.examination"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.genarality"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png")`}}></div>
                                    <FormattedMessage id={"banner.test"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.medicine"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png")`}}></div>
                                    <FormattedMessage id={"banner.health"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.spirit"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png")`}}></div>
                                    <FormattedMessage id={"banner.examination"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.dentistry"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg")`}}></div>
                                    <FormattedMessage id={"banner.pakage"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.surgery"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png")`}}></div>
                                    <FormattedMessage id={"banner.product"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.medical"} />
                                </a>
                            </div>
                            <div className="option-child">
                                <a href="/" className="open-option">
                                    <div className="icon-option" style={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg")`}}></div>
                                    <FormattedMessage id={"banner.health"} />
                                    <br></br>
                                    <FormattedMessage id={"banner.enterprise"} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language)=> dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
