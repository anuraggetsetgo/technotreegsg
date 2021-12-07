import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { CloseRounded, PhotoCamera } from '@material-ui/icons';
import Resizer from "react-image-file-resizer";
import { getSignedUrl } from '../../Utils/FetchImgs';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GalleryIcon from '../../img/gallery.png'
import CameraIcon from '../../img/camera.png'

export default function ImageUpload(props) {
    const sources = ['Gallery', 'Camera']
    const [img, setimg] = useState(null);
    const [openSelectDialog, setOpenSelectDiaglog] = useState(false);
    const handleOpenDialog = () => {
        setOpenSelectDiaglog(true);
    };
    const handleCloseDialog = () => {
        setOpenSelectDiaglog(false);
    };
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
                    //console.log(uri);
                    tempImage = uri;
                    setimg(tempImage);
                    props.getConvertedImage({ image: tempImage, name: props.fileName });
                    if (!props.displayPreview)
                        uploadUserImage(props.fileName, tempImage)
                    if (props.displayPreview && props.confirmUpload) {
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
    const camSuccess = (file) => {
        try {
            console.log("Filesss", file);//let tempImage=
            getFileContentAsBase64(file, function (base64Image) {
                console.log(base64Image);
                uploadUserImage(props.fileName, base64Image);
                setimg(base64Image)
                props.getConvertedImage({ image: base64Image, name: props.fileName });
                handleCloseDialog();
                //return base64Image;
            });
        } catch (err) {
            camFail(err)
        }
    }
    const camFail = (err) => {
        console.log("Cam Failed", err);
    }
    const cameraApp = (source) => {
        console.log(source)
        navigator.camera.getPicture(camSuccess,
            camFail,
            {
                quality: 100,
                encodingType: navigator.camera.EncodingType.PNG,
                sourceType: parseInt(source),
                mediaType: navigator.camera.MediaType.PICTURE,
                saveToPhotoAlbum: true,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                targetWidth: 300,
                targetHeight: 300,
            });
    }
    function getFileContentAsBase64(path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }

        function gotFile(fileEntry) {
            fileEntry.file((file) => {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    }
    const closeIconStyleDefault = { position: 'absolute', background: 'black' }
    return (
        <>
            {(<>
                {/* <input accept="image/*" hidden name={props.fileName} id={props.fileName} type="file" onChange={ cameraApp} /> */}
                {/* <button hidden name={props.fileName} id={props.fileName}  onClick={ cameraApp} /> */}
                {/* <label htmlFor={props.fileName}> */}

                {/* <IconButton style={props.style} color="primary" aria-label="upload picture" component="span" onClick={cameraApp}>
                        {props.imageIcon ? props.imageIcon : <PhotoCamera />}
                    </IconButton> */}
                {openSelectDialog && <Dialog maxWidth={'xs'} onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openSelectDialog}>
                    <DialogTitle id="simple-dialog-title"><Typography variant='body1'>Please select your source</Typography></DialogTitle>
                    <List>
                        <ListItem button onClick={() => cameraApp(0)} key={"Gallery"}>
                            <ListItemAvatar>
                                <Avatar variant="square" src={GalleryIcon}>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'Gallery'} />
                        </ListItem>
                        <ListItem button onClick={() => cameraApp(1)} key={"Camera"}>
                            <ListItemAvatar>
                                <Avatar variant="square" src={CameraIcon}>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'Camera'} />
                        </ListItem>


                    </List>
                </Dialog>}
                <IconButton style={props.style} color="primary" aria-label="upload picture" component="span" onClick={handleOpenDialog}>
                    {props.imageIcon ? props.imageIcon : <PhotoCamera />}
                </IconButton>
                {/* </label> */}
            </>)
            }
            {img && props.displayPreview && (<>
                <IconButton style={props.closeIconStyle ? props.closeIconStyle : { ...closeIconStyleDefault }} color="primary" aria-label="upload picture" onClick={() => { clearImg() }}>
                    <CloseRounded />
                </IconButton></>
            )}

        </>)
}
