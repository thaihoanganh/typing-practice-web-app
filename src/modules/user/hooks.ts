import { UserContext } from ".";

export const useUser = () => {
  const { status: userStatus, errorMessage: userErrorMessage, entity: user } = UserContext.getState();

  return {
    userStatus,
    userErrorMessage,
    user,
  };
};
