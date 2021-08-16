import React, { useState, useEffect } from 'react';
import { Tooltip, Upload, Spin, notification } from 'antd';
import './style.scss';
import { SVGReload, CloseSmallSVG, StarSVG } from '../../../components/icons';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../core/companies/companiesSlice';
import { useParams } from 'react-router-dom';

const { Dragger } = Upload;

const UploadCompanyLogo = ({ editMode, setLogoUrl, logoUrl }) => {
  const [updatedImg, setUpdatedImg] = useState(null);
  const dispatch = useDispatch();
  const { updateCompanyImage, getCompanieData, removeCompanyImage } = bindActionCreators(actions, dispatch);

  const { id } = useParams();

  const image = useSelector((state) => state.companies?.companieData?.image); //

  useEffect(() => {
    setUpdatedImg(() => `${image}?${new Date().getTime()}`);
  }, [image]);

  const customRequest = (e) => {
    // setLogoUrl(() => URL.createObjectURL(e.file));

    const body = {
      company_id: id,
      file: e.file,
    };

    updateCompanyImage(body).then((data) => {
      getCompanieData(id);

      if (data.error) {
        notification.error({
          message: 'An Error Occurred, Please Try Again',
          duration: 3.5,
        });
      }
      if (!data.error) {
        notification.success({
          message: 'Image for Company has been uploaded',
          duration: 3.5,
        });
      }
    });

    e.onSuccess('ok');
  };

  return (
    <Tooltip placement="top" title={'Upload PNG, JPG, JPEG'}>
      <Dragger
        name="file"
        customRequest={customRequest}
        accept=".jpg,.jpeg,.png"
        className={`upload-logo_edit ${false ? 'loading' : ''} ${!editMode && 'edit'} ${!editMode && 'none'}`}
        showUploadList={false}>
        {image === null ? (
          <div className="upload-title">
            <div>
              <StarSVG />
            </div>
            <span className="upload_photo">Upload Logo</span>
          </div>
        ) : updatedImg !== null ? (
          <div className="img_logo__block">
            <img src={updatedImg} alt="logo" />
            {editMode && (
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
                    removeCompanyImage(id).then(() => {
                      getCompanieData(id);
                    });
                  }}>
                  <div>
                    <CloseSmallSVG />
                  </div>
                  <span>Remove</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>hello kittyt</div>
          // <div className="img_logo__block">
          //   <img src={image} alt="logo" />
          //   {editMode && (
          //     <div className="choices">
          //       <div>
          //         <div>
          //           <SVGReload />
          //         </div>
          //         <span>Replace</span>
          //       </div>
          //       <div
          //         onClick={(e) => {
          //           e.stopPropagation();
          //           removeCompanyImage(id).then(() => {
          //             getCompanieData(id);
          //           });
          //         }}>
          //         <div>
          //           <CloseSmallSVG />
          //         </div>
          //         <span>Remove</span>
          //       </div>
          //     </div>
          //   )}
          // </div>
        )}
      </Dragger>
    </Tooltip>
  );
};

export default UploadCompanyLogo;
