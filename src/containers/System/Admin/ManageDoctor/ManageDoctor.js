import React, { Component } from 'react';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import './ManageDoctor.scss';

import { LANGUAGES } from '../../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../../store/actions';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            listDoctor: [],
            selectedOption: null,
        };
    }

    async componentDidMount() {
        this.props.getAllDoctor();
    }
    componentDidUpdate(prevProps, prevState, nextProps) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
            console.log('componentDidUpdate: ', dataSelect);
            this.setState({
                listDoctor: dataSelect,
            });
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    ///////////////////////
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    handleSaveDetailDoctor = () => {
        console.log('Save content doctor: ', this.state);
        this.props.createDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        });
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            doctorId: '',
        });
    };
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { lang } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = lang === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return result.push(object);
            });
        }
        return result;
    };
    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-tilte">Thêm thông tin người dùng</div>
                <div className="more-infor">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <textarea
                        onChange={(event) => this.handleOnchangeDescription(event)}
                        value={this.state.description}
                        className="content-right form-control"
                        rows="4"
                    >
                        aaaa
                    </textarea>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button onClick={() => this.handleSaveDetailDoctor()} className="save-content-doctor btn-primary ">
                    Save detail doctor
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        allDoctor: state.admin.allDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        createDetailDoctor: (data) => dispatch(actions.createDetailDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
