import { useContext } from "react";
import { UserContext, IUserState, updateUserInLocalService } from ".";

export const useUser = () => {
  const { userState, userSetState } = useContext(UserContext);

  const onHandleChangeUser = (value: IUserState) => {
    userSetState(value);
    updateUserInLocalService(value);
  };

  return {
    user: userState,
    onHandleChangeUser,
  };
};
