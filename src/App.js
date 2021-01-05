import { useState } from "react";
import ClockWithOffset from "./ClockWithOffset";

import "react-clock/dist/Clock.css";
import "./App.css";

const LA = [
  { name: "Manuel", startHours: 1, endHours: 10, hoursAvailable: 9 },
  { name: "John", startHours: 6, endHours: 13, hoursAvailable: 7 },
  { name: "Jp", startHours: 9, endHours: 18, hoursAvailable: 9 },
  { name: "Dev", startHours: 21, endHours: 5, hoursAvailable: 8 },
];

// Use Los Angeles as the pivot
function generateData({ offset }) {
  return [0, 1, 2, 3].map((i) => ({
    name: LA[i].name,
    startHours: LA[i].startHours + offset,
    endHours: LA[i].endHours + offset,
    hoursAvailable: LA[i].hoursAvailable,
  }));
}

function App() {
  const [currentLocation, setCurrentLocation] = useState("America/New_York");

  function renderRow() {
    if (currentLocation === "America/Los_Angeles") {
      return (
        <>
          <h2>Los Angeles, USA</h2>
          <div className="clock-row">
            {generateData({ offset: 0 }).map((employee) => (
              <ClockWithOffset
                key={employee.name}
                offset="America/Los_Angeles"
                abbrev="la"
                name={employee.name}
                startHours={employee.startHours}
                endHours={employee.endHours}
                hoursAvailable={employee.hoursAvailable}
              />
            ))}
          </div>
        </>
      );
    } else if (currentLocation === "America/New_York") {
      return (
        <>
          <h2>New York, USA</h2>
          <div className="clock-row">
            {generateData({ offset: 3 }).map((employee) => (
              <ClockWithOffset
                key={employee.name}
                offset="America/New_York"
                abbrev="ny"
                name={employee.name}
                startHours={employee.startHours}
                endHours={employee.endHours}
                hoursAvailable={employee.hoursAvailable}
              />
            ))}
          </div>
        </>
      );
    } else if (currentLocation === "Europe/Madrid") {
      return (
        <>
          <h2>Seville, Spain</h2>
          <div className="clock-row">
            {generateData({ offset: 9 }).map((employee) => (
              <ClockWithOffset
                key={employee.name}
                offset="Europe/Madrid"
                abbrev="eu"
                name={employee.name}
                startHours={employee.startHours}
                endHours={employee.endHours}
                hoursAvailable={employee.hoursAvailable}
              />
            ))}
          </div>
        </>
      );
    } else if (currentLocation === "Asia/Kolkata") {
      return (
        <>
          <h2>Bengaluru, India</h2>
          <div className="clock-row">
            {generateData({ offset: 13 }).map((employee) => (
              <ClockWithOffset
                key={employee.name}
                offset="Asia/Kolkata"
                abbrev="as"
                name={employee.name}
                startHours={employee.startHours}
                endHours={employee.endHours}
                minutesOffset={30}
                hoursAvailable={employee.hoursAvailable}
              />
            ))}
          </div>
        </>
      );
    }
  }

  return (
    <div className="app">
      <h1>Which devs are online? 🤔</h1>
      <h2>Set your timezone - where are you closest to?</h2>
      <div className="button-row">
        <button
          className="btn"
          onClick={() => setCurrentLocation("America/Los_Angeles")}
        >
          Los Angeles
        </button>
        <button
          className="btn"
          onClick={() => setCurrentLocation("America/New_York")}
        >
          New York
        </button>
        <button
          className="btn"
          onClick={() => setCurrentLocation("Europe/Madrid")}
        >
          Spain
        </button>
        <button
          className="btn"
          onClick={() => setCurrentLocation("Asia/Kolkata")}
        >
          India
        </button>
      </div>
      {renderRow()}
      <hr />
      <div className="button-row">
        <div className="btn box lightgreen" />
        <span>
          AM <small>(online)</small>
        </span>
        <div className="btn box green" />
        <span>
          PM <small>(online)</small>
        </span>
        <div className="btn box pink" />
        <span>
          AM <small>(offline)</small>
        </span>
        <div className="btn box salmon" />
        <span>
          PM <small>(offline)</small>
        </span>
      </div>
    </div>
  );
}

export default App;
