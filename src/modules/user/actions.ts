import Joi from "joi";
import { readLocalStorage, writeLocalStorage } from "@/helpers/localStorage";
import { IUserEntity, UserContext } from ".";

export const actionGetUser = () => {
  const userSchema = Joi.object({
    currentLesson: Joi.number().min(1).default(1),
  });
  const getUser = readLocalStorage("user");
  const userValidate = userSchema.validate(getUser);

  if (userValidate.error) writeLocalStorage("user", { currentLesson: 1 });

  UserContext.setState((prevState) => ({
    ...prevState,
    status: "READY",
    entity: {
      ...prevState.entity,
      currentLesson: userValidate.error ? 1 : userValidate.value.currentLesson,
    },
  }));
};

export const actionUpdateUser = (updateUserValue: Partial<IUserEntity>) => {
  writeLocalStorage("user", { currentLesson: updateUserValue.currentLesson });
  UserContext.setState((prevState) => ({
    ...prevState,
    entity: {
      ...prevState.entity,
      ...updateUserValue,
    },
  }));
};
