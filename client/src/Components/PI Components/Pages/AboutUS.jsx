import React from "react";
import Accordeon from "./Accordeon";
import AboutCard from "./AboutCard";
import est from "../../../img/photos/est.jpeg"
import cin from "../../../img/photos/cin.jpeg"
import dan from "../../../img/photos/dan.jpeg"
import jes from "../../../img/photos/jes.jpeg"
import jos from "../../../img/photos/jos.jpeg"
import max from "../../../img/photos/max.jpeg"
import gui from "../../../img/photos/gui.jpeg"
// import Mailer from "../../Mailer/Mailer";

function AboutUS() {
  let infoShino = {
    text: "Hello, i'm from Argentina. I prefer working in front, but i also know backend. I'm good working with people and i like to learn everything i can. Feel free to contact me!",
    img: jes,
    url: 'https://www.linkedin.com/in/jes%C3%BAs-torrecilla-4324b9214/',
  };
  let infoJose = {
    text: 'Hi, my name is José, I am from Argentina, and I have a strong preference for front-end work, but I also have knowledge in the back end. Contact me on LinkedIn.',
    img: jos,
    url: 'https://www.linkedin.com/in/jose-maria-ceballos-a3379524a/',
  };
  let infoCinthia = {
    text: "Hello! my name is Cinthia Maldonado. I enjoy working in a team, collaborating and bringing value. I'm dedicated, proactive and positive. ",
    img: cin,
    url: 'https://www.linkedin.com/in/cinthia-maldonado-rafael/',
  };
  let infoMaxi = {
    text: "Hi, I'm from Tucumán Argentina, I like achilatas and milanesa sandwiches.",
    img: max,
    url: 'https://www.linkedin.com/in/maximiliano-costilla-1805b4213/',
  };
  let infoDante = {
    text: "This dev student is a coding wizard with 8 magical cats. They're unstoppable when it comes to tackling tough projects and defeating evil videogame bosses.",
    img: dan,
    url: 'https://www.linkedin.com/in/erio-donalicio-gimenez/',
  };
  let infoGuillo = {
    text: 'I was born in Salta, Argentina. I really enjoy learning new stuff and working with people where I can push my limits!',
    img: gui,
    url: 'https://www.linkedin.com/in/guillermo-duran-6a0ba023a/',
  };
  let infoEsteban = {
    text: "Hey, I'm from Colombia and I'm the backend guy, I really like to solve logic problems and work with friends because it's a lot of fun.",
    img: est,
    url: 'https://www.linkedin.com/in/estebancardonasarria/',
  };
  let infoCoco = {
    text: 'Coco likes to code very much so wow!',
    img: 'https://www.macocaya.es/7933-large_default/crocodile-head.jpg',
    url: '#',
  };
  return (
    <div>
      <h2 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
        About us:
      </h2>

      <div class="flex w-11/12 flex-wrap justify-evenly mb-10 mx-auto">
        <AboutCard
          name={'Jose Maria Ceballos'}
          info={infoJose.text}
          img={infoJose.img}
          url={infoJose.url}
        />
        <AboutCard
          name={'Guillermo Duran'}
          info={infoGuillo.text}
          img={infoGuillo.img}
          url={infoGuillo.url}
        />
        <AboutCard
          name={'Jesus Torrecilla'}
          info={infoShino.text}
          img={infoShino.img}
          url={infoShino.url}
        />
        <AboutCard
          name={'Esteban Cardona'}
          info={infoEsteban.text}
          img={infoEsteban.img}
          url={infoEsteban.url}
        />
        <AboutCard
          name={'Cinthia Maldonado'}
          info={infoCinthia.text}
          img={infoCinthia.img}
          url={infoCinthia.url}
        />
        <AboutCard
          name={'Maximiliano Costilla'}
          info={infoMaxi.text}
          img={infoMaxi.img}
          url={infoMaxi.url}
        />
        <AboutCard
          name={'Dante Erio Donalicio'}
          info={infoDante.text}
          img={infoDante.img}
          url={infoDante.url}
        />
        <AboutCard
          name={'Coco Drilo'}
          info={infoCoco.text}
          img={infoCoco.img}
          url={infoCoco.url}
        />
      </div>
      <Accordeon />
      {/* <Mailer /> */}
    </div>
  );
}

export default AboutUS;

