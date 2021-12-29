import { Typography } from '@material-ui/core'
import React from 'react'
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from '../../app-style'
import { Grid, FormControl, Select, InputLabel, MenuItem, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
import { blue, deepOrange, green } from '@material-ui/core/colors';
import { formatDate } from '../../Utils/Services'
import Collapse from '@material-ui/core/Collapse';
import { Chip } from '@material-ui/core'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(2),
        // maxWidth: '90vw%',
        // minWidth: '90vw',
        width: '100%'
    },
    label: {
        //transform: 'translate(6px, -9px) scale(0.75)',
        //margin: '8px 0px 0px -6px',
        //fontSize: '16px',
    },
    textArea: {
        margin: '16px 0px',
    },
    selectMenuInput: {
        fontSize: '16px',
        maxWidth: '90vw',
        color: Styles.blackColor.color,
    },
    messageBox: { padding: '16px' },
    itemsSpacing: { margin: '16px' },
    subheading: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    tableContainer: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
    tableCell: {
        padding: '5px 5px'
    },
    ticketCard: {
        marginBottom: theme.spacing(1),
    },
    pastTicketHeader: {
        padding: '4px'
    },
    //statusIconSize: { width: '30px', height: '30px' },
    resolvedTicket: {
        backgroundColor: green[500],  
        height: '24px'
    },
    openTicket: {
        backgroundColor: blue[500], 
        height: '24px'
    },
    inProgressTicket: {
        backgroundColor: deepOrange[300],
        height:'24px'
        // width: '25px', height: '25px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    subheadContainer1:{marginTop:'-12px'},
    subheadContainer2:{paddingLeft:'0px'},
}));
export default function SupportView(props) {
    const classes = useStyles();
    const { supportCategories } = props;
    const [topic, setTopic] = React.useState('');
    const [otherTopic, setOtherTopic] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = (e, index) => {
        // console.log('here',index);
        setExpanded(index)
    };
    const handleSelect = (e) => {
        setTopic(e.target.value);
    };
    const handleMessage = (e) => {
        const { value } = e.target;
        setMessage(value);
    };
    const handleOtherIssue = (e) => {
        const { value } = e.target;
        setOtherTopic(value);
    };

    const createTicket = () => {
        props.raiseTicket({
            "issue_type": topic,
            "issue_others": otherTopic || '',
            "issue_description": message
        })
    }

    const ticketStatus = (status) => {
        console.log(status)
        switch (status) {
            case "0":
                return classes.resolvedTicket
            case "1":
                return classes.openTicket
            case "2":
                return classes.inProgressTicket
            default:
                return classes.inProgressTicket

        }
    }
    return (<>
        <HeaderBar headerName={'Support'} isVisible leftElement='back' leftEnable settings={true} />
        <Grid style={Styles.displayViewContainer}>
            <Grid container direction='column' style={{ ...Styles.gutter16, paddingTop: '10px' }} alignItems='center' justify='center'>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="issue-type">Issue type</InputLabel>
                    <Select classes={classes.textArea} inputProps={{ className: classes.selectMenuInput }} color='primary' defaultValue="" id="issue-type" onChange={handleSelect}>
                        {/* <ListSubheader>Category 1</ListSubheader> */}
                        {supportCategories.map((category, index) => (
                            <MenuItem key={index} value={category}>{category}</MenuItem>
                        ))}
                    </Select>

                    {topic === 'Others' &&
                        <TextField className={classes.textArea} inputProps={{ style: { fontSize: '16px' } }}
                            variant='outlined' InputLabelProps={{ className: classes.label }} label="Custom issue type"
                            multiline rows={2} value={otherTopic} onChange={handleOtherIssue} />}

                    <TextField className={classes.textArea} inputProps={{ style: { fontSize: '16px' } }}
                        variant='outlined' InputLabelProps={{ className: classes.label }} label="Description"
                        multiline rows={2} value={message} onChange={handleMessage} />


                    <Grid item container alignItems="center" justify='center'>
                        <Button className='bigButton' variant='contained' color='primary'
                            disabled={!((topic || otherTopic) && message)}
                            onClick={createTicket}>Send</Button>
                    </Grid>
                </FormControl>

            </Grid>
            {props.pastTickets && <Grid container style={{ ...Styles.translucentContainer, ...Styles.gutter16, margin: '8px 0 8px 0' }} direction="column" justify="flex-start">
                <Typography className={classes.subheading} style={Styles.textGreyO5} variant="body2">Past Tickets</Typography>
            </Grid>}
            {props.pastTickets && props.pastTickets.map((tickets, indx) => (<>
                <Grid key={indx + tickets.ticket_num} item container style={{...Styles.gutter16,margin:'16px 0px'}} direction='column'>
                    <Grid item  key={indx + tickets.issue_created_on} container   direction='row' alignItems='center' justify='space-between' onClick={(e, index) => handleExpandClick(e, indx)}>
                        <Grid item xs={7} direction='column'  alignItems='flex-start' justify='center'>
                            <Typography className={classes.subheadContainer1} variant='body1'>
                                 {tickets.issue_type}
                            </Typography>
                            <Typography  className={classes.subheadContainer2} variant='body2' style={Styles.textGreyO5}>
                                {formatDate(tickets.issue_created_on)}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Chip className={ticketStatus(tickets.issue_status)} label={<Typography variant='body2'>{tickets.ticket_num}</Typography>} ></Chip> 
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' style={{ padding: '0px 16px' }}>
                        <Collapse in={expanded === indx ? true : false} timeout="auto" unmountOnExit>
                        <Divider style={{...Styles.divider,marginTop: '8px'}}></Divider>
                            <Typography variant='body2' style={{ paddingTop: '8px 0px 0px 0px' }}>Description</Typography>
                            <Typography variant='body2' style={Styles.textGreyO5}>
                                {tickets.issue_description}
                            </Typography>
                            {tickets.issue_gsg_comments && (<><Typography variant='body2'>Comments</Typography>
                                <Typography variant='body2' style={Styles.textGreyO5}>
                                    {tickets.issue_gsg_comments}
                                </Typography></>)}

                        </Collapse>
                    </Grid>           
                </Grid>
                <Divider style={{...Styles.divider,margin:'8px 0px'}}/>
            </>))
            }




        </Grid>

        {props.successTicket && <AlertSnackbar open={props.successTicket?true:false} type={ALERT.SUCCESS} message={"Ticket " + props.successTicket + ' submitted successfully.We will get back to you soon'} />}
        {props.errorTicket && <AlertSnackbar open={props.errorTicket?true:false} type={ALERT.ERROR} message="There was an error creating your ticket please try again!!!" />}
    </>)
}


// {props.pastTickets && <>
//     <Grid container style={{ ...Styles.translucentContainer, ...Styles.gutter16 }} direction="column" justify="flex-start">
//         <Typography className={classes.subheading} style={Styles.textGreyO5} variant="body2">Past Tickets</Typography>
//     </Grid>
//     <Grid container direction='column' className={classes.tableContainer} alignItems='flex-start' justify='center'>
//         <Table>
//             <TableHead>
//                 <TableRow>
//                     <TableCell className={classes.tableCell}><Typography variant='body1'>TicketNo</Typography></TableCell>
//                     <TableCell className={classes.tableCell}><Typography variant='body1'>Details</Typography></TableCell>
//                     <TableCell className={classes.tableCell}><Typography variant='body1'>Description</Typography></TableCell>
//                     <TableCell className={classes.tableCell}><Typography variant='body1'>Status</Typography></TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {props.pastTickets && props.pastTickets.map((tickets, index) => (
//                     <TableRow key={index + tickets.ticket}>
//                         <TableCell className={classes.tableCell}> <Typography variant='body2'>{tickets.ticket}</Typography></TableCell>
//                         <TableCell className={classes.tableCell}><Typography variant='body2'>{tickets.issue_type}</Typography></TableCell>
//                         <TableCell className={classes.tableCell}><Typography variant='body2'>{tickets.issue_description}</Typography></TableCell>
//                         <TableCell className={classes.tableCell}><Typography variant='body2'>{tickets.status}</Typography></TableCell>
//                     </TableRow>
//                 ))}

//             </TableBody>
//         </Table>
//     </Grid>
// </>}