import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from '../Signup/Signup-Style';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import SignUpFrom from '../../Container/SignUpForm'
import { colors } from '../../Utils/Services'
import MuiPhoneNumber from 'material-ui-phone-number';
import Timer from '../../Container/Common/Timer'
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'

const errMsgs = {
   requried: "Uh oh! It's a required field",
   name: "Wait, that doesn't sound like a valid name",
   email: "Please enter a valid email id",
   mobile: "That is certainly not a valid number. ",
   country: "Did you miss the country code?",
};
const useStyles = makeStyles((theme) => ({
   root: { color: colors.black },

}));

export default function Signup(props) {

   const [mobile, setMobile] = useState('');
   //const [countryCode, setCountryCode] = useState('');
   const [error, setError] = useState(false);

   const [sendingOTP, setSendingOTP] = useState(false);

   const [optValue, setOtpValue] = useState(new Array(6).fill(""));
   const [invalidOTP, setinvalidOTP] = useState(false);
   let history = useHistory();

   const validate = (value, regex, type) => {
      let error;
      if (!value) {
         error = errMsgs.requried
      } else if (!regex.test(value)) {
         error = errMsgs[type];
      } else {
         error = null;
      }
      setError(error);
      return error;
   };
   const validateMobile = (value) => {
      return validate(value, /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/g, "mobile");
   }
   const validateMobilePhone = () => {
      var val = mobile.match(/\d/g);
      if (val) { val = val.join(''); }
      console.log(val,validateMobile(val))
   };

   const handleNextSignUp = (e) => {
      e.preventDefault();
      validateMobilePhone();
      // if (props.otp_error )        //disable api if the errmesse is Maxinmun retur calls could not send OTP
      // return 0;
      if (!error && mobile !== '') {
         setSendingOTP(true);
         props.generateOTP(mobile);
         setSendingOTP(false);
      }
      clearOTP();

   };

   const handleChangeOTP = (e, index) => {
      if (isNaN(e.target.value))
         return false;

      setOtpValue([...optValue.map((d, indx) => (indx === index ? e.target.value : d))]);
      if (e.target.nextSibling) {   //moveto next slibbling
         e.target.nextSibling.focus();
      }

      //let otpJoin = parseInt(optValue.join("") + e.target.value);
      if ((optValue.join("").length + 1) === 6) {
         handleNextOnOTP(optValue.join("") + e.target.value);
         //setOtpValue([...optValue.map((v, index) => (""))]);//clearotp
      }
   }
   const onkeyDown = (e, index) => {
      if (e.keyCode == 8 || e.keyCode == 46) {
         setOtpValue([...optValue.map((d, indx) => (indx === index ? "" : d))]);
      }
   }
   const onkeyUP = (e) => {
      if (e.keyCode == 8 || e.keyCode == 46) {
         if (e.target.previousSibling) {   //moveto next slibbling
            e.target.previousSibling.focus();
         }

      }
   }
   const clearOTP = () => {
      setOtpValue([...optValue.map((v, index) => (""))]);//clearotp
   }
   const handleNextOnOTP = (otpVal) => {
      console.log(otpVal);
      if (otpVal === null)
         otpVal = optValue.join("");

      if (otpVal.length === 6)
         props.verifyOTP(mobile, otpVal);
      else
         setinvalidOTP(errMsgs.requried)
   };
   const handleBackOnOTP = () => { 
      props.resetState(); 
      setError(null); 
      setinvalidOTP(false); 
      clearOTP(); 
   }

   const handleMobilePhone = (value) => { 
   
      setMobile(value) 
   }


   const { otp_sent, otp_error, otpverified, otpverification_error, signUpError, showSignUpFrom, userProfileError, loading } = props;
   //const classes = useStyles();
   return (
      <>
         {!otp_sent && !showSignUpFrom && (<>
            <HeaderBar isVisible leftElement headerName rightElement='Next' rightEnable={true} rightCB={handleNextSignUp} />
            <form onSubmit={handleNextSignUp}>
               <Grid style={Styles.displayViewContainer}>
                  <Grid item container direction="row" justify='center' alignItems="center" style={{ ...Styles.signupContainer }}>
                     <Grid item container direction="row" justify='center' alignItems="center">
                        <Grid item container direction='row' justify='center' alignItems="center" style={{ marginBottom: '16px' }}>
                           <MuiPhoneNumber label="Phone Number" disableAreaCodes={true} defaultCountry={'us'} excludeCountries={['pk', 'af', 'tj']} onChange={handleMobilePhone} onBlur={validateMobilePhone} autoFormat={true} />
                        </Grid>
                        <Grid item>
                           {error && (<Typography variant="body2" style={Styles.err} >{error}</Typography>)}
                           {!otp_error && <Typography variant="body2" >We’ll send you an OTP that will instantly sign you in</Typography>}
                           {otp_error && <Typography variant="body2" style={Styles.err} >{otp_error}</Typography>}
                           {loading && <><Typography variant="body2" >Sending OTP</Typography><CircularProgress /></>}
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </form>
         </>
         )}

         {otp_sent && !otpverified && !showSignUpFrom && (
            <>
               <HeaderBar isVisible leftElement='back' leftEnable={true} leftCB={handleBackOnOTP} headerName rightElement rightCB={handleNextOnOTP} />
               <Grid style={Styles.displayViewContainer}>
                  <Grid container direction="row" justify='center' alignItems="center" style={{ ...Styles.signupContainer }}>
                     <Grid item container direction="column" alignItems="center" justify="center" >
                        <Grid item>
                        {!sendingOTP&&<Typography variant="body2" >OTP Sent Successfully</Typography>}
                        {sendingOTP&&<Typography variant="body2" >Sending OTP...</Typography>}
                        </Grid>
                        <Grid item  >
                           {optValue.map((data, index) => {
                              return ( 
                                 <input className="otp-field" type="number" name="otp" maxLength="1" length='1' key={index}
                                    value={data} onChange={e => handleChangeOTP(e, index)}
                                    onFocus={e => e.target.select()} onKeyDown={e => onkeyDown(e, index)}
                                    onKeyUp={e => onkeyUP(e)}/>
                              );
                           })}
                        </Grid>

                        {invalidOTP && (<Grid item><Typography variant="body2" style={Styles.err}>{errMsgs.requried}</Typography></Grid>)}
                        {otpverification_error && (<AlertSnackbar open={otpverification_error} message={otpverification_error} type={ALERT.ERROR}>
                           </AlertSnackbar>
                        )}

                        <Grid item direction='column' style={Styles.marginTop16} container alignItems='center' justify='center' >
                           <Grid item>
                           {!loading &&<Timer timer="30" text="Resend OTP"><Typography variant='body1' color="primary" onClick={handleNextSignUp}>Resend OTP</Typography></Timer>}
                           </Grid>
                           <Grid item>
                           {/* {!loading && <><Typography variant="body2" >Sending OTP</Typography><CircularProgress /></>} */}
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </>)
         }

         { showSignUpFrom && !loading && (<SignUpFrom resetState={handleBackOnOTP} {...props}></SignUpFrom>)}
         {userProfileError && (
            <AlertSnackbar open={userProfileError} onClose={() => history.go(0)} message={"There was some glitch fetching your profile.Please try again"} type={ALERT.ERROR}>
            </AlertSnackbar>
         )}
      </>)
}
