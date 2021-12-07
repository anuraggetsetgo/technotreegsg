import React, { useEffect, useState } from 'react'
import SupportView from '../Screens/Support/Support-View'
import { get } from '../Utils/Services'
import {api_supportRaiseTicket,api_supportFetchTicket} from '../Utils/GSGApi'
export default function Support() {
    const [userData, setUserData] = useState(JSON.parse(get("GSG_Client_data")));
    const [pastTickets, setSetPastTickets] = useState(null)
    const [successTicket, setSuccessTicket] = useState(false)
    const [errorTicket, setErrorTicket] = useState(false)
    const raiseTicket=(data)=>{
        api_supportRaiseTicket(data,ticketSuccess,ticketFailed)
        function ticketSuccess(data){
            console.log(data.data)
            setSuccessTicket(data.data.ticket_num)
            getPastTickets();
        }
        function ticketFailed(err){
            console.log(err)
         
        }
    }
    const getPastTickets=()=>{
        api_supportFetchTicket(ticketFetchSuccess,ticketFetchFailed)  
        function ticketFetchSuccess(data){
            console.log(data.data.tickets)
            setSetPastTickets(data.data.tickets.reverse())
        }
        function ticketFetchFailed(err){
            console.log(err)
            setSetPastTickets(false);
        }
    //setSetPastTickets(null);
    }
useEffect(() => {
    getPastTickets();
}, [])
    return (
        <SupportView
            userData={userData}
            supportCategories={userData.config.support_categories}
            raiseTicket={raiseTicket}
            successTicket={successTicket}
            errorTicket={errorTicket}
            setErrorTicket={setErrorTicket}
            pastTickets={pastTickets}
            getPastTickets={getPastTickets}
            
        />
        
        )
}
