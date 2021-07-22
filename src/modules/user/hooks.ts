import { useContext } from "react";
import { UserContext, IUserState, updateUserInLocalService } from ".";

export const useUser = () => {
  const { userState, userSetState } = useContext(UserContext);

  const onHandleUpdateUser = (value: IUserState) => {
    userSetState(value);
    updateUserInLocalService(value);
  };

  return {
    userState,
    onHandleUpdateUser,
  };
};
