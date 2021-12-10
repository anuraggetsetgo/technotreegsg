import React, { useEffect, useState } from 'react'
import SignupFromView from '../Screens/Signup/SignupForm-view'
import { get,set} from '../Utils/Services'
import {api_profileGet,api_profilePost} from '../Utils/GSGApi'
import { useHistory } from 'react-router'

export default function SignUpForm(props) {
    const [usersignedup, setUserSignedUp] = useState(false)
    const [usersignupError, setUserSignUpError] = useState(false)
    const [projectedProgress, setProjectedProgress] = useState(false)
    const [question,setQuestion] =useState(props.question||1)
    let history = useHistory();
    //const [question, setsection] = React.useState(props.question||1);
    //const [userData, setUserData] = useState(JSON.parse(get("GSG_Client_data")))
    const questionStart = props.question || 1;
  const signUP = (userData) => {
    console.log("api_complte_signup")
    api_profilePost(userData,signUpSuccessfullUpdate,errorSignUP)
    function signUpSuccessfullUpdate(data) {
      props.setLoadingHOC(true, "Please wait while we are updating your profile on our systems");
      setUserSignedUp(data.data);
      api_profileGet(profileSuccessful, errorprofile)  //Update local storage
      function profileSuccessful(data) {
        console.log('About to set true')
        set("GSG_Client_data", data.data);
        set("client_user_id", data.data.user_id);
        setProjectedProgress(true);
        props.setLoadingHOC(false);
      }
      function errorprofile(err) {
        console.log('err_signup_PROFILE', err)
      }
    }
    function errorSignUP(err) {
      console.log('api_complted_signup', err)
      if (err)
        setUserSignUpError(err);
      else
        setUserSignUpError('Opps!!!Please Try Again');
    }
  }
  // const addEmail = (userData) => {
  //   console.log("api_signupi")
  //   api_profilePost(userData,successEmailUpdate,errorEmailUpdate)
  //   function successEmailUpdate(data) {
  //     setemailUpdate(data.data);
  //   }
  //   function errorEmailUpdate(err) {
  //     console.log(err.response.data.errormessage)
  //     setemailUpdateError(err.response.data.errormessage)
  //     //setQuestion(1);
  //   }
  // } 
    return (    
    <SignupFromView 
    question={question}
    questionStart={questionStart}
    resetState={props.resetState}
    projectedProgress={projectedProgress} 
    signUP={signUP}
    usersignedup={usersignedup}
    usersignupError={usersignupError}
    setProjectedProgress={setProjectedProgress}
    //userProfile={userData}
      {...props}
    />
    )
}
