/* -------------------------------------------------------------------------- */
/*                   JavaScript file for building the navbar                  */
/* -------------------------------------------------------------------------- */

import "./Nav.css";
import ramalamaLogo from "./assets/ramalama-logo-text-only.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="">
          <img className="logo" src={ramalamaLogo} alt="RamaLama Logo"></img>
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
