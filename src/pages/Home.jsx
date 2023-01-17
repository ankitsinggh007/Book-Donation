import React,{useContext, useEffect} from 'react'
import classes from "./Home.module.css"
import BCA from "../Media/BCA.png"
import BBA from "../Media/BBA.jpg"
import BCOM from "../Media/BCOM.webp"
import { User } from '../App'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {IoBookSharp} from "react-icons/io5"
import {MdAdminPanelSettings} from "react-icons/md"
import { Button } from 'reactstrap'
import {GoRequestChanges} from "react-icons/go"
function Home() {
const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
    const Navigate=useNavigate();
const {UserRole}=useParams();

    const link=useLocation();

    return (
        <div className={classes.Main}>
           {
            UserRole==="Donor" &&
            <>
             <div className={classes.header}>
                <span className={classes.admin} ><MdAdminPanelSettings/>Donor</span>
                <Link to={"Request"} style={{fontSize:"1.3rem",color:"white"}} >Request< GoRequestChanges/></Link>
                <Button style={{fontSize:"1.3rem"}} onClick={()=>{Navigate(`/home/${UserRole}/Books`)}}>Books you donated < IoBookSharp/></Button>

            </div>
           {LoggedInUserData.Role==="Donor" &&<span className={classes.Welcome}>{`hi,${LoggedInUserData.firstName}  today which book you want to donate,make sure you store book in correct option as given below`}</span>}
            {LoggedInUserData.Role!=="Donor" &&<span className={classes.Welcome}>{`hi, ${LoggedInUserData.firstName} which book you want to read you can choose from any of these options`}</span> }
            <div className={classes.Course}>
                <div className={classes.Card}>
                    <div class="card" className={classes.Body}>
                        <img src={BCOM} class="card-img-top" alt="BCA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bcom`} class="btn btn-primary"className={classes.Button}>Donate</Link>
                            
                        </div>
                    </div>




                </div>
                <div className={classes.Card}>
                <div class="card" className={classes.Body}>
                        <img src={BBA} class="card-img-top" alt="BBA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bba`} class="btn btn-primary"className={classes.Button}>Donate</Link>
                    
                        </div>
                    </div>
                </div>
                <div className={classes.Card}>
                <div class="card" className={classes.Body}>
                        <img src={BCA} class="card-img-top" alt="BCA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bca`} class="btn btn-primary"className={classes.Button}>Donate</Link>

                        </div>
                    </div>
                </div>
            </div>


            </>
           }
           {UserRole==="Reciever" &&
           <>
            <div className={classes.header}>
                <span className={classes.admin}><MdAdminPanelSettings/>Reciever</span>
                <Button style={{fontSize:"1.3rem"}} onClick={()=>{Navigate(`/home/${UserRole}/accept`)}}>accepted books< GoRequestChanges/></Button>
                <Button style={{fontSize:"1.3rem"}} onClick={()=>{Navigate(`/home/${UserRole}/Request`)}}>Pending request < IoBookSharp/></Button>

            </div>
           {LoggedInUserData.Role==="Donor" &&<span className={classes.Welcome}>{`hi,${LoggedInUserData.firstName}  today which book you want to donate,make sure you store book in correct option as given below`}</span>}
            {LoggedInUserData.Role!=="Donor" &&<span className={classes.Welcome}>{`hi ${LoggedInUserData.firstName}, which book you want to read you can choose from any of these options`}</span> }
            <div className={classes.Course}>
                <div className={classes.Card}>
                    <div class="card" className={classes.Body}>
                        <img src={BCOM} class="card-img-top" alt="BCA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bcom`} class="btn btn-primary"className={classes.Button}>Get</Link>
                            
                        </div>
                    </div>




                </div>
                <div className={classes.Card}>
                <div class="card" className={classes.Body}>
                        <img src={BBA} class="card-img-top" alt="BBA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bba`} class="btn btn-primary"className={classes.Button}>Get</Link>
                    
                        </div>
                    </div>
                </div>
                <div className={classes.Card}>
                <div class="card" className={classes.Body}>
                        <img src={BCA} class="card-img-top" alt="BCA" />
                        <div class="card-body">
                            <h5 class="card-title">Bachelors's in Computer Application</h5>
                            <p class="card-text">A Bachelor of Computer Applications (BCA) is a undergraduate degree course in computer applications.</p>
                            <Link to={`${link.pathname}/Bca`} class="btn btn-primary"className={classes.Button}>Get</Link>

                        </div>
                    </div>
                </div>
            </div>


           </>
           }





        </div>
    )
}

export default Home