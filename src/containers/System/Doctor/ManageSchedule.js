import React, { Component } from 'react';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';

class ManageDoctor extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return <div className="text-center">Manage Doctor</div>;
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
