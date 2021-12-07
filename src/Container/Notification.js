import {React,useState,useEffect} from 'react'
import {api_notificationList} from '../Utils/GSGApi'
import NotificationView from '../Screens/Notifications/Notification-view'
import {api_notificationRead} from "../Utils/GSGApi"

const notif=[
    {notificationText:'Notifications will be chronologically arranged based on time; most recent one appearing on the top.Also, the height is fixed for these notifications.',
    time:'Today, 15:55',
    action:'',
    status:'',//open/closed
    route:'',
    notificationTitle:'This is a notification title', 
    },
    {
    notificationTitle:'This is a notification title', 
    notificationText:'Notifications will be displayed here as text only. The text for each notification should be limited to three lines as this one is, otherwise the message will be truncated, not suggesteasdsadsadasdsadasdd..',
    time:'Yesterday, 12:45',
    action:'',
    status:'',//open/closed
    route:'',
    notificationTitle:'This is a notification title', 
    },
    {notificationText:'This is an old notification which was tapped once. ',
    time:'Monday, 15:55',
    action:'',
    status:'',//open/closed
    route:'',
    notificationTitle:'This is a notification title', 
    },
    {notificationText:'No notifications will be automatically deleted. Neither can the user remove or hide notifications at this moment.The above notification is relatively shorter, see alignment.',
    time:'21 December, 12:45',
    action:'',
    status:'',//open/closed
    route:'',
    notificationTitle:'This is a notification title',    
},
    {notificationText:'No notifications will be automatically deleted. Neither can the user remove or hide notifications at this moment.The above notification is relatively shorter, see alignment.',
    time:'15 December, 15:55',
    action:'',
    status:'',//open/closed
    route:''
    },
]
const noticolors={
    opened:'',
    neverOpened:''
}
export default function Notification() {
    const [userNotifications, setuserNotifications] = useState(null)
    const [userNotificationsError, setuserNotificationsError] = useState(null)
    const getUserNotifications=()=>{
        api_notificationList ( notificationlistSuccessCB, notificationlistFailedCB )  
        function notificationlistSuccessCB(data){
            console.log(data.data)
            setuserNotifications(data.data)
        }
        function notificationlistFailedCB(err){
            console.log(err);
            setuserNotifications(false);
            setuserNotificationsError(err)
        }
    }
    const markNotificationRead=(id)=>{
        console.log(id)
        api_notificationRead(id,(data)=>console.log(data),(err)=>console.log(err))
    }
    useEffect(() => {
        getUserNotifications();
    }, [])
    return (
        //(userNotifications) && 
        <NotificationView
        notificationData={userNotifications}
        notificationError={userNotificationsError}
        markRead={markNotificationRead}
        />
    )
}

// {
//     "notifications": [
//         {
//             "id": "2",
//             "user_id": "36054",
//             "notification_title": "Weekly progress update!",
//             "notification_desc": "Hey there, looks like you forgot to update your progress this week. Jump on and start now, it only takes a minute.",
//             "notification_type": "1",
//             "notification_img": "",
//             "notification_url": "",
//             "notification_status": "1",
//             "created_on": "2021-06-29 12:34:24",
//             "updated_on": "2021-06-29 13:33:23"
//         },
//         {
//             "id": "1",
//             "user_id": "36054",
//             "notification_title": "Welcome to GetSetGo Fitness!",
//             "notification_desc": "We are thrilled to see you onboard and looking forward to start the fitness journey. Calorie Deficit - Workout - Repeat - GetSetGo Team",
//             "notification_type": "1",
//             "notification_img": "",
//             "notification_url": "",
//             "notification_status": "2",
//             "created_on": "2021-06-29 12:34:24",
//             "updated_on": "2021-06-29 13:32:52"
//         }
//     ],
//     "notification_status": {
//         "Deleted": "0",
//         "Unread": "1",
//         "Read": "2",
//         "Cleared": "3"
//     },
//     "notification_type": {
//         "1": "Info",
//         "2": "Offer"
//     }
// }