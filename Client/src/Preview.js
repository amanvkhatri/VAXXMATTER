import { Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {slotinfo, consumerinfo } from "./BookVaxx";
import Nav from "./Nav";
import Axios from 'axios';

function Preview() {
    let history = useHistory();
    console.log("hello");
    const location = useLocation();
    const sess_id = location.sess_id;
    const id = consumerinfo.id;
    const nav = () =>{
        return (<Nav id = {id} />)
    }
    const data = {};
    const collectdata =() => {
        if(slotinfo){
            slotinfo.map((val) => {
                val.session.map((info) =>{
                    if (info.session_id == sess_id) {
                        data.name = val.name;
                        data.address = val.address;
                        data.center_id = val.center_id;
                        data.fee_type = val.fee_type;
                        data.date = info.date;
                        data.session_id = info.session_id;
                        data.vaccine = info.vaccine;
                        data.min_age_limit = info.min_age_limit;
                    }
                })

            })
        }
        console.log(data);
    }
    collectdata();

    const sendinfo =() => {
        Axios.post("http://localhost:5000/auth/bookslot", {
            id : consumerinfo.id,
            name : consumerinfo.name,
            aadhar : consumerinfo.aadhar,
            dob : consumerinfo.dob,
            gender : consumerinfo.gender,
            email : consumerinfo.email,
            ph : consumerinfo.ph,
            address : consumerinfo.add,
            state : consumerinfo.state,
            city : consumerinfo.city,
            pin_code: consumerinfo.pin_code,
            h_name : data.name,
            h_address : data.address,
            h_center_id : data.center_id,
            h_fee_type : data.fee_type,
            h_date : data.date,
            h_session_id : data.session_id,
            h_vaccine : data.vaccine,
            h_min_age_limit : data.min_age_limit,
      }).then((response) => {
        console.log(response.data);
        history.push({
            pathname: "/home",
            state:id
          });
      }, (error) => {
        console.log(error);
      });
    }

    return(
        <div className="Preview">
            {nav()}
            <div className="preview-container">
            <div className="button-container">
            <h1 className="register-id">Registered ID: {consumerinfo.id}</h1>
            <button className="sendinfo-button" onClick={sendinfo} >Confirm and Book Slot</button>
            </div>
            <div className="patient-info-container">

            
            <h2 style={{marginBottom: "15px"}}>Patient's Information </h2>

            <h1 className="normal-text"> <span className="dark-text">Name:</span> {consumerinfo.name}</h1>
            <h1 className="normal-text"><span className="dark-text">Aadhar Card:</span> {consumerinfo.aadhar}</h1>
            <h1 className="normal-text"><span className="dark-text">Date of Birth:</span> {consumerinfo.dob}</h1>
            <h1 className="normal-text"><span className="dark-text">Gender:</span> {consumerinfo.gender}</h1>
            <h1 className="normal-text"><span className="dark-text">Email:</span> {consumerinfo.email}</h1>
            <h1 className="normal-text"><span className="dark-text">Phone Number:</span> {consumerinfo.ph}</h1>
            <h1 className="normal-text"><span className="dark-text">Address:</span> {consumerinfo.add}</h1>
            <h1 className="normal-text"><span className="dark-text">State:</span> {consumerinfo.state}</h1>
            <h1 className="normal-text"><span className="dark-text">City: </span>{consumerinfo.city}</h1>
            <h1 className="normal-text"><span className="dark-text">PIN Code:</span> {consumerinfo.pin_code}</h1>
            </div>
            <div className="vacc-center-info">
                <h2 style={{marginBottom: "15px"}} >Vaccination Center Information </h2>
                <h1 className="normal-text"><span className="dark-text">Name:</span>{data.name}</h1>
                <h1 className="normal-text"><span className="dark-text">Address:</span>{data.address}</h1>
                <h1 className="normal-text"><span className="dark-text">Center id::</span>{data.center_id}</h1>
                <h1 className="normal-text"><span className="dark-text">fee Type:</span>{data.fee_type}</h1>
                <h1 className="normal-text"><span className="dark-text">Date:</span>{data.date}</h1>
                {/* <h1 className="normal-text">{data.session_id}</h1> */}
                <h1 className="normal-text"><span className="dark-text">Vaccine Name:</span>{data.vaccine}</h1>
                {/* <h1 className="normal-text"><span className="dark-text">Name:</span>{data.min_age_limit}</h1> */}
            </div>
            </div>
           
        </div>
    );
}

export default Preview;