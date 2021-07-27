import { useContext } from "react";
import { PracticeContext } from ".";

export const usePractice = () => {
  const { status, errorMessage, entity } = useContext(PracticeContext.initial);

  return {
    practiceStatus: status,
    practiceErrorMessage: errorMessage,
    practice: entity,
  };
};
