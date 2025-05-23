/* ------------------------------------------------------------------------------------- */
/*         Main Javascript file that displays the App and Nav onto the index.html        */
/* ------------------------------------------------------------------------------------- */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import Nav from "./Nav.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Nav />
    <App />
  </StrictMode>
);
