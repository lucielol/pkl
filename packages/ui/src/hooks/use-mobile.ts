import { useState, useEffect } from "react";

/**
 * Custom hook untuk ngecek apakah device itu mobile.
 * @param breakpoint Lebar maksimum untuk dianggap mobile. Default 768px.
 */
export function useIsMobile(breakpoint = 769) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
