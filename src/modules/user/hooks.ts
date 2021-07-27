import { useContext } from "react";
import { UserContext } from ".";

export const useUser = () => {
  const { status, errorMessage, entity } = useContext(UserContext.initial);

  return {
    userStatus: status,
    userErrorMessage: errorMessage,
    user: entity,
  };
};
