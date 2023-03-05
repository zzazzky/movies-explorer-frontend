import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyrigt">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">© 2020</p>
        <nav>
          <ul className="footer__links list">
            <li className="footer__menu-item list__item">
              <a
                target="_blank"
                className="footer__text button"
                href="https://practicum.yandex.ru/"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__menu-item list__item">
              <a
                target="_blank"
                className="footer__text button"
                href="https://github.com/"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
