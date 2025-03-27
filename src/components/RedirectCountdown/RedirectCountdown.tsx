import React, { useState, useEffect, useCallback } from "react";

interface RedirectCountdownProps {
  from?: number;
  to?: number;
  duration?: number;
  className?: string;
  redirectTo: string;
  separator?: string;
}

export function RedirectCountdown({
  from = 5,
  to = 0,
  duration = 2,
  className = "",
  redirectTo,
  separator = "",
}: RedirectCountdownProps) {
  const [count, setCount] = useState(from);

  const handleRedirect = useCallback(() => {
    window.location.href = redirectTo;
  }, [redirectTo]);

  // Format number with optional separator
  const formatNumber = (num: number): string => {
    if (!separator) return num.toString();

    return new Intl.NumberFormat("en-US", {
      useGrouping: !!separator,
    })
      .format(num)
      .replace(/,/g, separator);
  };

  useEffect(() => {
    if (count === to) {
      handleRedirect();
      return;
    }

    const steps = Math.abs(from - to);
    const intervalTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = from > to ? prevCount - 1 : prevCount + 1;

        if (nextCount === to) {
          clearInterval(timer);
          setTimeout(handleRedirect, 500);
        }

        return nextCount;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [count, from, to, duration, handleRedirect]);

  return <span className={className}>{formatNumber(count)}</span>;
}
