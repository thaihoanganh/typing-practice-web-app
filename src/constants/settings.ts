export const SETTING_STORAGE = 'settings';

export const INITIAL_SETTINGS = {
	sound: {
		primaryDefault: '188faab703f89045dc07a952ab5cf0c8',
		selected: '188faab703f89045dc07a952ab5cf0c8',
		options: {
			'188faab703f89045dc07a952ab5cf0c8': {
				name: 'Tắt',
				isDefault: true,
				value: false,
			},
			eac7b3fa272f9d398333ff0b3a15fee1: {
				name: 'Bật',
				isDefault: true,
				value: true,
			},
		},
	},
	theme: {
		primaryDefault: 'b3d6d80eca2dc66b1e38b27fae59003a',
		selected: 'b3d6d80eca2dc66b1e38b27fae59003a',
		options: {
			b3d6d80eca2dc66b1e38b27fae59003a: {
				name: 'Darkblue',
				isDefault: true,
				value: {
					primary: '#00B464',
					secondary: '#181818',
				},
			},
			'0d603da67a0e45d253678a1acad93fb0': {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					primary: '#00B464',
					secondary: '#181818',
				},
			},
		},
	},
	lessonLevel: {
		primaryDefault: '8458d458ac176e75aa7f8fd23bb2f35e',
		selected: '8458d458ac176e75aa7f8fd23bb2f35e',
		options: {
			'8458d458ac176e75aa7f8fd23bb2f35e': {
				name: 'Dễ',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 25,
					wordsPerMinuteMax: 50,
					accuracyMin: 0.85,
					accuracyMax: 1,
				},
			},
			'4c46bcccca08a3d5ea0e50358abf2210': {
				name: 'Trung bình',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 35,
					wordsPerMinuteMax: 70,
					accuracyMin: 0.9,
					accuracyMax: 1,
				},
			},
			'90952876983dfa547b68e0d08fc4650e': {
				name: 'Khó',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 45,
					wordsPerMinuteMax: 90,
					accuracyMin: 0.95,
					accuracyMax: 1,
				},
			},
			d967fca0469829ab077c29a6bea2a2c2: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					wordsPerMinuteMin: 35,
					wordsPerMinuteMax: 70,
					accuracyMin: 0.9,
					accuracyMax: 1,
				},
			},
		},
	},
	lessonLanguage: {
		primaryDefault: '6ce1dcfd035ca15ff545832b6f4ad140',
		selected: '6ce1dcfd035ca15ff545832b6f4ad140',
		options: {
			'6ce1dcfd035ca15ff545832b6f4ad140': {
				name: 'Tiếng việt',
				isDefault: true,
				value: 'enitrlsauodychgmpbkvwfzxql',
			},
			'2e7ee968210f40e464aab5420274ad53': {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: 'abcdef',
			},
		},
	},
	typingTestText: {
		primaryDefault: '1da4b7e1a5a3fb394cfbbca37ac0530d',
		selected: '1da4b7e1a5a3fb394cfbbca37ac0530d',
		options: {
			'1da4b7e1a5a3fb394cfbbca37ac0530d': {
				name: '300 từ tiếng việt phổ biến',
				isDefault: true,
				value: {
					words:
						'khác sao các từ trên lỗi tờ sẻ thầy mỗi ngữ không điểm gió này máy đồ số những nên thực giáo năm phép chính toán xin đó lũ theo ký hà họ bóng dạ chị đầu quốc mực nam món xanh quảng lại tính giả chấm ra bác tớ tích bao sẽ trái mà lịch của nay bé nữa chia trường điện mới bay với hướng thế sinh đất đấu phúc dàng an nắng trang hóa bố im kính khăn tay huyện tức ngoài sống phần hạt vì bà đọc cả loại cũ ăn mưa phải hôm học dân lá đâu mẹ biển có lâu chăm nói cũng trắng như định thấp hoặc cổ bão xây chúng quả ngày nhà khánh tại lạnh bếp nhỏ cô đường trừ xinh trần bánh nhân vui đẹp nhạc mình cho lần chơi tham thành hoàn quần phương bút cậu cây nghĩ cuối vật uống gạo sau được thang đợi giành khóa ba vừa hội chẳng công cha nhất ở giờ tai việc tỉnh đến khó để báo câu đời hay giấy trong khóc tốt ngủ tôi ẩm ta phố ngọt người thương hỏi mì đơn bực xã gần kinh chim nội tuổi tắt lành hai hãy thử thì nó còn muốn tia trời cần da nước nghỉ nghệ áo nơi viết thật mùa cộng đỉnh chú do ông cuộc dưới tin dũng thuật tên chào một là rằng dùng cảm nhưng hả kĩ khi nóng con y thư giới suối sáo thấy cười đánh trước ảnh giúp mắt quê hoài rất sướng cố thay bướm đi cầu đặt dựng nga minh đỏ hợp đành tình lớn sơ dạy thi tháng gì vẻ ơn hạnh nào vâng dễ màu bơi gửi loài làm cơm bình cao sợ chi nếu anh huế mặt xa xe em hành sai vậy tivi trí bởi đúng hồng trình văn yêu hình đàn thêm nhé quá toàn',
					isShuffle: true,
					hasUppercase: false,
				},
			},
			a11954db05e3d9d0e071bf508762ccbe: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					words:
						"was stand new last sun differ horse want land home right live act kind give water hand also so tell draw I are an any life find need in to head idea city how which together come like would well a walk put their mountain group me care sentence our must should could enough came children learn real music we same look face with watch she second and other by this grow were or very from let letter every near said play his is but does thing carry such press day for big round work on her up mark large cover get keep room much do name ask don't make science might not four who why left world use be father these once then boy the old while us too no more again run what fish over food sound both know will point back my add number friend own think change earth did great after feet two animal go way say still they even high eye answer school good you time thought of house sure him people now small as eat story man been down book here help stop line often paper river saw if few most mean show take night car base first close each never plant at always has three just white have through state than color begin seem hard self try open port page got when spell before only ease under set main between north far where air took farm long next made cut part place sea picture read late your turn some went example little out low follow wood move light it year study write start that men there off until side may those call many country one form began see can mile end hear mother about word tree found all them cause cross build had he",
					isShuffle: true,
					hasUppercase: false,
				},
			},
		},
	},
	typingTestLimit: {
		primaryDefault: '9a4565293f609307c8fa9710669e2111',
		selected: '9a4565293f609307c8fa9710669e2111',
		options: {
			'9a4565293f609307c8fa9710669e2111': {
				name: '30 giây',
				isDefault: true,
				value: {
					amount: 30,
					type: 'time',
				},
			},
			'2a4b8e59436c451a0bfba0ed576152f4': {
				name: '60 giây',
				isDefault: true,
				value: {
					amount: 60,
					type: 'time',
				},
			},
			'1a485bff414a002094878f9303c6b611': {
				name: '100 từ',
				isDefault: true,
				value: {
					amount: 100,
					type: 'word',
				},
			},
			f50e7dced8b239b1539a46efb301f030: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					amount: 60,
					type: 'time',
				},
			},
		},
	},
};

/*

{
	sound: {
		"1": md5('SOUND_1"),
		"2": md5("SOUND_2"),
	},
	theme: {
		"1": md5("THEME_1"),
		"2": md5("THEME_2"),
		"custom": md5("THEME_CUSTOM"),
	},
	lessonLevel: {
		"1": md5("LESSON_LEVEL_1"),
		"2": md5("LESSON_LEVEL_2"),
		"3": md5("LESSON_LEVEL_3"),
		"custom": md5("LESSON_LEVEL_CUSTOM"),
	},
	lessonLanguage: {
		"1": md5("LESSON_LANGUAGE_1"),
		"custom": md5("LESSON_LANGUAGE_CUSTOM"),
	},
	typingTestText: {
		"1": md5("TYPING_TEST_TEXT_1"),
		"2": md5("TYPING_TEST_TEXT_2"),
		"custom": md5("TYPING_TEST_TEXT_CUSTOM"),
	},
	typingTestLimit: {
		"1": md5("TYPING_TEST_LIMIT_1"),
		"2": md5("TYPING_TEST_LIMIT_2"),
		"custom": md5("TYPING_TEST_LIMIT_CUSTOM"),
	},
}

*/
