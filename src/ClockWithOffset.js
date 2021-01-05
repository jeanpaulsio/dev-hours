import { useEffect, useState } from "react";

import {
  startOfDay,
  addHours,
  addMinutes,
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
    const startTime = getStartTimeWithOffset();
    const endTime = getEndTimeWithOffset();
    const time = zonedTimeToUtc(currentTime, offset);
    return isWithinInterval(time, { start: startTime, end: endTime });
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

  function getStartTimeWithOffset() {
    return zonedTimeToUtc(
      addMinutes(addHours(startOfDay(new Date()), startHours), minutesOffset),
      offset
    );
  }

  function getEndTimeWithOffset() {
    return zonedTimeToUtc(
      addMinutes(addHours(startOfDay(new Date()), endHours), minutesOffset),
      offset
    );
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

  // console.log(currentTime, "\n", getStartTime(), "\n", getEndTime());

  return (
    <div id={getId()} className="clock-wrapper">
      <Clock size={100} renderNumbers value={currentTime} />
      <p>
        <strong>{name}:</strong> {format(getStartTime(), "h:mm a")} -{" "}
        {format(getEndTime(), "h:mma")} {isOnline() ? "🟢" : "❌"}
      </p>
    </div>
  );
}

export default ClockWithOffset;
