import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { colors } from '../../Utils/Services';
import { Grid, Input, TextField, Typography, Icon, LinearProgress, Chip, Button, InputLabel, InputAdornment, IconButton, List, ListItem } from '@material-ui/core'
import Styles from '../Signup/Signup-Style';
import validator from 'validator';
import MuiPhoneNumber from 'material-ui-phone-number';
import Timer from '../../Container/Common/Timer'
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
import Style from "../GetStarted/GetStarted-style";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const errMsgs = {
    required: "Uh oh! It's a required field",
    email: "Please enter a valid email id",
    mobile: "Please enter a valid number. ",
    country: "Did you miss the country code?",
    password: "Choose strong password"
};
const useStyles = makeStyles((theme) => ({
    root: { color: colors.black },

}));

export default function Register(props) {
    const [userData, setUserData] = useState({email:'', mobile:'', password:''});
    const [errorForm, setErrorForm] = useState({email:'', mobile:'', password:''});
    const [mobile, setMobile] = useState('');
    const [submitBtn, setSubmitBtn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    let history = useHistory();

    useEffect(() => {
        //to disable the signup button
    },[]);

    const validate = (value, regex, type) => {
        let err;
        if (!value) {
            err = errMsgs.required
        } else if (!regex.test(value)) {
            err = errMsgs[type];
        } else {
            err = null;
        }
        setError(Boolean(err));
        return err;
    };

    const validateMobilePhone = () => {
        var val = mobile.match(/\d/g);
        if (val) { val = val.join(''); }
        let err = validate(val, /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/g, "mobile");
        if(error){
            setErrorForm({ ...errorForm, ...{ ['mobile']: err } });
        }
    };

    function validateEmail(e) {
        const { value, name } = e.target
        let err = validate(
            value,
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i,
            "email"
        );
        err = (err === null) ? '' : err;
        setErrorForm({ ...errorForm, ...{ [name]: err } });
        setError(Boolean(err));
    };

    const validatePassword = (e) => {
        const { value, name } = e.target

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorForm({ ...errorForm, ...{ [name]: '' } });
            setError(false);
        } else {
            setErrorForm({ ...errorForm, ...{ [name]: errMsgs['password'] } });
            setError(true);
        }
    }

    const handleInput = (e) => {
        const { value, name } = e.target;
        setUserData({ ...userData, ...{ [name]: value } });
        console.log(JSON.stringify(userData,null,2))
    }
    const handleMobInput = value => {
        setMobile(value.replace('-','').replace(' ',''));
        setUserData({ ...userData, ...{ ['mobile']: value.replace('-','').replace(' ','') } });
        console.log(JSON.stringify(userData,null,2))
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = () => {
            if(errorForm.email === "") {
                if(errorForm.password === "") {
                    if(userData.email !== "") {
                        if(userData.password !== "") {
                            props.registerfn(userData);
                        }
                    }
                }
            }
        }

    return (
        <>
            <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid item container justify='flex-start' alignItems='flex-start'>
                <IconButton onClick={() => history.goBack()}> <ChevronLeftIcon />
                </IconButton>
            </Grid>
            </Grid>
            <Grid style={{ ...Styles.displayView, marginTop: '12em' }}>
                <Grid container direction='column' style={Styles.gutter} alignItems='center' justifyContent='center'>
                    <Grid item style={{width:'100%'}}>
                        <TextField style={{width:'100%'}} autoComplete='off' name="email" value={userData.email} label="Email Address" onBlur={validateEmail} onChange={handleInput}></TextField>
                        {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}> {errorForm.email}</Typography>}
                    </Grid>
                    <Grid item style={{marginBottom:0, width:'100%'}}>
                        <MuiPhoneNumber style={{width:'100%'}} name="mobile" label="Phone Number" disableAreaCodes={true} defaultCountry={'in'} excludeCountries={['pk', 'af', 'tj']} onChange={handleMobInput} onBlur={validateMobilePhone} autoFormat={true} />
                        {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}>{errorForm.mobile}</Typography>}
                    </Grid>
                    <Grid item style={{width: '100%'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            autoComplete="off"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={userData.password}
                            onChange={handleInput}
                            onBlur={validatePassword}
                            style={{width: '100%'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}> {errorForm.password}</Typography>}
                    </Grid>
                    {errorForm.password !== "" && (
                    <Grid item style={{width: '100%'}}>
                        <Typography variant="h5" style={{fontWeight: 'bold', marginTop: '10px'}}>Hints for a strong password:</Typography>
                        <ul style={{marginLeft: '-15px'}}>
                        <li>Must contain atleast 8 characters</li>
                        <li>Must contain both UPPERCASE and lowercase alphabets</li>
                        <li>Must contain numbers</li>
                        <li>
                        Must contain special characters ! @ # $ % ^ & * ( ) _ - + = . , ; :
                        </li>
                        </ul>
                    </Grid>)}
                    <Grid item>
                        <Button className="bigButton" disabled={userData.email === ""} style={{width: '96%', position: 'absolute', left: 0, }} variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
