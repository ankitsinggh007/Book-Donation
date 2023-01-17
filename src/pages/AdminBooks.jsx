import React,{useContext} from 'react'
import { User } from '../App';
import classes from "./AdminBooks.module.css"
import {IoBookSharp} from "react-icons/io5"
import {MdAdminPanelSettings} from "react-icons/md"
import { Button } from 'reactstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc ,doc} from 'firebase/firestore';
import db from '../component/Firbase';

function AdminBooks() {
  const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
const Navigate=useNavigate();
 
const loc=useParams();
const location=useLocation();
console.log(loc,location)
const cat=location.pathname.split("/")[3];
console.log(cat)

    const Accept=async(obj,e)=>{
//   fetch & Update library data 
console.log(obj,e)
const docRef = doc(db, "Books", `Courses`);
const docSnap = await getDoc(docRef);
console.log(docSnap);
const obj1=docSnap.data()[obj.category];
console.log(obj1);
const index=obj1.findIndex((obj1)=>obj1.Title===obj.Title);
console.log(index);
obj1.splice(index,1);
console.log(obj1);
const obj3={
    ...docSnap.data(),[obj.category]:obj1
}
console.log(obj3);
const docker=await updateDoc(docRef,{
    ...obj3

})
// put data in User access
const washing=doc(db,"User",obj.reciver_id);
const Userdetails=await getDoc(washing);
console.log(Userdetails.data(),"");
const temIndex=Userdetails.data().Cart.findIndex((obj1=>obj1.Title===obj.Title));
console.log(temIndex);
console.log(Userdetails.data().Cart,"useDetails");
const array99=Userdetails.data().Cart;
console.log(array99,"before")
array99.splice(temIndex,1);
console.log(array99,"after");
console.log(Userdetails.data().Cart);
const obj5={
    ...Userdetails.data(),acces:[...Userdetails.data().acces,obj],Cart:[...array99]
}
await updateDoc(washing,{
    ...obj5
})
// remove from donor request list
const Donor=doc(db,"User",LoggedInUserData.id);
console.log(LoggedInUserData)
const array=LoggedInUserData.Request.findIndex(obj1=>obj1.Title ===obj.Title);
console.log(array)
LoggedInUserData.Request.splice(array,1);
const obj6={
    ...LoggedInUserData,Request:[...LoggedInUserData.Request]
}
console.log(obj6)
await updateDoc(Donor,{
...obj6
    });
    setLoggedInUserData({...obj6});





    }
return (
    <div className={classes.box}>
   
   { cat!=="Request"  &&<div className={classes.Container}>
        
        {
           LoggedInUserData.Donated?.map((obj,i)=>{
                return(
                    <div className={classes.card}>
        <img src={obj.Booklink} alt={obj.Title}/>
        <span className={classes.details}>
<span>
<span>Title:</span> <span>{obj.Title}</span>
s
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
        {
            cat!=="Request"  && LoggedInUserData.Donated.length===0 &&
            <div className={classes.nothing}>
            <span > Currently ,You don't donate any book </span>
            </div>
        }
        </div>}
        {cat=="Request" &&<div className={classes.Container}>
        
        {
            LoggedInUserData[cat].length!==0 &&
           LoggedInUserData[cat]?.map((obj,i)=>{
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
<button style={{backgroundColor:"Green",color:"white" }} onClick={(e)=>Accept(obj,e)}>Accept</button>
        </span>
    </div>
                )
            })
        }
        {
            LoggedInUserData[cat].length==0 &&
            <div className={classes.nothing}>
            <span > Currently ,You don't have any request</span>
            </div>
            }
        </div>}
    </div>
  )
}

export default AdminBooks