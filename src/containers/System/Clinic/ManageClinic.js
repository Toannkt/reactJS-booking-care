import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import './ManageClinic.scss';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
        }
    }

    handleChangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        console.log('file: ', file);
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveClinic = async () => {
        console.log('res:', this.state);
        let res = await createClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Create new clinic successfully!');
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
            });
        } else {
            toast.error('Error create, please check and try again!');
        }
    };
    render() {
        return (
            <div className="manage-clinic-container">
                <div className="ms-title">Manage clinic</div>
                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label>clinic Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this.handleChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>clinic Image</label>
                        <input
                            className="form-control file"
                            type="file"
                            onChange={(event) => this.handleChangeImage(event)}
                            value={this.state.image}
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>address clinic</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(event) => this.handleChangeInput(event, 'address')}
                        ></input>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-clinic" onClick={() => this.handleSaveClinic()}>
                            Save infor clinic
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
