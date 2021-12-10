import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { callAPI,getURL, set, get } from "../Utils/Services";
import Login from "../Screens/Login/Login-view";

const LoginContainer = (props) => {
  let creds = {}; //Storing Credentials accross various Regions
  
  const [loginStatus, updateLoginStatus] = useState(false);
  
  const [startingLogin, updatestartingLogin] = useState(false);
  const [invalidCredentials, updateCredentials] = useState(false);
  //const [currentRegion, updateCurrentRegion] = useState("in");


  

  const resetState = () => {
    updateCredentials(false);
    //updateRegion("in", "logging in ...");
    //updateRegion("me", "not logged in");
    //updateRegion("row", "not logged in");
  };
  
  const proceedToDashboard = () => {
    console.log(get("auth"));
    props.props.history.push("/");
  };
  
  const loginFn = (f) => {
    updatestartingLogin(true);
    const tempObj = {
      user_email: f.email,
      user_password: f.password,
      user_type: "client", //'consulatan'
    };
    creds = tempObj; //    apiCall("signin", "in", updateIN, updateIN, props.props, "post", tempObj);
    callAPI(
      getURL("sign-in"),
      "post",
      loginSuccessful,
      errorLoginSuccessful,
      tempObj,
    );
  };
  const loginSuccessful = data => {
    console.log("LOGIN DATA :>>", data);//
    set('isAuthenticated',true)
    set("GSG_client_auth", data.data.token);
    updateLoginStatus(data);
    updateCredentials(false);
    setUserProfile();
    //set("GSG_partner_user", data.data.affiliate_details);
    props.changeLoginStatus(true);
    //props.setAuth(true); //Till auth
    //history.replace("/");
    proceedToDashboard();
  };
  const errorLoginSuccessful = err => {
    updateCredentials(err);
     console.log("ERR :>>", err);
  };

  const setUserProfile=()=>{
    console.log("API_profile_Login")
     callAPI(
       getURL("profile"),
       "get",
       profileSuccessful,
       errorprofile,
     );
    //console.log(data);
  }
  const profileSuccessful=(data)=>{set("GSG_Client_data",JSON.stringify(data.data));}  
  
  const errorprofile=(err)=>{set("GSG_Client_data",null)};

  
  const prints = () => {
    console.log("this is functions passed as comp");
  };
  return (
    <div>
      <Login
        loginfn={loginFn}
        loginStatus={loginStatus}
        startingLogin={startingLogin}
        invalidCredentials={invalidCredentials}
        resetState={resetState}
      />
    </div>
  );
};

export default LoginContainer;











// const updateROW = (data) => {
//   updateAuth("row", data);
//   if (
//     loginStatus.in === "logged in" ||
//     loginStatus.me === "logged in" ||
//     loginStatus.row === "logged in"
//   ) {
//     proceedToDashboard();
//   } else {
//     updateCredentials(true);
//     updatestartingLogin(false);
//   }
// };
// const updateIN = (data) => {
//   updateAuth("in", data);
//   set("region", "me");
//   callAPI("signin", "me", updateME, updateME, props.props, "post", creds);
// };
// const updateME = (data) => {
//   updateAuth("me", data);
//   set("region", "row");
//   callAPI("signin", "row", updateROW, updateROW, props.props, "post", creds);
// };

// const updateRegion = (key, data) => {
//   let tempObj = Object.assign(loginStatus);
//   tempObj[key] = data;
//   updateLoginStatus({ tempObj });
// };
// const updateAuth = (region, data) => {
//   if (data.data) {
//     let currentAuthData = get("auth");
//     currentAuthData = currentAuthData ? JSON.parse(currentAuthData) : {};
//     currentAuthData[region] = data.data.token;
//     set("auth", JSON.stringify(currentAuthData));
//     updateRegion(region, "logged in");
//     set("isAuthenticated", true);
//   } else {
//     updateRegion(region, "failed");
//   }
//   set("region", "in");
// };