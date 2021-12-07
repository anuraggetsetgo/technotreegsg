import { get, set } from './Services';
import { colors } from './Services'
import { api_fcmUpdate } from './GSGApi'
const iosAppID = '585027354';
const androidAppID = "com.google.android.apps.maps";
//max time to wait for rating dialog to display on iOS
const MAX_DIALOG_WAIT_TIME_IOS = 5*1000; 
//max time to wait for rating dialog to display on Android and be submitted by user
const MAX_DIALOG_WAIT_TIME_ANDROID = 60*1000; 



export function identifyPlatform() {
    let device_type = 3;
    if (window.device) {
        let platform = window.device.platform.toLowerCase();
        if (platform === 'android')
            device_type = 1;
        if (platform === 'ios')
            device_type = 2;
    }
    return device_type;
}

export function launchReview( ) {
    let platform = window.device.platform.toLowerCase();
    let appId;
    switch (platform) {
        case "ios":
            window.LaunchReview.rating(() => {
                console.log("Successfully launched store app");
            }, 
            (err) => {console.log("Error Occured while launching Store",err)}
            ,iosAppID)
            break;
        case "android":
            window.LaunchReview.launch(() => {
                console.log("Successfully launched store app");
            }, 
            (err) => {console.log("Error Occured while launching Store",err)}
            ,androidAppID)
            break;
        default:
            appId = null;
}

}

export function navigateToPayment(exitCallBack) {
    const userData = JSON.parse(get('GSG_Client_data'));
    const appUserData = btoa(JSON.stringify({
        firstname: userData.firstname,
        email: userData.email,
        userID: userData.user_id,
    }))
    const url = `https://gsgwebsite-psi.vercel.app/mobile/${appUserData}`;
    let ref = navigateInAppBrowser(url)
    if (exitCallBack)
        ref.addEventListener('exit', exitCallBack)
}

export function navigateToFAQ(exitCallBack) {
    // const userData = JSON.parse(get('GSG_Client_data'));
    // const appUserData = btoa(JSON.stringify({
    //     firstname: userData.firstname,
    //     email: userData.email,
    //     userID: userData.user_id,
    // }))
    const url = `https://gsgwebsite-psi.vercel.app/faq`;
    let ref = navigateInAppBrowser(url)
    if (exitCallBack)
        ref.addEventListener('exit', exitCallBack)
}
export function navigateInAppBrowser(url) {
    var browser = window.cordova.InAppBrowser;
    var options = 'location=yes,hideurlbar=yes,hidenavigationbuttons=yes,clearcache=yes,zoom=no,cleardata=yes,closebuttoncolor=' + `${colors.primary}`;
    let ref = browser.open(url, '_blank', options);
    return ref
}

export function getFCMToken() {
    if (window.cordova) {
        const storeToken = (token) => {
            console.log(token);
            set('device_token', token); //Api Call to Update the token in DB
            api_fcmUpdate({
                fcm_token: token,
                device_id: "1",
                device_type: get('device_type')
            }, data => console.log('Token Notifications -', data.data), err => console.log(err));
        }
        const getTokenErr = (err) => { console.log(err); set('device_token', null); }
        window.FirebasePlugin.grantPermission((hasPermission) => console.log("Permission was " + (hasPermission ? "granted" : "denied")), (err) => console.log('FireBasePermission ' + err));
        window.FirebasePlugin.hasPermission(function (hasPermission) { console.log("Permission is " + (hasPermission ? "granted" : "denied")); });
        //if(platform==='android')  
        window.FirebasePlugin.getToken(storeToken, getTokenErr)
        onMessageTap();
        //if(platform==='ios')  
        //window.FirebasePlugin.getToken(data=>console.log(data),err=>console.log(err))  
    }
}

export function onMessageTap(history){
    window.FirebasePlugin.onMessageReceived((message) => {
        if (message.tap) 
        { 
             if(message.url_type==='external')
                navigateInAppBrowser(message.url)
             if(message.url_type==='internal')
                 history(message.url)
            console.log(`Notification was tapped in the ${message.tap}`); }
    })
}
function inAppRate() {
    window.AppRate.setPreferences({
        displayAppName: 'GetSetGo Fitness',
        simpleMode: true,
        //showPromptForInAppReview:false,
        storeAppURL: {
            ios: iosAppID,
        },
        reviewType: {
            ios: 'InAppReview',
        },
        customLocale: {
            title: "Would you mind rating GetSetGo Fitness",
            message: "Thanks for your support!",
            cancelButtonLabel: "No, Thanks",
            laterButtonLabel: "Remind Me Later",
            rateButtonLabel: "Rate It Now",
            yesButtonLabel: "Yes!",
            noButtonLabel: "Not really",
            appRatePromptTitle: 'Do you like using %@',
            feedbackPromptTitle: 'Mind giving us some feedback?',
          }

    });
    window.AppRate.promptForRating();
}
function ratingDialogNotShown(){
    var msg;
    if(window.device.platform.toLowerCase() === "android"){
        msg = "Rating dialog outcome not received (after " + MAX_DIALOG_WAIT_TIME_ANDROID + "ms)";
    }else if(window.device.platform.toLowerCase() === "ios"){
        msg = "Rating dialog was not shown (after " + MAX_DIALOG_WAIT_TIME_IOS + "ms)";
    }
    console.warn(msg);
}

function rating(){
    let platform = window.device.platform.toLowerCase();
    var ratingTimerId;
    let appId;
    switch (platform) {
        case "ios":
            appId = iosAppID;
            break;
        case "android":
            appId = androidAppID
            break;
        default:
            appId = null;
    }
    if(platform === "android"){
        ratingTimerId = setTimeout(ratingDialogNotShown, MAX_DIALOG_WAIT_TIME_ANDROID);
    }

    window.LaunchReview.rating(
        function(status){
        if(status === "requested"){
            if(platform === "android"){
                console.log("Displayed rating dialog");
                clearTimeout(ratingTimerId);
            }else if(platform === "ios"){
                console.log("Requested rating dialog");
                ratingTimerId = setTimeout(ratingDialogNotShown, MAX_DIALOG_WAIT_TIME_IOS);
            }
        }else if(status === "shown"){
            console.log("Rating dialog displayed");
            clearTimeout(ratingTimerId);
        }else if(status === "dismissed"){
            console.log("Rating dialog dismissed");
            clearTimeout(ratingTimerId);
        }
    }, function (err){
        console.error("Error launching rating dialog: " + err);
        clearTimeout(ratingTimerId);
    },appId);
}




// function androidNav() {
//     var options = 'location=yes,hideurlbar=yes,hidenavigationbuttons=yes,clearcache=yes,zoom=no,cleardata=yes,closebuttoncolor=' + `${colors.primary}`;
//     console.log(options)
//     var browser = window.cordova.InAppBrowser;
//     let ref = browser.open('https://gsgwebsite-psi.vercel.app/mobile', '_blank', options);
//     ref.addEventListener('loadstop', loadstartCallBack);
//     function loadstartCallBack() {
//         const userData = JSON.parse(get('GSG_Client_data'));
//         const appUserData = JSON.stringify({
//             firstname: userData.firstname,
//             email: userData.email,
//             userID: userData.user_id
//         })
//         ref.executeScript({
//             code: `localStorage.setItem( 'appUserData', '${appUserData}');
//                     localStorage.setItem( 'app', 'true');` });
//     }
//     ref.addEventListener('exit', exitCallBack);
//     function exitCallBack() {
//         window.location('/');
//     }
// }