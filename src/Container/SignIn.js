import { React, useState } from "react";
import SignIn from '../Screens/SignIn/SignIn-view'
import isLoadingHOC from '../hoc/isLoadingHOC';
import { api_profileGet } from '../Utils/GSGApi'
import {callAPI, getURL, set} from '../Utils/Services'
import AlertSnackbar, {ALERT} from "./Common/AlertSnackbar";
import { useHistory } from "react-router";



export const SignInView = (props) => {
    let history=useHistory();
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({
        alertMsg: '',
        alertType:''
    });

    const loginfn = (payload) => {
        //    apiCall("signin", "in", updateIN, updateIN, props.props, "post", tempObj);
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
    };
    const handleErr = err => {
        const {response: { data: { errormessage }}} = err;
        setAlert(true);
        setAlertData({
            alertType: ALERT.ERROR,
            alertMsg: errormessage
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

    return (
        <>
            <SignIn {...props} loginfn={loginfn}/>
            {/*<AlertSnackbar open={alert} message={alertData.alertMsg} type={alertData.alertType}>*/}
            {/*</AlertSnackbar>*/}
        </>
    );
}

export default isLoadingHOC(SignInView, 'Please wait')
