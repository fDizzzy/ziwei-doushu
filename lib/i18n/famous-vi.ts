// Bản Việt cho danh sách người nổi tiếng (lib/ziwei/famous.ts), khóa theo id.
interface FamousVi { name: string; description: string; notable: string }

export const FAMOUS_VI: Record<string, FamousVi> = {
  'ma-yun': {
    name: 'Jack Ma (Mã Vân)',
    description: 'Nhà sáng lập Alibaba',
    notable: 'Lá số cho thấy sức phá cách rồi dựng lại rất mạnh; các sao ở cung Quan Lộc tương ứng cao độ với đế chế thương mại internet.',
  },
  'li-jiacheng': {
    name: 'Lý Gia Thành',
    description: 'Tỷ phú Hồng Kông, người sáng lập tập đoàn Trường Giang Hòa Ký (CK Hutchison)',
    notable: 'Tứ Hóa ở cung Tài Bạch là ví dụ điển hình để nghiên cứu lá số của người giàu nhất phương Đông; Lộc Tồn thủ Tài, càng tích càng dày.',
  },
  'ren-zhengfei': {
    name: 'Nhậm Chính Phi',
    description: 'Nhà sáng lập Huawei',
    notable: 'Cách Thất Sát nhập Mệnh, cả đời đi ngược gió, càng bị đè càng mạnh, là ví dụ sống cho lý thuyết Thất Sát của Nghê sư.',
  },
  'zhang-ailing': {
    name: 'Trương Ái Linh',
    description: 'Đại gia của văn học hiện đại Trung Quốc',
    notable: 'Tổ hợp các sao cô độc trong lá số đối chiếu kỳ lạ với đường tình duyên truyền kỳ và thành tựu văn học của bà.',
  },
  'jay-chou': {
    name: 'Châu Kiệt Luân',
    description: 'Thiên vương nhạc pop Hoa ngữ',
    notable: 'Văn Khúc kết hợp Tham Lang, bẩm sinh có tài nghệ; lá số giải thích vì sao ông có thể đi xuyên nhiều phong cách âm nhạc.',
  },
  'wang-fei': {
    name: 'Vương Phi (Faye Wong)',
    description: 'Nữ ca sĩ giàu màu sắc huyền thoại nhất làng nhạc Hoa ngữ',
    notable: 'Các sao ở cung Phu Thê tương ứng cao độ với hai cuộc hôn nhân nổi tiếng của bà, cách cục tình cảm rất có giá trị nghiên cứu.',
  },
  'lin-zhiling': {
    name: 'Lâm Chí Linh',
    description: 'Người mẫu, diễn viên Đài Loan',
    notable: 'Thái Âm thủ Mệnh là hình mẫu nhan sắc nữ giới, lá số ứng với nhận định của Nghê sư rằng “Thái Âm nhập Mệnh, con gái đẹp nhất”.',
  },
  'steve-jobs': {
    name: 'Steve Jobs',
    description: 'Đồng sáng lập Apple',
    notable: 'Cách Phá Quân nhập Mệnh, bị cha mẹ ruột bỏ rơi rồi dựng nên đế chế Apple, là lá số mẫu mực của “phá rồi mới lập”.',
  },
  'elon-musk': {
    name: 'Elon Musk',
    description: 'Nhà sáng lập SpaceX, CEO Tesla',
    notable: 'Biểu hiện cực đoan của cách Sát Phá Lang, Thiên Mã trong lá số rất vượng, cả đời đẩy xa ranh giới tương lai của nhân loại.',
  },
  'yao-ming': {
    name: 'Diêu Minh',
    description: 'Trung phong huyền thoại NBA, đại sứ bóng rổ Trung Quốc',
    notable: 'Thiên Lương thủ Mệnh, cao lớn uy nghiêm; các sao ở cung Quan Lộc rất khớp với thành tựu sự nghiệp của ông.',
  },
  'li-na': {
    name: 'Lý Na',
    description: 'Nhà vô địch Grand Slam quần vợt Trung Quốc',
    notable: 'Thất Sát hóa khí, số mệnh định phải tranh đấu với người; đại hạn và lưu niên ứng chính xác với thời điểm vô địch Pháp mở rộng.',
  },
};

/** Lấy bản Việt của một người nổi tiếng; không có trong bảng thì dùng nguyên bản. */
export function famousVi<T extends { id: string; name: string; description: string; notable: string }>(p: T): FamousVi {
  return FAMOUS_VI[p.id] ?? { name: p.name, description: p.description, notable: p.notable };
}
