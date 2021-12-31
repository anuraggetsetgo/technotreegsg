import React, { useState, useEffect } from 'react'
import { Button, Dialog, Divider, Grid, IconButton, makeStyles, Slider, Typography, withStyles } from '@material-ui/core'
import Styles from '../../app-style'
//import _keys from 'lodash/keys';
//import _values from 'lodash/values';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
//import MealCard from './Meal-Card';
import { Slide } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import IMG_Meal from '../../img/meal.png';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Paper } from '@material-ui/core';
//import MealStyles from './Meal-Style'
import { ChevronLeft } from '@material-ui/icons';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    calorieContainer: { marginBottom: theme.spacing(1), paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1), borderBottom: '1px solid #1b1b1b' },
    macrosContainer: { listStyle: 'none', margin: 0, padding: 0 },
    macros: { padding: `${theme.spacing(1)} 0` },
    value: { textAlign: 'center' },
    dietContainer: { margin: '44px 0 12px 0', maxWidth:'100%' },
    //dietPlan:{height: `${mobile?document.documentElement.offsetHeight-800:document.documentElement.offsetHeight-340}px`, marginBottom: `${mobile?'40px':'10px'}`},
    dialogPaper: {
        backgroundColor: "#eeeeee",
    },
    card: {
        //borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: '100%',
        minHeight: 200,
        marginBottom: '1em',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '65%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left: '0',
        width: '100%',
        display: 'inline-flex',
        padding: '5px 8px',

    },
    media: {
        position: 'absolute',
        zIndex: 1,
        //bottom: 0,
        width: '100%',
        height: '100%',
        display: 'inline-flex'
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        maxHeight: '44px',
        minHeight: Styles.headerHeight.height,
    },
    slider:{
        padding:'16px 0',
        '&:thumb' :{
            thumbColorPrimary:{
                width:'16px',height:'16px'},
        },
    }

}))

const CustomSlider = withStyles(theme => ({
    padding:'16px 0',
    thumb: {
      height: '24px',
      width: '24px',
      marginTop:'-10px'
    },
  }))(Slider);
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function MacroSlider(props) {
    const classes = useStyles();
    const { calories, carbs, protein, fats, generatedDiet, generatedDietErr } = props
    console.log(props)
    const [carbSlider, setcarbSlider] = useState(carbs.actual)
    const [fatSlider, setfatSlider] = useState(fats.actual)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        //props.hide(false);
    };
    const handleOpen = () => {
        props.dietgen(protein, fatSlider, carbSlider);
        setOpen(true);
    };


    // const [activeIndexes, setActiveIndex] = useState({
    //     breakfast: 0,
    //     lunch: 0,
    //     snack: 0,
    //     dinner: 0,
    //     beforeSleep: 0
    // })
    function formatVal(qnty, unit) {
        unit = qnty ? unit : null;       //Force Default in switch as  0 ANV
        switch (unit) {
            case 'scoop':
            case 'piece':
            case 'serving':
            case 'large':
            case 'cup':
                return Math.round(qnty);
                break;
            default:
                return (qnty ? (Math.round(qnty / 10) * 10) : 0); //Return 0 if quntity is 0 //ANV

        }
    }
    // function swapFood(key) {
    //     let keys = Object.assign(activeIndexes);
    //     const totalMeals = generatedDiet[key].length - 1;
    //     let currentKey = keys[key];
    //     currentKey = (currentKey === totalMeals) ? 0 : currentKey + 1;
    //     keys[key] = currentKey;
    //     setActiveIndex({ ...activeIndexes, ...{ activeIndexes: keys } });
    // }
    const handleChangeCarbs = (e, newval) => {
        setcarbSlider(newval)
        props.calculateCarbsnFats(protein, newval);
    }
    const handleChangeFats = (e, newval) => {
        setfatSlider(newval)
        props.calculateCarbsnFats(protein, null, newval);
    }
    const handleViewDiet = () => {
        handleOpen();
    }
    useEffect(() => {
        setcarbSlider(carbs.actual);
        setfatSlider(fats.actual)
    })
    function buildDiet_New() {
        const diet = generatedDiet;
        //console.table(diet);
        const mealData = Object.values(diet);
        //console.log(mealData);
        //const mealArr = _values(diet);
        //const keys = _keys(generatedDiet);
        return mealData.map((meals, key) => <GeneratedDietMealHeader key={key} meals={meals} />);
    }
    // function buildDiet() {
    //     const diet = generatedDiet;

    //     const mealArr = _values(diet);
    //     const keys = _keys(generatedDiet);

    //     return (mealArr.map((meal, indx) => {
    //         let currentMeal = meal[activeIndexes[keys[indx]]];
    //         if (currentMeal && currentMeal.meal) {
    //             let currentMeal_activeDiet = currentMeal.meal;
    //             return (<Grid container direction="column" alignItems="stretch" justify="center" key={keys[indx]}>
    //                 <Grid item>
    //                     <div style={{ padding: '5px', borderBottom: '1px solid #1b1b1b', borderTop: '1px solid #1b1b1b' }}>
    //                         <div style={{ display: 'inline-block', textAlign: 'left', width: '80%' }}>{currentMeal.name}</div>
    //                         <div style={{ display: 'inline-block', textAlign: 'right', width: '18%' }}>
    //                             <IconButton color="primary" onClick={() => swapFood(keys[indx])} aria-label="Close">
    //                                 <SwapHorizIcon />
    //                             </IconButton>
    //                         </div>
    //                     </div>
    //                 </Grid>
    //                 <Grid item>
    //                     <div style={{ margin: "10px 0 30px" }}>
    //                         {currentMeal_activeDiet.map((item, indx_child) => {
    //                             return (
    //                                 <div key={`${indx_child}-${currentMeal_activeDiet}`}>
    //                                     <div style={{ width: '50%', display: 'inline-block', textAlign: 'right' }}>{item.name}</div>
    //                                     <div style={{ marginLeft: '1%', width: '40%', display: 'inline-block', textAlign: 'left' }}>{formatVal(item.actualQnty, item.unit)} {item.unit}</div>
    //                                 </div>
    //                             )
    //                         })}
    //                     </div>
    //                 </Grid>
    //             </Grid>
    //             )
    //         }
    //     }))
    // }

    const MealCard = () => {
        return (
            <Card className={classes.card} >
                <CardHeader avatar={<Avatar aria-label="Recipe" >{props.userInfo.firstname.charAt(0)}</Avatar>} title={'Sample Diet'}
                    subheader={'Suggested sample meal plan'} />
                <CardMedia className={classes.media} image={IMG_Meal} title={'S'} ><Paper /></CardMedia>
                <CardContent style={{ paddingBottom: '5px' }} className={classes.content}>
                    <Typography variant="body1" color='secondary' >
                        Your customized diet plan,click on view
            </Typography>
                    <Button className='bigButton' color="primary" variant="contained" aria-label="View diet" onClick={handleOpen}>View</Button>

                </CardContent>
            </Card>)
    }
    const GeneratedDietMealHeader = ({ meals }) => {
        const [optionNo, setOptionNo] = useState(0);
        return (
            <>
                <Grid item container direction="" style={{
                    boxShadow:
                        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                    paddingTop: "2vh",
                    margin: "16px 0",
                    borderRadius: "5px",
                    maxWidth: "100%",
                    background: "white",
                }}
                >
                    <Grid container item direction="row" xs={12} style={{ padding: "0 2vw" }} alignItems="center" justify="center">
                        <Grid item xs={10}>
                            <Typography variant="body1">{meals[optionNo].name}</Typography>
                        </Grid>
                        <Grid item xs={2} container direction="column" alignItems="flex-end">
                            <IconButton color="primary" onClick={() => (optionNo === meals.length - 1) ? setOptionNo(0) : setOptionNo(optionNo + 1)}
                                aria-label="Close">
                                <SwapHorizIcon />
                            </IconButton>
                            {/*  <Typography>
                    <small>Calories</small>
                  </Typography> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <GeneratedDietMealTable meal={meals[optionNo].meal} />
                    </Grid>
                </Grid>
            </>
        );
    };
    const GeneratedDietMealTable = ({ meal }) => {
        return (
            <>
                <Grid item container direction="column" xs={12}
                    style={{ padding: "16px 0", borderTop: "1px solid rgb(160, 157, 157)", display: "inline-block", }}>
                    {" "}
                    {meal.map(({ name, actualQnty, unit }, indx) => (
                        <Grid key={indx} item container direction="row" justify="space-between" alignItems="center" xs={12}
                            style={{ padding: "0 5vw 3vh 5vw" }}         >
                            <Grid item>
                                <Typography variant="body2">{name}</Typography>
                            </Grid>
                            <Grid item>{console.log(name, actualQnty)}
                                <Typography color="primary" variant="body2">{`${formatVal(actualQnty, unit)} ${unit}`}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    };

    return (
        <>
            <MealCard />
            {generatedDiet && (
                <Dialog classes={{ paper: classes.dialogPaper }} style={{ background: "black" }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.toolbar} style={Styles.header} position="fixed" size="medium" color='secondary'>
                        <Toolbar className={classes.toolbar}>
                            <Grid container direction='row' alignItems='center' justify='center'>
                                <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" >
                                        <ChevronLeft />
                                    </IconButton>
                                </Grid>
                                <Grid item container xs={8} alignItems="center" justify='center'>
                                    <Grid item>
                                    <Typography className={classes.title} style={Styles.textGreyO5} variant="body1">Sample Diet</Typography>
                                </Grid>
                                </Grid>
                                <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={Styles.gutter12}>
                        <Grid container alignItems='center' justify='center'>
                            <Grid item className={classes.dietContainer}>
                                {buildDiet_New()}
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            )}
            {generatedDietErr && (
                <Grid container alignItems='center' justify='center'>
                    <Typography variant='body2' style={Styles.err}>Oh!!! no there was some error creating your diet.</Typography>
                    <Typography variant='body2' style={Styles.err}>Please try again after sometime</Typography>
                </Grid>
            )}
            <Grid container direction='column'>
                <Grid item container className={classes.calorieContainer} direction='column' alignItems='center' justify='center' >
                    <Grid item><Typography variant='body1'>Customize your macros</Typography></Grid>
                    <Grid item><Typography variant='h4'>{calories}</Typography></Grid>
                    <Grid item><Typography variant='body2'>calories</Typography></Grid>
                </Grid>
                <ul className={classes.macrosContainer}>
                    <li className={classes.macros}>
                        <Grid container direction="row" alignItems="center" justify="flex-start">
                            <Grid item xs={3}>
                                <Typography>{protein} gm</Typography>
                                <Typography><small>Protein</small></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant='body2'>This quantity has been prescribed based on your goals and preferences.</Typography>
                            </Grid>
                        </Grid>
                    </li>
                    <Divider style={Styles.divider} />
                    <li className={classes.macros}>
                        <Grid container direction="row" alignItems="center" justify="flex-start">
                            <Grid item xs={3}>
                                <Typography>{carbs.actual} gm</Typography>
                                <Typography><small>Carbs</small></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <CustomSlider  className={classes.slider} min={carbs.min} max={carbs.max} value={carbSlider} onChange={handleChangeCarbs}
                                />
                                <Typography className={classes.value} variant='body2' color='primary'>{carbs.actual}</Typography>
                            </Grid>
                        </Grid>
                    </li>
                    <Divider style={Styles.divider} />
                    <li className={classes.macros}>
                        <Grid container direction="row" alignItems="center" justify="flex-start">
                            <Grid item xs={3}>
                                <Typography>{fats.actual} gm</Typography>
                                <Typography><small>Fats</small></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <CustomSlider  className={classes.slider} min={fats.min} max={fats.max} value={fatSlider} steps={1} onChange={handleChangeFats} />
                                <Typography className={classes.value} variant='body2' color='primary'>{fats.actual}</Typography>
                            </Grid>
                        </Grid>
                    </li>
                    <Divider style={Styles.divider} />
                </ul>
                <Grid item container direction='column' alignItems='center' justify='center'>
                    <Grid item>
                    <Typography variant='body2' style={Styles.textGreyO5}>Drag the slider to adjust your macros</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Button className="bigButton." style={Styles.width100} variant="contained" color="primary" onClick={handleViewDiet}>Generate Diet</Button>
                    </Grid >
                </Grid>

            </Grid>
        </>
    )
}