import React, { useState,useEffect } from "react";
import { get,set,removeItem,updateLoc} from "./Services";

const Auth = (props) => {
  
  const [loggedIn, setLoggedIn] = useState(get("isAuthenticated"));
  const [location,setlocation] = useState( get('loc'));
  const [authToken,setAuthToken]=useState(get("GSG_client_auth"));

  console.log(location,"Location",get('loc'),"Region -",get('region'),'Auth',authToken,'Logedin',loggedIn)
  //const authData = get("auth");
  
  function updateLogin(data) {
    set("isAuthenticated", true);
    //props.changeLoginStatus(true, data);
  }
  function errLogin(data) {
    removeItem("auth");
    removeItem("isAuthenticated");
    //props.changeLoginStatus(false);
  }
  const updateLocation=(region)=> {
    setlocation(get('loc'));  
    console.log(region);
  }
 
  useEffect(()=>
 { 
   if(!location || !get('region'))
    { console.log('effect1')
      updateLoc(updateLocation);}
      
   if(!loggedIn || !authToken) 
   {//console.log('effect2')
     let currentState=(get("isAuthenticated") && get("GSG_client_auth") ?true:false)
      //console.log(get("isAuthenticated"));
      //console.log(get("GSG_client_auth"));
      setLoggedIn(currentState);
  //  }//props.changeLoginStatus(currentState);
  }
},[location,loggedIn,authToken]
  );

  
  if (!location|| !get('region'))
    return React.cloneElement(props.location, {...props,updateLocation});

    if (!loggedIn || !authToken)
      return React.cloneElement(props.childrenNoAuth, {...props});
    // else {
    //   callAPI("profile", "in", updateLogin, errLogin, props, "get");
    // }

    return React.cloneElement(props.children, props);
      
    //apiCall("profile", "in", updateLogin, errLogin, props, "get");
  
  //return React.cloneElement(props.children, props);  

};

export default Auth;