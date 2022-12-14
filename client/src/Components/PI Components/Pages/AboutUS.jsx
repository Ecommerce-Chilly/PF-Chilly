import React from "react";
import Accordeon from "./Accordeon";
import AboutCard from "./AboutCard";
// import Mailer from "../../Mailer/Mailer";

function AboutUS() {
  let infoShino = {
    text: "Hello, i'm from Argentina. I prefer working in front, but i also know backend. I'm good working with people and i like to learn everything i can. Feel free to contact me!",
    img: 'https://media.licdn.com/dms/image/D4D35AQH1zzneub_IYQ/profile-framedphoto-shrink_800_800/0/1649440217896?e=1671652800&v=beta&t=DdddytnlSy1Vht2KZixS4HjCFetqh5Gu3SI_6H7m3Gs',
    url: 'https://www.linkedin.com/in/jes%C3%BAs-torrecilla-4324b9214/',
  };
  let infoJose = {
    text: 'Hi, my name is José, I am from Argentina, and I have a strong preference for front-end work, but I also have knowledge in the back end. Contact me on LinkedIn.',
    img: 'https://media.licdn.com/dms/image/D4D03AQHFelWOQYrqfg/profile-displayphoto-shrink_800_800/0/1663561013663?e=1676505600&v=beta&t=EVJhs_Wes7mz05-vDrc-w4OV6Ari6KS3ll1uYwUgtks',
    url: 'https://www.linkedin.com/in/jose-maria-ceballos-a3379524a/',
  };
  let infoCinthia = {
    text: "Hello! my name is Cinthia Maldonado. I enjoy working in a team, collaborating and bringing value. I'm dedicated, proactive and positive. ",
    img: 'https://media.licdn.com/dms/image/C4E03AQHtqmdlbfwrHA/profile-displayphoto-shrink_800_800/0/1619871246775?e=1676505600&v=beta&t=5ggKTniva8XlAc7wRyjygJUzV5hXw5ofcJYsNcdjOQk',
    url: 'https://www.linkedin.com/in/cinthia-maldonado-rafael-902233211/',
  };
  let infoMaxi = {
    text: "Hi, I'm from Tucumán Argentina, I like achilatas and milanesa sandwiches.",
    img: 'https://media.licdn.com/dms/image/D4D35AQFQwuWgC1hs4Q/profile-framedphoto-shrink_800_800/0/1660833220208?e=1671652800&v=beta&t=loXECtO39qqiABWI4S0_mkSQUrKJbqI7uRqs53lrUuw',
    url: 'https://www.linkedin.com/in/maximiliano-costilla-1805b4213/',
  };
  let infoDante = {
    text: "This dev student is a coding wizard with 8 magical cats. They're unstoppable when it comes to tackling tough projects and defeating evil videogame bosses.",
    img: 'https://media.licdn.com/dms/image/D4D35AQGH4DdhV2bXGA/profile-framedphoto-shrink_800_800/0/1633987157969?e=1671652800&v=beta&t=ExDUGTW2zErht7_4Dcs4-Cq244k9pUg1SnAgDgWcqxA',
    url: 'https://www.linkedin.com/in/erio-donalicio-gimenez/',
  };
  let infoGuillo = {
    text: 'I was born in Salta, Argentina. I really enjoy learning new stuff and working with people where I can push my limits!',
    img: 'https://media.licdn.com/dms/image/C5603AQHQjd2gydVgiA/profile-displayphoto-shrink_800_800/0/1662999915693?e=1676505600&v=beta&t=rWxuVwMQmhNW3i_gcZPty15BVMY6wTvq_lI8tG1f20Y',
    url: 'https://www.linkedin.com/in/guillermo-duran-6a0ba023a/',
  };
  let infoEsteban = {
    text: "Hey, I'm from Colombia and I'm the backend guy, I really like to solve logic problems and work with friends because it's a lot of fun.",
    img: 'https://cdn.discordapp.com/attachments/1016546130877763624/1052673237689049178/6d91dc6f-81f1-4658-b07d-f0b6e508e7a0.jpg',
    url: 'https://www.linkedin.com/in/esteban-fabian-cardona-sarria-7695041a8/',
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
<<<<<<< HEAD
        <AboutCard name={"Jose Maria Ceballos"} />
        <AboutCard name={"Guillermo Duran"} />
        <AboutCard name={"Jesus Torrecilla"} />
        <AboutCard name={"Esteban Wonder"} />
        <AboutCard name={"Cinthia Maldonado"} />
        <AboutCard name={"Maximiliano Costilla"} />
        <AboutCard name={"Dante Erio Donalicio"} />
        <AboutCard name={"Juan Noya"} />
=======
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
>>>>>>> 8a61313b7088d797a06bf4a942bd8cf3f0cabbb8
      </div>
      <Accordeon />
      {/* <Mailer /> */}
    </div>
  );
}

export default AboutUS;

