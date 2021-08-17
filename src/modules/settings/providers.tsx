import React, { useState, useEffect, useMemo } from "react";
import { IDBPDatabase, openDB } from "idb";
import { createAppContext } from "@/helpers/context";
import { getContrastColor, setVariableColor } from "@/helpers/color";
import Toast from "@/components/molecules/Toast";

import { ISettingsEntity, actionGetSettings } from ".";

export const initialSettings: ISettingsEntity = {
  sound: {
    options: [
      {
        _id: "HAT001001",
        name: "Bật",
        isDefault: true,
        value: true,
      },
      {
        _id: "HAT001002",
        name: "Tắt",
        isDefault: true,
        value: false,
      },
    ],
    customizable: false,
    primaryDefault: "HAT001001",
    selected: "HAT001001",
  },
  theme: {
    options: [
      {
        _id: "HAT002001",
        name: "Dark",
        isDefault: true,
        value: {
          primary: "#121212",
          secondary: "#fafafa",
          danger: "#de4242",
        },
      },
    ],
    customizable: true,
    primaryDefault: "HAT002001",
    selected: "HAT002001",
  },
  speedTest: {
    options: [
      {
        _id: "HAT003001",
        name: "60 giây",
        isDefault: true,
        value: {
          amount: 60,
          type: "time",
        },
      },
      {
        _id: "HAT003002",
        name: "30 giây",
        isDefault: true,
        value: {
          amount: 30,
          type: "time",
        },
      },
      {
        _id: "HAT003003",
        name: "15 giây",
        isDefault: true,
        value: {
          amount: 15,
          type: "time",
        },
      },
    ],
    customizable: true,
    primaryDefault: "HAT003001",
    selected: "HAT003001",
  },
  topTrendingWords: {
    options: [
      {
        _id: "HAT004001",
        name: "300 từ phổ biến tiếng việt",
        isDefault: true,
        value: {
          words:
            "là rất câu đâu đầu sướng trước bếp dùng đồ phải khóa toán hóa mình hạnh phúc công việc nắng kính bao cậu tớ tức bực trường thật học nghỉ nghĩ thi hành nhà loài vật cười giúp đấu do tôi nhạc bơi lịch quê đất ngọt mùa bay ngày tỉnh lũ đỉnh định tham xa cơm gạo cầu đường phương xin rằng lỗi mà giáo thương trong đó xây dựng bà trình hoài hay nói suối đỏ chấm điểm trần làm hà nước chăm bánh xanh sống thế giới hướng kinh chị quá viết tia gửi phép sợ tháng hợp cô giấy tờ trí xinh an quả đẹp quảng nam báo ngoài cảm trang đợi chi xã hội im vui vẻ khó khăn màu tình yêu nhân dân giành ba thành ơn biển hãy chim khóc điện gì trời chú lành đánh sinh vì em da theo hả bóng nào ký tên bão dạ vâng ẩm thực áo quần nội chính minh chia sẻ nghệ thư huế huyện dũng thang cuộc đời thay mặt dạy sơ chào lại đi món ăn đàn sáo gió quốc ngữ văn tin cao anh tay bình con người khánh mưa tuổi đơn phần dễ dàng ngủ hạt bướm hoàn toàn mẹ phố kĩ thuật năm nga cổ tích giờ nay hôm sao bác thầy thấy có cha bố xe nhưng ta nếu như giả mắt tai mì không hồng ông cho trên trắng ở dưới với cả họ được tại một này từ bởi nóng lạnh uống những số hai nhất nó hoặc cố các vừa của để chúng ra khác sẽ mỗi muốn cũng chơi nhỏ lớn lá cây thử hỏi nhé cuối đặt đọc ảnh thêm mực bút trái thấp bé vậy thì nên loại tắt đành cần hình lần nữa y còn chẳng gần mới cũ lâu nơi sau khi đến tốt tivi máy tính cộng trừ đúng sai",
          isShuffle: true,
          hasUppercase: false,
        },
      },
    ],
    customizable: true,
    primaryDefault: "HAT004001",
    selected: "HAT004001",
  },
};

export interface ISettingsState {
  status: "READY" | "LOADING" | "ERROR";
  message: null | string;
  entity: ISettingsEntity;
  storage: null | IDBPDatabase;
}

export const SettingContext = createAppContext<ISettingsState>();

export const SettingsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ISettingsState>({
    status: "LOADING",
    message: null,
    entity: initialSettings,
    storage: null,
  });

  useEffect(() => {
    openDB("settings", 1, {
      upgrade(storage) {
        storage.createObjectStore("options", { keyPath: "_id" });
        storage.createObjectStore("select", { keyPath: "settingName" });
      },
    }).then((storage) => {
      setState((prevState) => ({ ...prevState, storage }));
    });
  }, []);

  useEffect(() => {
    if (state.storage) {
      actionGetSettings();
    }
  }, [state.storage]);

  useEffect(() => {
    if (state.message) {
      setState((prevState) => ({ ...prevState, status: "READY", message: null }));
      Toast({
        message: state.message,
        isError: state.status === "ERROR",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message]);

  useEffect(() => {
    const themeSetting: any = state.entity.theme.options.find(
      (option) => option._id === state.entity.theme.selected
    );

    const { primary, secondary, danger } = themeSetting?.value || state.entity.theme.options[0];

    setVariableColor("--primary", primary);
    setVariableColor("--contrast-primary", getContrastColor(primary));
    setVariableColor("--secondary", secondary);
    setVariableColor("--contrast-secondary", getContrastColor(secondary));
    setVariableColor("--danger", danger);
    setVariableColor("--contrast-danger", getContrastColor(danger));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.entity.theme.selected]);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <SettingContext.Provider value={exportValue}>{children}</SettingContext.Provider>;
};

export default SettingsProvider;
