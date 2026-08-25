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
  const [times, setTimes] = useState<{ cin: string; nyc: string } | null>(
    null,
  );

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimes({
        cin: formatTime(now, "America/New_York"),
        nyc: formatTime(now, "America/New_York"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-4 font-mono text-[11px] tracking-wide text-foreground-subtle">
      <span>CIN {times?.cin ?? "--:--:--"}</span>
      <span>NYC {times?.nyc ?? "--:--:--"}</span>
    </div>
  );
}
