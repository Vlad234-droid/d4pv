import React from 'react';
import { Tooltip, Upload, Spin } from 'antd';
import './style.scss';
import { SVGReload, CloseSmallSVG, StarSVG } from '../../../components/icons';
import './style.scss';

const { Dragger } = Upload;

const UploadCompanyLogo = ({ form, editCompanyLogo, setEditCompanyLogo, setLogoUrl, logoUrl }) => {
  const customRequest = (e) => {
    form.setFieldsValue({
      logo: e.file,
    });
    setLogoUrl(() => URL.createObjectURL(e.file));
    e.onSuccess('ok');
    setEditCompanyLogo(() => true);
  };

  if (editCompanyLogo) {
    return (
      <div className="edit_dragger">
        <Dragger
          name="file"
          customRequest={customRequest}
          accept=".jpg,.jpeg,.png"
          className={`upload-logo edit ${false ? 'loading' : ''} `}
          showUploadList={false}>
          <div className="img_logo__block">
            <img src={logoUrl !== null ? logoUrl : ''} alt="logo" />
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
    <Tooltip placement="rightTop" title={'Upload PNG, JPG, JPEG'}>
      <Dragger
        name="file"
        customRequest={customRequest}
        accept=".jpg,.jpeg,.png"
        className={`upload-logo ${false ? 'loading' : ''}  `}
        showUploadList={false}>
        {/* <div className="upload-loading">
          <Spin />
        </div> */}
        <div className="upload-title">
          <div>
            <StarSVG />
          </div>
          <span className="upload_photo">Upload logo</span>
        </div>
      </Dragger>
    </Tooltip>
  );
};

export default UploadCompanyLogo;
