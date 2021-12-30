
import React, { useState } from "react";
import ProfileUpdateView from '../Screens/Profile/ProfileUpdate-View'
import { get, callAPI, getURL, cmtoinch } from '../Utils/Services'
import { getUserProfile } from './Profile'
import isLoadingHOC from '../hoc/isLoadingHOC'

export  function ProfileUpdate(props) {
    const [userData, setUserData] = useState(JSON.parse(get("GSG_Client_data")))
    const [progressUpdateSuccess, setProgressUpdateSuccess] = useState(false)
    const [progressUpdateInProgress, setprogressUpdateInProgress] = useState(false);
    const [progressUpdateError, setProgressUpdateError] = useState(false);

    const fatPer = (waist, hips, neck, height, gender) => {
        let fatPer = 0;
        switch (gender) {
            case 'male':
                fatPer = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
                break;
            case 'female':
                fatPer = 495 / (1.29579 - 0.35004 * Math.log10(waist + hips - neck) + 0.22100 * Math.log10(height)) - 450;
                break;
             default: //male
                fatPer = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450 
        }
        return { fat: fatPer }
    }
    const updateUserProgressData = (userMeasurements, images) => {
        setProgressUpdateError(false); setProgressUpdateSuccess(false);
        console.log("api_progressUpdate_update_progress_data")
        let fatper = fatPer(userMeasurements.waist, userMeasurements.hips, userMeasurements.neck, cmtoinch(userData.height), userData.sex)
        userMeasurements.fat = fatper.fat
        console.log(userMeasurements);
        setprogressUpdateInProgress(true); //In progress
        callAPI(getURL("update_progress_data"), "post", updateSuccessful, updateError, userMeasurements);

        function updateSuccessful(data) {
            updateUserProfileImage(images, data.data.progress_id); //API CALL
            getUserProfile(); //to refresh user Profile
        }
        function updateError(err) {
            console.log('err_progressUpdate_update_progress_data', err)
            setProgressUpdateError(true);
        }

    }
    const updateUserProfileImage = (images, progress_id) => {
        props.setLoadingHOC(true,"Please wait while we are updating your profile");
        console.log("api_progressUpdate_update_progress_Image")
        images.progress_id = progress_id;
        callAPI(getURL("update_progress_img"), "post", updateError, updateError, images);
        function updateSuccessful(data) {
            setProgressUpdateSuccess(true);   
            props.setLoadingHOC(false);
            
        }
        function updateError(err) {
            setProgressUpdateError(true);
            props.setLoadingHOC(false);
            console.log('err_progressUpdate_update_progress_Image', err)
            

        }
        setprogressUpdateInProgress(false); //all calls completed
    }
    return (
        <ProfileUpdateView
            show={props.show}
            userData={userData}
            progressUpdateSuccess={progressUpdateSuccess}
            progressUpdateInProgress={progressUpdateInProgress}
            updateUserProgressData={updateUserProgressData}
            progressUpdateError={progressUpdateError}
            handleClose={props.handleClose}
            {...props}
        />
    )
}
export default isLoadingHOC(ProfileUpdate, 'Please wait')