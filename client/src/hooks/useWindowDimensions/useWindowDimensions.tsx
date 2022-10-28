import { useEffect, useState } from "react";
import { WindowDimensionsProps } from "./useWindowDimensions.types";

const getWindowDimensions = (): WindowDimensionsProps => {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight
  };
};

const useWindowDimensions = (): WindowDimensionsProps => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensionsProps>(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowDimensions]);

  return windowDimensions;
};

export default useWindowDimensions;
