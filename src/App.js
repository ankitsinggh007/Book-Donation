import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';
import DataBase from "./component/Firbase"
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "./component/Form";
import AdminBooks from "./pages/AdminBooks";
import Book from "./pages/Book"
import { Helmet } from "react-helmet";


export const User = createContext({});



function App() {
  const [Data, setData] = useState();
  const Navigate = useNavigate();
  const [Creadential, setCreadential] = useState({ fname: "", lname: "", email: "", Role: "", Password: "" });
  const [LoggedInUserData, setLoggedInUserData] = useState({ id: "", firstName: "", lastName: "", email: "", Role: "", isAuthrized: false,Cart: [],acces:[],Donated:[] ,Request:[]});
  const [Message, setMessage] = useState("");


  const auth = getAuth();

  //  Fetch Data
  const FetchData = async (email) => {
    console.log("hi")
    console.log(email)
    const citiesRef = collection(DataBase, "User");
    const q = query(citiesRef, where("email", "==", `${email}`));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setLoggedInUserData({ ...LoggedInUserData, ...doc.data(), isAuthrized: true, id: doc.id });
      Navigate(`/home/${doc.data().Role}`)
  });
  }

  // Creat user in DataBase
  const CreateUserInDataBase = async () => {
    const DocRef = await addDoc(collection(DataBase, "User"), {
      email: Creadential.email,
      firstName: Creadential.fname,
      lastName: Creadential.lname,
      Role: Creadential.Role,
      Cart:[],
      acces:[]
      ,
      Donated:[] ,
      Request:[]
      
    });
    Navigate("/login")
  }

  // Create User
  const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        CreateUserInDataBase();

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCreadential({ ...Creadential, message: errorCode.split("/")[1] })

      });
  }
  // Login User
  const verifyCredential = async () => {
    const res = await signInWithEmailAndPassword(auth, Creadential.email, Creadential.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        FetchData(user.email);

        Navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCreadential({ ...Creadential, message: errorCode.split("/")[1] })

      });

  }
  console.log(LoggedInUserData)
  return (
    <MDBContainer fluid>
      <User.Provider value={{ Creadential, setCreadential, createUser, verifyCredential, LoggedInUserData, setLoggedInUserData }}>
      <Helmet>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</Helmet>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

  {
    LoggedInUserData.isAuthrized && 
    <Route path="/home/:UserRole" element={<Home />} >

    </Route>
  
  }

  <Route path="home/Reciever/:Courses" element={<Book/>}/>
  
   <Route path="home/Donor/Request" element={<AdminBooks/>}/>
  
  {
   <Route path="home/Donor/Books" element={<AdminBooks/>}/>
  }
{
    LoggedInUserData.isAuthrized && 
    <Route path="/home/Donor/:Course" element={<Form/>}/>
  
  }
  
   
        </Routes>
      </User.Provider>

    </MDBContainer>
  );
}

export default App;
