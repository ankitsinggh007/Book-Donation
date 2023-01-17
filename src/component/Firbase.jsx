// Import the functions you need from the SDKs you need
import { initializeApp,get } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAK2nyDs3GsT4XnFvoHWsgKPo3KcardAkA",
    authDomain: "book-donation-28880.firebaseapp.com",
    projectId: "book-donation-28880",
    storageBucket: "book-donation-28880.appspot.com",
    messagingSenderId: "1065104677512",
    appId: "1:1065104677512:web:4d7aaf5f1659497d575d3d",
    measurementId: "G-V8MD9GCVP2"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;