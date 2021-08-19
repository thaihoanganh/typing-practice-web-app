import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { STATUS, STORAGE, DEFAULT_SETTINGS } from "@/modules/config";
import {
  ISettingsEntity,
  IThemeOption,
  ISpeedTestLevelOption,
  ISpeedTestDataOption,
  SettingContext,
  settingSelectSchema,
  settingOptionsSchema,
  speedTestLevelSchema,
  speedTestDataSchema,
} from ".";

function showErrorMessage(message: string) {
  SettingContext.setState((prevState) => ({ ...prevState, status: STATUS.error, message }));
}

export async function actionResetSettings() {
  const { storage } = SettingContext.getState();

  await storage?.clear(STORAGE.settings.options);
  await storage?.clear(STORAGE.settings.select);

  let key: keyof ISettingsEntity;
  for (key in DEFAULT_SETTINGS) {
    await storage?.add(STORAGE.settings.select, {
      settingName: key,
      isSync: false,
      value: DEFAULT_SETTINGS[key].primaryDefault,
    });
  }

  SettingContext.setState((prevState) => ({
    ...prevState,
    status: STATUS.ready,
    message: null,
    entity: DEFAULT_SETTINGS,
  }));
}

export async function actionGetSettings() {
  const { storage } = SettingContext.getState();

  try {
    const settingSelect = (await storage?.getAll(STORAGE.settings.select)) || [];
    settingSelectSchema.strictParser(settingSelect);

    if (settingSelect.length !== Object.keys(DEFAULT_SETTINGS).length) {
      throw new Error("Something is not right");
    }

    try {
      const settingOptions = (await storage?.getAll(STORAGE.settings.options)) || [];
      settingOptionsSchema.strictParser(settingOptions);

      SettingContext.setState(
        produce((draft) => {
          settingSelect.map((select) => {
            const settingName: keyof ISettingsEntity = select.settingName;
            const options: any = settingOptions.reduce((array, option) => {
              if (option && settingName === option.settingName) {
                return [
                  ...array,
                  {
                    _id: option._id,
                    name: option.name,
                    isDefault: false,
                    value: option.value,
                  },
                ];
              } else {
                return array;
              }
            }, []);

            draft.status = STATUS.ready;
            draft.entity[settingName].selected = select.value;
            draft.entity[settingName].options = [...draft.entity[settingName].options, ...options];
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

export async function actionToggleSetting(
  settingName: keyof ISettingsEntity,
  settingSelected: string
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    const options: any = entity[settingName].options;
    const existSettingSelect = options.find((option: any) => {
      return option._id === settingSelected;
    });

    if (existSettingSelect) {
      await storage?.put(STORAGE.settings.select, {
        settingName: settingName,
        isSync: false,
        value: settingSelected,
      });
      SettingContext.setState(
        produce((draft: any) => {
          draft.entity[settingName].selected = settingSelected;
        })
      );
    } else {
      showErrorMessage("Lỗi hệ thống");
    }
  }
}

export async function actionCreateThemeSetting(themeSetting: Pick<IThemeOption, "name" | "value">) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    const existThemeSetting = entity.theme.options.find((option) => {
      return themeSetting.name === option.name;
    });

    if (themeSetting.name && !existThemeSetting) {
      const id = uuidv4();

      await storage?.add(STORAGE.settings.options, {
        _id: id,
        isSync: false,
        settingName: "theme",
        ...themeSetting,
      });

      await storage?.put(STORAGE.settings.select, {
        settingName: "theme",
        isSync: false,
        value: id,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Thêm tuỳ chọn mới thành công";
          draft.entity.theme.selected = id;
          draft.entity.theme.options.push({
            _id: id,
            isDefault: false,
            ...themeSetting,
          });
        })
      );
    } else {
      showErrorMessage("Tên tuỳ chọn đã tồn tại hoặc không hợp lệ");
    }
  }
}

export async function actionUpdateTheme(
  themeId: string,
  themeSetting: Pick<IThemeOption, "name" | "value">
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    const existThemeSetting = entity.theme.options.find((option) => {
      return option.name === themeSetting.name && option._id !== themeId;
    });

    if (themeSetting.name && !existThemeSetting) {
      let themeIndex: any;
      for (let index = 0; index < entity.theme.options.length; index++) {
        const option = entity.theme.options[index];
        if (themeId === option._id && !option.isDefault) {
          themeIndex = index;
          break;
        }
      }

      if (themeIndex !== undefined) {
        await storage?.put(STORAGE.settings.options, {
          _id: themeId,
          isSync: false,
          settingName: "theme",
          ...themeSetting,
        });

        SettingContext.setState(
          produce((draft) => {
            draft.message = "Cập nhật tuỳ chọn thành công";
            draft.entity.theme.options[themeIndex].name = themeSetting.name;
            draft.entity.theme.options[themeIndex].value = themeSetting.value;
          })
        );
      } else {
        showErrorMessage("Lỗi hệ thống");
      }
    } else {
      showErrorMessage("Tên tuỳ chọn đã tồn tại hoặc không hợp lệ");
    }
  }
}

export async function actionDeleteThemeSetting(themeId: string) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    let themeIndex: any;
    for (let index = 0; index < entity.theme.options.length; index++) {
      const option = entity.theme.options[index];
      if (option._id === themeId && !option.isDefault) {
        themeIndex = index;
        break;
      }
    }

    if (themeIndex !== undefined) {
      await storage?.delete(STORAGE.settings.options, themeId);
      await storage?.put(STORAGE.settings.select, {
        settingName: "theme",
        isSync: false,
        value: DEFAULT_SETTINGS.theme.primaryDefault,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Xoá tuỳ chọn thành công";
          draft.entity.theme.selected = DEFAULT_SETTINGS.theme.primaryDefault;
          draft.entity.theme.options.splice(themeIndex, 1);
        })
      );
    } else {
      showErrorMessage("Lỗi hệ thống");
    }
  }
}

export async function actionCreateSpeedTestLevel(speedTestLevel: ISpeedTestLevelOption["value"]) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    try {
      speedTestLevelSchema.parser({ ...speedTestLevel });

      const existSpeedTestLevelSetting = entity.speedTestLevel.options.find((option) => {
        return (
          option.value.amount === speedTestLevel.amount && option.value.type === speedTestLevel.type
        );
      });

      if (!existSpeedTestLevelSetting) {
        const id = uuidv4();
        const speedTestLevelName = `${speedTestLevel.amount} ${
          speedTestLevel.type === "time" ? "giây" : "từ"
        }`;

        storage?.add(STORAGE.settings.options, {
          _id: id,
          isSync: false,
          settingName: "speedTestLevel",
          name: speedTestLevelName,
          value: speedTestLevel,
        });

        storage?.put(STORAGE.settings.select, {
          settingName: "speedTestLevel",
          isSync: false,
          value: id,
        });

        SettingContext.setState(
          produce((draft) => {
            draft.message = "Thêm tuỳ chọn thành công";
            draft.entity.speedTestLevel.selected = id;
            draft.entity.speedTestLevel.options.push({
              _id: id,
              name: speedTestLevelName,
              isDefault: false,
              value: speedTestLevel,
            });
          })
        );
      } else {
        showErrorMessage("Tuỳ chọn đã tồn tại");
      }
    } catch (error) {
      showErrorMessage("Lỗi hệ thống");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}

export async function actionUpdateSpeedTestLevel(
  speedTestLevelId: string,
  speedTestLevelValue: ISpeedTestLevelOption["value"]
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    try {
      speedTestLevelSchema.parser({ ...speedTestLevelValue });

      const existSpeedTestLevelSetting = entity.speedTestLevel.options.find((option) => {
        return (
          option.value.amount === speedTestLevelValue.amount &&
          option.value.type === speedTestLevelValue.type
        );
      });

      if (!existSpeedTestLevelSetting && speedTestLevelValue.amount) {
        let speedTestLevelIndex: any;
        for (let index = 0; index < entity.speedTestLevel.options.length; index++) {
          const option = entity.speedTestLevel.options[index];
          if (speedTestLevelId === option._id) {
            speedTestLevelIndex = index;
            break;
          }
        }

        if (speedTestLevelIndex !== undefined) {
          const speedTestLevelName = `${speedTestLevelValue.amount} ${
            speedTestLevelValue.type === "time" ? "giây" : "từ"
          }`;

          storage?.put(STORAGE.settings.options, {
            _id: speedTestLevelId,
            isSync: false,
            settingName: "speedTestLevel",
            name: speedTestLevelName,
            value: speedTestLevelValue,
          });

          SettingContext.setState(
            produce((draft) => {
              draft.message = "Cập nhật tuỳ chọn kiểm tra tốc độ gõ thành công";
              draft.entity.speedTestLevel.options[speedTestLevelIndex].name = speedTestLevelName;
              draft.entity.speedTestLevel.options[speedTestLevelIndex].value = speedTestLevelValue;
            })
          );
        } else {
          showErrorMessage("Lỗi hệ thống");
        }
      } else {
        showErrorMessage("Tuỳ chọn kiểm tra tốc độ gõ không hợp lệ hoặc đã tồn tại");
      }
    } catch (error) {
      showErrorMessage("Lỗi hệ thống");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}

export async function actionDeleteSpeedTestLevel(speedTestLevelId: string) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    let speedTestLevelIndex: any;
    for (let index = 0; index < entity.speedTestLevel.options.length; index++) {
      const option = entity.speedTestLevel.options[index];
      if (speedTestLevelId === option._id && !option.isDefault) {
        speedTestLevelIndex = index;
        break;
      }
    }

    if (speedTestLevelIndex !== undefined) {
      await storage?.delete(STORAGE.settings.options, speedTestLevelId);
      await storage?.put(STORAGE.settings.select, {
        _id: speedTestLevelId,
        isSync: false,
        settingName: "speedTestLevel",
        value: DEFAULT_SETTINGS.speedTestLevel.primaryDefault,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Xoá tuỳ chọn thành công";
          draft.entity.speedTestLevel.selected = DEFAULT_SETTINGS.speedTestLevel.primaryDefault;
          draft.entity.speedTestLevel.options.splice(speedTestLevelIndex, 1);
        })
      );
    } else {
      showErrorMessage("Lỗi hệ thống");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}

export async function actionCreateSpeedTestData(
  speedTestData: Pick<ISpeedTestDataOption, "name" | "value">
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    const existTopTrendingWordName = entity.speedTestData.options.find((option) => {
      return speedTestData.name === option.name;
    });

    if (speedTestData.name && !existTopTrendingWordName) {
      const id = uuidv4();

      await storage?.add(STORAGE.settings.options, {
        _id: id,
        isSync: false,
        settingName: "speedTestData",
        ...speedTestData,
      });
      await storage?.put(STORAGE.settings.select, {
        settingName: "speedTestData",
        isSync: false,
        value: id,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Thêm tuỳ chọn thành công";
          draft.entity.speedTestData.selected = id;
          draft.entity.speedTestData.options.push({
            _id: id,
            isDefault: false,
            ...speedTestData,
          });
        })
      );
    } else {
      showErrorMessage("Tên tuỳ chọn đã tồn tại hoặc không hợp lệ");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}

export async function actionUpdateSpeedTestData(
  speedTestDataId: string,
  speedTestData: Pick<ISpeedTestDataOption, "name" | "value">
) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === STATUS.ready) {
    const existTopTrendingWordName = entity.speedTestData.options.find((option) => {
      return speedTestData.name === option.name && speedTestDataId !== option._id;
    });

    if (speedTestData.name && !existTopTrendingWordName) {
      try {
        speedTestDataSchema.strictParser({ ...speedTestData.value });

        let speedTestDataIndex: any;
        for (let index = 0; index < entity.speedTestData.options.length; index++) {
          const option = entity.speedTestData.options[index];
          if (speedTestDataId === option._id && !option.isDefault) {
            speedTestDataIndex = index;
            break;
          }
        }

        if (speedTestDataIndex !== undefined) {
          await storage?.put(STORAGE.settings.options, {
            _id: speedTestDataId,
            isSync: false,
            settingName: "speedTestData",
            ...speedTestData,
          });

          await storage?.put(STORAGE.settings.select, {
            settingName: "speedTestData",
            isSync: false,
            value: speedTestDataId,
          });

          SettingContext.setState(
            produce((draft) => {
              draft.message = "Cập nhật tuỳ chọn thành công";
              draft.entity.speedTestData.selected = speedTestDataId;
              draft.entity.speedTestData.options[speedTestDataIndex].name = speedTestData.name;
              draft.entity.speedTestData.options[speedTestDataIndex].value = speedTestData.value;
            })
          );
        } else {
          showErrorMessage("Lỗi hệ thống");
        }
      } catch (error) {
        showErrorMessage("Tuỳ chọn không hợp lệ");
      }
    } else {
      showErrorMessage("Tên tuỳ chọn không hợp lệ hoặc đã tồn tại");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}

export async function actionDeleteSpeedTestData(speedTestDataId: string) {
  const { status, entity, storage } = SettingContext.getState();
  let speedTestDataIndex: any;
  if (status === STATUS.ready) {
    for (let index = 0; index < entity.speedTestData.options.length; index++) {
      const option = entity.speedTestData.options[index];
      if (speedTestDataId === option._id && !option.isDefault) {
        speedTestDataIndex = index;
        break;
      }
    }

    if (speedTestDataIndex !== undefined) {
      await storage?.delete(STORAGE.settings.options, speedTestDataId);
      await storage?.put(STORAGE.settings.select, {
        settingName: "speedTestData",
        isSync: false,
        value: DEFAULT_SETTINGS.speedTestData.primaryDefault,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.message = "Xoá tuỳ chọn thành công";
          draft.entity.speedTestData.selected = DEFAULT_SETTINGS.speedTestData.primaryDefault;
          draft.entity.speedTestData.options.splice(speedTestDataIndex, 1);
        })
      );
    } else {
      showErrorMessage("Lỗi hệ thống");
    }
  } else {
    showErrorMessage("Lỗi hệ thống");
  }
}
