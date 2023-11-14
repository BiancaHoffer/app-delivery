import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAlPAstnvuM1zi0mJZOfuFVgeRkZy6d0_E",
  authDomain: "web-delivery-b3d7a.firebaseapp.com",
  projectId: "web-delivery-b3d7a",
  storageBucket: "web-delivery-b3d7a.appspot.com",
  messagingSenderId: "996714804716",
  appId: "1:996714804716:web:1078ac51e258d3b5d63cc9",
  measurementId: "G-K5WHR4EBFD"
});

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);