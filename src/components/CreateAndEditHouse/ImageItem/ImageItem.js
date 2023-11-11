import React, {useEffect, useState} from 'react';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";
import uploadFileWithProgress from "../../../firebase/uploadFileWithProgress";

const ImageItem = ({file, setImagesFile, setImagesURL, imagesFile, values, houseId}) => {
    const [imagePreview, setImagePreview] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const uploadImages = async () => {
            if (!file) return;
            setImagePreview(URL.createObjectURL(file));
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            const imgObject = {
                url: imageUrl,
                house: {id: houseId}
            }
            setImagesURL(pre => [...pre, imgObject]);
        }
        uploadImages().then();
    }, [])

    const handleDeleteImage = () => {
        setImagePreview("");
        if (imagesFile.length === 1) {
            values.images = "";
        }
        const index = imagesFile.findIndex(item => item.name === file.name);
        setImagesFile(pre => {
            pre.splice(index, 1);
            return [...pre];
        });
        setImagesURL(pre => {
            pre.splice(index, 1);
            return [...pre];
        });
    }

    return (
        <div className={`position-relative d-inline-block image-thumbnail ${imagePreview ? '' : 'd-none'}`}>
            <img src={imagePreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={250} style={{height: '150px'}} loading="lazy"/>
            {progress >= 100 &&
                <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                      onClick={handleDeleteImage}>
                      <i className="fa-solid fa-trash-can"></i>
                </span>
            }
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default ImageItem;