import { React, useState } from "react";
import SignIn from '../Screens/SignIn/SignIn-view'
import isLoadingHOC from '../hoc/isLoadingHOC';
import { api_profileGet } from '../Utils/GSGApi'
import {callAPI, getURL, set,removeItem} from '../Utils/Services'
import AlertSnackbar, {ALERT} from "./Common/AlertSnackbar";
import { useHistory } from "react-router";



export const SignInView = (props) => {

  
    const [loading, setloading] = useState(false)
    //const [loading, setloading] = props
  
    const [userProfile, setuserProfile] = useState(false);
    const [userProfileError, setUserProfileError] = useState(false);
  
    const [proceedToSignUp, setproceedToSignUp] = useState(false);


    let history=useHistory();
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({
        alertMsg: '',
        alertType:''
    });

    const loginfn = (payload) => {
        //    apiCall("signin", "in", updateIN, updateIN, props.props, "post", tempObj);
        setAlert(false);
        payload.user_type="client";
        callAPI(
            getURL("sign-in"),
            "post",
            handleSuccess,
            handleErr,
            payload
        );
    };

    const handleSuccess = ({data}) => {
        setAlert(true);
        setAlertData({
            alertType: ALERT.SUCCESS,
            alertMsg: 'Awesome! Login successful'
        });
        set('GSG_client_auth',data.token);
        //setUserProfile(); //to fetch user profile data
        getUserProfile();
    };
    const handleErr = err => {
        const {response: { data: { errormessage }}} = err;
        setAlert(true);
        setAlertData({
            alertType: ALERT.ERROR,
            alertMsg: "Incorrect username or password"
        })
    };

    const setUserProfile=()=>{
        callAPI(
            getURL("profile"),
            "get",
            profileSuccessful,
            errorprofile
        );
    }
    const profileSuccessful=(data)=>{set("GSG_Client_data",JSON.stringify(data.data));history.push("/dashboard");}

    const errorprofile=(err)=>{set("GSG_Client_data",null)};

    const proceedToSignup = () => {
        history.replace('/signup');//Proceed to Dashboard
    
      }

      const proceedToDashBoard_F = () => {
        set("isAuthenticated", true);
        props.changeLoginStatus(true);
        history.replace('/');//Proceed to Dashboard
    
      }
  const getUserProfile = () => {
    console.log("api_signup_PROFILE")
    props.setLoadingHOC(true, "Please wait while we are checking your profile on our system");
    setloading(true);
    api_profileGet(profileSuccessful, errorprofile);
    function profileSuccessful(data) {
      //setloading(true); not setting the loading as still fetching data done on CheckUserProfile
      //console.log(data.data)
      set("GSG_Client_data", data.data);
      set("client_user_id", data.data.user_id);
      set("GSG_Client_Profile_Pic", data.data.profile_pic); //USERID=PROFILEPIC Currently
      setuserProfile(data.data);
      checkUserProfile(data.data);
    }
    function errorprofile(err) {
      setloading(false)
      console.log('err_signup_PROFILE', err)
      props.setLoadingHOC(false);
      //resetState();
      removeItem("region");
      setUserProfileError(true);
      //history.go(0);
      //setOTPVerified(false)
      //console.log(err.response)

    }

  }

  const checkUserProfile = (userProfile) => {
    if (!userProfile.goals) {
      console.log("take him to signupform--NEW USER setleadStatus ")
      //setproceedToSignUp(true);
      proceedToSignup();
    }
    else {
      console.log("take him to dashboard--")
      //setproceedToSignUp(true);
      proceedToDashBoard_F();
    }
    if (userProfile.profile_percentage < 100)
      console.log("Show him notification to complete profile after loading is complete--OLD USER INCOMPLTEE PROFILE");
    //setproceedToDashBoard(true);
    //set("client_profile_percentage", "")

    if (userProfile.trainer)
      console.log("coachexist")

    if (userProfile.association.length > 0) {
      if (userProfile.association.assign_end_date > new Date().getTime())
        console.log('showhim 10days left ask for renewal paid user')
      //set("notification_renew", true);
    }
    setloading(false);
    //all set to locals
    //ispaid user //Has coach
    // is ExUser   //hasfirstname
    //is newUser
    //has incomplte profile  
    //days left for subscritpion<10
    props.setLoadingHOC(false);
  }


    return (
        <>
            <SignIn {...props} loginfn={loginfn}/>
            {alert && <AlertSnackbar open={alert} message={alertData.alertMsg} type={alertData.alertType}>
            </AlertSnackbar>}
        </>
    );
}

export default isLoadingHOC(SignInView, 'Please wait')
