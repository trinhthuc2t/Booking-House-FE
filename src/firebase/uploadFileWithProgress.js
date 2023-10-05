import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {storage} from "./firebase";
import {v4} from "uuid";

const uploadFileWithProgress = (file, setProgress) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const upload = uploadBytesResumable(storageRef, file);
        upload.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const url = await getDownloadURL(storageRef);
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};
export default uploadFileWithProgress;