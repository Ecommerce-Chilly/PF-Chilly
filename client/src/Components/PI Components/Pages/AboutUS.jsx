import React from "react";
import Accordeon from "./Accordeon";
import AboutCard from "./AboutCard";
import Mailer from "../../Mailer/Mailer";

function AboutUS() {
  return (
    <div>
      <h2 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
        About us:
      </h2>

      <div class="flex w-11/12 flex-wrap justify-evenly mb-10 mx-auto">
        <AboutCard name={"Jose Maria Ceballos"} />
        <AboutCard name={"Guillermo Duran"} />
        <AboutCard name={"Jesus Torrecilla"} />
        <AboutCard name={"Esteban Wonder"} />
        <AboutCard name={"Cinthia Maldonado"} />
        <AboutCard name={"Maximiliano Costilla"} />
        <AboutCard name={"Dante Erio Donalicio"} />
        <AboutCard name={"Juan Noya"} />
      </div>
      <Accordeon />
      <Mailer />
    </div>
  );
}

export default AboutUS;
