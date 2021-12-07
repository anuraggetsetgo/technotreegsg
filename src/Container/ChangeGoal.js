import React, { useState } from 'react'
import SignupFrom from './SignUpForm'
import { useHistory } from 'react-router'
import isLoadingHOC from '../hoc/isLoadingHOC';
import { get} from '../Utils/Services'

export function ChangeGoal(props) {
const [question, setquestion] = useState(props.question||5)
let history=useHistory();
const changeGoal=()=>{console.log('changegoal')}
const goback=()=>{history.push('/')}

    return (
    <SignupFrom 
    question={question}
    resetState={goback} 
    changeGoal={changeGoal}
    userProfile={JSON.parse(get("GSG_Client_data"))}
    setquestion={setquestion}
    {...props}

    />
    )
}
export default isLoadingHOC(ChangeGoal, 'Please wait')
