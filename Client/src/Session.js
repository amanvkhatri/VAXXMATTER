import { Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";

function Session({sessions}) {
    let history = useHistory();
    const [sess_id, setsess_id] = useState("");

    const details = () =>{
        return(
            <div className="details-containers">
            <div className="details-wrapper" value = {sessions.session_id} id="main" onClick={(e) => {savedata(sessions.session_id);}} >
                
                <p>Date: {sessions.date}</p>
                <p>Available Capacity: {sessions.available_capacity}</p>
                <p>Minimum Age Limit: {sessions.min_age_limit} years</p>
                <p>Vaccine: {sessions.vaccine} </p>
                {showbutton()}
                
            </div>
            </div>
        );
    }
    const savedata = (e) => {
        setsess_id(e);
    }
    const showbutton = () => {
        if (sess_id.length){
            if(sessions.available_capacity > 0){
                const h2 = document.getElementById('show');
                if(h2){
                    h2.remove();
                }
                const tag = document.getElementById('save');
                if(tag){
                    tag.remove();
                }
                return(
                    <button id = "save" onClick ={Preview} >Save and Preview</button>
                );
            }
            else{
                const tag = document.getElementById('save');
                if(tag){
                    tag.remove();
                }
                const h2 = document.getElementById('show');
                if(h2){
                    h2.remove();
                }
                return(
                    <h2 id = "show">No Slots Available</h2>
                );
            }
        }
    }
    const Preview = () =>
    {
        history.push({
            pathname: "/preview",
            sess_id: sess_id
          });
    }

  return (
    <div className="Session">
        {details()}
    </div>
  );
}

export default Session;