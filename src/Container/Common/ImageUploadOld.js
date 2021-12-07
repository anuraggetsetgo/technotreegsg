import { React, useState } from 'react'
import { IconButton } from '@material-ui/core';
import { CloseRounded, PhotoCamera } from '@material-ui/icons';
import Resizer from "react-image-file-resizer";
import { getSignedUrl } from '../../Utils/FetchImgs';
import axios from 'axios';


export default function ImageUpload(props) {

    const [img, setimg] = useState(null);
    const fileChangedHandler = (e) => {
        //console.log(e,el);
        let tempImage;
        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            let file = e.target.files[0];
            try {
                Resizer.imageFileResizer(file, 300, 300, "PNG", 100, 0, (uri) => {
                    console.log(uri);
                    tempImage = uri;
                    setimg(tempImage);
                    props.getConvertedImage({image:tempImage,name:props.fileName});
                    if(!props.displayPreview)
                        uploadUserImage(props.fileName, tempImage)
                    if(props.displayPreview && props.confirmUpload)
                     {   
                         uploadUserImage(props.fileName, tempImage)
                    }
                },
                    "base64",
                    200,
                    200
                );

            } catch (err) {
                console.log(err);
            }
        }
    }
    const uploadUserImage = (fileInputName, imgBase64) => {
        props.imageUploadError(false)
        const base64Data = new Buffer.from(imgBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = imgBase64.split(';')[0].split(':')[1];
        getSignedUrl(fileInputName, type, props.folderName, 'putObject')
            .then((signedUrl) => {
                //console.log(signedUrl)
                var config = { headers: { 'Content-Type': type, 'Content-Encoding': 'base64' } };
                return axios.put(signedUrl, base64Data, config);
            })
            .catch(err => {
                setimg(null)
                console.log(err)
                props.imageUploadError(true)
                props.getConvertedImage(false);
            })
    }

    const clearImg = () => {
        setimg(null);
        props.getConvertedImage(false);
    }
    const closeIconStyleDefault = { position: 'absolute', background: 'black' }
    return (
        <>
            {  (<>
                <input accept="image/*" hidden name={props.fileName} id={props.fileName} type="file" onChange={(e) => fileChangedHandler(e)} />
                <label htmlFor={props.fileName}>
                    <IconButton style={props.style} color="primary" aria-label="upload picture" component="span">
                        {props.imageIcon ? props.imageIcon : <PhotoCamera />}
                    </IconButton>
                </label></>)
            }
            {img && props.displayPreview && (<>
                <IconButton style={props.closeIconStyle ? props.closeIconStyle : { ...closeIconStyleDefault }} color="primary" aria-label="upload picture" onClick={() => { clearImg() }}>
                    <CloseRounded />
                </IconButton></>
            )}

        </>)
}
