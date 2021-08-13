import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import './style.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { actions } from '../../../../../core/companies/companiesSlice';
import iconIMG from '../../../../../components/icons/icon-img.png';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useParams } from 'react-router-dom';

const EditRequirements = ({ blurModal, setEditModal, editModal, toEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { updateCompanyRequirement, getCompanieData, uploadFileStorage } = bindActionCreators(actions, dispatch);

  const onFinish = ({ reference, requested_by, wysiwyg }) => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const body = {
      text: currentContentAsHTML,
      reference: reference,
      requested_by,
    };

    updateCompanyRequirement({ requirement_id: toEdit.id, body }).then(() => getCompanieData(id));
    setEditModal(() => false);
    blurModal(false);
  };

  const [editorState, setEditorState] = useState();
  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    if (editModal) document.body.style.overflow = 'hidden';
    if (!editModal) document.body.style.overflow = 'unset';

    if (toEdit.text !== undefined) {
      const contentBlock = htmlToDraft(toEdit.text);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(() => editorState);
      }
    }
  }, [toEdit, editModal]);

  const uploadCallbackHandler = (file) => {
    return uploadFileStorage(file).then((data) => {
      const url = data.payload.url;
      return {
        data: {
          link: url,
        },
      };
    });
  };

  return (
    <Modal
      visible={editModal}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        blurModal(false);
        setEditModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={664}
      className="modal_edit_requirements">
      <h3 className="edit_requirements_title">Edit Requirement</h3>

      {/* // ????//////?????* */}

      <Form
        name="form_edit_requirements"
        layout="vertical"
        form={form}
        requiredMark={true}
        onFinish={onFinish}
        initialValues={{
          requested: toEdit.requested_by,
          reference: toEdit.reference,
        }}>
        <Col span={24}>
          <Form.Item
            name="wysiwyg"
            rules={[
              {
                required: true,
                message: 'Text is required',
              },
            ]}>
            <Editor
              editorState={editorState}
              // defaultContentState={contentState}
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
                    height: 'auto',
                    width: 'auto',
                  },
                },
              }}
            />
          </Form.Item>
        </Col>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Requested By"
              name="requested_by"
              rules={[
                {
                  required: true,
                  message: 'Requested By is required',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Reference"
              name="reference"
              rules={[
                {
                  required: true,
                  message: 'Reference is required',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="submit__cancel_requirements">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  blurModal(false);
                  setEditModal(() => false);
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

export default EditRequirements;
