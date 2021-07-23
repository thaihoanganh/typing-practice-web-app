import Joi from "joi";
import { readLocalStorage, writeLocalStorage } from "@/helpers/localStorage";
import { IUserEntity, UserContext } from ".";

export const actionGetUser = () => {
  const userSchema = Joi.object({
    currentLesson: Joi.number().default(3),
  });

  const getUser = readLocalStorage("user");
  const validateUser = userSchema.validate(getUser);

  if (validateUser.error) {
    writeLocalStorage("user", {
      currentLesson: 3,
    });
  } else {
    UserContext.setState((prevState) => ({
      ...prevState,
      status: "ready",
      entity: {
        ...prevState.entity,
        currentLesson: getUser.currentLesson,
      },
    }));
  }
};

export const actionUpdateUser = (updateUser: Partial<IUserEntity>) => {
  writeLocalStorage("user", {
    currentLesson: updateUser.currentLesson,
  });
  UserContext.setState((prevState) => ({
    ...prevState,
    ...updateUser,
  }));
};
