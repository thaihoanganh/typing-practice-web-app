import React, { createContext, useState, useEffect, useMemo } from "react";
import { IUserEntity, getUserInLocalService, updateUserInLocalService } from ".";

export interface IUserState extends IUserEntity {}

export interface IUserContext {
  userState: IUserState;
  userSetState: React.Dispatch<React.SetStateAction<IUserState>>;
}

export interface UserProviderProps {
  initState?: IUserState;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children, initState }) => {
  const [state, setState] = useState<IUserState>({} as IUserState);

  useEffect(() => {
    if (initState) {
      updateUserInLocalService(initState);
      return setState(initState);
    }
    const user = getUserInLocalService();
    return setState(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportValue = useMemo<IUserContext>(() => {
    return {
      userState: state,
      userSetState: setState,
    };
  }, [state]);

  return <UserContext.Provider value={exportValue}>{children}</UserContext.Provider>;
};
