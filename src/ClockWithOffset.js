import { useEffect, useState } from "react";

import {
  startOfDay,
  addHours,
  addMinutes,
  subHours,
  getHours,
  isWithinInterval,
  format,
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import Clock from "react-clock";

ClockWithOffset.defaultProps = {
  minutesOffset: 0,
};

function ClockWithOffset({
  offset,
  abbrev,
  name,
  startHours,
  endHours,
  minutesOffset,
  hoursAvailable,
}) {
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

  function isOnline() {
    const { start, end, current } = getTimeWithOffset();

    return isWithinInterval(current, { start, end });
  }

  /**
   * Use the ID names to override the clock face styles in react-clock library
   *
   * Each ID is specific to a dev's hours as listed in:
   * https://www.notion.so/getmainstreet/Team-bee08c85c2ff438a9dd15edc38755356
   *
   * Yes, I realized there is probably a better way to do this without creating
   * a ton of css ids
   */
  function getId() {
    return isOnline()
      ? `${name.toLowerCase()}-${abbrev}-online`
      : `${name.toLowerCase()}-${abbrev}-offline`;
  }

  function getTimeWithOffset() {
    let start = zonedTimeToUtc(
      addMinutes(addHours(startOfDay(new Date()), startHours), minutesOffset),
      offset
    );
    let current = zonedTimeToUtc(currentTime, offset);

    const currentHour = getHours(current);

    if (startHours > endHours && currentHour >= 0 && currentHour <= 12) {
      start = subHours(start, 24);
    }

    return { start, end: addHours(start, hoursAvailable), current };
  }

  function getStartTime() {
    return addMinutes(
      addHours(startOfDay(new Date()), startHours),
      minutesOffset
    );
  }

  function getEndTime() {
    return addMinutes(
      addHours(startOfDay(new Date()), endHours),
      minutesOffset
    );
  }

  // if (offset === "Asia/Kolkata" && name === "Dev") {
  //   console.log(
  //     zonedTimeToUtc(currentTime, offset),
  //     getTimeWithOffset()
  //   );
  // }

  return (
    <div id={getId()} className="clock-wrapper">
      <Clock size={100} renderNumbers value={currentTime} />
      <p>
        <strong>{name}:</strong> {format(getStartTime(), "h:mm a")} -{" "}
        {format(getEndTime(), "h:mm a")} {isOnline() ? "🟢" : "❌"}
      </p>
    </div>
  );
}

export default ClockWithOffset;
