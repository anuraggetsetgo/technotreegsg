import { React, useState } from "react";
import SignupView from '../Screens/Signup/Signup-view'
import { set,removeItem} from '../Utils/Services'
import { useHistory } from "react-router";
import isLoadingHOC from '../hoc/isLoadingHOC';
import { api_profileGet } from '../Utils/GSGApi'
import {callAPI,getURL} from '../Utils/Services'

// export function calculateIdealWeight(weight, height, gender, currentShape, targetShape, progress, callback, errcallback) {
//   const urlCalulateIdealWeight = "https://4eji1rf7w0.execute-api.us-east-1.amazonaws.com/default/ideal-weight-calculator";
//   const key = 'vm6VqnlBsy12sZfW8PFCl6yAJnif6kHh5NvRtK9Q';
//   const apidata = { weight: weight, height: height, gender: gender, currentShape: currentShape, targetShape: targetShape, progress: progress }
//   callAPI(urlCalulateIdealWeight, "post", (data) => callback(data), err => errcallback(err), apidata, key);
// }
// export function api_profileGet(successCallback, errCallback) {
//   callAPI(getURL("profile"), "get", successCallback, errCallback);
// }
// export function api_profilePost(data, successCallback, errCallback) {
//   callAPI(getURL("profile"), "post", successCallback, errCallback, data);
// }
// export function api_generateOTP(mobileno, OTPSuccessful, OTPUperror) {
//   callAPI(getURL("generate_otp"), "post", OTPSuccessful, OTPUperror, mobileno);
// }
// export function api_validateOTP(OTPdata, OTPSuccessful, OTPUperror) {
//   callAPI(getURL("validate_otp"), "post", OTPSuccessful, OTPUperror, OTPdata);
// }
// export function api_sampleDietGen(apidata, dietSuccessful, dieterror) {
//   const url = "https://4eji1rf7w0.execute-api.us-east-1.amazonaws.com/default/sample-diet-generator";
//   const key = 'aUgdwJpGGx8zsU3u6X5Nk29MxfQlFfNX4Nz046ia';
//   callAPI(url, "post", dietSuccessful, dieterror, apidata, key);
// }

export function checkUserProfile() {
}//USED TO Set local tokens

export const Signup = (props) => {

  const [otp_sent, setOtpSent] = useState(false);
  const [otp_error, setOTPError] = useState(false);

  const [loading, setloading] = useState(false)
  //const [loading, setloading] = props
  const [otpverification_error, setOTPVerificationError] = useState(false);
  const [otpverified, setOTPVerified] = useState(false);

  const [userProfile, setuserProfile] = useState(false);
  const [userProfileError, setUserProfileError] = useState(false);

  const [proceedToSignUp, setproceedToSignUp] = useState(false);
  //const [usersignedup, setUserSignedUp] = useState(false);
  //const [usersignupError, setUserSignUpError] = useState(false);
  //const [proceedToDashBoard, setproceedToDashBoard] = useState(false);

  let history = useHistory();
  const resetState = () => {
    setOtpSent(null);
    setOTPError(null);
    setOTPVerified(false);
    setproceedToSignUp(false)
    setOTPVerificationError(false)
  }

  const generateOTP = (value) => {
    let mobile = value.match(/\d/g).join('');
    let mobileno = { on_elibom: mobile }
    console.log(mobileno)
    console.log("api_signup_gen");
    setloading(true);
    //callAPI(getURL("generate_otp"), "post", OTPSuccessful, OTPUperror, mobileno);
    OTPSuccessful({ data: { message: "OTP Sent SucessFully" } })

    function OTPSuccessful(data) {
      setOtpSent(data.data.message);
      setloading(false);
    }
    function OTPUperror(err) {
      console.log("ERR :>>", err)
      setloading(false);
      if (err.response.data.message)
        setOTPError(err.response.data.message);
      else
        setOTPError('Opps!!!Please Try Again');
    }
  }

  const verifyOTP = (mobile, otp) => {
    console.log("api_signup_VER");
    let mobileno = mobile.match(/\d/g).join('');
    let OTPdata = { on_elibom: mobileno, pto: otp }
    setloading(true)
    console.log(OTPdata);
    //callAPI(getURL("validate_otp"), "post", OTPVerificationSuccessful, OTPUVerificationerror, OTPdata);
    //console.log(OTPdata);
    OTPVerificationSuccessful({ data: { message: "OTP VERified Success", token: '4d004a8e6215f4fa6f9cc6c5f46a988c3868106c14237e1962' } })

    function OTPVerificationSuccessful(data) {
      setOTPVerified(data.data.message);
      setloading(false);  //OTP Verified please Wait while we fetch our Records
      set("GSG_client_auth", data.data.token); //Auth called API Now Check Profile      
      getUserProfile();
    }
    function OTPUVerificationerror(err) {
      setloading(false);
      console.log('err_signup_VER', err)
      if (err.response.data.message)
        setOTPVerificationError(err.response.data.message);
      else
        setOTPVerificationError('Opps!!!Please Try Again');
    }
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
      setproceedToSignUp(true);
    }
    else {
      console.log("take him to dashboard--")
      setproceedToSignUp(true);
      //proceedToDashBoard_F();
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


  const proceedToDashBoard_F = () => {
    set("isAuthenticated", true);
    props.changeLoginStatus(true);
    history.replace('/');//Proceed to Dashboard

  }

  return (
    <SignupView generateOTP={generateOTP}
      otp_sent={otp_sent}
      setOTPError={setOTPError}
      otp_error={otp_error}
      verifyOTP={verifyOTP}
      otpverified={otpverified}
      otpverification_error={otpverification_error}
      setOTPVerificationError={setOTPVerificationError}
      showSignUpFrom={true}//{proceedToSignUp}
      resetState={resetState}
      loading={loading}
      userProfile={userProfile}
      userProfileError={userProfileError}
      {...props}
    />
  );
}

export default isLoadingHOC(Signup, 'Please wait')
