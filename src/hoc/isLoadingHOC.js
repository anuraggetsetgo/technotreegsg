import { React, useState } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Styles from '../app-style'
import { Grid, Typography } from '@material-ui/core';
//Signup
const LoaderStyle = { container: { position: 'absolute', height: '100vh', zIndex: Styles.highestZ.zIndex , background: Styles.colorWhite.color }, };

export default function isLoadingHOC(WrappedComponent, loadingMessage) {
    function Loading(props) {
        const [customMessage, setMessage] = useState(loadingMessage);
        const [isLoading, setIsLoading] = useState(false)
        const setloading = (componentLoadingState,msg) => {

            setIsLoading(componentLoadingState,msg);
            if (msg)
                setMessage(msg);
        }
        return (
            <>
                {/* //OverLay on the WrappedComponent console.log(isLoading) */}
                {isLoading &&
                    <Grid container style={LoaderStyle.container} direction='column' alignItems='center' justify='center'>
                        <Loader type="BallTriangle" color={Styles.colorPrimary.color} height={80} width={80} />
                        <Typography variant='body1' color='primary'>{customMessage}</Typography>
                    </Grid>
                }
                <WrappedComponent setLoadingHOC={setloading} {...props} />
            </>
        )
    }
    return Loading;
}



//passloading messge here