import recat from 'react';
import { Route, Link } from 'react-router-dom';
import Session from './Session';

function Center({centers}) {
    const showcenter = () =>{
        return(
            <div>
                <div className="center-main">
                    <div className="center-name">
                    <h2>Center Name: {centers.name}</h2>   
                    <h2>Center ID: {centers.center_id} </h2>
                    </div>
                    <div className="center-address">
                    <h3>Address: {centers.address} </h3>
                    <h3>Fee: {centers.fee_type} </h3>
                    </div>
                    <div className="session">
                    {sessions()}
                    </div>
                </div>
               
            </div>
        );
    }
    const sessions = () => {
        var abc = centers.session.map((sessions) => {
            return (<Session sessions = {sessions}/>);
        });
        return(abc);
    }

  return (
    <div className="Center">
        {showcenter()}
    </div>
  );
}

export default Center;