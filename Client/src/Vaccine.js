import { Route, Link } from 'react-router-dom';
import './Vaccine.css';
import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Nav from "./Nav";
import Axios from 'axios';

function Preview() {
    console.log("hello");
    const location = useLocation();
    const id = location.id;
    const nav = () =>{
        if(id)
        {
            console.log("with id");
            return (<Nav id = {id} />)
        }
        else
        {
            console.log("without id");
            return(<Nav />)
        }
    }

    const myfun=()=>{
        var moreText = document.getElementById('more');
        var btntext = document.getElementById('btn');
      
        if (moreText.style.display === "inline") {
          moreText.style.display="none";
          btntext.innerHTML = "Read More";
        } 
        else{
            moreText.style.display="inline";
            btntext.innerHTML = "Show Less";
        }
      }
      const myfun1 = () => {
  
        var moreText = document.getElementById('more1');
        var btntext = document.getElementById('btn1');
      
        if (moreText.style.display === "inline") {
          moreText.style.display="none";
          btntext.innerHTML = "Read More";
        } 
        else{
            moreText.style.display="inline";
            btntext.innerHTML = "Show Less";
        }
      }

      const abc =() =>{
          console.log("function working");
      }

    return(
        <div className="Vaccine">
            {nav()}
            <main class="vac-info">
            <div class="vac-info-container">
                <div class="covishield" id="covishield">
                    <div>
                        <h2 className="heading-covi">Covishield</h2>
                        <h3>What about covishield</h3>
                        <p>The Oxford-AstraZeneca vaccine is being manufactured locally by the Serum Institute of India,
                        the world's largest vaccine manufacturer. It says it is producing more than 50 million doses a month.
                        The vaccine is made from a weakened version of a common cold virus (known as an adenovirus) from chimpanzees.
                        It has been modified to look more like coronavirus - although it can't cause illness......</p>
                        <div id="more">
                            <h3>Side Effects</h3>
                            <ul>
                                <li>headache</li>
                                <li>Tiredness</li>
                                <li>Muscle or joint aches</li>
                                <li>Nausea</li>
                                <li>Fever</li>
                                <li>Pain or tenderness at the injection site</li>
                            </ul>
                            <h3>Effectiveness</h3>
                            <p>The AZD1222 vaccine against COVID-19 has an efficacy of 63.09% against symptomatic SARS-CoV-2 infection. 
                                <br/>Longer dose intervals within the 8 to 12 weeks range are associated with greater vaccine efficacy.
                            </p>
                            <h3>Safety</h3>
                            <p>Two versions of the vaccine – produced by AstraZeneca-SKBio (Republic of Korea) and the Serum Institute of India – have been listed for emergency use by WHO. When the vaccine underwent SAGE consideration, it had undergone review by the European Medicines Agency (EMA).</p>
                            <h3>Recommended Dosage</h3>
                            <p>
                                The recommended dosage is two doses given intramuscularly (0.5ml each) with an interval of 8 to 12 weeks. 
                                <br/>Additional research is needed to understand longer-term potential protection after a single dose.  
                            </p>
                            <h3>Who is the vaccine not recommended for?</h3> 
                            <p>
                                People with a history of severe allergic reaction to any component of the vaccine should not take it.
                                <br/>
                                The vaccine is not recommended for persons younger than 18 years of age pending the results of further studies.
                            </p>   
                        </div>
                    </div>
                    <button id="btn" onClick={myfun} >Read more</button>
                </div>
                <div class="covaxin">
                    <h2>Covaxin</h2>
                    <h3>What about covaxin</h3>
                    <p>Covaxin is an inactivated vaccine which means that it is made up of killed coronaviruses,
                        making it safe to be injected into the body. Bharat Biotech used a sample of the coronavirus,
                        isolated by India's National Institute of Virology.when administered,
                        immune cells can still recognise the dead virus,
                        prompting the immune system to make antibodies against the pandemic virus........</p>
                    <div id="more1">
                        <h3>Side Effects</h3>
                        <ul>
                            <li>headache</li>
                            <li>nausea and vomiting</li>
                            <li>Cough, cold</li>
                            <li>Body ache</li>
                            <li>dizziness-giddiness</li>
                            <li>Pain or tenderness at the injection site</li>
                        </ul>
                        <h3>Effects</h3>
                        <p>
                            Interim results of Phase 3 efficacy trials of COVAXINshow 81% efficacy against SARS-CoV-2virus. The follow-up of participants in the trial is still ongoing.
                        </p>
                        <h3>Safety</h3>
                        <p>
                            Two versions of the vaccine – produced by AstraZeneca-SKBio (Republic of Korea) and the Serum Institute of India – have been listed for emergency use by WHO. When the vaccine underwent SAGE consideration, it had undergone review by the European Medicines Agency (EMA).
                        </p>
                        <h3>How minimize the adverse effects of this vaccine?</h3>
                        <p>In case of minor adverse effects such as injection site pain, tenderness, malaise, pyrexia, etc.,
                            paracetamol may be used to alleviate the symptoms.</p>
                        <h3>Precaution</h3>
                        <p>
                            Both the vaccines are safe but in case of any discomfort or complaint, ask the beneficiary to
                            visit the nearest health facility and/or call the health worker whose phone number is given in
                            the COWIN SMS received after vaccination.
                        </p>
                    </div>
                        
                        <button id="btn1" onClick={myfun1}>Read more</button>
                </div>
        </div>
        
    </main>
        </div>
    );
}

export default Preview;