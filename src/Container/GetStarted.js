import React,{useEffect, useState} from "react";
import GetStartedView from '../Screens/GetStarted/GetStarted-view';
import { useHistory } from "react-router";
import {api_companyLogoGet} from '../Utils/GSGApi'
import {get} from '../Utils/Services'

export default function GetStarted(props) {
  let history=useHistory();
  //const [proceedToSignUp, setproceedToSignUp] = useState(false);
  //const getStarted=()=>{setproceedToSignUp(true);}
  
  const getStarted=()=>{history.push('/register')}
  const Login=()=>{history.push('/login')}
  const [partnerLogo, setpartnerLogo] = useState(null);
  const getPartnerCompanyLogo=(companyName) =>{
   api_companyLogoGet(companyName,getLogoSuccess,getLogoFailed)
   function getLogoSuccess(data){
     console.log(data);
     setpartnerLogo(data.data.logo)
   }
   function getLogoFailed(){
     setpartnerLogo('')
     console.error('Unable to load logo')
   }
  }
  useEffect(() => {
    let companyName=get('company')
    if(companyName)
    getPartnerCompanyLogo(companyName)
  }, [])
  return (<><GetStartedView getStarted={getStarted} Login={Login} {...props} partnerLogo={partnerLogo} ></GetStartedView>
    {/* // {!proceedToSignUp &&()}
    // {proceedToSignUp &&(<Signup {...props}></Signup>)} */}
    </>
  )
}