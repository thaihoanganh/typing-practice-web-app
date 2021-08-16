import produce from "immer";
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
    errorMessage: null,
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
              if (settingName === option.settingName) {
                return {
                  _id: option._id,
                  name: option.name,
                  isDefault: false,
                  value: option.value,
                };
              }
            });

            draft.status = "READY";
            draft.entity[settingName].options = [...draft.entity[settingName].options, ...options];
            draft.entity[settingName].selected = select.value;
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

export async function actionChangeSound(soundSelect: string) {
  const { status, entity, storage } = SettingContext.getState();

  if (status === "READY") {
    const validSoundSelect = entity.sound.options.find((option) => option._id === soundSelect);

    if (validSoundSelect) {
      await storage?.put("select", {
        settingName: "sound",
        isSync: false,
        value: soundSelect,
      });

      SettingContext.setState(
        produce((draft) => {
          draft.entity.sound.selected = soundSelect;
        })
      );
    } else {
      SettingContext.setState(
        produce((draft) => {
          draft.status = "ERROR";
          draft.errorMessage = "Something is not right";
        })
      );
    }
  }
}
