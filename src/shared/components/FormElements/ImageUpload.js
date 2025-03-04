import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isVaild, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickFile;
        let fileIsValid = isVaild;
        if (event.target.files && event.target.files.length === 1) {
            pickFile = event.target.files[0];
            setFile(pickFile);
            setIsValid(true);
            fileIsValid = true;

        } else {
            setIsValid(false);
            fileIsValid = true;
        }
        props.onInput(props.id, pickFile, fileIsValid)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className='form-control'>
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type='file'
                accept='.jpg, .png, .jpeg'
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.cetner && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt='Preview' />}
                    {!previewUrl && <p>이미지를 선택하세요.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>이미지 선택</Button>
            </div>
            {!isVaild && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;