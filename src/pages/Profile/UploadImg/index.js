import React, { useState } from 'react';
import { Tooltip, Upload, Spin, notification } from 'antd';
import './style.scss';
import { SVGReload, CloseSmallSVG, StarSVG } from '../../../components/icons';
import { actions } from '../../../core/profile/profileSlice';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const { Dragger } = Upload;

const UploadImg = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const image = useSelector((state) => state.profile.data.image);
  const dispatch = useDispatch();
  const { uploadProfileImage, deleteProfileImage, getProfile } = bindActionCreators(actions, dispatch);
  const customRequest = (e) => {
    uploadProfileImage(e.file).then((data) => {
      if (!data.error) {
        notification.success({
          message: 'Photo have been uploaded successfully',
          duration: 3.5,
        });
      }
      getProfile();
    });
    setLogoUrl(() => URL.createObjectURL(e.file));
    e.onSuccess('ok');
  };

  return (
    <Tooltip placement="rightTop" title={'Upload PNG, JPG, JPEG'}>
      {image !== '' ? (
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
                  deleteProfileImage().then((data) => {
                    if (!data.error) getProfile();
                  });
                  setLogoUrl(() => null);
                }}>
                <div>
                  <CloseSmallSVG />
                </div>
                <span>Remove</span>
              </div>
            </div>
          </div>
        </Dragger>
      ) : image === '' && logoUrl === null ? (
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
        image === '' &&
        logoUrl !== null && (
          <Dragger
            name="file"
            customRequest={customRequest}
            accept="image/png, image/jpeg"
            className={`upload-img edit ${false ? 'loading' : ''} `}
            showUploadList={false}>
            <div className="img_logo__block">
              <img src={logoUrl} alt="logo" />
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
                    setLogoUrl(() => null);
                  }}>
                  <div>
                    <CloseSmallSVG />
                  </div>
                  <span>Remove</span>
                </div>
              </div>
            </div>
          </Dragger>
        )
      )}
    </Tooltip>
  );
};

export default UploadImg;
