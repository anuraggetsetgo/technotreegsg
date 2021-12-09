import { React, useState } from "react";
import SignIn from '../Screens/SignIn/SignIn-view'
import isLoadingHOC from '../hoc/isLoadingHOC';
import { api_profileGet } from '../Utils/GSGApi'
import {callAPI,getURL} from '../Utils/Services'
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
        window.localStorage.setItem('GSG_client_auth',data.token);
        history.push("/dashboard");

    };
    const handleErr = err => {
        const {response: { data: { errormessage }}} = err;
        setAlert(true);
        setAlertData({
            alertType: ALERT.ERROR,
            alertMsg: errormessage
        })
    };

    return (
        <>
            <SignIn {...props} loginfn={loginfn}/>
            {/*<AlertSnackbar open={alert} message={alertData.alertMsg} type={alertData.alertType}>*/}
            {/*</AlertSnackbar>*/}
        </>
    );
}

export default isLoadingHOC(SignInView, 'Please wait')
