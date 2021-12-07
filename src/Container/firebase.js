import { get } from '../Utils/Services'
import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Data from '../json/commonConfig.json';
import _ from 'lodash';

const firebase = Data.firebase;

function firebaseLogin() {
    const { email, password } = firebase.credentials;
    const auth = Firebase.auth;
    return new Promise((resolve, reject) => {
        auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                resolve(true);
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
function firebaseLogout() {
    const auth = Firebase.auth;
    auth().signOut()
}


function firebase_GetUserDiet(userID, cb) {
    if (!Firebase.apps.length)
    {//console.log(firebase,`${get('region')}_region`);
        Firebase.initializeApp(firebase[`${get('region')}_region`].config); }
    firebaseLogin()
        .then((response) => {
            let firebaseRef = Firebase.database().ref(`clientDiet/${userID}`);
            firebaseRef.once('value')
                .then((data) => {
                    const diets = _.values(data.val());
                    console.log('Diet:', diets);
                    cb(diets);
                }).catch(err => { cb(null) });
        }).catch(err => cb(null));
}

export {
    firebase_GetUserDiet,
    firebaseLogout,
    firebaseLogin,

}