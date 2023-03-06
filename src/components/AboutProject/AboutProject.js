import { forwardRef } from "react";
import "./AboutProject.css";

const AboutProject = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-container">
        <h3 className="about-project__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about-project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__timeline-container">
        <div className="about-project__timeline about-project__timeline_type_backend">
          <p className="about-project__timeline-text about-project__timeline-text_type_backend">
            1 неделя
          </p>
        </div>
        <div className="about-project__timeline about-project__timeline_type_frontend">
          <p className="about-project__timeline-text about-project__timeline-text_type_frontend">
            4 недели
          </p>
        </div>
        <p className="about-project__timeline-caption">Back-end</p>
        <p className="about-project__timeline-caption">Front-end</p>
      </div>
    </section>
  );
});

export default AboutProject;
