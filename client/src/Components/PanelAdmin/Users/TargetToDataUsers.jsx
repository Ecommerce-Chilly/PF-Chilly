import React from "react";

function TargetToDataUsers(props) {
  return (
    <div>
      <div>
        <h1>Información del envio:</h1>
        <p>Name: {`${props.fisrtname} ${props.lastname}`} </p>
        <p>Address: {props.address} </p>
        <p>Country: {props.country} </p>
        <p>City: {props.city}</p>
        <p>Postal Code: {props.postalcode}</p>
        <p>Contact: {props.mobile}</p>
      </div>
    </div>
  );
}

export default TargetToDataUsers;
