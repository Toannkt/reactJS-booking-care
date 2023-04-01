import React, { Component } from 'react';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { LANGUAGES, CRUD_ACTIONS } from '../../../../utils/constant';
import { getDetailDoctor } from '../../../../services/userService';
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
            selectedOption: '',
            hasOldData: false,
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
            this.setState({
                listDoctor: dataSelect,
            });
        }
    }
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
        let { hasOldData } = this.state;
        this.props.createDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedOption: '',
        });
    };

    handleChangeSelect = async (selectedOption) => {
        // this.props.getDetailDoctor(this.state.selectedOption.value);
        this.setState({ selectedOption });
        let res = await getDetailDoctor(selectedOption.value);
        console.log(res);
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentHTML !== null) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-tilte">Thêm thông tin người dùng</div>
                <div className="more-infor">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
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
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveDetailDoctor()}
                    className={
                        hasOldData === false
                            ? 'create-content-doctor btn-primary '
                            : 'update-content-doctor btn-primary '
                    }
                >
                    {hasOldData === false ? <span>Create detail doctor</span> : <span>Update detail doctor</span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        allDoctor: state.admin.allDoctor,
        // detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        createDetailDoctor: (data) => dispatch(actions.createDetailDoctorStart(data)),
        // getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
