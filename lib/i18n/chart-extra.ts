// Thuật ngữ bổ sung cho các thành phần lá số (tên cách cục, từ khóa tính cách, tính chất sao, hạng mục người nổi tiếng).
// Dữ liệu gốc từ engine vẫn là chữ Hán và dùng làm khóa; chỉ dịch ở điểm render.
import { tv, tvText } from './vi';

const PATTERN_NAMES: Record<string, string> = {
  君臣庆会: 'Quân Thần Khánh Hội', 紫府同宫: 'Tử Phủ Đồng Cung', 府相朝垣: 'Phủ Tướng Triều Viên',
  阳梁昌禄: 'Dương Lương Xương Lộc', 火贪格: 'Hỏa Tham cách', 铃贪格: 'Linh Tham cách',
  武贪格: 'Vũ Tham cách', 杀破狼: 'Sát Phá Lang', 机月同梁: 'Cơ Nguyệt Đồng Lương',
  廉贞天相格: 'Liêm Trinh Thiên Tướng cách', 武曲七杀: 'Vũ Khúc Thất Sát', 天同天梁格: 'Thiên Đồng Thiên Lương cách',
  日月同宫: 'Nhật Nguyệt Đồng Cung', 日月夹命: 'Nhật Nguyệt Giáp Mệnh', 巨日同宫: 'Cự Nhật Đồng Cung',
  石中隐玉: 'Thạch Trung Ẩn Ngọc', 明珠出海: 'Minh Châu Xuất Hải', 紫微入命: 'Tử Vi nhập Mệnh',
  辅弼夹命: 'Phụ Bật Giáp Mệnh', 昌曲夹命: 'Xương Khúc Giáp Mệnh', 魁钺夹命: 'Khôi Việt Giáp Mệnh',
  双禄朝垣: 'Song Lộc Triều Viên', 三奇加会: 'Tam Kỳ Gia Hội', 羊陀夹忌: 'Dương Đà Giáp Kỵ',
  火铃夹命: 'Hỏa Linh Giáp Mệnh', 空劫夹命: 'Không Kiếp Giáp Mệnh', 廉杀羊: 'Liêm Sát Dương',
  巨火羊: 'Cự Hỏa Dương', 铃昌陀武: 'Linh Xương Đà Vũ', 马头带箭: 'Mã Đầu Đới Tiễn',
  禄存守命: 'Lộc Tồn thủ Mệnh', 禄存守身: 'Lộc Tồn thủ Thân', 天马入命: 'Thiên Mã nhập Mệnh',
  天马在迁: 'Thiên Mã tại Thiên Di', 化禄入财: 'Hóa Lộc nhập Tài', 化权入官: 'Hóa Quyền nhập Quan',
  化科入命: 'Hóa Khoa nhập Mệnh', 化科入身: 'Hóa Khoa nhập Thân', 机月同梁三星会: 'Cơ Nguyệt Đồng Lương tam tinh hội',
  昌曲坐命: 'Xương Khúc tọa Mệnh', 昌曲同会: 'Xương Khúc đồng hội', 辅弼同会: 'Phụ Bật đồng hội',
  魁钺同会: 'Khôi Việt đồng hội', 科权双会: 'Khoa Quyền song hội',
};

/** Dịch tên cách cục. Hỗ trợ cả dạng động '<sao>化禄入命' / '<sao>化忌入命|迁'. Không khớp thì trả nguyên văn. */
export function tvPatternName(name: string): string {
  const fixed = PATTERN_NAMES[name];
  if (fixed) return fixed;
  const m = /^(.+)化(禄|忌)入(命|迁)$/.exec(name);
  if (m) return `${tvText(m[1])} ${tv(`化${m[2]}`)} nhập ${m[3] === '命' ? 'Mệnh' : 'Thiên Di'}`;
  return name;
}

const KEYWORDS: Record<string, string> = {
  尊贵: 'Tôn quý', 独立: 'Độc lập', 领导: 'Lãnh đạo', 智慧: 'Trí tuệ', 机变: 'Linh hoạt', 善谋: 'Giỏi mưu tính',
  阳刚: 'Dương cương', 官贵: 'Quan quý', 慷慨: 'Khảng khái', 财富: 'Tài phú', 刚毅: 'Cương nghị', 果断: 'Quả đoán',
  温和: 'Ôn hòa', 享福: 'Hưởng phúc', 随缘: 'Tùy duyên', 才艺: 'Tài nghệ', 桃花: 'Đào hoa', 多变: 'Hay biến đổi',
  财库: 'Tài khố', 稳重: 'Điềm đạm', 保守: 'Bảo thủ', 柔美: 'Dịu dàng', 细腻: 'Tinh tế', 欲望: 'Dục vọng',
  多才: 'Đa tài', 善辩: 'Giỏi biện luận', 多思: 'Hay suy tư', 口才: 'Khẩu tài', 辅佐: 'Phụ tá', 行政: 'Hành chính',
  稳健: 'Vững vàng', 荫护: 'Che chở', 医药: 'Y dược', 长辈: 'Bậc trưởng bối', 将星: 'Tướng tinh', 果决: 'Quyết đoán',
  孤克: 'Cô khắc', 开创: 'Khai sáng', 变动: 'Biến động', 破旧: 'Phá cũ',
};

/** Từ khóa tính cách của Chính tinh cung Mệnh. */
export function tvKeyword(k: string): string {
  return KEYWORDS[k] ?? k;
}

const NATURE: Record<string, string> = {
  帝王星: 'Đế vương tinh', 智慧星: 'Trí tuệ tinh', 贵人星: 'Quý nhân tinh', 财帛星: 'Tài bạch tinh',
  福德星: 'Phúc đức tinh', 桃花星: 'Đào hoa tinh', 财库星: 'Tài khố tinh', 财富星: 'Tài phú tinh',
  是非星: 'Thị phi tinh', 印绶星: 'Ấn thụ tinh', 荫庇星: 'Ấm tinh', 将帅星: 'Tướng soái tinh',
  变动星: 'Biến động tinh', 空宫: 'Cung vô chính diệu',
};

/** Tính chất của sao chủ cung Mệnh (getMingGongSummary().nature). */
export function tvNature(n: string): string {
  return NATURE[n] ?? n;
}

const FAMOUS_CATEGORY: Record<string, string> = {
  商业: 'Kinh doanh', 文艺: 'Văn nghệ', 科技: 'Công nghệ', 体育: 'Thể thao', 历史: 'Lịch sử',
};

/** Hạng mục người nổi tiếng (FamousPerson.category). */
export function tvFamousCategory(c: string): string {
  return FAMOUS_CATEGORY[c] ?? c;
}
