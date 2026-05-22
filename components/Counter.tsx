"use client";

import { useEffect, useState } from "react";

export default function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let frame: number;

    const animate = () => {
      start += increment;

      if (start >= end) {
        setCount(end);
        return;
      }

      setCount(Math.floor(start));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return <>{count.toLocaleString("id-ID")}</>;
}