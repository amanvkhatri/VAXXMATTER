import React, { useState, useEffect } from 'react';
import { useHistory, useLocation} from "react-router-dom";
import Axios from 'axios';

function Verify() {
    let history = useHistory();
    const location = useLocation();
    const [email, setemail] = useState("");
    const id = location.state;
    const [v_otp, setv_otp] = useState("");

    const sendOTP = () => {
        Axios.post("http://localhost:5000/auth/otp", {
        id: id
        }).then((response) => {
            console.log("OTP Send");
        });
    }
    const getemail = () => {
        Axios.post("http://localhost:5000/auth/emailforotp", {
        id: id
        }).then((response) => {
            setemail(response.data);
        });
    }
    
    const display = () =>{
        if(email.length){
            return(
                <div>
                    <h4>Send OTP to {email}</h4>
                </div>
            )
        }
    }

    useEffect(() => {
        // go get some data from an API.
        getemail();
    }, [id]);

    const verifyOTP = () => {
        console.log("verifyOTP me aagaya");
        Axios.post("http://localhost:5000/auth/verify", {
        id: id,
        v_otp: v_otp
        }).then((response) => {
            const {isLogin} = response.data;
            console.log(isLogin);
            if(isLogin == "true"){
                history.push({
                    pathname: "/home",
                    state:id
                });
            }
            if(isLogin == "false"){
                document.getElementById('auth').innerHTML = "Wrong OTP";
            }
        });
    };

  return (
    <div className="verify-container">
        <h1>Validate OTP</h1>
        <div class="verify" >
            <div class="mb-3">
                {display()}
                <button onClick={sendOTP}>Send OTP</button>
                <label for="OTP">Enter OTP here:</label>
                <input type="number" class="form-control" id="otp" name="pas" onChange={(event) => {
                    setv_otp(event.target.value);
                }} />
                
                <button onClick={verifyOTP}>Validate OTP</button>
            </div>
            
            <h2 id="auth"></h2>
        </div>
    </div>
  );
}

export default Verify;