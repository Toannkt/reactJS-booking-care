import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import '../TableUser.scss';
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    async componentDidMount() {
        this.props.getAllUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users,
            });
        }
    }

    hanleDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    };

    render() {
        const users = this.props.users;

        return (
            <div className="wrap-table">
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Last name</th>
                            <th>First name</th>
                            <th>Actions</th>
                        </tr>
                    </tbody>
                    {users &&
                        users.length > 0 &&
                        users.map((user, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tbody>
                                        <tr className={`user-${index}`}>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.firstName}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <button>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button onClick={() => this.hanleDeleteUser(user.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </React.Fragment>
                            );
                        })}
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (userId) => dispatch(actions.deleteUserStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
