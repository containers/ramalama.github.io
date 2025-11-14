/* -------------------------------------------------------------------------- */
/*              Main JavaScript file that houses the main web app             */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */
import installIcon from "./assets/gravity-ui--arrow-shape-down-to-line.svg";
import githubIcon from "./assets/octicon--mark-github-24.svg";
import communityIcon from "./assets/gravity-ui--persons.svg";
import hardwareIcon from "./assets/gravity-ui--gear.svg";
import llamaMascot from "./assets/ramalama-logo-llama-only.svg";
import demoGIF from "./assets/demo.gif";
import aboutGraphic1 from "./assets/ramalama-about-graphic-1.svg";
import aboutGraphic2 from "./assets/ramalama-about-graphic-2.svg";
import aboutGraphic3 from "./assets/ramalama-about-graphic-3.svg";
import aboutGraphic4 from "./assets/ramalama-about-graphic-4.svg";
import copySVG from "./assets/copy.svg";

import presentations from "./presentations.json";

let installCode1 = "curl -fsSL https://ramalama.ai/install.sh | bash";
let installCode2 = "pip install ramalama";

const padNumber = (value) => String(value).padStart(2, "0");

const formatICSDate = (date, { utc = false } = {}) => {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = utc ? date.getUTCMonth() : date.getMonth();
  const day = utc ? date.getUTCDate() : date.getDate();
  const hours = utc ? date.getUTCHours() : date.getHours();
  const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
  const seconds = utc ? date.getUTCSeconds() : date.getSeconds();

  return (
    year +
    padNumber(month + 1) +
    padNumber(day) +
    "T" +
    padNumber(hours) +
    padNumber(minutes) +
    padNumber(seconds) +
    (utc ? "Z" : "")
  );
};

const escapeICSText = (text) =>
  text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");


const nextBiweeklyWednesday = () => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const referenceDate = new Date(Date.UTC(2025, 10, 19, 15, 30));
  const now = new Date();

  const diffDays = Math.floor((now.getTime() - referenceDate.getTime()) / MS_PER_DAY);
  const mod =  diffDays % 14;
  const daysToAdd = mod == 0 ? 0 : 14 - mod

  const candidate = new Date(referenceDate.getTime() + (diffDays + daysToAdd) * MS_PER_DAY);

  if (candidate <= now) { // Handling the day of
    candidate.setUTCDate(candidate.getUTCDate() + 14);
  }

  return candidate;
};

const createCalendarLink = () => {
  const start = nextBiweeklyWednesday();
  const end = new Date(start.getTime() + 60 * 60000);
  const dtStamp = new Date();
  const MEETING_LOCATION= "https://discord.gg/MkCXuTRBUn"
  const MEETING_DESCRIPTION =
    "We host a public community and developer meetup on Discord every other week to discuss project direction and provide an open forum for users to get help, ask questions, and showcase new features.";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RamaLama//Community Meetup//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@ramalama.ai`,
    `SUMMARY:RamaLama Community / Developer Meetup`,
    `DTSTAMP:${formatICSDate(dtStamp, { utc: true })}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `LOCATION:${MEETING_LOCATION}`,
    `DESCRIPTION:${escapeICSText(MEETING_DESCRIPTION)}`,
    `URL:${MEETING_LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
};

/* -------------------------------- Main App Function -------------------------------- */
function App() {
  const calendarLink = createCalendarLink();

  return (
    <>
      <main>
        {/* ----------------------------- Welcome Section ---------------------------- */}
        <div className="welcome viewport welcome-grid">
          <div className="welcome-info">
            <h1 className="welcome-h1-orange">rama</h1>
            <h1 className="welcome-h1">lama</h1>
            <h2 className="welcome-h2">
              Make working with AI boring through the use of OCI containers
            </h2>
            <ul>
              <li>
                <a href="https://github.com/containers/ramalama?tab=readme-ov-file#install">
                  <button className="button">
                    {" "}
                    <img src={installIcon} alt="Install Icon"></img>{" "}
                    <p>Installation guide here</p>
                  </button>
                </a>
              </li>
              <li>
                <a href="https://github.com/containers/ramalama">
                  <button className="button">
                    {" "}
                    <img src={githubIcon} alt="GitHub Icon"></img>{" "}
                    <p>Contribute to the project</p>
                  </button>
                </a>
              </li>
              <li>
                <a href="https://matrix.to/#/#ramalama:fedoraproject.org">
                  <button className="button">
                    {" "}
                    <img src={communityIcon} alt="Community Icon"></img>{" "}
                    <p>Interact with the community</p>
                  </button>
                </a>
              </li>
              <li>
                <a href="https://github.com/containers/ramalama?tab=readme-ov-file#hardware-support">
                  <button className="button">
                    {" "}
                    <img src={hardwareIcon} alt="Hardware Icon"></img>{" "}
                    <p>Hardware support here</p>
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div className="welcome-image">
            <img
              className="llama-mascot"
              src={llamaMascot}
              alt="RamaLama mascot"
            ></img>
          </div>
        </div>

        {/* ----------------------------- Install Section ---------------------------- */}
        <div className="install viewport orange-background" id="install">
          <div className="install-info">
            <h1 className="install-h1">
              It&apos;s one line and that&apos;s it!
            </h1>
            <h2 className="install-h2">
              Install RamaLama by running this in your command line:
            </h2>
            <div>
              <h3 className="install-h3">Linux and Mac:</h3>
              <div className="install-code">
                <p>{installCode1}</p>
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(installCode1)}
                >
                  <img className="copy-svg" src={copySVG} width="30px" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="install-h3">
                RamaLama is also available on PyPi!
              </h3>
              <div className="install-code">
                <p>{installCode2}</p>
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(installCode2)}
                >
                  <img className="copy-svg" src={copySVG} width="30px" />
                </button>
              </div>
            </div>
            <a href="https://github.com/containers/ramalama?tab=readme-ov-file#install">
              <button className="install-button" role="button">
                More install methods here
              </button>
            </a>
          </div>
        </div>

        {/* ------------------------------ Demo Section ------------------------------ */}
        <div className="demo viewport orange-background">
          <div className="demo-info">
            <h1 className="demo-header">Watch it in action</h1>
            <img
              src={demoGIF}
              className="demo-gif"
              alt="GIF of RamaLama running in a command line"
            ></img>
          </div>
        </div>

        {/* ----------------------------- About Section ---------------------------- */}
        <div className="about about-viewport" id="about">
          <div className="about-info">
            <h1 className="about-header">How does it work?</h1>
            <div className="about-grid">
              <img
                className="about-graphic-1"
                src={aboutGraphic1}
                alt="RamaLama About Graphic 1"
              ></img>
              <p className="about-text-1" role="paragraph">
                When RamaLama is first run, it inspects your system for GPU
                support, falling back to CPU support if no GPUs are present.
              </p>

              <img
                className="about-graphic-2"
                src={aboutGraphic2}
                alt="RamaLama About Graphic 2"
              ></img>
              <p className="about-text-2" role="paragraph">
                It then uses a container engine like Podman or Docker to
                download a container image from quay.io/ramalama.
              </p>

              <img
                className="about-graphic-3"
                src={aboutGraphic3}
                alt="RamaLama About Graphic 3"
              ></img>
              <p className="about-text-3" role="paragraph">
                Once the container image is in place, RamaLama pulls the
                specified AI Model from any of types of model registries.
              </p>

              <img
                className="about-graphic-4"
                src={aboutGraphic4}
                alt="RamaLama About Graphic 4"
              ></img>
              <p className="about-text-4" role="paragraph">
                Time to run our inferencing runtime. RamaLama offers switchable
                inferencing runtimes, namely llama.cpp and vLLM, for running
                containerized models.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------ Community Section ------------------------------ */}
        <div className="community viewport" id="community">
          <div className="community-info">
            <h1 className="community-header">Community / Developer Meetups</h1>
            <p className="community-text" role="paragraph">
              We host a public community and developer meetup on Discord every other week to
              discuss project direction and provide an open forum for users to get help, ask
              questions, and showcase new features.
            </p>
            <div className="community-links">
              <a
                href="https://discord.gg/cFyDXs9nS9"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <button className="button">Join on Discord</button>
              </a>
              <a
                href="https://docs.google.com/document/d/1wiqn7ItKgc8BgyTUQ46eeY23ms_hWbkhAoiP9D1ClfY/edit?tab=t.0#heading=h.b1x47hb6d0pt"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <button className="button">Meeting Agenda</button>
              </a>
              <a href={calendarLink} download="ramalama-community-meetup.ics">
                <button className="button">Add to Calendar</button>
              </a>
            </div>
          </div>
        </div>

        {/* ------------------------------ Presentations Section ------------------------------ */}
        <div className="presentation viewport" id="presentations">
          <div className="presentation-info">
            <h1 className="presentation-header">Presentations</h1>
            <h2 className="presentation-header">Conference talks</h2>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Speaker(s)</th>
                  <th>Resource</th>
                </tr>
              </thead>
              <tbody>
                {presentations.map((item, index) => (
                  <tr key={index}>
                    <td>{item.event}</td>
                    <td>{item.year}</td>
                    <td>{item.title}</td>
                    <td>{item.speakers}</td>
                    <td>
                      <a href={item.resource.url} target="_blank" rel="nofollow">
                        {item.resource.type}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             <p className="presentation-text" role="paragraph">
                If you would like to submit a presentation or demo here,
                please create a pull request to the <a href="https://github.com/containers/ramalama.github.io" target="_blank" rel="nofollow">RamaLama website repository.</a>
              </p>
          </div>
        </div>

      </main>

      {/* --------------------------------- Footer --------------------------------- */}
      <div className="footer orange-background">
        <footer>
          <p>
            <a className="footer-link" href="https://github.com/containers/ramalama">Github</a> |{" "}
            <a className="footer-link" href="https://matrix.to/#/#ramalama:fedoraproject.org">Matrix</a>{" "}
            |{" "}
            <a className="footer-link" href="https://github.com/containers/ramalama/blob/main/README.md">
              Docs
            </a>
          </p>
          <p>Sponsored by Red Hat</p>
          <p>CC-BY-4.0</p>
        </footer>
      </div>
    </>
  );
}

export default App;
