import React from 'react';
import {Editor} from '@tinymce/tinymce-react';

const TinyMce = ({editorRef, handleSaveTinyMCE, values, isDescription}) => {
    return (
        <div className="p-3">
            <Editor
                apiKey='wetnv4w1c89n0nn68dmjily9a0ctn93oxuzn2244a5c7bq5f'
                onInit={(event, editor) => editorRef.current = editor}
                initialValue={isDescription ? values.description : values.facility}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

            <div className="mt-3 text-center">
                <button className="btn btn-primary px-4" onClick={() => handleSaveTinyMCE(values)}>Lưu</button>
            </div>
        </div>
    );
};

export default TinyMce;
