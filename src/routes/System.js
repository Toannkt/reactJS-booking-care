import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageUser from '../containers/System/ManageUser';
import CrudRedux from '../containers/System/Admin/CrudRedux/CrudRedux';
import ManageAdmin from '../containers/System/ManageAdmin';
import ManageDoctor from '../containers/System/Admin/ManageDoctor/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import Header from '../containers/Header/Header';
class System extends Component {
    render() {
        const { systemMenuPath /*isLoggedIn*/ } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-users" component={ManageUser} />
                            <Route path="/system/crud-redux" component={CrudRedux} />
                            <Route path="/system/manage-admins" component={ManageAdmin} />
                            <Route path="/system/manage-doctors" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
