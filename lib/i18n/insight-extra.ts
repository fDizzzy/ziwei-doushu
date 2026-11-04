// Thuật ngữ bổ sung cho InsightPanel / StarDetailPanel. Không sửa lib/i18n/vi.ts.
import { tv } from './vi';

/** '命宫' / '命' / '兄弟宫' -> 'Cung Mệnh' / 'Cung Huynh Đệ'. Không có trong bảng thì trả nguyên văn. */
export function palaceVi(name: string): string {
  const vi = tv(name);
  return vi === name ? name : `Cung ${vi}`;
}

const KEYWORDS: Record<string, string> = {
  帝王: 'Đế vương', 尊贵: 'Tôn quý', 独立: 'Độc lập', 智慧: 'Trí tuệ', 机变: 'Cơ biến', 谋略: 'Mưu lược',
  阳刚: 'Dương cương', 官贵: 'Quan quý', 慷慨: 'Khảng khái', 财富: 'Tài phú', 刚毅: 'Cương nghị',
  果断: 'Quả đoán', 温和: 'Ôn hòa', 享福: 'Hưởng phúc', 随缘: 'Tùy duyên', 才艺: 'Tài nghệ',
  刑囚: 'Hình tù', 桃花: 'Đào hoa', 财库: 'Tài khố', 稳重: 'Vững vàng', 保守: 'Bảo thủ',
  柔美: 'Nhu mỹ', 阴柔: 'Âm nhu', 欲望: 'Dục vọng', 多才: 'Đa tài', 口舌: 'Khẩu thiệt',
  是非: 'Thị phi', 善辩: 'Giỏi biện luận', 辅佐: 'Phụ tá', 行政: 'Hành chính', 印绶: 'Ấn thụ',
  荫护: 'Ấm hộ', 医药: 'Y dược', 长辈: 'Bậc trưởng bối', 将星: 'Tướng tinh', 果决: 'Quả quyết',
  孤克: 'Cô khắc', 开创: 'Khai sáng', 变动: 'Biến động', 破坏: 'Phá hoại',
};

const NATURE: Record<string, string> = {
  中性偏吉: 'Trung tính, thiên cát', 吉星: 'Cát tinh', 中性: 'Trung tính',
  凶中带吉: 'Hung trung đới cát', 凶星: 'Hung tinh',
};

/** Dịch một từ khóa tính chất sao (lấy từ STAR_DESCRIPTIONS.keywords, đã tách theo '·'). */
export function tvKeyword(k: string): string {
  const t = k.trim();
  return KEYWORDS[t] ?? t;
}

/** Dịch trường nature của STAR_DESCRIPTIONS. */
export function tvNature(n: string): string {
  return NATURE[n] ?? n;
}
