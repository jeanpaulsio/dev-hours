import ClockWithOffset from "./ClockWithOffset";

import "react-clock/dist/Clock.css";
import "./App.css";

const LA = [
  { name: "Manuel", startHours: 1, endHours: 10 },
  { name: "John", startHours: 6, endHours: 13 },
  { name: "Jp", startHours: 9, endHours: 18 },
  { name: "Dev", startHours: 21, endHours: 29 },
];

// Use Los Angeles as the pivot
function generateData({ offset }) {
  return [0, 1, 2, 3].map((i) => ({
    name: LA[i].name,
    startHours: LA[i].startHours + offset,
    endHours: LA[i].endHours + offset,
  }));
}

function App() {
  return (
    <div className="app">
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
          />
        ))}
      </div>
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
          />
        ))}
      </div>
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
          />
        ))}
      </div>
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
