import React,{useContext, useEffect, useState} from 'react'
import { User } from '../App';
import classes from "./Book.module.css"
import {IoBookSharp} from "react-icons/io5"
import {MdAdminPanelSettings} from "react-icons/md"
import { Button } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc,updateDoc } from "firebase/firestore";
import db from '../component/Firbase';


function AdminBooks() {
  const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
            const [Books, setBooks] = useState([]);
            const {Courses}=useParams();
            const [prop, setprop] = useState({
                text:"Request",
                disabled:false,
                coloe:"#3B71CA"
            })

  useEffect(()=>{
    console.log("Outside")

                if(LoggedInUserData.isAuthrized){
                    console.log("inside")
               const fetch_books=async()=>{
                    const docRef = doc(db, "Books", "Courses");
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log("Document data:", );
                        setBooks(docSnap.data())
                      } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                      }
                        
                }
                fetch_books();
            
            }


            },[]);

        const Request=async(obj,e)=>{
            console.log(obj,e)
            // FetchAuthor details
            console.log(obj)
            const obj3={
              ...obj,reciver_id:LoggedInUserData.id
            }
            const docRef = doc(db, "User", `${obj.Author_id}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:",docSnap.data() );

                const obj1={
                    ...docSnap.data(),Request:[...docSnap.data().Request,obj3]
                }
                await updateDoc(docRef,{
                    ...obj1
                })
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            const washingtonRef1 = doc(db, "User", LoggedInUserData.id);
            const obj1={
                ...LoggedInUserData,Cart:[...LoggedInUserData.Cart,obj]
            }
            setLoggedInUserData({...obj1})
            try{await updateDoc(washingtonRef1, {
                ...obj1
            });}catch(e){
                console.log(e)
            }
            setprop({text:"Pending...",disabled:true,color:"grey"})
        }

console.log(LoggedInUserData)


const Navigate=useNavigate();
// console.log(Books)
// console.log(Courses)
// console.log(Books[Courses])
  return (
    <>
   
   { (Courses=="Bcom" || Courses=="Bba" || Courses=="Bca") &&
     <div className={classes.Container}>
        
     { Books[Courses]?.length!==0 &&
        Books[Courses]?.map((obj,i)=>{
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
     <div onClick={(e)=>Request(obj,e)} disabled={prop.disabled}  style={{backgroundColor:`${prop.color}`}}className={classes.action}>{prop.text}</div>
 </div>
             )
         })
     }
      {
      Books[Courses]?.length===0 &&
      <div className={classes.nothing}>
        <span>Currently no book present in {Courses} </span>
      </div>

     }
     </div>
   }
   { Courses==="accept" &&
     <div className={classes.Container}>
        
     {
      LoggedInUserData.acces.length!==0 &&
        LoggedInUserData.acces.map((obj,i)=>{
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
<br/>
 <span>Donor's Address:</span><span>{obj.Address}</span>

</span>
     </span>
 </div>
             )
         })
     }
     {
      LoggedInUserData.acces.length===0 &&
      <div className={classes.nothing}>
        <span>there is nothing to show</span>
      </div>

     }
     </div>
   }
   { Courses==="Request" &&
     <div className={classes.Container}>
        
     {
      LoggedInUserData.Cart.length!==0 &&
        LoggedInUserData.Cart.map((obj,i)=>{
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
<br/>
<Button  style={{backgroundColor:"Red",color:"white",padding:"10px,10px"}}>Peding...</Button>
</span>
     </span>
 </div>
             )
         })
     }
     {
      LoggedInUserData.Cart.length===0 &&
      <div className={classes.nothing}>
        <span>Request a book </span>
      </div>

     }
     </div>
   }
    </>

  )
}

export default AdminBooks