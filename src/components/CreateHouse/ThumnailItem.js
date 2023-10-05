import React, {useEffect, useState} from 'react';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import uploadFileWithProgress from "../../firebase/uploadFileWithProgress";

const ThumnailItem = ({file, setThumnailFile, setThumnailURL, values}) => {
    const [thumnailPreview, setThumnailPreview] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const uploadImages = async () =>{
            if (!file) return;
            setThumnailPreview(URL.createObjectURL(file));
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            setThumnailURL(imageUrl);
        }
        uploadImages().then();
    }, [file])

    const handleDeleteThumnail = () => {
        setThumnailPreview("");
        setThumnailFile(null);
        setThumnailURL("");
        values.thumbnail = "";
    }
    return (
        <div className={`position-relative d-inline-block image-thumnail ${thumnailPreview ? '' : 'd-none'}`}>
            <img src={thumnailPreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={250} height={150} loading="lazy"/>
            {progress >= 100 &&
                <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                      onClick={handleDeleteThumnail}>
                      <i className="fa-solid fa-trash-can"></i>
                </span>
            }
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default ThumnailItem;