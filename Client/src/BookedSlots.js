import { Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Nav from "./Nav";
import Axios from 'axios';

function BookedSlots() {
    const location = useLocation();
    const id = location.id;
    const history = useHistory();
    const [data, setdata] = useState("");

    const getdata = () => {
        if(id){
            Axios.post("http://localhost:5000/auth/bookeddata", {
                    id: id
            }).then((response) => {
                console.log(response.data);
                if(response.data.length){
                    setdata(response.data);
                }
            }, (error) => {
                console.log(error);
            });
        }
        else{
            history.push({
                pathname: "/login"
              });
        }
    }

    const bookslot =()=>{

        history.push({
            pathname: "/bookvaxx",
            id:id
          });
    } 
    
    const display = () =>{
        if(data.length>0){
            var abc = data.map(val => {
                return(
                <div>
                    <div className="preview-container">
            <div className="button-container">
            <h1 className="register-id">Registered ID: {val.v_code}</h1>
            <h1 className="register-id">Booking ID: {val.Booking_id}</h1>
            <button className="sendinfo-button" onClick={bookslot}>Book slot for new person</button>
            </div>
            <div className="patient-info-container">

            
            <h2 style={{marginBottom: "15px"}}>Patient's Information </h2>

            <h1 className="normal-text"> <span className="dark-text">Name:</span> {val.name}</h1>
            <h1 className="normal-text"><span className="dark-text">Aadhar Card:</span> {val.aadhar}</h1>
            <h1 className="normal-text"><span className="dark-text">Date of Birth:</span> {val.dob}</h1>
            <h1 className="normal-text"><span className="dark-text">Gender:</span> {val.gender}</h1>
            <h1 className="normal-text"><span className="dark-text">Email:</span> {val.email}</h1>
            <h1 className="normal-text"><span className="dark-text">Phone Number:</span> {val.ph}</h1>
            <h1 className="normal-text"><span className="dark-text">Address:</span> {val.address}</h1>
            <h1 className="normal-text"><span className="dark-text">State:</span> {val.state}</h1>
            <h1 className="normal-text"><span className="dark-text">City: </span>{val.city}</h1>
            <h1 className="normal-text"><span className="dark-text">PIN Code:</span> {val.pin}</h1>
            </div>
            <div className="vacc-center-info">
                <h2 style={{marginBottom: "15px"}} >Vaccination Center Information </h2>
                <h1 className="normal-text"><span className="dark-text">Name:</span>{val.h_name}</h1>
                <h1 className="normal-text"><span className="dark-text">Address:</span>{val.h_address}</h1>
                <h1 className="normal-text"><span className="dark-text">Center id::</span>{val.h_center_id}</h1>
                <h1 className="normal-text"><span className="dark-text">fee Type:</span>{val.h_fee_type}</h1>
                <h1 className="normal-text"><span className="dark-text">Date:</span>{val.h_date}</h1>
                {/* <h1 className="normal-text">{data.session_id}</h1> */}
                <h1 className="normal-text"><span className="dark-text">Vaccine Name:</span>{val.h_vaccine}</h1>
                {/* <h1 className="normal-text"><span className="dark-text">Name:</span>{data.min_age_limit}</h1> */}
            </div>
            </div>
                </div>
                )
            })
            return(abc);
        }
    }

    useEffect(() => {
        // go get some data from an API.
        getdata();
    }, [id]);
    
    return(
        <div className="BookedSlots">
        <Nav id = {id} />
        {display()}
        <div>
        </div>
        </div>
    );
}

export default BookedSlots;