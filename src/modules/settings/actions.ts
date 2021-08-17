import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { SettingContext, initialSettings, settingSelectSchema, settingOptionsSchema } from ".";

export async function actionResetSettings() {
  const { storage } = SettingContext.getState();

  await storage?.clear("options");
  await storage?.clear("select");

  let key: keyof typeof initialSettings;
  for (key in initialSettings) {
    await storage?.add("select", {
      settingName: key,
      isSync: false,
      value: initialSettings[key].primaryDefault,
    });
  }

  SettingContext.setState((prevState) => ({
    ...prevState,
    status: "READY",
    message: null,
    entity: initialSettings,
  }));
}

export async function actionGetSettings() {
  const { storage } = SettingContext.getState();

  try {
    const settingSelect = await storage?.getAll("select");
    settingSelectSchema.parser(settingSelect, { throwOnFirstError: true });

    if (settingSelect?.length !== Object.keys(initialSettings).length) {
      throw new Error("Something is not right");
    }

    try {
      const settingOptions = await storage?.getAll("options");
      settingOptionsSchema.parser(settingOptions, { throwOnFirstError: true });

      SettingContext.setState(
        produce((draft) => {
          settingSelect.map((select) => {
            const settingName: keyof typeof initialSettings = select.settingName;
            const options: any = settingOptions?.map((option) => {
              if (option._id && settingName === option.settingName) {
                return {
                  _id: option._id,
                  name: option.name,
                  isDefault: false,
                  value: option.value,
                };
              }
            });

            draft.status = "READY";
            draft.entity[settingName].selected = select.value;
            if (options[0]) {
              draft.entity[settingName].options = [
                ...draft.entity[settingName].options,
                ...options,
              ];
            }
          });
        })
      );
    } catch (error) {
      actionResetSettings();
    }
  } catch (error) {
    actionResetSettings();
  }
}

export async function actionToggleSetting(settingName: string, selected: string) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === "READY") {
    const validSettingSelect = (entity as any)[settingName].options.find((option: any) => {
      return option._id === selected;
    });

    if (validSettingSelect) {
      await storage?.put("select", {
        settingName: settingName,
        isSync: false,
        value: selected,
      });
      SettingContext.setState(
        produce((draft: any) => {
          draft.entity[settingName].selected = selected;
        })
      );
    } else {
      SettingContext.setState((prevState) => ({
        ...prevState,
        status: "ERROR",
        message: "Something is not right",
      }));
    }
  }
}

export async function actionCreateThemeSetting(themeSetting: {
  name: string;
  value: {
    primary: string;
    secondary: string;
    danger: string;
  };
}) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === "READY") {
    const validThemeSetting = entity.theme.options.find((option) => {
      return option.name === themeSetting.name;
    });

    if (validThemeSetting) {
      SettingContext.setState((prevState) => ({
        ...prevState,
        status: "ERROR",
        message: "Tên chủ đề đã tồn tại",
      }));
    } else {
      if (themeSetting.name) {
        const id = uuidv4();

        await storage?.add("options", {
          _id: id,
          isSync: false,
          settingName: "theme",
          ...themeSetting,
        });

        await storage?.put("select", { settingName: "theme", isSync: false, value: id });

        SettingContext.setState(
          produce((draft) => {
            draft.message = "Thêm chủ đề mới thành công";
            draft.entity.theme.selected = id;
            draft.entity.theme.options.push({
              _id: id,
              isDefault: false,
              ...themeSetting,
            });
          })
        );
      } else {
        SettingContext.setState((prevState) => ({
          ...prevState,
          status: "ERROR",
          message: "Tên chủ đề không hợp lệ",
        }));
      }
    }
  }
}

export async function actionUpdateTheme(
  themeId: string,
  themeSetting: {
    name: string;
    value: {
      primary: string;
      secondary: string;
      danger: string;
    };
  }
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === "READY") {
    const validThemeSetting = entity.theme.options.find((option) => {
      return option._id !== themeId && option.name === themeSetting.name;
    });

    if (validThemeSetting) {
      SettingContext.setState((prevState) => ({
        ...prevState,
        status: "ERROR",
        message: "Tên chủ đề đã tồn tại",
      }));
    } else {
      if (themeSetting.name) {
        await storage?.put("options", {
          _id: themeId,
          isSync: false,
          settingName: "theme",
          ...themeSetting,
        });

        SettingContext.setState(
          produce((draft) => {
            draft.message = "Cập nhật chủ đề thành công";
            for (let index = 0; index < entity.theme.options.length; index++) {
              if (entity.theme.options[index]._id === themeId) {
                draft.entity.theme.options[index].name = themeSetting.name;
                draft.entity.theme.options[index].value = themeSetting.value;
                break;
              }
            }
          })
        );
      } else {
        SettingContext.setState((prevState) => ({
          ...prevState,
          status: "ERROR",
          message: "Tên chủ đề không hợp lệ",
        }));
      }
    }
  }
}

export async function actionDeleteThemeSetting(themeId: string) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === "READY") {
    const validThemeSetting = entity.theme.options.find((option) => {
      return option._id === themeId;
    });

    if (validThemeSetting) {
      const { primaryDefault } = entity.theme;

      await storage?.delete("options", themeId);
      await storage?.put("select", {
        settingName: "theme",
        isSync: false,
        value: primaryDefault,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Xoá chủ đề thành công";
          draft.entity.theme.selected = primaryDefault;
          for (let index = 0; index < entity.theme.options.length; index++) {
            if (entity.theme.options[index]._id === themeId) {
              draft.entity.theme.options.splice(index, 1);
              break;
            }
          }
        })
      );
    } else {
      SettingContext.setState((prevState) => ({
        ...prevState,
        status: "ERROR",
        message: "Something is not right",
      }));
    }
  }
}
