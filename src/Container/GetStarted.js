import React from "react";
import GetStartedView from '../Screens/GetStarted/GetStarted-view';
import { useHistory } from "react-router";


export default function GetStarted(props) {
  let history=useHistory();
  //const [proceedToSignUp, setproceedToSignUp] = useState(false);
  //const getStarted=()=>{setproceedToSignUp(true);}
  const getStarted=()=>{history.replace('/signup')}
  return (<><GetStartedView getStarted={getStarted} {...props}></GetStartedView>
    {/* // {!proceedToSignUp &&()}
    // {proceedToSignUp &&(<Signup {...props}></Signup>)} */}
    </>
  )
}