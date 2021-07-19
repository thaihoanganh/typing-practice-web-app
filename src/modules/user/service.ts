import { readLocalStorage, writeLocalStorage } from "@/helpers/localStorage";
import { IUserState } from ".";

export const getUserInLocalService = (): IUserState => {
  // TODO: xác thực getUser
  const user: any = readLocalStorage("user");
  const initialUser: IUserState = {
    _id: null,
    username: null,
    email: null,
    currentLesson: 3,
    createdAt: null,
  };
  if (user) {
    return {
      ...initialUser,
      currentLesson: user.currentLesson,
    };
  } else {
    updateUserInLocalService(initialUser);
    return initialUser;
  }
};

export const updateUserInLocalService = (value: IUserState): void => {
  writeLocalStorage("user", {
    currentLesson: value.currentLesson,
  });
};
