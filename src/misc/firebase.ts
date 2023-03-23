import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    EAS_BUILD_PROFILE,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from '@env';


let app: FirebaseApp;
let auth: Auth;


// Set the configuration for Firebase based on env
switch(EAS_BUILD_PROFILE) {
    // case 'production':
    //     break;
    // case 'preview':
    //     break;
    case 'development':
    default:
        var MY_APP_FIREBASE_API_KEY = FIREBASE_API_KEY;
        var MY_APP_FIREBASE_AUTH_DOMAIN = FIREBASE_AUTH_DOMAIN;
        var MY_APP_FIREBASE_PROJECT_ID = FIREBASE_PROJECT_ID;
        var MY_APP_FIREBASE_STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;
        var MY_APP_FIREBASE_MESSAGING_SENDER_ID = FIREBASE_MESSAGING_SENDER_ID;
        var MY_APP_FIREBASE_APP_ID = FIREBASE_APP_ID;
        break;
};


// Initialize Firebase, or use existing app if already initialized
if (getApps().length === 0) {
    app = initializeApp({
        apiKey: MY_APP_FIREBASE_API_KEY,
        authDomain: MY_APP_FIREBASE_AUTH_DOMAIN,
        projectId: MY_APP_FIREBASE_PROJECT_ID,
        storageBucket: MY_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId:  MY_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: MY_APP_FIREBASE_APP_ID
    });
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    app = getApp();
    auth = getAuth();
};


// Initialize Firebase Storage
const storage = getStorage(app);


export { app, auth };