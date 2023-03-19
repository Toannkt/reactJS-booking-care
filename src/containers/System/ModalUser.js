import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { emitter } from "../../utils/emitter";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
    };
    this.listtenToEmitter();
  }

  listtenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
      });
    });
  }

  componentDidMount() {}

  toggle = async () => {
    await this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("please enter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className="modal-user-container"
          size="lg"
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create a new user
          </ModalHeader>
          <ModalBody>
            <div className="input-container">
              <div className="form-group">
                <label htmlFor="Email">Email: </label>
                <input
                  type="email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  placeholder="Email enter..."
                  value={this.state.email}
                  name="email"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password: </label>
                <input
                  type="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  placeholder="Password enter..."
                  value={this.state.password}
                  name="password"
                ></input>
              </div>
            </div>
            <div className="input-container">
              <div className="form-group">
                <label htmlFor="firstName">First name: </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  placeholder="First name enter..."
                  value={this.state.firstName}
                  name="fisrtName"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name: </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  placeholder="Last name enter..."
                  value={this.state.lastName}
                  name="lastName"
                ></input>
              </div>
            </div>
            <div className="input-container">
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number: </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                  placeholder="Phone number enter..."
                  value={this.state.phoneNumber}
                  name="phonenumber"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address: </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  placeholder="address enter..."
                  value={this.state.address}
                  name="address"
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="create-btn"
              onClick={() => this.handleAddNewUser()}
            >
              Add new user
            </Button>{" "}
            <Button
              color="secondary"
              className="cancel-btn"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
