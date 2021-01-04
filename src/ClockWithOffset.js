import { useEffect, useState } from "react";

import { startOfDay, addHours, isWithinInterval, format } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import Clock from "react-clock";

function ClockWithOffset({ offset, abbrev, name, startHours, endHours }) {
  const [currentTime, setCurrentTime] = useState(
    utcToZonedTime(new Date(), offset)
  );

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(utcToZonedTime(new Date(), offset)),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [offset]);

  function getId() {
    const startTime = getStartTime();
    const endTime = getEndTime();
    return isWithinInterval(currentTime, { start: startTime, end: endTime })
      ? `${name.toLowerCase()}-${abbrev}-online`
      : `${name.toLowerCase()}-${abbrev}-offline`;
  }

  function getStartTime() {
    return zonedTimeToUtc(addHours(startOfDay(new Date()), startHours), offset);
  }

  function getEndTime() {
    return zonedTimeToUtc(addHours(startOfDay(new Date()), endHours), offset);
  }

  // console.log(currentTime, "\n", getStartTime(), "\n", getEndTime());

  return (
    <div id={getId()} className="clock-wrapper">
      <Clock renderNumbers value={currentTime} />
      <p>
        {name}: {format(getStartTime(), "ha")} - {format(getEndTime(), "ha")}
      </p>
    </div>
  );
}

export default ClockWithOffset;
