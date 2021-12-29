import React from 'react'
import { useEffect } from 'react';
import { removeItem } from "../../Utils/Services";
import Splash from '../../Screens/Splash/Splash'
import { useHistory } from 'react-router';
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'

export default function Logout(props) {
    const [open, setOpen] = React.useState(false);
    let history = useHistory();
    const logout = () => {
        props.changeLoginStatus(false);
        removeItem("GSG_Client_data");
        removeItem("isAuthenticated");
        removeItem("GSG_client_auth");
        removeItem("client_user_id");
        removeItem("GSG_Client_Profile_Pic");
        removeItem("device_token");
        removeItem("company");
        removeItem("device_type");
    }
    const handleClose = () => {
        setOpen(false);
        history.replace('/');
    }
    const afterTimeOut = () => {
        history.replace('/');
    }
    useEffect(() => {
        logout();
        setOpen(true);

    }, [])
    return (<>
        <Splash timeout={6000} afterTimeOut={afterTimeOut}></Splash>
        {/* {open &&
            <AlertSnackbar
                open={open}
                onClose={handleClose}
                message="You have been logged out successfully"
                type={ALERT.SUCCESS}>
            </AlertSnackbar>} */}
    </>)
}
