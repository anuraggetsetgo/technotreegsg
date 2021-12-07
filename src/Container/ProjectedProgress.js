import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import ProjectedProgressView from '../Screens/Signup/ProjectedProgress-view'
import { get, set,  cmtoinch } from '../Utils/Services'
import {  api_profilePost, calculateIdealWeight } from '../Utils/GSGApi'
import {getUserProfile} from './Profile'


export default function ProjectedProgress(props) {
  const [userData, setUserData] = React.useState(JSON.parse(get("GSG_Client_data")));
  const [projectedProgressData, setProjectedProgressData] = React.useState(false);
  const [projectedProgressError, setProjectedProgressError] = React.useState(false);
  const [updateProfile, setUpdateProfile] = React.useState(null);
  const [errorupdateProfile, setErrorUpdateProfile] = React.useState(null);
  let history = useHistory();
  //console.log(props);

  const getSetGo = () => {
    if (!props.changeGoal)   //Change Login status and setGoal FLOW FROM SIGNUP FORM
    {
      set('isAuthenticated', true)
      props.changeLoginStatus(true)
      history.replace('/')
    }
    if (props.changeGoal)   //Change Login status and setGoal FLOW FROM CHANGEGOAL
    {
      history.replace('/')
    }
    //props.changeLofinstate(config[localData])
  }
  const getProjectedProgress = (userData) => {
    const { sex, fat } = userData;//const { sex, fat, goals, clientProgress } = userData;
    let body_fat = userData.body_fat;
    const weight = userData.weight //lbs
    const height = cmtoinch(userData.height) //inches
    if (!body_fat) { body_fat = fat }
    if (body_fat === ">30") { body_fat = 35; }
    const startingShape = body_fat ? body_fat : fat;
    const targetShape = userData.fat;
    //const currentShape = (clientProgress.length > 0) ? clientProgress[0].fat : true;
    calculateIdealWeight(weight, height, sex, startingShape, targetShape, 1, success, error)
    function success(data) {
      const res=JSON.parse(data.data.body)
      console.log(JSON.parse(data.data.body).weight)
      setProjectedProgressData(res)
      const userGoal={ "goals":`{"fat":${targetShape},"weight":${res.weight}}`}
      const profileUpdateSuccess=(data)=>{console.log(data);setUpdateProfile(true)}
      const profileUpdateError=(err)=>{console.log(err);setErrorUpdateProfile(true)}
      api_profilePost(JSON.stringify(userGoal),profileUpdateSuccess,profileUpdateError)
      getUserProfile();
    }
    function error(err) {
      setProjectedProgressError(err)
    }
  }
  useEffect(() => {
    getProjectedProgress(userData);
  }, [userData])
  return (
    projectedProgressData && <ProjectedProgressView
      restart={props.restart}
      projectedProgressData={projectedProgressData}
      setProjectedProgressData={setProjectedProgressData}
      projectedProgressError={projectedProgressError}
      updateProfile={updateProfile}
      errorupdateProfile={errorupdateProfile}
      getSetGo={getSetGo}
      {...props}
    />
  )
}
