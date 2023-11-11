import React, {useEffect, useState} from 'react';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";
import uploadFileWithProgress from "../../../firebase/uploadFileWithProgress";

const ThumbnailItem = ({file, setThumbnailFile, thumbnailURL, setThumbnailURL, values}) => {
    const [thumbnailPreview, setThumbnailPreview] = useState(thumbnailURL ? thumbnailURL : "");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const uploadImages = async () =>{
            if (!file) return;
            setThumbnailPreview(URL.createObjectURL(file));
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            setThumbnailURL(imageUrl);
        }
        uploadImages().then();
    }, [file])

    useEffect(()=>{
        setProgress(100);
    }, [])

    const handleDeleteThumbnail = () => {
        setThumbnailPreview("");
        setThumbnailFile(null);
        setThumbnailURL("");
        values.thumbnail = "";
    }
    return (
        <div className={`position-relative d-inline-block image-thumbnail ${thumbnailPreview ? '' : 'd-none'}`}>
            <img src={thumbnailPreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={250} height={150} loading="lazy"/>
            {progress >= 100 &&
                <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                      onClick={handleDeleteThumbnail}>
                      <i className="fa-solid fa-trash-can"></i>
                </span>
            }
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default ThumbnailItem;