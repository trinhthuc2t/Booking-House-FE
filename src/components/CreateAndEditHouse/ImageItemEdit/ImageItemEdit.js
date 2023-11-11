import React from 'react';
import _ from 'lodash';

const ImageItemEdit = ({setImageURLEdit, index, url, imagesFile, values, setImagesURLDelete}) => {
    const handleDeleteImage = () => {
        setImageURLEdit(pre => {
            if (pre.length === 1 && _.isEmpty(imagesFile)) {
                values.images = "";
            }
            const urlDelete = pre.splice(index, 1);
            setImagesURLDelete(preview => [...preview, ...urlDelete]);
            return [...pre];
        });
    }
    return (
        <div className="position-relative d-inline-block image-thumbnail">
            <img src={url} className="img-thumbnail" alt=""
                 width={250} style={{height: '150px'}} loading="lazy"/>
            <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                  onClick={handleDeleteImage}>
                  <i className="fa-solid fa-trash-can"></i>
            </span>
        </div>
    );
};

export default ImageItemEdit;