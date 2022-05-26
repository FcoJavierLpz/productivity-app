import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import config from './config'
import { getFirestore } from 'firebase/firestore'

const FirebaseApp = initializeApp(config.firebaseConfig)

export const auth = getAuth(FirebaseApp)
export const db = getFirestore(FirebaseApp)

export default FirebaseApp
