import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from  '../../utils/emitter';
import {getAllusers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers:[],
            userEdit:{},
            isOpenModalUser: false,
            isOpenModalEditUser: false,
        };  
    }

    async componentDidMount() {
        await this.getAllUsersFromReact(); 
    }
    getAllUsersFromReact = async() => {
        let response = await getAllusers('All');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            }, () => {
                
            })
        }
    }
    getOnlyUserFromReact = async(id) => {
        let response = await getAllusers(id);
        if(response && response.errCode === 0){
            this.setState()
        }
    }

    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser: true,
        })
    }

    //handle delete user with id
    handleDeleteUser = async (userId) => {
        try{
            let res= await deleteUserService(userId);
            if(res && res.errCode !==0){
                alert(res.errMessage);
            }else{
                this.getAllUsersFromReact();
            }
        }catch(e){
            console.log(e);
        }
    }
    //handle create new user from client
    createNewUser = async(data) =>{
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }
            else{
                this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        }catch(e){
            console.log(e)
        }
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    //edit user
    toggleEditUserModal = (user) =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: user,
        })
    }
    handleEditUserModal =(user) =>{
        this.toggleEditUserModal(user);
    }   

    doEditUser = async(user) => {
        try{
            let res = await editUserService(user);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUsersFromReact();
                alert('user updated successfully');
            }else{
                console.log('missing responese from edit user')
            }
        }catch(e){
            console.log(e);
        }

    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container mx-4">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {   this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                }
                <div className="title text-center">
                    <h1>Information Users</h1>
                </div>
                <div className="add-new-user">
                    <button className="btn-create" onClick={() => this.handleAddNewUser()}>
                        Add new user
                        <i className="fas fa-plus icon-plus" ></i>
                    </button>
                </div>
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
                    
                    {arrUsers && arrUsers.map((user)=>{
                        return (
                            <React.Fragment key={user.id}>
                                <tbody>
                                    <tr className={"user-"+ user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.firstName}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <button onClick={()=>{this.handleEditUserModal(user)}}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button onClick={() => this.handleDeleteUser(user.id)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </React.Fragment>
                        )
                    })}

                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
