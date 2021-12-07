import React, { Component } from 'react'
import SplashGSG from '../../img/SplashGSG.png'
import SplashStyle from './Splash-style'


export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSplash: true,
            timeout: props.timeout ? props.timeout : 5000
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ showSplash: false });
            if (this.props.afterTimeOut)
                this.props.afterTimeOut();
        }, this.state.timeout);
    }
    render() {
        return (
            this.state.showSplash && (
                <img alt='splash' src={SplashGSG} style={SplashStyle.splashView} />
            )
        )
    }
}
