import React from 'react';
import { Divider, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from '../../app-style'
import NotificationsPlaceholder from '../PlaceHolder/PlaceHolder'
import ReceiptIcon from '@material-ui/icons/Receipt';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { formatDate } from '../../Utils/Services'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PreloadImg from '../../Utils/Preloadimg';
import { useHistory } from 'react-router';
import { navigateInAppBrowser } from '../../Utils/CordovaPlugin'
import { colors } from '../../Utils/Services'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    notificationTextContainer: {
        maxHeight: '6rem',
        minHeight: '2rem',

        display: 'inline',
        overflow: 'hidden',
        textOverflow: "ellipsis",
        //whiteSpace: 'nowrap',
    },
    notificationText: {

    },
    notificationEmpty: {
        height: '80vh'
    },
    dialogTitle: {
        fontSize: '20px',
        padding: theme.spacing(2),
    },
    // dialogBox: {

    // }
}))

export default function NotificationView(props) {
    const classes = useStyles();
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [dialogNotification, setDialogNotification] = React.useState(null);
    const setColor = (status) => { }
    const onClick = (index) => { console.log('asd') }
    const formattime = (index) => { console.log('asd') }
    console.log(props);
    const handleClickOpen = (notificationToShow) => {
        props.markRead(notificationToShow.id)
        setDialogNotification(notificationToShow)
        setOpen(true);

    };

    const handleClose = () => {
        setDialogNotification(null)
        setOpen(false);

    };
    const notificationClickHandler = () => {
        //setOpen(false);
        //if (dialogNotification.url_type === 'external')
        //navigateInAppBrowser("https://www.google.com")//dialogNotification.url)
        //if (dialogNotification.url_type === 'internal')
        history.replace('profile')//dialogNotification.url)
        //setDialogNotification(null)


    };
    return (
        (<>
            <HeaderBar isVisible leftEnable leftElement='back' headerName={"Notifications"} settings={true} />
            {props.notificationData && (
                <Grid style={Styles.displayViewContainer}>
                    {props.notificationData.notifications.length > 0 &&
                        props.notificationData.notifications.map((notification, key) => (
                        <Grid key={key+notification.id}>
                            <Grid container direction='column' onClick={() => handleClickOpen(notification)}
                                style={{ ...Styles.gutter16, ...Styles.marginTop16, paddingLeft:'4px',backgroundColor: 'rbga(26,26,26,0.2)' }}>
                                <Grid item container directio='row' xs={12}>
                                    <Grid item container xs={2} alignItems='center' justify='center'>
                                        {notification.notification_type === '1' && 
                                            <ReceiptIcon style={{ fontSize: 40 }} color='primary' />}
                                        {notification.notification_type === '1' && 
                                            <OfflineBoltIcon style={{ fontSize: '40', color: 'orange' }} />}
                                    </Grid>
                                    <Grid item xs={10} container direction='column' className={classes.notificationTextContainer}>
                                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                                            <Grid item>
                                                <Typography className={classes.notificationText} variant='body1'>{notification.notification_title}</Typography>
                                            </Grid>
                                            <Grid item>
                                                {notification.notification_status === "1" && <FiberManualRecordIcon style={{ fontSize: 10 }} color='primary' />}
                                                {notification.notification_status === "2" && <FiberManualRecordIcon style={{ fontSize: 8, border: `1px solid ${colors.primary}`, borderRadius: '30px' }} color='secondary' />}

                                            </Grid>
                                        </Grid>
                                        <Grid item className={classes.notificationTextContainer}>
                                            <Typography variant="body2" style={Styles.textGreyO5} className={classes.notificationText} >{notification.notification_desc}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container direction='row' alignItems='flex-start' justify="flex-end">
                                    <Typography variant='body2' style={Styles.textGreyO5}>{formatDate(notification.updated_on)}</Typography>
                                </Grid>
                            </Grid>
                            <Divider style={{ ...Styles.divider, border: '1px' }} />
                        </Grid>
                        )
                        )}
                    {dialogNotification &&
                                <Dialog maxWidth={'xs'} key={dialogNotification.notification_title} open={open} TransitionComponent={Transition} onClose={handleClose}>
                                    <DialogTitle className={classes.dialogTitle}>
                                        {dialogNotification.notification_title}
                                    </DialogTitle>
                                    <Grid>
                                        <PreloadImg alt='Suggested Workout' style={{ width: "100%" }}
                                            src="https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg"//dialogNotification.notification_img
                                        />
                                        <DialogContent><DialogContentText>{dialogNotification.notification_desc}</DialogContentText></DialogContent>
                                    </Grid>
                                    <DialogActions>
                                        <Button className="bigButton" variant="contained" color="primary" style={{ width: '80px' }}
                                            onClick={notificationClickHandler}> Open</Button>
                                    </DialogActions>
                                </Dialog>}    
                    {props.notificationData.notifications.length === 0 && (
                        <Grid container className={classes.notificationEmpty} direction='column' alignItems='center' justify='center'>
                            <Grid item container direction='row' alignItems='center' justify='center'>
                                <Typography variant='body1'>You dont have any notifications yet.</Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}

            {!props.notificationData && (
                <Grid style={Styles.displayViewContainer}>
                    <NotificationsPlaceholder notifications />
                    <NotificationsPlaceholder notifications />
                    <NotificationsPlaceholder notifications />
                    <NotificationsPlaceholder notifications />
                    <NotificationsPlaceholder notifications />
                </Grid>)}

        </>)
    )
}
