import { z } from "zod";
import { settingSchema } from ".";

export type ISettingEntity = z.infer<typeof settingSchema>;

export const initialSettingEntity: ISettingEntity = {
  theme: {
    options: [
      {
        name: "Light",
        primary: "#161616",
        secondary: "#FBFBFB",
        danger: "#FD8181",
      },
      {
        name: "Dark",
        primary: "#FAFAFA",
        secondary: "#121212",
        danger: "#FD8181",
      },
    ],
    selected: 0,
  },
  sound: {
    options: [
      {
        name: "Bật",
      },
      {
        name: "Tắt",
      },
    ],
    selected: 1,
  },
  lesson: {
    options: [
      {
        name: "Tiếng anh",
        data: [
          101, 110, 105, 116, 114, 108, 115, 97, 117, 111, 100, 121, 99, 104, 103, 109, 112, 98,
          107, 118, 119, 102, 122, 120, 113, 106,
        ],
      },
    ],
    selected: 0,
  },
  lessonLevel: {
    options: [
      {
        name: "Dễ",
        accuracyMin: 0.85,
        accuracyMax: 1,
        wordsPerMinuteMin: 25,
        wordsPerMinuteMax: 50,
      },
      {
        name: "Trung bình",
        accuracyMin: 0.9,
        accuracyMax: 1,
        wordsPerMinuteMin: 30,
        wordsPerMinuteMax: 75,
      },
      {
        name: "Khó",
        accuracyMin: 0.95,
        accuracyMax: 1,
        wordsPerMinuteMin: 35,
        wordsPerMinuteMax: 105,
      },
    ],
    selected: 0,
  },
  topTrendingWords: {
    options: [
      {
        name: "Default",
        isShuffle: false,
        words:
          "là rất câu đâu đầu sướng trước bếp dùng đồ phải khóa toán hóa mình hạnh phúc công việc nắng kính bao cậu tớ tức bực trường thật học nghỉ nghĩ thi hành nhà loài vật cười giúp đấu do tôi nhạc bơi lịch quê đất ngọt mùa bay ngày tỉnh lũ đỉnh định tham xa cơm gạo cầu đường phương xin rằng lỗi mà giáo thương trong đó xây dựng bà trình hoài hay nói suối đỏ chấm điểm trần làm hà nước chăm bánh xanh sống thế giới hướng kinh chị quá viết tia gửi phép sợ tháng hợp cô giấy tờ trí xinh an quả đẹp quảng nam báo ngoài cảm trang đợi chi xã hội im vui vẻ khó khăn màu tình yêu nhân dân giành ba thành ơn biển hãy chim khóc điện gì trời chú lành đánh sinh vì em da theo hả bóng nào ký tên bão dạ vâng ẩm thực áo quần nội chính minh chia sẻ nghệ thư huế huyện dũng thang cuộc đời thay mặt dạy sơ chào lại đi món ăn đàn sáo gió quốc ngữ văn tin cao anh tay bình con người khánh mưa tuổi đơn phần dễ dàng ngủ hạt bướm hoàn toàn mẹ phố kĩ thuật năm nga cổ tích giờ nay hôm sao bác thầy thấy có cha bố xe nhưng ta nếu như giả mắt tai mì không hồng ông cho trên trắng ở dưới với cả họ được tại một này từ bởi nóng lạnh uống những số hai nhất nó hoặc cố các vừa của để chúng ra khác sẽ mỗi muốn cũng chơi nhỏ lớn lá cây thử hỏi nhé cuối đặt đọc ảnh thêm mực bút trái thấp bé vậy thì nên loại tắt đành cần hình lần nữa y còn chẳng gần mới cũ lâu nơi sau khi đến tốt tivi máy tính cộng trừ đúng sai",
      },
    ],
    selected: 0,
  },
};