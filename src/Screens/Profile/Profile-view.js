import React from 'react';
import { Grid, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import HeaderBar from '../../Container/Common/HeaderBar'
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Styles from '../../app-style'
import { makeStyles } from '@material-ui/core';
import ProfileUpdate from '../../Container/ProfileUpdate'
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../Container/Common/ImageUploadOld'
import { getCurrentDietCalories } from '../../Container/Meal'
import ProfilePlaceHolder from '../PlaceHolder/PlaceHolder';
import { navigateToFAQ } from '../../Utils/CordovaPlugin'

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  subheading: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  progressbar: {
    margin: '0 0 8px 0',
  },

}));

export default function Profile(props) {
  const classes = useStyles();
  console.log(props);
  let history = useHistory();

  const [userImage, setuserImage] = React.useState(props.userImage);
  const [openUpdateProgress, setOpenUpdateProgressModule] = React.useState(props.showUpdateProgress);
  const [imageUploadError, setImageUploadError] = React.useState(false);
  const viewProgress = () => {
    history.push('/progress')
  }
  const updateInfo = () => {
    history.push('/infosheet')
  }
  const uploadImg = (img) => {
    setuserImage(img.image);
  }
  //const {}=props
  //const {firstname,lastname,email,age,clientProgress,goal,body_fat,calories,targetweight,profile_pic,goals}=props.userdata
  const userdata = props.userdata;
  console.log(userdata);
  return (
    <>
      <HeaderBar isVisible leftEnable leftElement='back' headerName={"Profile"} settings={true} />
      {props.loading && (<ProfilePlaceHolder profile={true}></ProfilePlaceHolder>)}
      {!props.loading && props.userdata && (
        <Grid style={Styles.displayViewContainer}>
          <Grid container direction="row" alignItems='center' justify="center">
            <Grid item container style={Styles.translucentContainer} direction="column" justify="center" alignItems='center' >
              <Grid item className={classes.profilePicture}>
                <Avatar alt={userdata.firstname} src={userImage} style={Styles.userImageContainer}></Avatar>
                {/* <PreloadImg alt="Your Image" src={userImage} style={Styles.userImageContainer}></PreloadImg> */}
                <ImageUpload fileName={userdata.user_id} folderName='profile_picture' getConvertedImage={uploadImg} imageUploadError={setImageUploadError} style={{ position: 'absolute', margin: '-24px 72px 0px 72px', background: 'white', boxShadow: '0px 1px 7px 0px gray', padding: '6px' }}></ImageUpload>
              </Grid>
              <Grid item className={classes.profilePicture}>
                <Typography variant="h4">{userdata.firstname} {userdata.lastname}</Typography>
              </Grid>
            </Grid>
            <Grid container style={Styles.gutter16} direction="column" justify="flex-start">
              <Typography className={classes.subheading} style={Styles.textGreyO5} variant="body2">Your current goal:</Typography>
              <Grid container direction="column" justify='space-evenly'>
                <Typography variant="body1"> Goal: {userdata.goal}</Typography>
                <Typography variant="body1"> Current Body Fat: {userdata.body_fat} %</Typography>
                <Typography variant="body1">Target Body Fat: {JSON.parse(userdata.goals).fat} %</Typography></Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems='center'>
              {/* <Button  className="bigButton"variant="contained" color="primary">Modify your goal</Button>
                      <Button className="bigButton" variant="contained" color="primary" onClick={()=>setOpenUpdateProgressModule(true)}>Update progress</Button> */}
              <Button className="bigButton" variant="contained" color="primary" onClick={viewProgress}>View your progress</Button>
            </Grid>

            <Grid container direction="column" justify="center" alignItems='center'>
              {/* <Button  className="bigButton"variant="contained" color="primary">Modify your goal</Button>
                      <Button className="bigButton" variant="contained" color="primary" onClick={()=>setOpenUpdateProgressModule(true)}>Update progress</Button> */}
              <Button className="bigButton" variant="contained" color="primary" onClick={updateInfo}>Update your info sheet</Button>
            </Grid>

            <Grid container style={{ ...Styles.translucentContainer, ...Styles.gutter16 }} direction="column" justify="flex-start">
              <Typography className={classes.subheading} style={Styles.textGreyO5} variant="body2">Your target values</Typography>
            </Grid>
            <Grid item className={classes.subheading} container justify="space-evenly" >
              <Grid item xs={6} container direction="column" justify='center' alignItems="center">
                <Typography variant='body1'>{Math.round((JSON.parse(userdata.goals).weight * 0.453592 * 100)) / 100} <small>kg</small></Typography>
                <Typography variant='body2' style={Styles.textGreyO5}>target Weight</Typography>

              </Grid>
              <Grid item xs={6} container direction="column" justify='center' alignItems="center">
                <Typography variant='body1'>{parseInt(getCurrentDietCalories(userdata.weight, userdata.workout, userdata.body_fat, JSON.parse(userdata.goals).fat))}</Typography>
                <Typography variant='body2' style={Styles.textGreyO5}>target calories</Typography>
              </Grid>
            </Grid>

            {/*<Grid container style={{ display:'none',...Styles.translucentContainer, ...Styles.gutter16 }} direction="column" justify="flex-start">
              <Typography className={classes.subheading} style={Styles.textGreyO5} variant="body2">Learn more</Typography>
            </Grid>
             <Grid container style={{display:'none'}}  direction="column" justify="flex-start">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant='body1'>Fitness Guides</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<Button style={Styles.primeColor} variant='contained' color='primary'>Prime</Button>} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant='body1'>Recipe Books</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion> */}
              {/* <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant='body1'>FAQs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
          </Typography>
              </AccordionDetails>
            </Accordion> */}
              {/* <Typography variant='body1' onClick={navigateToFAQ}>FAQs</Typography>
            </Grid> */}

            {openUpdateProgress && <ProfileUpdate show={openUpdateProgress} handleClose={setOpenUpdateProgressModule} />}

          </Grid></Grid>)}
    </>
  )
}
