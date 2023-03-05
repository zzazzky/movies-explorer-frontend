import { createRef } from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
  const aboutMeRef = createRef();
  const aboutProjectRef = createRef();
  const techsRef = createRef();

  return (
    <main>
      <Promo />
      <NavTab
        aboutMeRef={aboutMeRef}
        aboutProjectRef={aboutProjectRef}
        techsRef={techsRef}
      />
      <AboutProject ref={aboutProjectRef} />
      <Techs ref={techsRef} />
      <AboutMe ref={aboutMeRef} />
      <Portfolio />
    </main>
  );
}

export default Main;
