import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.user.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }
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
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="wrap">
                    <div className="welcome">
                        <span>
                            <FormattedMessage id={'homeheader.welcome'} />,
                            {userInfo && userInfo.user && userInfo.user.firstName ? userInfo.user.firstName + ' !' : ''}
                        </span>
                    </div>
                    <div className="language">
                        <span
                            className={lang === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}
                            onClick={() => {
                                this.handleChangeLanguage(LANGUAGES.VI);
                            }}
                        >
                            VN
                        </span>
                    </div>
                    <div className="language">
                        <span
                            className={lang === LANGUAGES.EN ? 'language-en action' : 'language-en'}
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
