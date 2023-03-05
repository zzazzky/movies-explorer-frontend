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
    <nav className="nav-tab">
      <ul className="nav-tab__links list">
        <li
          className="nav-tab__item list__item button"
          onClick={scrollToAboutProject}
        >
          О проекте
        </li>
        <li className="nav-tab__item list__item button" onClick={scrollToTechs}>
          Технологии
        </li>
        <li
          className="nav-tab__item list__item button"
          onClick={scrollToAboutMe}
        >
          Студент
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
