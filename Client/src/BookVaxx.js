import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Nav from './Nav';
import Center from './Center';
import {useHistory, useLocation} from "react-router-dom";
import data from '../node_modules/indian-cities-json/cities';
import validator from 'aadhaar-validator'

var consumerinfo;
var slotinfo;
function BookVaxx() {
    const location = useLocation();
    const id = location.id;
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [pin, setpin] = useState("");
    const [name, setname] = useState("");
    const [aadhar, setaadhar] = useState("");
    const [dob, setdob] = useState("");
    const [gender, setgender] = useState("");
    const [ph, setph] = useState("");
    const [email, setemail] = useState("");
    const [add, setadd] = useState("");
    const [isvalid, setisvalid] = useState("");
    
    const [info, setinfo] = useState([]);
    const [slot, setslot] = useState("");
    
    const showcity = (e) => {
        const selectedstate = e.target.value
        setstate(selectedstate);
        const citylist = data.cities.filter(city => city.state == selectedstate).map((city) => city.name);
        var sel = document.getElementById('city');
        sel.innerHTML = "";
        var opt = document.createElement("option");
        opt.id = "disable";
        opt.text = "Chose Your City";
        sel.add(opt, null)
        document.getElementById("disable").disabled = true;
        for(var i=0; i<citylist.length;i++){
            var opt = document.createElement("option");
            opt.text = citylist[i];
            sel.add(opt, null)
        };
    };

    const getData = async() => {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var d;
        var m;
        if(day<10)
        {
            d = "0"+day;
            console.log("sfhgfs");
        }
        else{
            d = day;
        }
        if(month<10)
        {
            m = "0"+month;
        }
        else{
            m = month;
        }
        var date = d + "-" + m + "-" + year;
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`);
        const data = await response.json();
        setinfo(data);
        console.log(data);
      };

    useEffect(() => {
        // go get some data from an API.
        getData();
    }, [pin.length == 6]);
        
    const display = () =>{
        if (slot.length)
        {
            console.log("Display data");
            var abc = showdata();
            return(abc);
        }
    }


    const showdata = () => {
        consumerinfo = {
            id: id,
            name: name,
            aadhar: aadhar,
            dob: dob,
            gender: gender,
            ph: ph,
            email: email,
            add: add,
            pin:pin,
            state: state,
            city: city,
            pin_code: pin
        }
        var abc = slot.map((centers) => {
            return(<Center centers = {centers}/>);
        });
        return(abc);
    }

    const showcenters = (e) => {
        e.preventDefault();
        var centerinfo = [];
        if(info.error)
        {
            console.log("Please Enter Valid Pin code");
        }
      if(info)
      {
        var center = info.centers;
        if(center){
          for(var j = 0; j<center.length; j++)
          {
            var c_info = {};
            c_info.name = center[j].name;
            c_info.center_id = center[j].center_id;
            c_info.address = center[j].address;
            c_info.fee_type = center[j].fee_type;
            c_info.name = center[j].name;
            { // Session Details
              var session = center[j].sessions;
              var all_Session = [];
              for(var i = 0; i<session.length; i++)
              {
                var s_session = {};
                s_session.min_age_limit = session[i].min_age_limit;
                s_session.date = session[i].date;
                s_session.vaccine = session[i].vaccine;
                s_session.available_capacity = session[i].available_capacity;
                s_session.session_id = session[i].session_id;
                all_Session.push(s_session);
              }
            }
            c_info.session = all_Session;
            centerinfo.push(c_info);
          }
        }
      }
      console.log(centerinfo);
      setslot(centerinfo);
      slotinfo = centerinfo;
    }
    const validateaadhar = () =>{
        console.log("in abc");
        var valid = validator.isValidNumber(aadhar);
        if(!valid){
            alert("Wrong Aadhar Card Number");
            var x=document.getElementById('aadhar');
            x.value = "";
        }
    }
  return (
    <div className="BookVaxx">
        <Nav id = {id}/>
        <main id="fullpage" class="main">
            <section id="sectionB" className="section two">
            <div class="book-info">
                <h1>Provide Details below</h1>
                <form class="book-vaccine">
                    <div class="info user flex">
                        <h2>Provide your Basic Details</h2>
                        <div >
                        <input type="text" placeholder="Name" onChange={(event) => {setname(event.target.value);}}/>
                        <input id="aadhar" onBlur={validateaadhar} type="number" placeholder="Aadhar Number" onChange={(event)=>{setaadhar(event.target.value)}}/>

                        <small>D.O.B :</small>
                     <input id="dob" type="date" title="date of birth" onChange={(event) => {setdob(event.target.value);}} />
                        <select class="gender" onChange={(event) => {setgender(event.target.value);}}>
                            <option disabled selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>

                        </select>
                        </div>
                    </div >
                    <div class="info contact flex ">
                        <h2>Contact Info.</h2>
                        <h4>(details will be sent to email- amanvkhatri@gmail.com and registered mobile Number)</h4>
                        <div>
                        <input type="number" name="" id="" placeholder="Phone number" onChange={(event) => {setph(event.target.value);}} />
                        <input type="text" name="" id="" placeholder="email" onChange={(event) => {setemail(event.target.value);}}/>
                        </div>
                    </div>
                    <div className="info address flex">
                    <h2>Residential Address</h2>
                        <div>
                        <input type="text" placeholder="Address" name="" id="" onChange={(event) => {setadd(event.target.value);}}/>
                        <input type="number" placeholder="Pin code" name="" id="" onChange={(event) => {setpin(event.target.value);}}/>
                        <select class="State" placeholder = "Select Your State" onChange={showcity}>
                            <option disabled selected>Chose a state</option>
                        {data.states.map((state)=>(
                            <option id="state">{state.name}</option>
                        ))};
                        </select>
                        
                        <select class="City" id="city" onChange={(event) => {setcity(event.target.value);}}>
                            <option value="" disabled selected>First Please Select Your State</option>
                        </select>
                        </div>
                    </div>
                    
                    <div className="center-button">
                    <button onClick={showcenters} >Show Available Centers</button>
                    </div>
                    <div>
                        {display()}
                    </div>
                </form>
            </div>
            </section>
        </main>
        
    </div>
    
  );
}

function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    if(burger){
        burger.addEventListener("click", () => {
        
            nav.classList.toggle("nav-active");
            
        
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ""
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
                }
            });
        
            burger.classList.toggle("toggle");
        });
    }
    
}
navSlide();

export {BookVaxx as default, slotinfo, consumerinfo};