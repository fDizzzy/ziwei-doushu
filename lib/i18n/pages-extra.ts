// Bảng hiển thị tiếng Việt cho các trang /library và /knowledge.
// Chỉ dùng khi render: dữ liệu gốc (lib/classics, lib/seo), slug và khóa không bị đổi.
// Chuỗi không có trong bảng sẽ được trả nguyên văn.

interface BookDisplay {
  title: string;
  dynasty: string;
  author: string;
  intro: string;
}

// Khóa là tên sách gốc (book.title) để dùng được cả ở trang tìm kiếm (SearchHit chỉ có bookTitle).
const BOOK_BY_TITLE: Record<string, BookDisplay> = {
  '骨髓赋': {
    title: 'Cốt Tủy Phú (骨髓赋)',
    dynasty: 'Đời Minh',
    author: 'Cổ thư Tử Vi Đẩu Số truyền lại (không rõ tác giả)',
    intro: 'Khẩu quyết cốt lõi cô đọng nhất của Tử Vi Đẩu Số, toàn văn khoảng 1500 chữ. Nghê Hải Hạ trong «Thiên Kỷ» nhiều lần dẫn bài phú này, là kinh điển người học Tử Vi phải đọc.',
  },
  '紫微斗数全集': {
    title: 'Tử Vi Đẩu Số Toàn Tập (紫微斗数全集)',
    dynasty: 'Đời Minh',
    author: 'Tương truyền do tổ sư Trần Đoàn truyền lại',
    intro: 'Một trong những cổ thư có thẩm quyền nhất của Tử Vi Đẩu Số, tương truyền do tổ sư Trần Đoàn đời Tống truyền lại. Là nguồn dẫn chứng cốt lõi của hệ thống «Thiên Kỷ» của Nghê Hải Hạ.',
  },
  '紫微斗数全书': {
    title: 'Tử Vi Đẩu Số Toàn Thư (紫微斗数全书)',
    dynasty: 'Đời Minh',
    author: 'La Hồng Tiên biên soạn',
    intro: 'Cổ thư có hệ thống nhất của Tử Vi Đẩu Số, nhấn mạnh quan hệ giữa Thập Nhị Cung và Tứ Hóa. Là giáo trình chính của người học Tử Vi từ đời Thanh trở về sau.',
  },
};

/** Tên sách hiển thị, ví dụ '骨髓赋' -> 'Cốt Tủy Phú (骨髓赋)'. */
export function bookTitleVi(title: string): string {
  return BOOK_BY_TITLE[title]?.title ?? title;
}

/** Triều đại hiển thị. Không có trong bảng thì trả nguyên văn. */
export function bookDynastyVi(book: { title: string; dynasty: string }): string {
  return BOOK_BY_TITLE[book.title]?.dynasty ?? book.dynasty;
}

/** Tác giả hiển thị. Không có trong bảng thì trả nguyên văn. */
export function bookAuthorVi(book: { title: string; author: string }): string {
  return BOOK_BY_TITLE[book.title]?.author ?? book.author;
}

/** Giới thiệu sách hiển thị. Không có trong bảng thì trả nguyên văn. */
export function bookIntroVi(book: { title: string; intro: string }): string {
  return BOOK_BY_TITLE[book.title]?.intro ?? book.intro;
}

// Nhãn chủ đề của kho tri thức (TOPIC_LABEL ở lib/ziwei/db-analysis), khóa là TopicKey.
const TOPIC_LABEL_VI: Record<string, string> = {
  overview: 'Tổng quan mệnh cách',
  personality: 'Tính cách, đặc điểm',
  love: 'Tình cảm, hôn nhân',
  career: 'Sự nghiệp, nghề nghiệp',
  wealth: 'Tài vận',
  health: 'Sức khỏe',
  family: 'Huynh đệ, hợp tác',
  children: 'Duyên con cái',
  move: 'Thiên di, đi xa',
  friends: 'Quan hệ, quý nhân',
  home: 'Điền trạch, bất động sản',
  spirit: 'Tinh thần, phúc đức',
  parents: 'Cha mẹ, bậc trưởng bối',
};

/** Nhãn chủ đề tiếng Việt theo topic key; không có thì dùng nhãn gốc `fallback`. */
export function topicLabelVi(topic: string, fallback: string): string {
  return TOPIC_LABEL_VI[topic] ?? fallback;
}
