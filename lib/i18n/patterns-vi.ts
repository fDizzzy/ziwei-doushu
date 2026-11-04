// Dịch mô tả / điều kiện / nguồn của cách cục (lib/ziwei/patterns.ts) ở điểm render.
// Chuỗi tĩnh tra bảng PATTERN_TEXT; chuỗi ghép động (có tên sao, địa chi) khớp theo quy tắc bên dưới.
import { tv, tvText } from './vi';
import { PATTERN_TEXT } from './patterns-vi-data';

const STAR = '((?:[^、，。（）]){2,4})';
const star = (s: string) => tvText(s);
const list = (s: string) => s.split('、').map(star).join(', ');
const gong = (b: string) => `cung ${tv(b)}`;
const meet = (s: string) => (s === '同宫' ? 'đồng cung' : 'hội chiếu');

const RULES: Array<[RegExp, (m: RegExpExecArray) => string]> = [
  [/^贪狼(同宫|会照)(火星|铃星)$/, m => `Tham Lang ${meet(m[1])} ${star(m[2])}`],
  [
    /^贪狼遇(火星|铃星)(同宫|三方会照)，主突发横财、突如其来的机遇。古书云“贪狼遇火铃，必发横财”，但来得快去得也快，宜见好就收。(本盘破格条件已触发，发力打折。)?$/,
    m =>
      `Tham Lang gặp ${star(m[1])} ${m[2] === '同宫' ? 'đồng cung' : 'hội chiếu tam phương'}, chủ phát tài bất ngờ, cơ hội đến đột xuất. Cổ thư nói “Tham Lang gặp Hỏa Linh, tất phát hoạnh tài”, nhưng đến nhanh đi cũng nhanh, nên thấy tốt thì thu.${m[3] ? ' Điều kiện phá cách của lá số này đã kích hoạt, lực phát bị giảm.' : ''}`,
  ],
  [/^太阳太阴同入(.)宫$/, m => `Thái Dương, Thái Âm cùng nhập ${gong(m[1])}`],
  [
    /^太阳太阴于(.)宫同宫，阴阳平衡，文武兼备。主异性缘佳、事业顺遂、名声远播。(未宫日月双美尤佳。|丑宫日月同宫力量较平。)$/,
    m =>
      `Thái Dương, Thái Âm đồng cung ở ${gong(m[1])}, âm dương cân bằng, văn võ song toàn. Chủ duyên với người khác giới tốt, sự nghiệp thuận lợi, danh tiếng lan xa. ${m[2].startsWith('未') ? 'Nhật Nguyệt song mỹ ở cung Mùi càng tốt.' : 'Nhật Nguyệt đồng cung ở cung Sửu lực tương đối bình.'}`,
  ],
  [/^巨门太阳同入(.)宫$/, m => `Cự Môn, Thái Dương cùng nhập ${gong(m[1])}`],
  [
    /^巨门太阳同(.)宫，太阳化解巨门暗曜，主以口才、传媒、外语、专业立业。寅宫为佳，申宫力减。怕巨门化忌则官非。$/,
    m =>
      `Cự Môn, Thái Dương đồng cung ở ${gong(m[1])}, Thái Dương hóa giải ám diệu của Cự Môn, chủ lập nghiệp bằng khẩu tài, truyền thông, ngoại ngữ, chuyên môn. Cung Dần là tốt, cung Thân lực giảm. Sợ Cự Môn Hóa Kỵ thì thành kiện tụng quan sự.`,
  ],
  [/^巨门入命于(.)宫$/, m => `Cự Môn nhập Mệnh ở ${gong(m[1])}`],
  [
    new RegExp(`^${STAR}化禄坐命，主生财顺利、人缘佳、机缘多。(.*)$`),
    m => {
      const extra: Record<string, string> = {
        '武曲化禄属正财，宜实业、金融。': 'Vũ Khúc Hóa Lộc thuộc chính tài, hợp thực nghiệp, tài chính.',
        '太阴化禄属阴财、不动产。': 'Thái Âm Hóa Lộc thuộc âm tài, bất động sản.',
        '贪狼化禄属人脉财、桃花财。': 'Tham Lang Hóa Lộc thuộc tài từ quan hệ, tài đào hoa.',
      };
      const tail = m[2] ? ` ${extra[m[2]] ?? tvText(m[2])}` : '';
      return `${star(m[1])} Hóa Lộc tọa Mệnh, chủ sinh tài thuận lợi, được lòng người, nhiều cơ duyên.${tail}`;
    },
  ],
  [new RegExp(`^${STAR}化禄坐命宫$`), m => `${star(m[1])} Hóa Lộc tọa cung Mệnh`],
  [
    new RegExp(`^${STAR}化忌坐命宫，需留意自身固执、心理障碍或健康隐患，凡事退一步思考。化忌不一定坏，代表此星能量需要特别关注。$`),
    m =>
      `${star(m[1])} Hóa Kỵ tọa cung Mệnh, cần lưu ý sự cố chấp của bản thân, rào cản tâm lý hoặc hiểm họa sức khỏe, việc gì cũng nên lùi một bước mà nghĩ. Hóa Kỵ không nhất định xấu, nó cho thấy năng lượng của sao này cần được đặc biệt chú ý.`,
  ],
  [
    new RegExp(`^${STAR}化忌坐迁移宫，外出、远行、人际关系易有波折，宜守不宜动。$`),
    m => `${star(m[1])} Hóa Kỵ tọa cung Thiên Di, ra ngoài, đi xa, quan hệ giao tế dễ gặp trắc trở, nên giữ không nên động.`,
  ],
  [new RegExp(`^${STAR}化忌坐(命|迁)宫$`), m => `${star(m[1])} Hóa Kỵ tọa cung ${m[2] === '命' ? 'Mệnh' : 'Thiên Di'}`],
  [
    new RegExp(`^${STAR}化禄入财帛宫，主财源畅通、收入稳定。倪师讲化禄是「正财」象征——这个化禄星所代表的能力（${STAR}的核心特质）是你赚钱的主轴。配禄存或天马则财源更广。$`),
    m =>
      `${star(m[1])} Hóa Lộc nhập cung Tài Bạch, chủ nguồn tiền thông suốt, thu nhập ổn định. Nghê sư giảng Hóa Lộc là biểu tượng của “chính tài” — năng lực mà sao Hóa Lộc này đại diện (đặc chất cốt lõi của ${star(m[2])}) là trục kiếm tiền chính của bạn. Phối Lộc Tồn hoặc Thiên Mã thì nguồn tiền càng rộng.`,
  ],
  [new RegExp(`^${STAR}化禄入财帛宫$`), m => `${star(m[1])} Hóa Lộc nhập cung Tài Bạch`],
  [
    new RegExp(`^${STAR}化权入官禄宫，主事业有掌控力、能担当独当一面的职位。化权代表权力与执行力——${STAR}化权说明你在事业上能成为决策者或核心执行者，宜走管理或技术权威路线。$`),
    m =>
      `${star(m[1])} Hóa Quyền nhập cung Quan Lộc, chủ sự nghiệp có sức kiểm soát, đảm đương được vị trí độc lập. Hóa Quyền đại diện cho quyền lực và năng lực thực thi — ${star(m[2])} Hóa Quyền cho thấy bạn có thể trở thành người ra quyết định hoặc cốt cán thực thi trong sự nghiệp, nên đi theo hướng quản lý hoặc uy tín kỹ thuật.`,
  ],
  [new RegExp(`^${STAR}化权入官禄宫$`), m => `${star(m[1])} Hóa Quyền nhập cung Quan Lộc`],
  [
    new RegExp(`^${STAR}化科入(命|身)宫，主名声、文书、学术运。倪师讲化科是「贵人星」——${STAR}化科带来的是被人看重的特质，宜从事文书、教育、研究、咨询、文创等“以名取利”的方向。$`),
    m =>
      `${star(m[1])} Hóa Khoa nhập cung ${m[2] === '命' ? 'Mệnh' : 'Thân'}, chủ vận danh tiếng, văn thư, học thuật. Nghê sư giảng Hóa Khoa là “quý nhân tinh” — ${star(m[3])} Hóa Khoa mang đến đặc chất được người ta coi trọng, nên làm các nghề văn thư, giáo dục, nghiên cứu, tư vấn, sáng tạo văn hóa — hướng “lấy danh làm lợi”.`,
  ],
  [new RegExp(`^${STAR}化科入(命|身)宫$`), m => `${star(m[1])} Hóa Khoa nhập cung ${m[2] === '命' ? 'Mệnh' : 'Thân'}`],
  [
    /^机月同梁需天机、太阴、天同、天梁四星齐会三方四正方为完整真格；本盘只会齐其中 3 颗（(.+?)），缺(.+?)未会，并非完整真格，力量减一档。文质带谋，宜公职、教研、医疗、服务等靠积累与稳定的行业，关键看缺位星与四化的配合。$/,
    m =>
      `Cơ Nguyệt Đồng Lương cần đủ bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội tam phương tứ chính mới là chân cách đầy đủ; lá số này chỉ hội đủ 3 sao (${list(m[1])}), thiếu ${list(m[2])} chưa hội, không phải chân cách đầy đủ, lực giảm một bậc. Nho nhã có mưu lược, hợp công chức, giảng dạy – nghiên cứu, y tế, dịch vụ và các ngành dựa vào tích lũy, ổn định; mấu chốt xem sự phối hợp giữa sao khuyết và Tứ Hóa.`,
  ],
  [/^三方四正会(.+?)（机月同梁缺(.+?)）$/, m => `Tam phương tứ chính hội ${list(m[1])} (Cơ Nguyệt Đồng Lương thiếu ${list(m[2])})`],
];

/** Dịch một dòng mô tả / điều kiện / nguồn của cách cục. Không khớp bảng nào thì dịch tên sao và trả phần còn lại nguyên văn. */
export function tvPatternText(text: string): string {
  const exact = PATTERN_TEXT[text];
  if (exact) return exact;
  for (const [re, fn] of RULES) {
    const m = re.exec(text);
    if (m) return fn(m);
  }
  return tvText(tv(text));
}

/** Dịch danh sách điều kiện, nối bằng dấu phẩy. */
export function tvPatternList(items: string[]): string {
  return items.map(tvPatternText).join(', ');
}
