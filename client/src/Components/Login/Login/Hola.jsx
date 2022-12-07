import React from "react";
import { useSelector } from "react-redux";

export default function Hola() {
  const admin = useSelector((state) => state.admin);
  return (
    <div>
      {admin ? (
        <div>soy un administrador todo pro</div>
      ) : (
        <div>no sos y ya</div>
      )}
    </div>
  );
}
