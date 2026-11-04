// Lớp hiển thị Hán-Việt. Dữ liệu lá số (tên sao, tên cung...) vẫn là chữ Hán và được engine
// dùng làm khóa so sánh, nên chỉ dịch ở điểm render: tv('紫微') -> 'Tử Vi'.

const MAJOR: Record<string, string> = {
  紫微: 'Tử Vi', 天机: 'Thiên Cơ', 太阳: 'Thái Dương', 武曲: 'Vũ Khúc', 天同: 'Thiên Đồng',
  廉贞: 'Liêm Trinh', 天府: 'Thiên Phủ', 太阴: 'Thái Âm', 贪狼: 'Tham Lang', 巨门: 'Cự Môn',
  天相: 'Thiên Tướng', 天梁: 'Thiên Lương', 七杀: 'Thất Sát', 破军: 'Phá Quân',
};

const LUCKY: Record<string, string> = {
  左辅: 'Tả Phù', 右弼: 'Hữu Bật', 文昌: 'Văn Xương', 文曲: 'Văn Khúc', 天魁: 'Thiên Khôi',
  天钺: 'Thiên Việt', 禄存: 'Lộc Tồn', 天马: 'Thiên Mã', 红鸾: 'Hồng Loan', 天喜: 'Thiên Hỷ',
  龙池: 'Long Trì', 凤阁: 'Phượng Các', 三台: 'Tam Thai', 八座: 'Bát Tọa', 恩光: 'Ân Quang',
  天贵: 'Thiên Quý', 台辅: 'Thai Phụ', 封诰: 'Phong Cáo', 天官: 'Thiên Quan', 天福: 'Thiên Phúc',
  天德: 'Thiên Đức', 月德: 'Nguyệt Đức', 天才: 'Thiên Tài', 天寿: 'Thiên Thọ', 天巫: 'Thiên Vu',
  华盖: 'Hoa Cái', 年解: 'Niên Giải', 解神: 'Giải Thần',
};

const SHA: Record<string, string> = {
  擎羊: 'Kình Dương', 陀罗: 'Đà La', 火星: 'Hỏa Tinh', 铃星: 'Linh Tinh', 地空: 'Địa Không',
  地劫: 'Địa Kiếp', 天空: 'Thiên Không', 截空: 'Tiệt Không', 副截: 'Phó Tiệt', 旬空: 'Tuần Không',
  副旬: 'Phó Tuần', 天刑: 'Thiên Hình', 天月: 'Thiên Nguyệt', 寡宿: 'Quả Tú', 孤辰: 'Cô Thần',
  阴煞: 'Âm Sát', 天伤: 'Thiên Thương', 天使: 'Thiên Sứ', 蜚廉: 'Phi Liêm', 大耗: 'Đại Hao',
  天虚: 'Thiên Hư', 天哭: 'Thiên Khốc',
};

const MINOR: Record<string, string> = {
  劫煞: 'Kiếp Sát', 咸池: 'Hàm Trì', 天厨: 'Thiên Trù', 破碎: 'Phá Toái', 天姚: 'Thiên Diêu',
  龙德: 'Long Đức',
};

// Engine trả tên cung khi có '宫' khi không (命宫 / 兄弟 / 兄弟宫 ...), nên map cả hai dạng.
const PALACE_BASE: Record<string, string> = {
  命: 'Mệnh', 兄弟: 'Huynh Đệ', 夫妻: 'Phu Thê', 子女: 'Tử Tức', 财帛: 'Tài Bạch', 疾厄: 'Tật Ách',
  迁移: 'Thiên Di', 仆役: 'Nô Bộc', 交友: 'Nô Bộc', 官禄: 'Quan Lộc', 田宅: 'Điền Trạch',
  福德: 'Phúc Đức', 父母: 'Phụ Mẫu',
};
const PALACE: Record<string, string> = {};
for (const [zh, vi] of Object.entries(PALACE_BASE)) { PALACE[zh] = vi; PALACE[`${zh}宫`] = vi; }

const BRIGHTNESS: Record<string, string> = {
  庙: 'Miếu', 旺: 'Vượng', 得: 'Đắc', 利: 'Lợi', 平: 'Bình', 不: 'Bất', 闲: 'Nhàn', 陷: 'Hãm', 地: 'Địa',
};

const SIHUA: Record<string, string> = {
  禄: 'Lộc', 权: 'Quyền', 科: 'Khoa', 忌: 'Kỵ',
  化禄: 'Hóa Lộc', 化权: 'Hóa Quyền', 化科: 'Hóa Khoa', 化忌: 'Hóa Kỵ',
};

const STEMS: Record<string, string> = {
  甲: 'Giáp', 乙: 'Ất', 丙: 'Bính', 丁: 'Đinh', 戊: 'Mậu', 己: 'Kỷ', 庚: 'Canh', 辛: 'Tân', 壬: 'Nhâm', 癸: 'Quý',
};

const BRANCHES: Record<string, string> = {
  子: 'Tý', 丑: 'Sửu', 寅: 'Dần', 卯: 'Mão', 辰: 'Thìn', 巳: 'Tỵ', 午: 'Ngọ', 未: 'Mùi', 申: 'Thân', 酉: 'Dậu', 戌: 'Tuất', 亥: 'Hợi',
};

const ELEMENTS: Record<string, string> = { 金: 'Kim', 木: 'Mộc', 水: 'Thủy', 火: 'Hỏa', 土: 'Thổ' };

const JU: Record<string, string> = {
  水二局: 'Thủy nhị cục', 木三局: 'Mộc tam cục', 金四局: 'Kim tứ cục', 土五局: 'Thổ ngũ cục', 火六局: 'Hỏa lục cục',
};

const YINYANG_GENDER: Record<string, string> = {
  阳男: 'Dương Nam', 阴男: 'Âm Nam', 阳女: 'Dương Nữ', 阴女: 'Âm Nữ',
};

const SHICHEN: Record<string, string> = {};
for (const [zh, vi] of Object.entries(BRANCHES)) SHICHEN[`${zh}时`] = `giờ ${vi}`;

const TERMS: Record<string, string> = {
  ...MAJOR, ...LUCKY, ...SHA, ...MINOR, ...PALACE, ...BRIGHTNESS, ...SIHUA,
  ...STEMS, ...BRANCHES, ...ELEMENTS, ...JU, ...YINYANG_GENDER, ...SHICHEN,
};

/** Dịch một thuật ngữ đơn (tên sao, cung, độ sáng, can chi...). Không có trong bảng thì trả nguyên văn. */
export function tv(term: string): string {
  return TERMS[term] ?? term;
}

/** Dịch chuỗi can chi ghép, ví dụ '壬午' -> 'Nhâm Ngọ'. Ký tự lạ được giữ nguyên. */
export function tvGanzhi(text: string): string {
  return [...text].map(ch => STEMS[ch] ?? BRANCHES[ch] ?? ch).join(' ');
}

// Chỉ thay các tên có từ 2 chữ trở lên để không đụng vào chữ đơn như 不 / 地 / 子 trong câu thường.
const MULTI_CHAR = Object.entries({ ...MAJOR, ...LUCKY, ...SHA, ...MINOR, ...SIHUA, ...JU, ...YINYANG_GENDER })
  .filter(([zh]) => zh.length >= 2)
  .sort((a, b) => b[0].length - a[0].length);

/** Thay mọi tên sao / Tứ Hóa / cục xuất hiện trong một đoạn văn, ví dụ '天机化禄' -> 'Thiên Cơ Hóa Lộc'. */
export function tvText(text: string): string {
  let out = text;
  for (const [zh, vi] of MULTI_CHAR) out = out.split(zh).join(vi);
  // Tên Việt đều viết hoa chữ đầu mỗi từ nên chỗ ghép liền là ranh giới chữ thường -> chữ hoa, hoặc Latin <-> Hán.
  return out
    .replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2')
    .replace(/(\p{Ll})(\p{Script=Han})/gu, '$1 $2')
    .replace(/(\p{Script=Han})(\p{Lu})/gu, '$1 $2');
}
