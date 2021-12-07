import { Typography } from '@material-ui/core';
import {React,useState,useEffect} from 'react'


export default function Timer(props) {
    
    const [counter,setcounter]=useState(parseInt(props.timer));

     useEffect(() => {
        const timer= counter>0 && setInterval(()=>setcounter(counter-1),1000)
         return () => {clearInterval(timer)
         }
     }, [counter])
    return (<>
        {counter!==0 &&<Typography variant="body2">{props.text} <span> {counter} </span><small> seconds </small></Typography>}
        {counter===0 &&(props.children)}
        </>
    )
}
