import React, { useState } from 'react';
import { Tooltip, Upload, notification, Spin } from 'antd';
import './style.scss';
import { SVGReload, CloseSmallSVG, StarSVG } from '../../../components/icons';
import './style.scss';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../core/companies/companiesSlice';

const { Dragger } = Upload;

const UploadCompanyLogo = ({ form, editCompanyLogo, setEditCompanyLogo, setLogoUrl, logoUrl }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { uploadTempStorage } = bindActionCreators(actions, dispatch);
  const customRequest = (e) => {
    setLoading(() => true);
    uploadTempStorage(e.file).then((data) => {
      notification[data.error ? 'error' : 'success']({
        message: data.error ? 'An Error Occurred, Please Try Again' : 'Your image has been uploaded successfully',
        duration: 3.5,
      });
      if (data.error) return;
      console.log('data from uploading img', data.payload);
      form.setFieldsValue({
        image: data.payload.file_key,
      });
      setEditCompanyLogo(() => true);
      setLogoUrl(() => data.payload.url);
    });
    setLoading(() => false);
    e.onSuccess('ok');
  };
  if (editCompanyLogo) {
    return (
      <div className="edit_dragger">
        <Dragger
          name="file"
          customRequest={customRequest}
          accept=".jpg,.jpeg,.png"
          className={`upload-logo-add edit ${false ? 'loading' : ''} `}
          showUploadList={false}>
          <div className="img_logo__block">
            {loading ? (
              <div>
                <Spin className="custom_spinner_add_company" />
              </div>
            ) : (
              <img src={logoUrl !== null ? logoUrl : ''} alt="logo" />
            )}
            <div className="choices">
              <div>
                <div>
                  <SVGReload />
                </div>
                <span>Replace</span>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setLogoUrl(() => null);
                  setEditCompanyLogo(() => false);
                }}>
                <div>
                  <CloseSmallSVG />
                </div>
                <span>Remove</span>
              </div>
            </div>
          </div>
        </Dragger>
      </div>
    );
  }
  return (
    <div className="edit_dragger">
      <Tooltip placement="rightTop" title={'Upload PNG, JPG, JPEG'}>
        <Dragger
          name="file"
          customRequest={customRequest}
          accept=".jpg,.jpeg,.png"
          className={`upload-logo-add ${false ? 'loading' : ''}  `}
          showUploadList={false}>
          <div className="upload-title">
            <div>
              <StarSVG />
            </div>
            <span className="upload_photo">Upload Photo</span>
          </div>
        </Dragger>
      </Tooltip>
    </div>
  );
};

export default UploadCompanyLogo;
