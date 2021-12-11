import React from 'react'
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from '../../app-style'
import DashBoardLabels from './DashBoard-Labels'
import { colors, get } from '../../Utils/Services'
import { getSignedUrl } from '../../Utils/FetchImgs';
import Quotes from './quotes';
import ImageS3 from '../../Utils/ImageS3'
import { useHistory } from 'react-router-dom'
//import Gologo from '../../img/GOlogo.png'


export default function Dashboard(props) {
    const setting = () => { console.log("Clicked on Setting") };
    const userData = JSON.parse(get('GSG_Client_data'));
    const[userImage, setUserImage] = React.useState(null);
    const quotesTotal = Quotes.length-1;
    getSignedUrl(userData.user_id, 'image/jpeg', 'profile_picture', 'getObject').then((data) => {
        const tempURL = data.replace('s3', 's3-accelerate')
        //console.log(tempURL)
        //set("GSG_Client_Profile_Pic", tempURL);
        setUserImage(tempURL)
  
        //return (tempURL);
      })
        .catch(err => {
          setUserImage('')
  
        })
    //console.log(props);
    let history = useHistory();
    const handleClickOnUpdateProgress = () => { history.push('/progress') }
    const randomNo = parseInt(Math.random()*quotesTotal);
    const lastProgressImg = userData.clientProgress[0].pic_1;
    const firstProgressImg = userData.clientProgress[userData.clientProgress.length-1].pic_1;
    console.log("QUOTES >>>>",firstProgressImg, lastProgressImg);
    return (<>
        {/* <HeaderBar headerName=' ' isVisible leftElement=' ' settings={setting} /> */}
        <Grid style={{...Styles.displayViewContainer, marginTop: 0, height: '100vh', paddingBottom:'50px', background: '#fff'}}>
            <Grid container direction='column' style={{flex: 1}} alignItems='stretch' justify='flex-start'>
                <Grid item direction="column" style={{background: colors.primary, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', marginBottom: '50px', paddingBottom: '30px', overflow: 'hidden'}}>
                    <Grid item container direction="row" justify="flex-start" alignItems="center" >
                        <Grid item style={{margin: '20px 0 20px 0'}} xs={2}><Avatar alt={userData.firstname} src={userImage} style={{width: '40px', height: '40px', margin: '0 auto'}}></Avatar></Grid>
                        <Grid item><Typography variant="h4" style={{fontWeight: 'bold', ...Styles.colorWhite}}>Howdy {userData.firstname}!</Typography></Grid>
                    </Grid>
                    <Grid item container direction="column" alignItems="flex-end" style={{padding: '6%'}}>
                        <Grid item style={{marginBottom: '15px'}}>
                            <Typography variant="body1" style={Styles.colorWhite}>{Quotes[randomNo].quote}</Typography>
                        </Grid>
                        <Grid item><Typography variant="body1" style={Styles.colorWhite}>- {Quotes[randomNo].author}</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item style={{textAlign: 'center', marginBottom: '30px'}}>
                    <Typography variant="h4">
                        {Quotes.length>1?"Kudos! You're doing great":"Looking forward to an update from you :)"}
                    </Typography>
                </Grid>
                <Grid item container style={{padding: '0 4% 30px 4%'}}>
                    <Paper elevation={0} onClick={handleClickOnUpdateProgress} >
                        <Grid item container alignItems="flex-end" spacing={2}>
                            <Grid item container direction="column" alignItems="center" xs={6}>
                                <Grid item style={{borderRadius: '10px', padding: '10px', minHeight: '150px', width: '100%', overflow: 'hidden', background: '#f6f4f6'}}><ImageS3 imgSrc ={firstProgressImg} folder="progress_picture"/></Grid>
                                <Grid item style={{background: colors.yellow, marginTop: '10px', padding: '5px 10px', borderRadius: '10px'}}><Typography variant="body1">How it started</Typography></Grid>
                            </Grid>
                            <Grid item container direction="column" alignItems="center" xs={6}>
                                <Grid item style={{borderRadius: '10px', padding: '10px', minHeight: '150px', width: '100%', overflow: 'hidden', background: '#f6f4f6', marginBottom: '10px'}}><ImageS3 imgSrc ={lastProgressImg} folder="progress_picture"/></Grid>
                                <Grid item><Typography variant="body1" style={{background: colors.yellow, padding: '5px 10px', borderRadius: '10px'}}>How's it going</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <DashBoardLabels {...props}/>
            </Grid>
        </Grid>

    </>
    )
}