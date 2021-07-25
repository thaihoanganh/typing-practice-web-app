import React, { useState, useEffect, useMemo } from "react";
import { createAppContext } from "@/utils/context";
import { IUserEntity, actionGetUser } from ".";

export interface IUserState {
  status: "READY" | "LOADING" | "ERROR";
  errorMessage: null | string;
  entity: IUserEntity;
}

export const UserContext = createAppContext<IUserState>();

export const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IUserState>({
    status: "LOADING",
    errorMessage: null,
    entity: {
      _id: null,
      username: null,
      email: null,
      currentLesson: 1,
      createdAt: null,
    },
  });

  useEffect(() => {
    actionGetUser();
  }, []);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <UserContext.Provider value={exportValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
