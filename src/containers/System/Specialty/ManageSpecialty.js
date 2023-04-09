import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import './ManageSpecialty.scss';
const mdPaser = new MarkdownIt();
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lang !== prevProps.lang) {
        }
    }
    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({ imageBase64: base64 });
        }
    };

    handleSaveNewSpecialty = async () => {
        let res = await createSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty successfully!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Error! Please check information exactly!');
            console.log('>>>>>Error: ' + res);
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Manage specialty</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Specialty Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Specialty Image</label>
                        <input
                            className="form-control file"
                            type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                            value={this.state.image}
                        ></input>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={(text) => mdPaser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty" onClick={() => this.handleSaveNewSpecialty()}>
                            Save infor Specialty
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

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
