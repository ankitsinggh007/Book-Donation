import React, { useState,useContext } from 'react';
import { NavLink } from "react-router-dom";
import { Alert } from 'reactstrap';
import { User } from '../App';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import classes from "./Login.module.css";
import LoginBanner from "../Media/LoginBanner.svg"
export default function App() {
  const [loginRegisterActive, setloginRegisterActive] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { Creadential, setCreadential, createUser, verifyCredential } = useContext(User);
  const [Message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (Creadential.email !== "") {
      if (regex.test(Creadential.email)) {
        if (Creadential.Password !== "") {
            verifyCredential();
        
        }
        else {
          setMessage("fill password");
        }
      } else {
        setMessage("fill valid email");
      }

    }
    else {
      setMessage("fill email");
    }
  };


  return (
    <div className={classes.Container}>
      <div className={classes.Box}>
        

        <MDBTabsContent >
          <MDBTabsPane show={loginRegisterActive === 'login'}>
            <form onSubmit={handleSubmit} >
          {Message.length != 0 && <Alert color="danger">
                        {Message}
                    </Alert>}
              <MDBInput className='mb-4' 
style={{height:"40px",fontSize: '16px'}}            
              
              type='email' id='form7Example1' 
              onChange={(e)=>{setCreadential({...Creadential,email:e.target.value})}}
              label='Email address' />
              <MDBInput className='mb-4' type='password' 
style={{height:"40px",fontSize: '16px'}}            
              
              id='form7Example2' 
              onChange={(e)=>{setCreadential({...Creadential,Password:e.target.value})}}
              label='Password' />


              <MDBBtn type='submit'
style={{height:"40px",fontSize: '16px'}}            
              
              className='mb-4' block>
                Log In
              </MDBBtn>

              <div className='text-center'>
                <p 
style={{height:"40px",fontSize: '16px'}}            
                
                >
                  Not a member? <NavLink to="/signup">Register</NavLink>
                </p>
              </div>
            </form>
          </MDBTabsPane>

        </MDBTabsContent>
      </div>
      <div className={classes.Image}>


      </div>
    </div>
  );
}