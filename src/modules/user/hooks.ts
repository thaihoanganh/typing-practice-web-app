import { UserContext } from ".";

export const useUser = () => {
  const { status, errorMessage, entity } = UserContext.getState();

  return {
    userStatus: status,
    userErrorMessage: errorMessage,
    user: entity,
  };
};
