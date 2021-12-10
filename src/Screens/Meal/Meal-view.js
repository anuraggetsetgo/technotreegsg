import React from 'react';
import {  Grid, Typography, makeStyles, useTheme } from '@material-ui/core';
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from './Meal-Style'
import { useState } from 'react';
import MealCard from './Meal-Card'
import UserDietGenerator from '../../Container/UserDietGenerator';
import { AppBar, Box, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { colors } from '../../Utils/Services'
import MealPlaceHolder from '../PlaceHolder/PlaceHolder'
const coachWillUploadDiet = ["Your coach will update your diet real soon!", "Check your archive for older diets"]
const noArchiveDiets = ["You dont have any diets in the past. ", "Check the Active section"]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box px={2} py={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    textColorSecondary:{
        color: colors.secondary,
        selected:{color:colors.secondary}
    },
}));
export default function Meal(props) {
    const classes = useStyles();
    const theme = useTheme();
    const tabs = [{ label: "ACTIVE DIET", value: 0 },
                { label: "ARCHIVE DIET", value: 1 },
            ]
    //{ active: 0, archive: 1 }

    const { userInfo, activeDiet, otherDiet, calories, calculateDiet, trainerUploadPending } = props;
    console.log(props);
    const [section, setsection] = useState(tabs[0].value);
    //const [value, setValue] = React.useState(0);
    //const [sampleDiet, setsampleDiet] = useState(true)
    //const [currentDisplayDiet, setCurrentDisplayDiet] = useState(false); //Check user registred of ask to complet profile
    /// const showDiet = (diet) => { setCurrentDisplayDiet(diet); }
    const handleChange = (event, newValue) => {
        setsection(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setsection(index);
    // };
    return (
        <>
            <HeaderBar isVisible leftEnable leftElement='back' headerName={"Meals"} settings={true} />
            <Grid style={{...Styles.displayView}}>
                <Grid>
                <AppBar position="static" color="primary">
                    <Tabs className={classes.textColorSecondary} value={section}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        //scrollButtons="auto"
                        //variant="scrollable"

                    >
                        {tabs.map((tab, index) => (<Tab key={tab.label+index} style={Styles.whiteText} label={tab.label} {...a11yProps(tab.value)} />))
                        }
                    </Tabs>
                </AppBar></Grid>
            {/* <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={section} onChangeIndex={handleChangeIndex}> */}
                <TabPanel name='active' value={section} index={tabs[0].value} >
                    {props.isloading && <MealPlaceHolder card={true} slider={true}/>}
                {trainerUploadPending && !activeDiet && (
                        <Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center'>
                            <Grid item container direction='row' alignItems='center' justify='center'>
                                <Typography className='smallscreen' variant='body1' >{coachWillUploadDiet[0]}</Typography>
                                <Typography className='smallscreen' variant='body1' >{coachWillUploadDiet[1]}</Typography>
                            </Grid>
                        </Grid>
                    )}
                     { !trainerUploadPending && activeDiet && (
                        <Grid item container direction='column'>
                            {/* <Typography variant='body1' >"show active diet component"</Typography> */}
                            {activeDiet.map((diets, index) => (
                                <MealCard diet={diets} key={index} />
                            ))}
                        </Grid>
                    )}
                            { calculateDiet && calories && (
                        <Grid item container direction='column' alignItems='center' justify='center'>
                            <Grid item container direction='row' alignItems='center' justify='center'>
                                {/* <Typography variant='body1' >"show active calculate diet component "</Typography> */}
                                <UserDietGenerator userInfo={userInfo} calories={props.calories} />

                            </Grid>
                        </Grid>
                    )}
                </TabPanel>
                <TabPanel name='archive' value={section} index={tabs[1].value}>
                {props.isloading && <Grid item container direction='column'alignItems='center' justify='center'>
                    <MealPlaceHolder card={true}/>
                    <MealPlaceHolder card={true} />
                    <MealPlaceHolder card={true} />
                    </Grid>}
                { otherDiet && (
                        <Grid item container direction='column' alignItems='center' justify='center'>
                            <Grid item container direction='column'>
                                {/* <Typography variant='body1' >"show archive  diet component"</Typography> */}
                                {otherDiet.map((diets, index) => (
                                    <>
                                        <MealCard diet={diets} key={index} />
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    )}

                    { !otherDiet && (
                        <Grid item container direction='column' alignItems='center' justify='center'>
                            <Grid item container direction='row' alignItems='center' justify='center'>
                                <Typography className='smallscreen' variant='body1' >{noArchiveDiets[0]}</Typography>
                                <Typography className='smallscreen' variant='body1' >{noArchiveDiets[1]}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </TabPanel>
            {/* </SwipeableViews> */}
           <Grid></Grid></Grid>
        </>
    )

}

// <Grid style={Styles.displayView}>
// <Grid container direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter }} justify='space-evenly' alignItems='center'>
//     <Grid item >
//         <Typography className='colorGreyO5' variant='body1' onClick={() => setsection(tabs.active)} style={section == tabs.active ? { ...Styles.colorPrimary, ...Styles.labelSelected } : null}>Active Diets</Typography>
//     </Grid>
//     <Divider className='colorGreyO5' style={{ height: '100%', opacity: '0.5' }} ></Divider>
//     <Grid item >
//         <Typography className='colorGreyO5' variant='body1' onClick={() => setsection(tabs.archive)} style={section == tabs.archive ? { ...Styles.colorPrimary, ...Styles.labelSelected } : null}>Archive Diets</Typography>
//     </Grid>
// </Grid>
// <Grid container style={Styles.gutter} direction='column' justify='center' alignContent='center'>
//     {section === tabs.active && trainerUploadPending && !activeDiet && (
//         <Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center'>
//             <Grid item container direction='row' alignItems='center' justify='center'>
//                 <Typography className='smallscreen' variant='body1' >{coachWillUploadDiet[0]}</Typography>
//                 <Typography className='smallscreen' variant='body1' >{coachWillUploadDiet[1]}</Typography>
//             </Grid>
//         </Grid>
//     )}


//     {section === tabs.active && !trainerUploadPending && activeDiet && (
//         <Grid item container direction='column' alignItems='center' justify='center'>
//             <Grid item container direction='row' alignItems='center' justify='center'>
//                 {/* <Typography variant='body1' >"show active diet component"</Typography> */}
//                 {activeDiet.map((diets, index) => (
//                     <>
//                         <MealCard diet={diets} key={index} />
//                     </>
//                 ))}
//             </Grid>
//         </Grid>
//     )}

//     {section === tabs.active && calculateDiet && calories && (
//         <Grid item container direction='column' alignItems='center' justify='center'>
//             <Grid item container direction='row' alignItems='center' justify='center'>
//                 {/* <Typography variant='body1' >"show active calculate diet component "</Typography> */}
//                 <UserDietGenerator userInfo={userInfo} calories={props.calories} />

//             </Grid>
//         </Grid>
//     )}

//     {section === tabs.archive && otherDiet && (
//         <Grid item container direction='column' alignItems='center' justify='center'>
//             <Grid item container direction='row' alignItems='center' justify='center'>
//                 {/* <Typography variant='body1' >"show archive  diet component"</Typography> */}
//                 {otherDiet.map((diets, index) => (
//                     <>
//                         <MealCard diet={diets} key={index} />
//                     </>
//                 ))}
//             </Grid>
//         </Grid>
//     )}

//     {section === tabs.archive && !otherDiet && (
//         <Grid item container direction='column' alignItems='center' justify='center'>
//             <Grid item container direction='row' alignItems='center' justify='center'>
//                 <Typography className='smallscreen' variant='body1' >{noArchiveDiets[0]}</Typography>
//                 <Typography className='smallscreen' variant='body1' >{noArchiveDiets[1]}</Typography>
//             </Grid>
//         </Grid>
//     )}
// </Grid>
// </Grid>
