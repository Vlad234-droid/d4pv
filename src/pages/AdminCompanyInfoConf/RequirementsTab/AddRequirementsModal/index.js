import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { actions } from '../../../../core/companies/companiesSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './style.scss';
import iconIMG from '../../../../components/icons/icon-img.png';
import { useParams } from 'react-router-dom';

const AddRequirementsModal = ({ blurModal, keyTab, addRequirements, setAddRequirements }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { addCompanyRequirement, getCompanieData, uploadFileStorage } = bindActionCreators(actions, dispatch);
  const [editorState, setEditorState] = useState();
  const { id } = useParams();

  const onFinish = ({ reference }) => {
    const getProperGroup = () => {
      if (keyTab === 0) return 'SitePlan';
      if (keyTab === 1) return 'AttachmentPlan';
      if (keyTab === 2) return 'LineDiagram';
      if (keyTab === 3) return 'AssemblyDetails';
    };
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const body = {
      text: currentContentAsHTML,
      reference,
      group: getProperGroup(),
    };
    addCompanyRequirement({ company_id: id, body }).then(() => getCompanieData(id));

    form.resetFields();
    setAddRequirements(() => false);
    blurModal(false);
  };

  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    if (addRequirements) document.body.style.overflow = 'hidden';
    if (!addRequirements) document.body.style.overflow = 'unset';

    const contentBlock = htmlToDraft('<p></p>');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(() => editorState);
  }, [addRequirements]);

  // const Test = () => {
  //   return (
  //     <div>
  //       <button onClick={() => }>hello</button>
  //     </div>
  //   );
  // };

  const uploadCallbackHandler = (file) => {
    return new Promise((resolve, reject) => {
      uploadFileStorage(file).then((data) => {
        const url = data.payload.url;
        resolve({
          data: {
            link: url,
          },
        });
      });
    });
  };

  return (
    <Modal
      visible={addRequirements}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        blurModal(false);
        setAddRequirements(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={664}
      className="modal_add_requirements">
      <h3 className="add_requirements_title">Add Requirement</h3>

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
                inline: {
                  options: ['bold', 'underline'],
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
                  alignmentEnabled: false,
                  defaultSize: {
                    height: '135',
                    width: '240',
                  },
                },
              }}
            />
          </Form.Item>
        </Col>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Reference"
              name="reference"
              rules={[
                {
                  required: true,
                  message: 'Reference By is required',
                },
              ]}>
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
                  blurModal(false);
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
