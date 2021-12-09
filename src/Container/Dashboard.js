import DashboardView from '../Screens/Dashboard/Dashboard-view'
import { get,cmtoinch } from '../Utils/Services'
import React, { useState,useEffect } from 'react'
//import isLoadingHOC from '../hoc/isLoadingHOC';
import {calculateIdealWeight} from '../Utils/GSGApi'
import { getFCMToken ,onMessageTap} from '../Utils/CordovaPlugin'
import { useHistory } from 'react-router-dom'


export default function Dashboard() {
  let history=useHistory();
 //Notification token turned off 
// if(get('device_token')){
//   onMessageTap((url)=>history.replace(url))
//   console.log(get('device_token'))
// }
//   else
//   getFCMToken();
const [userData, setUserData] = useState(JSON.parse(get("GSG_Client_data")))
const [startingGoal, setStartingGoal] = useState(null);
const [currentGoal, setCurrentGoal] = useState(null);
const [errorGoal, setErrorGoal] = useState(null);

const currentprogress=(userData)=> {
  const { sex,fat,goals,clientProgress}=userData;
  let body_fat=userData.body_fat;
  const weight=userData.weight
  const height=cmtoinch(userData.height)
   console.log(height,userData.height)
   if (!body_fat) { body_fat = fat }
   if (body_fat === ">30") { body_fat = 35; }
  const startingShape = body_fat?body_fat:fat;
  const targetShape =  JSON.parse(goals).fat;
  const currentShape = (clientProgress.length>0)?clientProgress[0].fat:startingShape; //No progress Updates then currentshape=startingshape
  calculateIdealWeight(weight, height, sex, startingShape, targetShape, true,setStartingGoal,setErrorGoal)
  calculateIdealWeight(weight, height, sex, currentShape, targetShape, true,setCurrentGoal,setErrorGoal)

}
useEffect(() => {
  currentprogress(userData)
},[userData])
  return (
    userData && <DashboardView userData={userData} startingGoal={startingGoal} currentGoal={currentGoal} errorGoal={errorGoal} />
  )
}



  