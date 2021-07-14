import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { actions } from '../../../../core/requirements/requirementsSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './style.scss';
import iconIMG from '../../../../components/icons/icon-img.png';

const AddRequirementsModal = ({ keyTab, addRequirements, setAddRequirements }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { addRequirement } = bindActionCreators(actions, dispatch);
  const [editorState, setEditorState] = useState();
  const [filePicker, setFilePicker] = useState('');

  const onFinish = ({ reference, requested }) => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addRequirement({ keyTab, text: currentContentAsHTML, reference, requested });
    form.resetFields();
    setAddRequirements(() => false);
  };

  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    const contentBlock = htmlToDraft('<h6></h6>');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(() => editorState);
  }, [addRequirements]);

  const Test = () => {
    return (
      <div>
        <div>few;fmwefmweklfmnwlkemnflwenflkw</div>
      </div>
    );
  };

  const uploadCallbackHandler = (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    setFilePicker(() => imageObject);

    return new Promise((resolve, reject) => {
      resolve({
        data: {
          link: URL.createObjectURL(file),
        },
      });
    });
  };

  return (
    <Modal
      visible={addRequirements}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setAddRequirements(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('add_requirement')}
      width={664}
      className="modal_add_requirements">
      <h3 className="add_requirements_title">Add Note</h3>

      {/* // ????//////?????* */}

      <Form name="form_add_requirements" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
        <Col span={24}>
          <Form.Item name="wysiwyg">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['inline', 'image'],
                inline: { options: ['bold', 'underline'] },
                inline: {
                  bold: { icon: bold, className: 'custom_bold' },
                  underline: { icon: underline, className: 'custom_underline' },
                },
                image: {
                  icon: iconIMG,
                  className: 'iconIMG_custom',
                  // component: Test,
                  urlEnabled: false,
                  previewImage: true,
                  uploadCallback: uploadCallbackHandler,
                },
              }}
            />
          </Form.Item>
        </Col>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Requested By" name="requested">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Reference" name="reference">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="submit__cancel_note__add">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  setAddRequirements(() => false);
                }}>
                Cancel
              </Button>
            </Col>
            <Col span={14}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRequirementsModal;
