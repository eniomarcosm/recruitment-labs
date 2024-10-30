import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAbwXAFcMJzhDvuaYOM1RjQ5_P4_RHEFKY',
  authDomain: 'recruitment-app-8cdab.firebaseapp.com',
  projectId: 'recruitment-app-8cdab',
  storageBucket: 'recruitment-app-8cdab.appspot.com',
  messagingSenderId: '161227279673',
  appId: '1:161227279673:web:e188d54d5dc8f24a67ece8',
  measurementId: 'G-M17TXTQW4G'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, auth, storage }

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// IOS: 624452011562-37clk4l3ou6dn47ubs47joptk74hkrd5.apps.googleusercontent.com
// Android: 624452011562-b4pvbhj08tc4m5tgoim12229a8m993d2.apps.googleusercontent.com
