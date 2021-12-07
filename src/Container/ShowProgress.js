import React, {Component} from 'react';
import Progress from '../Screens/ShowProgress/ShowProgress-View';
import {get} from '../Utils/Services';

class ProgressContainer extends Component{
    constructor(props){
        super(props);
        const progress = JSON.parse(get('GSG_Client_data')).clientProgress;
        this.state={progress};
        
    }
    
    componentDidMount(){
        
    }
    render(){
        let {progress} = this.state;
        return (
            <div>
                <Progress progress={progress}/>                
            </div>
        )
    }
}
export default ProgressContainer