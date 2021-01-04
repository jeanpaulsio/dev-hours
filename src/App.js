import ClockWithOffset from "./ClockWithOffset";

import "react-clock/dist/Clock.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h2>New York</h2>
      <div className="clock-row">
        <ClockWithOffset
          offset="America/New_York"
          abbrev="ny"
          name="John"
          startHours={9}
          endHours={16}
        />
        <ClockWithOffset
          offset="America/New_York"
          abbrev="ny"
          name="Manuel"
          startHours={4}
          endHours={13}
        />
        <ClockWithOffset
          offset="America/New_York"
          abbrev="ny"
          name="Dev"
          startHours={0}
          endHours={8}
        />
      </div>
    </div>
  );
}

export default App;
