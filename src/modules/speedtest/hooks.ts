import { useContext } from "react";
import { SpeedTestContext } from ".";

export const useSpeedTest = () => {
  const { entity, errorMessage, status } = useContext(SpeedTestContext.initial);

  return {
    speedTest: entity,
    speedTestErrorMessage: errorMessage,
    speedTestStatus: status,
  };
};
