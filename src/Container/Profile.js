import React, { useEffect, useState } from "react";
import ProfileView from '../Screens/Profile/Profile-view'
import { get, set } from '../Utils/Services'
import { useHistory } from "react-router";
import { getSignedUrl } from '../Utils/FetchImgs';
import { api_profileGet, api_profilePost } from '../Utils/GSGApi'


export const getUserProfile = () => {
  console.log("api_profile_PROFILE")
  api_profileGet(profileSuccessful, errorprofile)
  function profileSuccessful(data) { set("GSG_Client_data", data.data); }
  function errorprofile(err) { set("GSG_Client_data", null) };

}

export default function Profile() {
  //const [isloading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(JSON.parse(get("GSG_Client_data")))
  const [loading, setLoading] = useState(true)
  const [updateUserProfile, setUpdateUserProfile] = useState(false);
  const [userImage, setuserImage] = useState(null)
  //const [uploadImageError, setUploadImageError] = useState(false)
  let history = useHistory();
  const [showupdateUserProfile, setShowUpdateUserProfile] = useState(history.location.state ? history.location.state.updateProgress : false)

  const getUserImage = (profile_pic) => {
    console.log("dsasadasd", get("GSG_Client_Profile_Pic"));
    getSignedUrl(profile_pic, 'image/jpeg', 'profile_picture', 'getObject').then((data) => {
      const tempURL = data.replace('s3', 's3-accelerate')
      //console.log(tempURL)
      //set("GSG_Client_Profile_Pic", tempURL);
      setuserImage(tempURL)

      //return (tempURL);
    })
      .catch(err => {
        setuserImage('')

      })
    //getUserImage(data.data.profile_pic);

  }



  const getUserProfile = () => {
    // if (!get("GSG_Client_data")) {
    console.log("api_profile_PROFILE")
    const profileSuccessful = (data) => {
      set("GSG_Client_data", data.data);
      //console.log("userImage",data.data.profile_pic )
      setUserData(JSON.parse(get("GSG_Client_data")));
      setLoading(false);
    }
    const errorprofile = (err) => { set("GSG_Client_data", null); setLoading(false); };
    setLoading(true);
    api_profileGet(profileSuccessful, errorprofile);
    // }
  }

  useEffect(() => {
    getUserImage(get("GSG_Client_Profile_Pic"));
    getUserProfile();
  }, [])

  const updateProgress = (userNewData) => {
    const profileUpdateSuccessful = (data) => { set("GSG_Client_data", data.data); setUserData(data.data); setUpdateUserProfile(true) }
    const errorprofileUpdate = (err) => { console.log("ProfileUpdate failed"); setUpdateUserProfile(false) };
    api_profilePost(userNewData, profileUpdateSuccessful, errorprofileUpdate)

  }



  const showProgress = () => { }

  const modifyGoal = () => { }

  return (
    userImage && <ProfileView
      userdata={userData}
      showUpdateProgress={showupdateUserProfile}
      updateProgress={updateProgress}
      updateProfileSuccess={updateUserProfile}
      showProgress={showProgress}
      modifyGoal={modifyGoal}
      userImage={userImage}
      loading={loading}
      setShowUpdateUserProfile={setShowUpdateUserProfile}
    />)


};
