import React from 'react'
import { Grid } from '@material-ui/core'
import HeaderBar from '../../Container/Common/HeaderBar'
import Styles from '../../app-style'
import DashBoardLabels from './DashBoard-Labels'
//import Gologo from '../../img/GOlogo.png'


export default function Dashboard(props) {
    const setting = () => { console.log("Clicked on Setting") }
    //console.log(props);
    return (<>
        <HeaderBar headerName=' ' isVisible leftElement=' ' settings={setting} />
        <Grid style={Styles.displayViewContainer}>
        <Grid container direction='column' style={{ ...Styles.gutter16, paddingTop: '10px' }} alignItems='center' justify='center'>
                <DashBoardLabels {...props}/>
            </Grid>
        </Grid>

    </>
    )
}