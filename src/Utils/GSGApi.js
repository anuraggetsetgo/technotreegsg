import { callAPI, getURL} from '../Utils/Services'

export function calculateIdealWeight(weight, height, gender, currentShape, targetShape, progress, callback, errcallback) {
    const urlCalulateIdealWeight = "https://x1ezszg7ng.execute-api.us-east-1.amazonaws.com/default/ideal-weight-calculator";
    const key = 'vm6VqnlBsy12sZfW8PFCl6yAJnif6kHh5NvRtK9Q';
    const apidata = { weight: weight, height: height, gender: gender, currentShape: currentShape, targetShape: targetShape, progress: progress }
    callAPI(urlCalulateIdealWeight, "post", (data) => callback(data), err => errcallback(err), apidata, key);
}
export function api_profileGet(successCallback, errCallback) {
    callAPI(getURL("profile"), "get", successCallback, errCallback);
}

export function api_companyLogoGet(companyName,successCallback, errCallback) {
    callAPI("https://api.getsetgo.fitness/base_ind/API/v1/get-corporate-branding?company="+companyName, "get", successCallback, errCallback);
}
export function api_profilePost(data, successCallback, errCallback) {
    callAPI(getURL("profile"), "post", successCallback, errCallback, data);
}
export function api_generateOTP(mobileno, OTPSuccessful, OTPUperror) {
    callAPI(getURL("generate_otp"), "post", OTPSuccessful, OTPUperror, mobileno);
}
export function api_validateOTP(OTPdata, OTPSuccessful, OTPUperror) {
    callAPI(getURL("validate_otp"), "post", OTPSuccessful, OTPUperror, OTPdata);
}
export function api_sampleDietGen(apidata, dietSuccessful, dieterror) {
    const url = "https://4eji1rf7w0.execute-api.us-east-1.amazonaws.com/default/sample-diet-generator";
    const key = 'aUgdwJpGGx8zsU3u6X5Nk29MxfQlFfNX4Nz046ia';
    callAPI(url, "post", dietSuccessful, dieterror, apidata, key);
}
export function api_supportRaiseTicket(apidata, ticketSuccessCB, ticketFailedCB) {
 
    callAPI(getURL("help-ticket"), "post", ticketSuccessCB, ticketFailedCB, apidata);
}
export function api_supportFetchTicket( ticketFetchSuccessCB, ticketFetchFailedCB) {
    callAPI(getURL("support-tickets"), "get", ticketFetchSuccessCB, ticketFetchFailedCB);
}
export function api_notificationList( notificationlistSuccessCB, notificationlistFailedCB) {
    callAPI(getURL("notification-list"), "get", notificationlistSuccessCB, notificationlistFailedCB);
}
export function api_fcmUpdate( tokenData,fcmSuccess, fcmerror) {
    callAPI(getURL("fcm_update"), "post", fcmSuccess, fcmerror,tokenData);
}
export function api_notificationRead( notificationID,readSuccess, readError) {
    let api="notification-read"+"/"+notificationID;
    callAPI(getURL(api), "get", readSuccess, readError);
}
