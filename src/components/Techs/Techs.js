import { forwardRef } from "react";
import "./Techs.css";

const Techs = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__cards app__list">
          <li className="techs__card app__list-item">
            <p className="techs__card-text">HTML</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">CSS</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">JS</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">React</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">Git</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">Express.js</p>
          </li>
          <li className="techs__card app__list-item">
            <p className="techs__card-text">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
});

export default Techs;
