import React, { useState } from 'react';
import { Tooltip, Upload, Spin, notification } from 'antd';
import './style.scss';
import { SVGReload, CloseSmallSVG, StarSVG } from '../../../components/icons';
import { actions } from '../../../core/profile/profileSlice';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const { Dragger } = Upload;

const UploadImg = ({ form, editCompanyLogo, setEditCompanyLogo }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  const image = useSelector((state) => state.profile.data.image);
  const dispatch = useDispatch();
  const { uploadProfileImage, deleteProfileImage } = bindActionCreators(actions, dispatch);
  const customRequest = (e) => {
    console.log('e', e.file);
    // form.setFieldsValue({
    //   logo: e.file,
    // });
    uploadProfileImage(e.file).then((data) => {
      if (!data.error) {
        notification.success({
          message: 'Photo have been uploaded successfully',
          duration: 3.5,
        });
      }
    });

    setLogoUrl(() => URL.createObjectURL(e.file));
    e.onSuccess('ok');
  };

  const checkRender = () => {
    return (
      <div className="edit_dragger">
        {logoUrl !== null ? (
          <Dragger
            name="file"
            customRequest={customRequest}
            accept="image/png, image/jpeg"
            className={`upload-img edit ${false ? 'loading' : ''} `}
            showUploadList={false}>
            <div className="img_logo__block">
              <img src={image === '' ? logoUrl : image} alt="logo" />
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
                    deleteProfileImage();
                  }}>
                  <div>
                    <CloseSmallSVG />
                  </div>
                  <span>Remove</span>
                </div>
              </div>
            </div>
          </Dragger>
        ) : (
          <Dragger
            name="file"
            customRequest={customRequest}
            accept="image/png, image/jpeg"
            className={`upload-img edit ${false ? 'loading' : ''} `}
            showUploadList={false}>
            <div className="img_logo__block">
              <img src={image} alt="logo" />
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
                    deleteProfileImage();
                  }}>
                  <div>
                    <CloseSmallSVG />
                  </div>
                  <span>Remove</span>
                </div>
              </div>
            </div>
          </Dragger>
        )}
      </div>
    );
  };

  return (
    <Tooltip placement="rightTop" title={'Upload PNG, JPG, JPEG'}>
      {image === '' ? (
        <Dragger
          name="file"
          customRequest={customRequest}
          accept=".jpg,.jpeg,.png"
          className={`upload-img ${false ? 'loading' : ''} `}
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
      ) : (
        checkRender()
      )}
    </Tooltip>
  );
};

export default UploadImg;
