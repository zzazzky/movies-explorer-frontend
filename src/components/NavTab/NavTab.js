import "./NavTab.css";

function NavTab(props) {
  function scrollToAboutMe() {
    props.aboutMeRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToAboutProject() {
    props.aboutProjectRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToTechs() {
    props.techsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="nav-tab" aria-label="Навигация по странице">
      <nav>
        <ul className="nav-tab__links app__list">
          <li
            className="nav-tab__item app__list-item app__button"
            onClick={scrollToAboutProject}
          >
            О проекте
          </li>
          <li
            className="nav-tab__item app__list-item app__button"
            onClick={scrollToTechs}
          >
            Технологии
          </li>
          <li
            className="nav-tab__item app__list-item app__button"
            onClick={scrollToAboutMe}
          >
            Студент
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
