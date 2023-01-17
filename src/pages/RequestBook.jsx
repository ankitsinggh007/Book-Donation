import React,{useContext} from 'react'
import { User } from '../App';
import classes from "./RequestBook.module.css"
import {IoBookSharp} from "react-icons/io5"
import {MdAdminPanelSettings} from "react-icons/md"
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function AdminBooks() {
  const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
const Navigate=useNavigate();
  return (
    <>
   
    <div className={classes.Container}>
        
        {
           LoggedInUserData.Request?.map((obj,i)=>{
                return(
                    <div className={classes.card}>
        <img src={obj.Booklink} alt={obj.Title}/>
        <span className={classes.details}>
<span>
<span>Title:</span> <span>{obj.Title}</span>

</span>
<span>
<span>Semester:</span><span>{obj.Semester} sem</span>

</span>

<span>
<span>Pages:</span><span>{obj.Pages}</span>

</span>
<span>
<span>Donor:</span> <span>{obj.Donor}</span>

</span>
        </span>
    </div>
                )
            })
        }
        </div>
    </>
  )
}

export default AdminBooks