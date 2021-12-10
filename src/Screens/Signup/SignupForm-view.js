import { React, useState } from 'react'
import HeaderBar from '../../Container/Common/HeaderBar'
import { Grid, Paper, TextField, Typography, Icon, LinearProgress, Chip, Button } from '@material-ui/core'
import Styles from '../Signup/Signup-Style';
import MaleImg from '../../img/male.png';
import FemaleImg from '../../img/female.png';
import CarrotImage from '../../img/carrot.png';
import EggImage from '../../img/egg.png';
import NonVegImage from '../../img/nonveg.png';
import HomeImage from '../../img/Signup/home.png';
import GymImage from '../../img/Signup/gym.png';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DraggableSlider from '../../Container/Common/Slider/DraggableSlider';
import ProjectedProgress from '../../Container/ProjectedProgress';
import { convertNumberToHeightFeetInches } from '../../Container/Common/Slider/unitconfig'
import { cmtoinch, cmtoft, kgtolb, fttocm, inchtocm, inchtoft } from '../../Utils/Services'
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
import { api_profilePost } from '../../Utils/GSGApi';
import Nouislider from "nouislider-react";

const errMsgs = {
    requried: "Uh oh! It's a required field",
    name: "Wait, that doesn't sound like a valid name",
    email: "Please enter a valid email id",
};
const distance = '10', bigStepHeight = '40', smallStepHeight = '20', boundary = [10, 20, 10, 20], scaleIsTop = false, valueIsTop = true
let ageBlock = [];
for (var i = 16; i <= 100; i = i + 10) {
    ageBlock.push(i);
}
const ages = {
    age: { unit: 'age', max: '100', min: '16', step: '10', interval: '1', },
    label: 'How Old are You?',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your age in years",
    defaultValue: '30',

}

let heightBlock = [];
for (var i = 122; i <= 224; i = i + 20) {
    heightBlock.push(i);
}
const height = {
    ft: { unit: 'ft', max: '8', min: '4', step: '12', interval: '1', defaultValue: "5" },
    cm: { unit: 'cm', max: '224', min: '122', step: '10', interval: '1', defaultValue: "154" },
    label: 'How tall are you?',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your height",

}
let weightlbsBlock = [];
for (var i = 66; i <= 441; i = i + 40) {
    weightlbsBlock.push(i);
}
let weightkgBlock = [];
for (var i = 30; i <= 200; i = i + 20) {
    weightkgBlock.push(i);
}
const weight = {
    lbs: { unit: 'lbs', max: 441, min: 66, step: 10, interval: 10, defaultValue: 200 },
    kg: { unit: 'kg', max: 200, min: 30, step: 10, interval: 1, defaultValue: 60 },
    label: 'Current Weight',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your weight",
}
const dietPreference = {
    label: 'What kind of diet do you prefer?',
    veg: { label: 'Vegtarian', value: 'veg' },
    egg: { label: 'Eggetarian', value: 'egg' },
    nonveg: { label: 'Non-Vegtarian', value: 'nonveg' },
}
const workoutplace = {
    label: 'Where would you like to workout?',
    home: { label: 'Home', value: '0' },
    gym: { label: 'Gym', value: '1' },

}
let workoutBlock = [];
for (var i = 0; i <= 7; i = i + 1) {
    workoutBlock.push(i);
}
const workoutlastMonth = {
    label1: 'How many days have you worked out',
    label2: ' in the last one month?',
    sub1: "Drag the scale to left or right to choose number of",
    sub2: "workout days in the last one month",
    workout: { unit: 'workout', max: 7, min: 0, step: 1, interval: 1, defaultValue: 5 },
}
const workoutPrepared = {
    label1: 'How often in a week are you prepared',
    label2: " to workout?",
    sub1: "Drag the scale to left or right to choose workout",
    sub2: "days / week",
    workout: { unit: 'workout', max: 7, min: 3, step: 1, interval: 1, defaultValue: 5 },
}

let currentShapeBlock = [];
for (var i = 5; i <= 45; i = i + 5) {
    currentShapeBlock.push(i);
}
const currentShape = {
    label: 'What is your current shape?',
    shape: { unit: 'fat', max: 45, min: 5, step: 5, interval: 5, defaultValue: 30 },
    sub1: "Drag the scale to left or right to estimate your",
    sub2: "current body fat percentage",
}
let targetShapeBlock = [];
for (var i = 5; i <= 25; i = i + 5) {
    currentShapeBlock.push(i);
}
const targetShape = {
    label: 'What is your target shape?',
    shape: { unit: 'fat', max: 25, min: 5, step: 5, interval: 5, defaultValue: 6 },
    sub1: "Drag the scale to left or right to choose your",
    sub2: "target body fat percentage",
}

export default function SignupForm(props) {

    //const userInfo=props.userProfile
    const [userStoredData, setUserDataStored] = useState(props.userProfile)
    const [userData, setUserData] = useState({ firstname: userStoredData.firstname, lastname: userStoredData.lastname, email: userStoredData.email, sex: '', age: ages.defaultValue, height: height.ft.defaultValue, weight: '200', dietPref: '', noWorkouts: workoutlastMonth.workout.defaultValue, willingGym: '1', body_fat: currentShape.shape.defaultValue, fat: targetShape.shape.defaultValue, workout: workoutPrepared.workout.defaultValue })
    const [userData_API, setUserData_API] = useState({})
    const [section, setsection] = useState(props.question);
    const question = props.questionStart;
    //console.log(props,section)
    const [errorForm, setErrorForm] = useState({ firstname: userStoredData.firstname.length <= 0 ? "" : false, lastname: userStoredData.lastname.length <= 0 ? "" : false, email: userStoredData.email.length <= 0 ? "" : false });
    const [enableNext, setEnableNext] = useState(true);
    const [unit, setUnit] = useState(0); //Unit System
    const [emailUpdate, setemailUpdate] = useState(false)
    const [emailUpdateError, setemailUpdateError] = useState(false)
    //const [currentShapeImg, setCurrentShapeImg] = useState({ shape: 30, x: 0 })

    const addEmail = (userData) => {
        console.log("api_signupi")
        api_profilePost(userData, successEmailUpdate, errorEmailUpdate)
        function successEmailUpdate(data) {
            setemailUpdate(data.data);
            setsection(section + 1)
        }
        function errorEmailUpdate(err) {
            console.log(err.response.data.errormessage)
            setemailUpdateError(err.response.data.errormessage)
            //setQuestion(1);
        }
    }

    const validate = (value, regex, type) => {
        let error;
        if (!value) {
            error = errMsgs.requried;
        } else if (!regex.test(value)) {
            error = errMsgs[type];
        } else {
            error = null;
        }
        return error;
    };
    function validateMobile(value) {
        return validate(value, /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/g, "mobile");
    }
    function validateCountry(value) {
        return validate(value, /^[0-9][A-Za-z0-9 -]*$/, "country");
    }
    function validateName(e) {
        const { value, name } = e.target
        let err = validate(
            value,
            /^([a-zA-Z'-]+|[a-zA-Z'-]+\s{1}[a-zA-Z'-]{1,}|[a-zA-Z'-]+\s{1}[a-zA-Z'-]{3,}\s{1}[a-zA-Z'-]{1,})$/,
            "name"
        );
        err = (err === null) ? false : err;
        setErrorForm({ ...errorForm, ...{ [name]: err } });
        console.log(errorForm);
        setEnableNext(err === false ? true : false);
    }
    function validateEmail(e) {
        const { value, name } = e.target
        let err = validate(
            value,
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            "email"
        );
        err = (err === null) ? false : err;
        setErrorForm({ ...errorForm, ...{ [name]: err } });
        console.log(errorForm);
        setEnableNext(err === false ? true : false);
    }
    const handleBackOnSignUpForm = () => {

        if (section === question)
            props.resetState();
        else {
            setsection(section - 1);
            if (section - 1 === 1)
                setEnableNext(true);
        }
    }

    const handleNextOnSignUpForm = () => {
        if (question === 1 && section === 1) {
            if (errorForm.firstname === false && errorForm.lastname === false && errorForm.email === false) {
                console.log(userData_API);
                (userStoredData.email.length <= 0) ? addEmail(userData_API) : setsection(section + 1);
            }
            if (errorForm.firstname === "")
                setErrorForm({ ...errorForm, firstname: errMsgs.requried })
            if (errorForm.lastname === "")
                setErrorForm({ ...errorForm, lastname: errMsgs.requried })
            if (errorForm.email === "")
                setErrorForm({ ...errorForm, email: errMsgs.requried })

        }
        if (section < 11 && section > 1) {
            setsection(section + 1);
            setEnableNext(false);
        }
        if (section === 11) {
            //setsection(null);
            //let temp = { ...userData, ...userData_API };
            //const { firstname, lastname, sex, age, height, weight, dietPref, noWorkouts, willingGym, body_fat, fat, workout } = temp
            if ("email" in userData_API) delete userData_API.email;
            console.log(userData_API)
            props.signUP(userData_API); //SignUp success

            //setShowProjectedProgress(true);
            //console.log(section)
            setsection(null);

        }
    }
    const changeUnit = (unit) => { setUnit(unit) }

    const handleInput = (e) => {
        const { value, name } = e.target;
        setUserData({ ...userData, ...{ [name]: value } });
        setUserData_API({ ...userData_API, ...{ [name]: value } }); ///All the touched section will have data copied to userApiDATA
    }
    // const checkErr = () => {
    //     if (errorForm.firstname === false && errorForm.lastname === false) {
    //         return (true)
    //     }
    //     else return false
    // }

    const handleInputSlider = (obj) => {
        setEnableNext(true);
        console.log(obj.value)
        switch (obj.type) {
            case 'height':
                if (obj.unit === 'ft') {
                    setUserData({ ...userData, ...{ [obj.name]: (obj.value) } });
                    setUserData_API({ ...userData_API, [obj.name]: inchtocm(obj.value), [obj.name + '_in']: obj.value, [obj.name + '_ft']: inchtoft(obj.value) })//passing in inch
                }
                if (obj.unit === 'cm') {
                    setUserData({ ...userData, [obj.name]: (obj.value) });
                    setUserData_API({ ...userData_API, [obj.name]: obj.value, [obj.name + '_ft']: cmtoft(obj.value), [obj.name + '_in']: cmtoinch(obj.value) })//passing in inch
                }
                break;
            case 'weight':
                if (obj.unit === 'kg') {
                    setUserData({ ...userData, [obj.name]: (obj.value) });
                    setUserData_API({ ...userData_API, [obj.name]: kgtolb(obj.value) })//passing in lbs
                }
                if (obj.unit === 'lbs') {
                    setUserData({ ...userData, [obj.name]: (obj.value) });
                    setUserData_API({ ...userData_API, [obj.name]: obj.value })//passing in lbs
                }
                break;
            default:
                setUserData({ ...userData, [obj.name]: obj.value });
                setUserData_API({ ...userData_API, [obj.name]: obj.value });
        }
        //setErrorSlider(null);
        //setErrorForm({ ...errorForm, ...{ [obj.name]: false } });
        //console.log(userData)
        //setEnableNext(true);
        //const getSliderValue=(val,type)=>{setSliderVal(Math.round(val*100)/100);}
        console.log('userdata', userData)
        console.log('userdataAPI', userData_API)
    }
    const restartForm = () => {
        console.log(question)
        setsection(question);
        props.setProjectedProgress(false)
    }
    const completeSignUp = () => {
        props.signUP(userData);
    }
    const setLinearProgressStats = () => { return (((section + 1) / 12) * 100) }

    // const changeCurrentShape = (dragval) => {
    //     let val = currentShape + dragval;
    //     setCurrentShapeImg({ shape: val, x: (-1 * Styles.shapeContainer.width * val) });
    // }
    return (
        <>
            {!props.projectedProgress && section != null && (
                <>
                    <HeaderBar headerName={"Step " + section + "/11"} isVisible leftElement='back' leftEnable={section === 1 ? false : true} leftCB={handleBackOnSignUpForm} rightEnable={enableNext} rightElement='Next' rightCB={handleNextOnSignUpForm} />
                    <Grid style={{ ...Styles.displayView }}>
                        <LinearProgress style={{ height: '4px' }} variant="determinate" value={setLinearProgressStats()} />
                        <Grid container direction='column' style={Styles.gutter} alignItems='center' alignContent='center' justify='center'>
                            {section === 1 &&
                                (<form onSubmit={handleNextOnSignUpForm}>
                                    <Grid item container style={{ ...Styles.marginTop16, ...Styles.marginBottom16 }} direction='column' alignItems='flex-start' justify='center' spacing={4}>
                                        <Grid item container direction='row' alignItems='center' justify='center'>
                                            <Typography variant='body1' >How do we greet you?</Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField autoComplete='off' name="firstname" value={userData.firstname} label="First Name" onBlur={validateName} onChange={handleInput}></TextField>
                                            {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}> {errorForm.firstname}</Typography>}
                                        </Grid>
                                        <Grid item >
                                            <TextField autoComplete='off' name="lastname" value={userData.lastname} label="Last Name" onBlur={validateName} onChange={handleInput}></TextField>
                                            {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}> {errorForm.lastname}</Typography>}
                                        </Grid>
                                        <Grid item >
                                            <TextField autoComplete='off' name="email" disabled={userStoredData.email.length <= 0 ? false : true} value={userData.email} label="Email" onBlur={validateEmail} onChange={handleInput}></TextField>
                                            {<Typography variant="body2" style={{ ...Styles.err, margin: '2px 0px' }}> {errorForm.email}</Typography>}
                                        </Grid>
                                        {emailUpdateError && <AlertSnackbar open={emailUpdateError ? true : false} onClose={() => setemailUpdateError(false)} message={emailUpdateError} type={ALERT.ERROR}>
                                        </AlertSnackbar>}
                                    </Grid></form>)}

                            {section === 2 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='flex-start' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'> <Typography variant='body1'>Whats your Gender?</Typography></Grid>
                                    <Grid item container style={Styles.questionHeight} direction='row' alignItems='center' justify='center'>
                                        <Grid item style={Styles.paperItems}>
                                            <input readOnly hidden id="male" name="sex" value="male" onClick={(e) => { handleInput(e); handleNextOnSignUpForm() }} />
                                            <label htmlFor="male">
                                                <Paper id='paperhover' variant="outlined" style={Styles.genderPaper} >
                                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon > <img alt='Male' style={{ height: '50px', width: '54px' }} src={MaleImg} />
                                                        </Icon></Grid>
                                                        <Grid item > <Typography variant='body1'>Male</Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>
                                        <Grid item  >
                                            <input readOnly hidden id="female" name="sex" value="female" onClick={(e) => { handleInput(e); handleNextOnSignUpForm() }} />
                                            <label htmlFor="female">
                                                <Paper id='paperhover' variant="outlined" style={Styles.genderPaper} >
                                                    <Grid container direction='column' alignItems='center' justify='center'>
                                                        <Grid item><Icon><img alt='Female' style={{ height: '50px', width: '54px' }} src={FemaleImg} />
                                                        </Icon></Grid>
                                                        <Grid item >  <Typography variant='body1'>Female</Typography></Grid></Grid>

                                                </Paper></label>
                                        </Grid>
                                    </Grid>
                                </Grid>)}

                            {section === 3 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{ages.label}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.age} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        <Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='age' type="age" unit='age' initialPosition={ages.defaultValue} min={ages.age.min} max={ages.age.max} stepInBetweenEachInterval={ages.age.step} interval={ages.age.interval}
                                                distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop}  value={handleInputSlider} isTouched={setEnableNext} /> Technotree commented*/}

                                            <Nouislider connect={[true, false]} range={{ min: parseInt(ages.age.min), max: parseInt(ages.age.max) }}
                                                start={ages.defaultValue}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' yr';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' yr', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 1,
                                                    values: [...ageBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches;
                                                        }
                                                    }
                                                }}

                                                onChange={(value) => handleInputSlider({ name: 'age', type: "age", unit: 'age', value: value[0].replace(' yr', '').trim() })}
                                            />


                                        </Grid>
                                        <Grid container direction='column' alignItems='center' justify='center'>
                                            <Typography variant='body2' style={Styles.colorGrey}>{ages.sub1}</Typography>
                                            <Typography variant='body2' style={Styles.colorGrey}>{ages.sub2}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                )}
                            {section === 4 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        {/* <Typography variant='body1'>{height.label}</Typography> */}
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction='row' alignItems='center' justify='center'>
                                            <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{height.ft.unit}</Button>
                                            <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{height.cm.unit}</Button>
                                        </Grid>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={unit === 0 ? (convertNumberToHeightFeetInches(userData.height)) : userData.height} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        {unit === 0 && (<Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='height' type="height" unit={height.ft.unit} min={height.ft.min} max={height.ft.max} stepInBetweenEachInterval={height.ft.step} interval={height.ft.interval}
                                                distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}

                                            <Nouislider connect={[true, false]}
                                                range={{ min: 3 * 12, max: 8 * 12 }} start={60}//value
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        var feet = Math.floor(totalInches / 12);
                                                        var inches = totalInches % 12;
                                                        var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        var inchString = (inches == 0 ? "" : inches + "in ");
                                                        var combinedString = (feetString + inchString).trim();
                                                        return combinedString;
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' in', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{
                                                    mode: 'values',
                                                    values: [36, 48, 60, 72, 84, 96],
                                                    density: 2,
                                                    stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            var feet = Math.floor(totalInches / 12);
                                                            var inches = totalInches % 12;
                                                            return feet + " ft";
                                                        }
                                                    }
                                                }}
                                                onChange={(value) => handleInputSlider({ name: 'height', type: "height", unit: 'ft', value: parseInt(parseInt(value[0].split('ft')[0].replace('ft', '').trim()) * 12) + parseFloat(value[0].includes('in') ? parseInt(value[0].split('ft')[1].replace('in', '').trim()) / 12 : 0) })}
                                            />
                                            {/*    + */}
                                            {/* +  value[0].includes('in')?  parseInt( value[0].split('ft')[1].replace('in', '').trim())/12 :null */}
                                        </Grid>)}

                                        {unit === 1 && (<Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='height' type="height" unit={height.ft.unit} min={height.cm.min} max={height.cm.max} stepInBetweenEachInterval={height.cm.step} interval={height.cm.interval}
                                                distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                                            <Nouislider connect={[true, false]} range={{ min: parseInt(height.cm.min), max: parseInt(height.cm.max) }}
                                                start={ages.defaultValue}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' cm';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' cm', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 1,
                                                    values: [...heightBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches;
                                                        }
                                                    }
                                                }}

                                                onChange={(value) => handleInputSlider({
                                                    name: 'height', type: "height", unit: 'cm', value: parseInt(value[0].replace(' cm', '').trim())
                                                })}
                                            />

                                        </Grid>)}
                                        <Grid container direction='column' alignItems='center' justify='center'>
                                            <Typography variant='body2' style={Styles.colorGrey}>{height.sub1}</Typography>
                                            <Typography variant='body2' style={Styles.colorGrey}>{height.sub2}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                )}
                            {section === 5 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{weight.label}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction='row' alignItems='center' justify='center'>
                                            <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{weight.lbs.unit}</Button>
                                            <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{weight.kg.unit}</Button>
                                        </Grid>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.weight} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        {unit === 0 && (<Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='weight' type="weight" initialPosition={weight.lbs.defaultValue} unit={weight.lbs.unit} min={weight.lbs.min} max={weight.lbs.max} stepInBetweenEachInterval={weight.lbs.step} interval={weight.lbs.interval}
                                                distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                                            <Nouislider connect={[true, false]} range={{ min: parseInt(weight.lbs.min), max: parseInt(weight.lbs.max) }}
                                                start={weight.lbs.defaultValue}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' lbs';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' lbs', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{
                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 1,
                                                    values: [...weightlbsBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 20);
                                                            //var inches = totalInches % 12;
                                                            return totalInches ;
                                                        }
                                                    }
                                                }}

                                                onChange={(value) => handleInputSlider({
                                                    name: 'weight', type: "weight", unit: weight.lbs.unit, value: parseInt(value[0].replace(' lbs', '').trim())
                                                })}
                                            />

                                        </Grid>)}
                                        {unit === 1 && (<Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }}  direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='weight' type="weight" initialPosition={weight.kg.defaultValue} unit={weight.kg.unit} min={weight.kg.min} max={weight.kg.max} stepInBetweenEachInterval={weight.kg.step} interval={weight.kg.interval}
                                                distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                                            <Nouislider connect={[true, false]} 
                                                range={{ min: parseInt(weight.kg.min), max: parseInt(weight.kg.max) }}
                                                start={weight.kg.defaultValue}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' kgs';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' kgs', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{
                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 1,
                                                    values: [...weightkgBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches;
                                                        }
                                                    }
                                                }}

                                                onChange={(value) => handleInputSlider({
                                                    name: 'weight', type: "weight", unit: weight.kg.unit, value: parseInt(value[0].replace(' kg', '').trim())
                                                })}
                                            />


                                        </Grid>)}
                                        <Grid container direction='column' alignItems='center' justify='center'>
                                            <Typography variant='body2' style={Styles.colorGrey}>{weight.sub1}</Typography>
                                            <Typography variant='body2' style={Styles.colorGrey}>{weight.sub2}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                )}
                            {section === 6 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='flex-start' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'> <Typography variant='body1'>{dietPreference.label}</Typography></Grid>
                                    <Grid item container style={Styles.questionHeight} direction='row' alignItems='center' justify='center'>
                                        <Grid xs={8} item style={Styles.paperItems}>
                                            <input readOnly hidden id={dietPreference.veg.value} name="dietPref" value={dietPreference.veg.value} onClick={(e) => { handleInput(e); handleNextOnSignUpForm(); }} />
                                            <label htmlFor={dietPreference.veg.value}>
                                                <Paper id='paperhover' variant="outlined" style={Styles.dietPaper} >
                                                    <Grid container direction='row' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon><img alt='Veg' src={CarrotImage} style={{ height: '80px', width: '80px', padding: '5px' }} /></Icon>
                                                        </Grid>
                                                        <Grid item > <Typography variant='body1'>Vegetarian</Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>
                                        <Grid xs={8} item style={Styles.paperItems}>
                                            <input readOnly hidden id={dietPreference.egg.value} name="dietPref" value={dietPreference.egg.value} onClick={(e) => { handleInput(e); handleNextOnSignUpForm(); }} />
                                            <label htmlFor={dietPreference.egg.value}>
                                                <Paper id='paperhover' variant="outlined" style={Styles.dietPaper} >
                                                    <Grid container direction='row' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon><img alt='Egg' src={EggImage} style={{ height: '80px', width: '80px', padding: '5px' }} /></Icon>
                                                        </Grid>
                                                        <Grid item > <Typography variant='body1'>{dietPreference.egg.label}</Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>
                                        <Grid xs={8} item style={Styles.paperItems}>
                                            <input readOnly hidden id={dietPreference.nonveg.value} name="dietPref" value={dietPreference.nonveg.value} onClick={(e) => { handleInput(e); handleNextOnSignUpForm(); }} />
                                            <label htmlFor={dietPreference.nonveg.value} >
                                                <Paper id='paperhover' variant="outlined" style={Styles.dietPaper} >
                                                    <Grid container direction='row' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon><img alt='Non Veg' src={NonVegImage} style={{ height: '80px', width: '80px', padding: '5px' }} /></Icon>
                                                        </Grid>
                                                        <Grid item > <Typography variant='body1'>{dietPreference.nonveg.label} </Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>

                                    </Grid>
                                </Grid>)}
                            {section === 7 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{workoutlastMonth.label1}</Typography>
                                        <Typography variant='body1'>{workoutlastMonth.label2}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.noWorkouts} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        <Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='noWorkouts' type="days" unit="days" min={workoutlastMonth.workout.min} max={workoutlastMonth.workout.max} initialPosition={workoutlastMonth.workout.defaultValue} stepInBetweenEachInterval={workoutlastMonth.workout.step} interval={workoutlastMonth.workout.interval}
                                                distanceBetweenEachStep={distance * 4} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                                                <Nouislider connect={[true, false]} range={{ min: parseInt(workoutlastMonth.workout.min), max: parseInt(workoutlastMonth.workout.max ) }}
                                                onChange={(value) => handleInputSlider({ name: 'noWorkouts', type: "days", unit: 'days', value: value[0].replace(' day', '').trim() })}
                                                start={parseInt(workoutlastMonth.workout.defaultValue)}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' day';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' day', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 10,
                                                    values: [...workoutBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches;
                                                        }
                                                    }
                                                }}

                                                
                                            />
                                        </Grid>
                                        <Grid container direction='column' style={Styles.gutter} alignItems='center' justify='center'>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{workoutlastMonth.sub1}</Typography></Grid>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{workoutlastMonth.sub2}</Typography></Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                )}

                            {section === 8 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='flex-start' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{workoutplace.label}</Typography></Grid>
                                    <Grid item container style={Styles.questionHeight} direction='row' alignItems='center' justify='center'>
                                        <Grid item style={Styles.paperItems}>
                                            <input readOnly hidden id={workoutplace.home.label} name="willingGym" value={workoutplace.home.value} onClick={(e) => { handleInput(e); handleNextOnSignUpForm(); }} />
                                            <label htmlFor={workoutplace.home.label}>
                                                <Paper id='paperhover' variant="outlined" style={Styles.genderPaper} >
                                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon><img alt='Home' src={HomeImage} style={{ height: '80px', width: '80px', padding: '5px' }} /></Icon>
                                                        </Grid>
                                                        <Grid item > <Typography variant='body1'>{workoutplace.home.label}</Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>
                                        <Grid item style={Styles.paperItems}>
                                            <input readOnly hidden id={workoutplace.gym.label} name="willingGym" value={workoutplace.gym.value} onClick={(e) => { handleInput(e); handleNextOnSignUpForm(); }} />
                                            <label htmlFor={workoutplace.gym.label}>
                                                <Paper id='paperhover' variant="outlined" style={Styles.genderPaper} >
                                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                                        <Grid item><Icon><img alt='Gym' src={GymImage} style={{ height: '80px', width: '80px', padding: '5px' }} /></Icon>
                                                        </Grid>
                                                        <Grid item > <Typography variant='body1'>{workoutplace.gym.label}</Typography></Grid></Grid>
                                                </Paper>
                                            </label>
                                        </Grid>
                                    </Grid>
                                </Grid>)}
                            {section === 9 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{workoutPrepared.label1}</Typography>
                                        <Typography variant='body1'>{workoutPrepared.label2}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.workout} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        <Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='workout' type="days" unit="days" min={workoutPrepared.workout.min} max={workoutPrepared.workout.max} initialPosition={workoutPrepared.workout.defaultValue} stepInBetweenEachInterval={workoutPrepared.workout.step} interval={workoutPrepared.workout.interval}
                                                distanceBetweenEachStep={distance * 5} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
 <Nouislider connect={[true, false]} range={{ min: parseInt(workoutPrepared.workout.min), max: parseInt(workoutPrepared.workout.max ) }}
                                                onChange={(value) => handleInputSlider({ name: 'workout', type: "days", unit: 'days', value: value[0].replace(' day', '').trim() })}
                                                start={parseInt(workoutPrepared.workout.defaultValue)}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' day';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' day', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 20,
                                                    values: [3,4,5,6,7],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches;
                                                        }
                                                    }
                                                }}

                                    ></Nouislider>
                                        </Grid>
                                        <Grid container direction='column' style={Styles.gutter} alignItems='center' justify='center'>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{workoutPrepared.sub1}</Typography></Grid>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{workoutPrepared.sub2}</Typography></Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                )}

                            {section === 10 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{currentShape.label}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.body_fat} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        <Grid container item style={{ display: 'block', padding:'20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='body_fat' type="days" unit="%" min={currentShape.shape.min} max={currentShape.shape.max} initialPosition={currentShape.shape.defaultValue} stepInBetweenEachInterval={currentShape.shape.step} interval={currentShape.shape.interval}
                                                distanceBetweenEachStep={distance * 2} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
<Nouislider connect={[true, false]} range={{ min: parseInt(currentShape.shape.min), max: parseInt(currentShape.shape.max ) }}
                                                onChange={(value) => handleInputSlider({ name: 'body_fat', type: "days", unit: '%', value: value[0].replace(' %', '').trim() })}
                                                start={parseInt(currentShape.shape.defaultValue)}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' %';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' %', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 2.5,
                                                    values: [...currentShapeBlock],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches ;
                                                        }
                                                    }
                                                }}

                                    ></Nouislider>

                                        </Grid>
                                        {/* 
                                        <Grid style={Styles.shapeContainer} item container direction="column" alignItems='center' justify='center'>

                                        </Grid>
                                        
                                         */}

                                        <Grid container direction='column' style={Styles.gutter} alignItems='center' justify='center'>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{currentShape.sub1}</Typography></Grid>
                                            <Grid item><Typography variant='body2' style={{ ...Styles.colorGrey, opacity: '1' }}>{currentShape.sub2}</Typography></Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>)}

                            {section === 11 &&
                                (<Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} >
                                    <Grid item container direction='row' alignItems='center' justify='center'>
                                        <Typography variant='body1'>{targetShape.label}</Typography>
                                    </Grid>
                                    <Grid container direction="column" alignItems='center' justify='center' style={Styles.questionHeight}>
                                        <Grid item container direction="column" alignItems='center' justify='center'>
                                            {/* <Chip color="primary" style={Styles.chipStyles} label={userData.fat} />
                                            <ArrowDropDownIcon style={Styles.arrowDown} /> */}
                                        </Grid>
                                        <Grid container item style={{ display: 'block', padding: '20px 20px 40px 20px' }} direction='column' align='center' justify='center'>
                                            {/* <DraggableSlider name='fat' type="days" unit="%" initialPosition={targetShape.shape.defaultValue} min={targetShape.shape.min} max={targetShape.shape.max} stepInBetweenEachInterval={targetShape.shape.step} interval={targetShape.shape.interval}
                                                distanceBetweenEachStep={distance * 2} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                                            <Nouislider connect={[true, false]} range={{ min: parseInt(targetShape.shape.min), max: parseInt(targetShape.shape.max ) }}
                                                onChange={(value) => handleInputSlider({ name: 'fat', type: "days", unit: '%', value: value[0].replace(' %', '').trim() })}
                                                start={parseInt(targetShape.shape.defaultValue)}
                                                step={1}
                                                format=
                                                {{
                                                    to: function (value) {
                                                        var totalInches = Math.round(+value);
                                                        //var feet = Math.floor(totalInches / 12);
                                                        //var inches = totalInches % 12;
                                                        //var feetString = (feet == 0 ? "" : feet + "ft ");
                                                        //var inchString = (inches == 0 ? "" : inches + "in ");
                                                        //var combinedString = (feetString + inchString).trim();
                                                        return totalInches + ' %';
                                                    },
                                                    from: function (value) {
                                                        return value.replace(' %', '');
                                                    }
                                                }}
                                                tooltips={true}
                                                pips={{

                                                    mode: 'values',
                                                    stepped: true,
                                                    density: 2.5,
                                                    values: [5,10,15,20,25],//[36, 48, 60, 72, 84, 96],
                                                    // mode: 'values',
                                                    // values: [36, 48, 60, 72, 84, 96],
                                                    // density: 2,
                                                    // stepped: true,
                                                    format: {
                                                        to: function (value) {
                                                            var totalInches = Math.round(+value);
                                                            //var feet = Math.floor(totalInches % 10==);
                                                            //var inches = totalInches % 12;
                                                            return totalInches ;
                                                        }
                                                    }
                                                }}

                                    ></Nouislider>



                                        </Grid>
                                        <Grid container direction='column' style={Styles.gutter} alignItems='center' justify='center'>
                                            <Grid item><Typography variant='body2' style={Styles.colorGrey}>{targetShape.sub1}</Typography></Grid>
                                            <Grid item><Typography variant='body2' style={{ ...Styles.colorGrey, opacity: '1' }}>{targetShape.sub2}</Typography></Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>)}

                        </Grid>
                    </Grid>
                </>)}
            {props.projectedProgress && <ProjectedProgress restart={restartForm} {...props} />}
            {props.usersignupError && (
                <AlertSnackbar open={props.usersignupError} onClose={restartForm} message="There was a glitch updating your details.Please try again" type={ALERT.ERROR}>
                </AlertSnackbar>
            )}
        </>)



}