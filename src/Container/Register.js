import { React, useState } from "react";
import Register from '../Screens/Signup/Register-view';
import { get,set,removeItem} from '../Utils/Services'
import { useHistory } from "react-router";
import isLoadingHOC from '../hoc/isLoadingHOC';
import { api_profileGet } from '../Utils/GSGApi'
import {callAPI,getURL} from '../Utils/Services'
import AlertSnackbar, {ALERT} from "./Common/AlertSnackbar";
import Styles from "../Screens/Signup/Signup-Style";
import {Button, Grid, Typography} from "@material-ui/core";
import Style from "../Screens/GetStarted/GetStarted-style";



export const ConformationScreen = () => {
    const history= useHistory();
    return (
        <Grid container direction="column" justifyContent="center"
              alignItems="center" style={{ ...Styles.displayView, marginTop: '25em' }}>
            <Grid item>
                <Typography variant={"h4"}>Awesome, Registration successful.</Typography>
                <Typography variant={"h4"}>Click on the button below to login</Typography>
            </Grid>
            <Grid item>
                <Button className="bigButton" style={Style.width100} variant="contained" color="primary" onClick={()=>history.push('/login')}>Login Now</Button>
            </Grid>
        </Grid>
    );
}

export const RegisterView = (props) => {

    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({
        alertMsg: '',
        alertType:''
    });
    const [hideForm, setHideForm] = useState(false);

    const registerfn = (payload) => {
         //    apiCall("signin", "in", updateIN, updateIN, props.props, "post", tempObj);
        props.setLoadingHOC(true, "Please wait while we setup your GetSetGo account...")
        setAlertData({
            alertType: '',
            alertMsg: ''
        })
        setAlert(false);
        payload.company=get('company');
        callAPI(
            getURL("signup"),
            "post",
            handleSuccess,
            handleErr,
            payload
        );
    };
    const handleSuccess = data => {
        props.setLoadingHOC(false)
        setAlertData({
            alertType: ALERT.SUCCESS,
            alertMsg: 'Registered successfully !!!'
        })
        setAlert(true);
        setHideForm(true);
    };
    const handleErr = err => {
        props.setLoadingHOC(false)
        const {response: { data: { errormessage }}} = err;
        
        setAlertData({
            alertType: ALERT.ERROR,
            alertMsg: errormessage
        })
        setAlert(true);
    };


    return (
        <div>
            {hideForm && <ConformationScreen/>}
            { !hideForm && <Register {...props} registerfn={registerfn}/> }

            {alert && <AlertSnackbar open={true} message={alertData.alertMsg} type={alertData.alertType} />}
        </div>
    );
}

export default isLoadingHOC(RegisterView, 'Please wait')
