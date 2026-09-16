"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date, timeZone: string) {
  return date.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function ClockBar() {
  const [times, setTimes] = useState<{ cincy: string; atx: string } | null>(
    null,
  );

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimes({
        cincy: formatTime(now, "America/New_York"),
        atx: formatTime(now, "America/Chicago"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-wide text-foreground-subtle sm:gap-4 sm:text-[11px]">
      <span>Cincy {times?.cincy ?? "--:--:--"}</span>
      <span>ATX {times?.atx ?? "--:--:--"}</span>
    </div>
  );
}
