import React, { useState, useContext } from 'react'
import SignupBanner from "../Media/SignupBanner.jpg"
import { Alert } from 'reactstrap';
import classes from "./Signup.module.css"
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
  MDBRadio,
  MDBTabsPane, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from 'mdb-react-ui-kit';



function Signup() {

  const [Message, setMessage] = useState("")
  const [rePassword, setrePassword] = useState("")
  const { Creadential, setCreadential, createUser } = useContext(User);












  const verifyData = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (Creadential.fname !== "") {
      if (Creadential.lname !== "") {
        if (Creadential.Role !== "") {
          if (regex.test(Creadential.email)) {
            if (Creadential.Password !== "") {
              if (rePassword !== "") {
                if (Creadential.Password === rePassword) {
                  createUser(Creadential.email, Creadential.Password);
                }
                else {
                  setMessage("Password is not match")

                }
              }
              else {
                setMessage("Please fill re-Password")

              }
            }
            else {
              setMessage("Please fill Password ")

            }
          }
          else {
            setMessage("Please fill Valid email")
          }

        }
        else {
          setMessage("Role is not specify")

        }
      }
      else {
        setMessage("Please fill last name")

      }


    }
    else {
      setMessage("Please fill first name")
    }

  }
  console.log(Creadential,"Creadential")
  return (
    <div className={classes.Container}>
      <div className={classes.Box}>
        <MDBTabsPane show={true}>
          <form onSubmit={verifyData}>
            {Message.length != 0 && <Alert color="danger">
              {Message}
            </Alert>}
            <MDBInput className='mb-4' id='form8Example1'
              style={{ height: "40px", fontSize: '16px' }}
              onChange={(e) => { setCreadential({ ...Creadential, fname: e.target.value }) }}
              label=' first Name' />
            <MDBInput className='mb-4' id='form8Example2'
              style={{ height: "40px", fontSize: '16px' }}

              onChange={(e) => { setCreadential({ ...Creadential, lname: e.target.value }) }}
              label='Last Name' />

            <MDBInput className='mb-4' type='email' id='form8Example3'
              style={{ height: "40px", fontSize: '16px' }}

              onChange={(e) => { setCreadential({ ...Creadential, email: e.target.value }) }}
              label='Email address' />
            <MDBInput className='mb-4' type='password' id='form8Example4'
              style={{ height: "40px" }}
              onChange={(e) => { setCreadential({ ...Creadential, Password: e.target.value }) }}
              label='Password' />
            <MDBInput className='mb-4' type='password' id='form8Example5'

              style={{ height: "40px", fontSize: '16px' }}

              onChange={(e) => { setrePassword(e.target.value) }}
              label='Repeat password' />

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                onChange={(e) => { setCreadential({ ...Creadential, Role: e.target.value }) }}

                value="Donor" />
              <label class="form-check-label" for="inlineRadio2">Donor</label>
              <br />
              <br />
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"

                onChange={(e) => { setCreadential({ ...Creadential, Role: e.target.value }) }}
                value="Reciever" />
              <label class="form-check-label" for="inlineRadio3">Reciever</label>
            </div>
            <br />

            <MDBBtn type='submit'
              style={{ height: "40px", fontSize: '16px' }}

              className='mb-4' block>
              Register
            </MDBBtn>
          </form>
        </MDBTabsPane>

      </div>

      <div className={classes.Image}>
        <img src={SignupBanner} width="100%" />


      </div>
    </div>
  )
}

export default Signup