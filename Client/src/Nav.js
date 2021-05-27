import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {useHistory, useLocation} from "react-router-dom";
    
const Nav = (code) => {
    let history = useHistory();
    const id = code.id;
    if(id>0)
    {
        Axios.post("http://localhost:5000/auth/getdata", {
        id: id
        }).then((response) => {
            console.log(response.data.fname + " " + response.data.lname);
            document.getElementById('auth').innerHTML = response.data.fname + " " + response.data.lname;
        });
    }

    const gotohome = () => {
        if(id>0){
            history.push({
            pathname: "/home",
            state:id
          });
        }
        else{
            history.push({
                pathname: "/",
              });
        }
    }
    const gotovaccine = () => {
        if(id>0){
            history.push({
            pathname: "/vaccine",
            id:id
          });
        }
        else{
            history.push({
                pathname: "/vaccine",
              });
        }
    }
    const gotobookedslots = () => {
        if(id>0){
            history.push({
            pathname: "/bookedslots",
            id:id
          });
        }
        else{
            history.push({
                pathname: "/login",
                id:id
              });
        }
    }
    
    return(
        <div className="navbar">
            <nav>
            <div className="logo">
                <h4>VAXXMATTER</h4>
            </div>
            
            <ul className="nav-links">
                <li onClick={gotohome}><Link>Home</Link></li>
                <li onClick={gotovaccine}><Link>Vaccine</Link></li>
                <li onClick={gotobookedslots}><Link>Pre Booked Slots</Link></li>
                <li><Link id="auth" to="/login">Signup/login</Link></li>    
            </ul>
            <div className="burger">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </nav>
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


export default Nav;