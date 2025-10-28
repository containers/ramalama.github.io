/* -------------------------------------------------------------------------- */
/*                   JavaScript file for building the navbar                  */
/* -------------------------------------------------------------------------- */

import ramalamaText from "./assets/ramalama-logo-text-only.svg";
import ramalamaLogo from "./assets/ramalama-logo-llama-only.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="">
          <img className="logo-text" src={ramalamaText} alt="RamaLama Logo"></img>
          <img className="logo-mascot" src={ramalamaLogo} alt="RamaLama Logo"></img>
        </a>
      </div>
      <div className="navbar-middle"></div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="#install">Install</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#presentations">Presentations</a>
          </li>
          <li>
            <a
              href="https://github.com/containers/ramalama"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="github-stars-badge"
                src="https://img.shields.io/github/stars/containers/ramalama?style=social&label=Star&maxAge=240"
                alt="GitHub stars"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
