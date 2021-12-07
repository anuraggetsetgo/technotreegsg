import React from "react";
import {
  Accordion, AccordionDetails, AccordionSummary, Grid, Typography,
  Dialog, DialogContent, AppBar, Toolbar, IconButton, makeStyles, useTheme,
} from "@material-ui/core";
import Styles from "./Meal-Style";
import { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { reStructureDiet } from "../../Container/Meal";
import { ChevronLeft } from "@material-ui/icons/";
import Slide from "@material-ui/core/Slide";
import { Box, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Divider } from "@material-ui/core";
import NotesIcon from '@material-ui/icons/Notes';
import Style from '../../app-style';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (<Box p={0}>
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 20,
  },
  meals: {
    padding: 0,
  },
  foodTable: { padding: "8px 0 0 0" },
  accordionRoot: {
    padding: '0px',
  },
  accordionSummary: {
    padding: "0px",
    minHeight: '32px !important',
    maxHeight: '32px !important',
  },
  dialogPaper: {
    backgroundColor: "#eeeeee",
  },
  dialogContent: { marginTop: Style.headerHeight.height, padding: '0' },
  notesAccordionSummary: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '24px !important',
    maxHeight: '30px  !important',
  },
  mealName: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    maxHeight: '44px',
    minHeight: Style.headerHeight.height,
  },
  mealTableContainer: {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    paddingTop: "2vh",
    margin: "0 0 16px 0",
    borderRadius: "5px",
    width: "95vw",
    background: "white",
  }
}));

var dropDown = {
  transform: "rotate(-180deg)",
};


/* Outside */
const UserMealTableHeader = ({ meal, key }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item container key={key + meal.mealName} direction="column" className={classes.mealTableContainer} alignItems="center" justify="center">
        <Grid container item direction="row" xs={12} className={classes.mealName} alignItems="center" justify="center">
          <Grid item xs={8}>
            <Typography variant="subtitle1">{meal.mealName}</Typography>
          </Grid>
          <Grid item xs={4} container direction="column" alignItems="flex-end">
            <Typography>{meal.totalFoodData[3].values || 0}</Typography>
            <Typography><small>Calories</small></Typography>
          </Grid>
        </Grid>
        <Grid item><Divider style={{ ...Styles.divider, opacity: '0.8', margin: '0px 0px 0px 10vw', width: '84vw' }}></Divider></Grid>
        <Grid item container alignItems="center" justify="center">
          <Grid item xs={12}>
            <UserMealTableData key={key + meal.mealName} foodType={meal.foodType} totalFoodData={meal.totalFoodData} notes={meal.notes} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
/* inside accord */
const UserMealTableData = ({ totalFoodData, foodType, notes, key }) => {
  const [ref, setRef] = useState(1); //Force Render
  const [expand, setExpand] = useState(true);
  const classes = useStyles();
  return (
    <>
      <Accordion key={key} style={{ boxShadow: "none" }}
        onChange={() => { expand === true ? setExpand(false) : setExpand(true); }} expanded={expand}>
        <AccordionSummary classes={{ root: classes.accordionSummary, }}
          style={{ backgroundColor: ref === 0 ? "#eeeeee" : "" }}
          //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => {
            if (ref === 0) {
              dropDown = { transform: "rotate(-180deg)" };
            } else {
              dropDown = { transform: "rotate(0deg)" };
            }
            setRef(ref === 0 ? 1 : 0);
          }}
        >
          <Grid container item xs={12} direction="row" alignItems="center" justify="center">
            {totalFoodData.map((foodProps, key) => {
              return key !== 3 ? (
                <Grid item container key={key} xs={3} direction="column" alignItems="flex-end" justify="flex-end">
                  <Grid item>
                    <Typography variant="body2">{foodProps.values}</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid item container xs={3} direction="column" alignItems="flex-end" justify="center" style={{ paddingRight: "16px" }}>
                  <Grid item style={dropDown}>
                    <ExpandMoreIcon />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionRoot }}>
          <Grid container direction='column' alignItems='center' justify='center'>
            <Grid item container direction="column" justify='flex-start' alignItems='center'>
              {foodType.map(({ foodName, foodData, foodQuantity }, key) => (
                <Grid key={key + foodName} item container direction="column" alignItems='center' justify='center'
                  style={{ padding: "0 0", display: "inline-block" }}>
                  <Divider style={{ ...Styles.divider, opacity: '0.8' }}></Divider>
                  <Grid item xs={12} container direction="row" justify="space-between" alignItems="center" style={{ padding: "0px 4vw 1vh 6vw" }}>
                    <Grid xs={9} item style={{ marginTop: '4px' }} >
                      <Typography variant="body1">{foodName}</Typography>
                      <Typography variant="body2" color="primary">{`${foodQuantity}`}</Typography>
                    </Grid>
                    <Grid xs={3} item container alignItems='center' justify="flex-end">
                      <Typography variant="body2"> {`${foodData[3].values} kcals`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} direction="row" alignItems="center" justify="center" >
                    {foodData.map((foodProps, indx) => {
                      return indx !== 3 ? (
                        <Grid item
                          key={indx}
                          xs={3}
                          container
                          direction="column"
                          alignItems="flex-end"
                          justify="flex-end"
                        >
                          <Grid item style={{ marginBottom: '4px' }}>
                            <Typography variant="body2" style={Styles.greyText}>
                              {foodProps.values}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid
                          item
                          key={indx}
                          xs={3}
                          container
                          direction="column"
                          alignItems="flex-end"
                          justify="flex-end"
                        >
                          <Grid item>
                            <Typography variant="body2"></Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Comments Accordion section*/}
            <Grid item container direction="column" justify="flex-start" alignItems="center">
              <Accordion defaultExpanded style={{ width: "100%" }}>
                <AccordionSummary className={classes.notesAccordionSummary}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<ExpandMoreIcon />}
                //style={{ backgroundColor: "#9fdbec" }}
                >
                  <Grid item xs={12}>
                    {" "}
                    <Typography variant="body2" color="primary">
                      <NotesIcon></NotesIcon>
                    </Typography>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails classes={{ root: classes.accordionRoot }}>
                  <Grid item xs={12} style={{ padding: "2vh 5vw" }}>
                    {" "}
                    <Typography variant="body2" style={Styles.greyText}>{notes}</Typography>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default function UserMealDisplay(props) {
  const [open, setOpen] = React.useState(true);
  //const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => {
    setOpen(false);
    props.hide(false);
  };
  const diet = reStructureDiet(props.diet);
  console.log(diet);
  const mealData = [];//   Convert Diet Object to Array
  const dataConvert = Object.values(diet);
  // Mapping on dataConvert
  dataConvert.map((mealValues, key) => {
    mealData.push({
      day: `day${key + 1}`,
      mealType: mealValues.meals.map((val, indx) => {
        let label = val.label;
        let foods = val.foods ? val.foods : [];
        let totalMealF = 0;
        let totalMealC = 0;
        let totalMealP = 0;
        let totalMealcals = val.totalMealcals ? parseInt(val.totalMealcals) : "";
        //console.log(label, foods, totalMealcals, val);
        return {
          mealName: label,
          foodType: foods.map(({ name, actualCal, cal, carbs, fat, protein, actualQnty, unit }) => {

            totalMealP = Number(totalMealP) + Number(protein * (unit === 'gms' ||unit === 'ml' ? (actualQnty * 0.01) : actualQnty));
            totalMealC = Number(totalMealC) + Number(carbs * (unit === 'gms'||unit === 'ml' ? (actualQnty * 0.01) : actualQnty));
            totalMealF = Number(totalMealF) + Number(fat * (unit === 'gms' ||unit === 'ml'? (actualQnty * 0.01) : actualQnty));
            return {
              foodName: name,
              foodData: [
                {
                  name: "protein",
                  values: (protein * (unit === 'gms' ||unit === 'ml'? (actualQnty * 0.01) : actualQnty)).toFixed(2),
                },
                {
                  name: "carbs",
                  values: (carbs * (unit === 'gms'||unit === 'ml' ? (actualQnty * 0.01) : actualQnty)).toFixed(2),
                },
                {
                  name: "fat",
                  values: (fat * (unit === 'gms' ||unit === 'ml'? (actualQnty * 0.01) : actualQnty)).toFixed(2),
                },
                {
                  name: "calories",
                  values: parseInt(actualCal),
                },
              ],
              foodQuantity: `${actualQnty}${unit}`,
            };
          }
          ),
          notes: val.note,
          totalFoodData: [
            {
              name: "protein",
              values: totalMealP.toFixed(2),
            },
            {
              name: "carbs",
              values: totalMealC.toFixed(2),
            },
            {
              name: "fat",
              values: totalMealF.toFixed(2),
            },
            {
              name: "calories",
              values: totalMealcals,
            },
          ],
        };
      }),
      totalFoodData: [
        {
          name: "Prot",
          values: parseInt(
            mealValues.header.actualP ? mealValues.header.actualP : 0
          ),
        },
        {
          name: "Carbs",
          values: parseInt(
            mealValues.header.actualC ? mealValues.header.actualC : 0
          ),
        },
        {
          name: "Fat",
          values: parseInt(
            mealValues.header.actualF ? mealValues.header.actualF : 0
          ),
        },
        {
          name: "Cals",
          values: parseInt(
            mealValues.header.actualCal ? mealValues.header.actualCal : 0
          ),
        },
      ],
    });
    return 0;//warning
  });
  const UserMealTable = () => {
    const [mealDay, setMealDay] = useState(0);
    const theme = useTheme();
    const handleChange = (event, newValue) => {
      setMealDay(newValue);
    };
    const handleChangeIndex = (index) => {
      setMealDay(index);
    };
    return (
      <>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} container direction='row' justify="center" alignItems="center"  >
            <AppBar position="static" color="primary">
              <Tabs value={mealDay}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {mealData.map(({ day }, index) => (<Tab style={Styles.whiteText} label={day} {...a11yProps(index)} />))}
              </Tabs>
            </AppBar></Grid>
          {/* <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={mealDay} onChangeIndex={handleChangeIndex}> */}
          {mealData.map((day, index) =>
          (<TabPanel value={mealDay} index={index} dir={theme.direction}>
            <Grid xs={12} container item direction="row" alignItems="center" justify="center" style={{ padding: " 2vh 2vw" }}>
              {mealData[mealDay].totalFoodData.map(({ name, values }, key) => (
                <Grid item xs={3} key={key} container direction="column" alignItems="flex-end" justify="flex-end">
                  <Grid item>
                    <Typography style={{ fontWeight: key === 3 ? "bold" : "", ...Styles.textGreyO5, }}>
                      {name}(g)
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{values}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} container direction="column" alignItems="center" justify="center">
              {mealData[mealDay].mealType.map((meal, key) => (
                <UserMealTableHeader key={key} meal={meal} />
              ))}
            </Grid>
          </TabPanel>))}
          {/* </SwipeableViews> */}
        </Grid>
      </>
    );
  };

  const classes = useStyles();

  //Actual UI BEGINS FROM HERE
  return (
    <>
      <Dialog classes={{ paper: classes.dialogPaper }} style={{ background: "black" }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.toolbar} style={Style.header} position="fixed" size="medium" color='secondary'>
          <Toolbar className={classes.toolbar}>
            <Grid container direction='row' alignItems='center' justify='center'>
              <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" >
                  <ChevronLeft />
                </IconButton>
              </Grid>
              <Grid item container xs={8} alignItems="center" justify='center'>
                <Grid item>
                  <Typography className={classes.title} style={Style.textGreyO5} variant="body1">
                    {props.mealHeading.length >= 20 ? props.mealHeading.slice(0, 20) + ' ...' : props.mealHeading}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <UserMealTable />
        </DialogContent>
      </Dialog>
    </>
  );
}
