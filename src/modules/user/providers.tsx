import React, { useState, useEffect, useMemo } from "react";
import { IProviderState } from "@/utils/provider";
import { createAppContext } from "@/utils/context";
import { IUserEntity, actionGetUser } from ".";

export type IUserProvider = IProviderState<IUserEntity>;

export const UserContext = createAppContext<IUserProvider>();

export const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IUserProvider>({
    status: "loading",
    errorMessage: null,
    entity: {
      _id: null,
      username: null,
      email: null,
      currentLesson: 3,
      createdAt: null,
    },
  });

  useEffect(() => {
    actionGetUser();
  }, []);

  const exportValue = useMemo(() => {
    return {
      state,
      setState,
    };
  }, [state]);

  return <UserContext.Provider value={exportValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
