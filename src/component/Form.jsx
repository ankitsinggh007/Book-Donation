import React, { useState, useContext,useEffect } from 'react'
import { Button } from 'reactstrap'
import classes from "./Form.module.css"
import { BiDonateHeart } from "react-icons/bi"
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../App'
import db from './Firbase'
import { doc, updateDoc,getDoc } from "firebase/firestore";
import Swal from 'sweetalert2'

function Form() {
    const { LoggedInUserData, setLoggedInUserData, createUser } = useContext(User);
    const Navigate=useNavigate();
    const [Data,setData]=useState();
    const [prop, setprop] = useState({
        color:"#3B71CA",
        text:"Submit",
        Disabled:false,
      })

    const { Course } = useParams();

    useEffect(() => {
        const load = async () => {
            const docRef = doc(db, "Books", "Courses");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

            load();
    }, [])




    const [Book, setBook] = useState({
        BookId: "",
        Semester: "1",
        Address: "",
        Donor: LoggedInUserData.firstName,
        Title: "",
        Pages: "",
        Booklink: "",
        category:Course,
        Author_id:LoggedInUserData.id
    })
    const Submit = async (e) => {
        e.preventDefault();
        if(Course==="Bba"){
            console.log(Book)
        console.log(LoggedInUserData)
        
        setData({...Data,Bba:[...Data?.Bba,Book]});
        const obj={
            ...Data,Bba:[...Data?.Bba,Book]
        }
        const washingtonRef = doc(db, "Books", "Courses");
           console.log(Data,"UpdataBook")
        await updateDoc(washingtonRef, {
            ...obj
        });
        const washingtonRef1 = doc(db, "User", LoggedInUserData.id);
        const obj1={
            ...LoggedInUserData,Donated:[...LoggedInUserData.Donated,Book]
        }
        try{await updateDoc(washingtonRef1, {
            ...obj1
        });}catch(e){
            console.log(e)
        }
        setLoggedInUserData({...obj1})
        }
        else if(Course==="Bcom"){
            console.log(Book)
        console.log(LoggedInUserData)
        
        setData({...Data,Bcom:[...Data?.Bcom,Book]});
        const obj={
            ...Data,Bcom:[...Data?.Bcom,Book]
        }
        const washingtonRef = doc(db, "Books", "Courses");
           console.log(Data,"UpdataBook")
        await updateDoc(washingtonRef, {
            ...obj
        });
        const washingtonRef1 = doc(db, "User", LoggedInUserData.id);
        const obj1={
            ...LoggedInUserData,Donated:[...LoggedInUserData.Donated,Book]
        }
        try{await updateDoc(washingtonRef1, {
            ...obj1
        });}catch(e){
            console.log(e)
        }
        setLoggedInUserData({...obj1})

        }
        else if(Course==="Bca"){
            console.log(Book)
        console.log(LoggedInUserData)
        
        setData({...Data,Bca:[...Data?.Bca,Book]});
        const obj={
            ...Data,Bca:[...Data?.Bca,Book]
        }
        const washingtonRef = doc(db, "Books", "Courses");
           console.log(Data,"UpdataBook")
        await updateDoc(washingtonRef, {
            ...obj
        });
        const washingtonRef1 = doc(db, "User", LoggedInUserData.id);
        const obj1={
            ...LoggedInUserData,Donated:[...LoggedInUserData.Donated,Book]
        }
        try{await updateDoc(washingtonRef1, {
            ...obj1
        });}catch(e){
            console.log(e)
        }
        setLoggedInUserData({...obj1})

        }

        setprop({
            color:"grey",
            text:"Submited",
            Disabled:true,
          });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Books has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          
          setTimeout(()=>{Navigate("/home/Donor")},1600)
    }

    return (
        <div className={classes.background}>
            <form onSubmit={Submit} className={classes.form}>
                <legend> Donate Book <BiDonateHeart style={{marginTop:"5px"}} /></legend>
                <div className={classes.Category}>
                    <label for="Category">
                        Course
                    </label>
                    <input value={Course} type="text" id="Category" disabled ></input>
                </div>
                <div className={classes.Semester}>
                    <label for="Semester">
                        Semester
                    </label>
                    <select name="Semester" value={Book.Semester} defaultValue="1" id="Semester" style={{ width: "100px", fronSize: "1.4rem", marginRight: "100px" }}
                        onChange={(e) => setBook({ ...Book, Semester: e.target.value })}
                        required >
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                        <option value="5">5th</option>
                        <option value="6">6th</option>
                    </select>
                </div>
                <div className={classes.Thumbnail}>
                    <label for="Thumbnail">
                        book link
                    </label>
                    <input type="url" value={Book.Booklink} id="Thumbnail"
                        onChange={(e) => setBook({ ...Book, Booklink: e.target.value })}

                        required></input>
                </div>
                <div className={classes.title}>
                    <label for="Title">
                        Title
                    </label>
                    <input type="text" id="Title"
                        value={Book.Title}
                        required
                        onChange={(e) => setBook({ ...Book, Title: e.target.value })}

                    ></input>
                </div>
                <div className={classes.Pages}>
                    <label for="Pages">
                        Pages
                    </label>
                    <input type="number"
                        value={Book.Pages}
                        id="Pages" required
                        onChange={(e) => setBook({ ...Book, Pages: e.target.value })}

                    ></input>
                </div>
                <div className={classes.Adress}>
                    <label for="address">
                        Address
                    </label>
                    <input type="text" id="address"
                        value={Book.Address}
                        required
                        onChange={(e) => setBook({ ...Book, Address: e.target.value })}

                    ></input>
                </div>

                <div className={classes.id}>
                    <label for="BookId">
                        BookId
                    </label>
                    <input type="number"
                        value={Book.BookId}
                        id="BookId" required
                        onChange={(e) => setBook({ ...Book, BookId: e.target.value })}

                    ></input>
                </div>
                <Button type='submit' style={{BackgroundColor:`${prop.color}`}} disabled={prop.Disabled}>{prop.text}</Button>
            </form>
        </div>
    )
}

export default Form