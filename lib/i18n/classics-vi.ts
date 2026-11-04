// Bản dịch nghĩa tiếng Việt cho lib/classics. Khóa theo id đoạn và theo `${slug}:${chỉ số chương}`,
// nên dữ liệu gốc chữ Hán, slug và anchor không đổi. Bản dịch chỉ mang tính tham khảo, bám sát câu chữ của nguyên văn.

export const CHAPTER_VI: Record<string, { title: string; subtitle?: string }> = {
  'gusuifu:0': { title: 'Tổng luận (总论篇)', subtitle: 'Lập luận cơ bản của Tử Vi Đẩu Số' },
  'gusuifu:1': { title: 'Luận sao Tử Vi (紫微星论)', subtitle: 'Tôn vị đế tòa, có phụ tá thì quý' },
  'gusuifu:2': { title: 'Luận sao Thất Sát (七杀星论)', subtitle: 'Tướng tinh cô độc, hợp võ chức' },
  'gusuifu:3': { title: 'Cách Sát Phá Lang (杀破狼格)', subtitle: 'Mệnh khai sáng xông pha, nhiều biến động' },
  'gusuifu:4': { title: 'Cơ Nguyệt Đồng Lương (机月同梁)', subtitle: 'Ổn định tích lũy, hợp công chức' },
  'gusuifu:5': { title: 'Luận Tứ Hóa tinh (四化星论)', subtitle: 'Cát hung của Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ' },
  'gusuifu:6': { title: 'Luận Phụ Bật Khôi Việt (辅弼魁钺论)', subtitle: 'Sự quý của lục cát tinh' },
  'gusuifu:7': { title: 'Luận lục sát tinh (六煞星论)', subtitle: 'Hung của Dương, Đà, Hỏa, Linh, Không, Kiếp' },
  'gusuifu:8': { title: 'Luận Thập Nhị Cung (十二宫论)', subtitle: 'Chủ tượng và cát hung của từng cung' },

  'quanji:0': { title: 'Quyển một · Tổng luận (卷一·总论)', subtitle: 'Phép tắc cơ bản của Tử Vi Đẩu Số' },
  'quanji:1': { title: 'Quyển hai · Luận sao Tử Vi (卷二·紫微星论)', subtitle: 'Sự tôn quý của đế tòa' },
  'quanji:2': { title: 'Quyển ba · Luận sáu sao Nam Đẩu (卷三·南斗六星论)', subtitle: 'Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương' },
  'quanji:3': { title: 'Quyển bốn · Luận sáu sao Bắc Đẩu (卷四·北斗六星论)', subtitle: 'Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Liêm Trinh, Phá Quân' },
  'quanji:4': { title: 'Quyển năm · Luận Tứ Hóa và cách cục (卷五·四化与格局论)', subtitle: 'Sức mạnh của Tứ Hóa và các cách cục quan trọng' },

  'quanshu:0': { title: 'Luận Thập Nhị Cung · Cung Mệnh (十二宫论·命宫)', subtitle: 'Gốc rễ của việc xem mệnh' },
  'quanshu:1': { title: 'Luận Thập Nhị Cung · Cung Tài Bạch (十二宫论·财帛宫)', subtitle: 'Nơi có nguồn tiền' },
  'quanshu:2': { title: 'Luận Thập Nhị Cung · Cung Quan Lộc (十二宫论·官禄宫)', subtitle: 'Gốc của sự nghiệp' },
  'quanshu:3': { title: 'Luận Thập Nhị Cung · Cung Phu Thê (十二宫论·夫妻宫)', subtitle: 'Khí chất của bạn đời' },
  'quanshu:4': { title: 'Luận Tứ Hóa (四化论)', subtitle: 'Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ' },
  'quanshu:5': { title: 'Cách Cơ Nguyệt Đồng Lương (机月同梁格)', subtitle: 'Mệnh ổn định tích lũy' },
  'quanshu:6': { title: 'Cách Song Lộc Triều Viên (双禄朝垣格)', subtitle: 'Giàu sánh Đào Chu' },
};

const CO_NGUYET = 'Cơ Nguyệt Đồng Lương “làm lại nhân” (làm việc quan lại) — cổ nhân nói người có cách này nên làm công chức, công việc hành chính văn thư, cả đời an ổn. Lại hội Xương Khúc, Hóa Khoa thì chủ danh tiếng lan xa. Kỵ nhất là sát tinh quá nhiều, khi ấy ngược lại chủ nhiều biến động khó yên.';

export const PARAGRAPH_VI: Record<string, string> = {
  // Cốt Tủy Phú
  'gsf-1-1': 'Các sao Thái Cực là chủ của muôn sao. Tử Vi là đế tòa, tôn quý nhất trong các sao. Thiên Phủ là lệnh tinh; trong Nam Bắc Đẩu có Hóa Lộc, Hóa Quyền, lệnh tinh; Tả Phù, Hữu Bật là các sao chủ việc tế tự.',
  'gsf-1-2': 'Tử Vi là vua, lấy Tả Phù, Hữu Bật làm tướng. Thiên Phủ là bề tôi, lấy Lộc Tồn làm kho tàng. Thiên Cơ là “thiện”, Thiên Lương là “ấm”, gặp thì tốt; Liêm Trinh là “tù”, Phá Quân là “hao”, gặp thì xấu.',
  'gsf-1-3': 'Cốt yếu khi xem mệnh là xem cung Mệnh trước. Chủ tinh cung Mệnh định cách cục, tam phương tứ chính định nơi dụng võ. Kế đến xem Thân cung, Thân cung định cảnh về già và nơi nương tựa. Sau đó xem đại hạn, lưu niên để định tiết tấu tiến thoái cả đời.',
  'gsf-2-1': 'Tử Vi là sao đế tòa, được Phụ Bật thì quý, được Xương Khúc thì tú, được Khôi Việt thì có quý nhân nâng đỡ. Tử Vi độc tọa không có phụ tá thì dù quý cũng không bền; được cát tinh trong tam phương tứ chính hội chiếu mới là đại cách chính tông.',
  'gsf-2-2': 'Tử Vi ở Tý, Ngọ là cái quý “quay mặt về nam, lưng hướng bắc”, chủ đại phú đại quý; Tử Vi ở Sửu, Mùi đồng cung với Phá Quân, chủ cương nghị quả quyết; Tử Vi ở Dần, Thân đồng cung với Thiên Phủ, gọi là cách “Tử Phủ đồng cung”, chủ phẩm hạnh đoan chính, cơm áo đầy đủ.',
  'gsf-2-3': 'Tử Vi ở Quan Lộc, không bị sát tinh xung phá, ắt làm quan cao; Tử Vi ở Điền Trạch, chủ có tổ nghiệp lại tự tạo thêm được; Tử Vi ở Phu Thê, chủ bạn đời đoan trang, khí chất phi phàm, nhưng nên kết hôn muộn, không nên sớm.',
  'gsf-2-4': 'Tử Vi kỵ Không Kiếp, chủ có ngôi mà không có lộc. Tử Vi kỵ vua cô độc không có phụ tá, chủ như đỉnh núi đơn độc, khó thành việc lớn. Tử Vi Hóa Quyền chủ độc đoán, Tử Vi Hóa Khoa chủ danh tiếng, Tử Vi Hóa Kỵ chủ bị người khác kìm chế.',
  'gsf-3-1': 'Thất Sát là tướng tinh, tính cương nghị quả quyết. Thất Sát thủ Mệnh không thích đồng cung với các cát tinh, đi con đường riêng mới là bản cách. Thất Sát gặp Không Kiếp, chủ cô độc phiêu bạt, sự nghiệp khó thành.',
  'gsf-3-2': 'Cách Thất Sát Triều Đẩu: Thất Sát ở Tý, Ngọ, Dần, Thân, cung đối có Tử Vi, Thiên Phủ chiếu, chủ tước lộc hưng thịnh. Hợp nhất với quân cảnh, võ chức, khai cương mở cõi. Cả đời quý khí khó cản, nhưng phải trải rèn luyện mới thành đại khí.',
  'gsf-3-3': 'Thất Sát gặp Dương Đà, chủ hình thương huyết quang; Thất Sát gặp Hỏa Linh, chủ uy vũ cương liệt; Thất Sát gặp Hóa Lộc, chủ cả đời võ quý; Thất Sát gặp Hóa Kỵ, ngược lại chủ tiêu trầm, sự nghiệp nhiều thất bại.',
  'gsf-4-1': 'Thất Sát, Phá Quân, Tham Lang ba sao hội Mệnh, Thiên Di, Tài Bạch, Quan Lộc, gọi là “cách Sát Phá Lang”. Chủ cả đời nhiều biến động, không cam bình thường, hợp khởi nghiệp, quân cảnh, kinh doanh. Thuở trẻ dễ bốc đồng thất bại, sau trung niên mới ổn định giữ nghiệp.',
  'gsf-4-2': 'Sát Phá Lang tam phương có Hóa Lộc hoặc Hóa Quyền, chủ động mà có lực, có thể thành việc lớn; nếu tam phương sát tinh quá nặng (Dương Đà Hỏa Linh cùng chiếu), chủ động mà không thành, nên tĩnh thủ.',
  'gsf-5-1': 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc, gọi là “cách Cơ Nguyệt Đồng Lương”. Chủ nho nhã, thông minh giỏi mưu tính. Hợp nhất với công chức, học thuật, văn nghệ, y tế, dịch vụ — những ngành cần tích lũy ổn định, không nên mạo hiểm lớn hay đầu cơ lớn.',
  'gsf-5-2': CO_NGUYET,
  'gsf-6-1': 'Hóa Lộc chủ tiền tài, chủ duyên phận, chủ năng lực chuyển thành giá trị; Hóa Quyền chủ quyền lực, chủ quyết đoán, chủ đảm đương độc lập; Hóa Khoa chủ danh, chủ quý nhân, chủ văn thư; Hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc.',
  'gsf-6-2': 'Hóa Lộc nhập Mệnh, nguồn tiền dồi dào; Hóa Quyền nhập Mệnh, gánh được trọng trách; Hóa Khoa nhập Mệnh, danh tiếng lan xa; Hóa Kỵ nhập Mệnh, phải qua rèn luyện mới thành tài.',
  'gsf-6-3': 'Hóa Kỵ nhập Tài, chủ tiền đến rồi đi; Hóa Kỵ nhập Quan, chủ sự nghiệp gặp trở ngại; Hóa Kỵ nhập Phu Thê, chủ hôn nhân nhiều trắc trở; Hóa Kỵ nhập Tử Tức, chủ duyên con cái mỏng hoặc cha mẹ và con cái va chạm.',
  'gsf-6-4': 'Lộc Tồn và Hóa Lộc cùng hội tam phương cung Mệnh, gọi là “Song Lộc Triều Viên”, chủ giàu sánh Đào Chu; Hóa Khoa và Hóa Quyền cùng hội, gọi là “Khoa Quyền song hội”, chủ danh và quyền đều đẹp.',
  'gsf-7-1': 'Tả Phù, Hữu Bật là “tướng tinh”, chủ quý nhân trợ lực; Văn Xương, Văn Khúc là “văn tinh”, chủ thông minh tuấn tú; Thiên Khôi, Thiên Việt là “quý nhân tinh”, chủ lúc then chốt có người nâng đỡ.',
  'gsf-7-2': 'Lục cát tinh cùng hội tam phương tứ chính cung Mệnh, chủ cả đời quý nhân không dứt, nhân duyên rất tốt. Dù mệnh cách bình thường, cũng nhờ sức lục cát mà đạt được nghiệp phi phàm.',
  'gsf-7-3': 'Phụ Bật giáp Mệnh: Tả Phù, Hữu Bật kẹp hai cung trước và sau cung Mệnh, chủ cả đời được quý nhân nâng đỡ, gặp khó có người giúp. Hợp nhất là đồng cung với Tử Vi, gọi là cách “Quân Thần Khánh Hội”.',
  'gsf-8-1': 'Kình Dương, Đà La là “sát tinh”, chủ huyết quang, thị phi, trở ngại; Hỏa Tinh, Linh Tinh là “táo tinh”, chủ bốc đồng, nóng nảy, tai họa thương tổn; Địa Không, Địa Kiếp là “không vong”, chủ hao tài, hư danh, không thực.',
  'gsf-8-2': 'Sát tinh không hoàn toàn là hung — sát tinh như đá mài dao, có thể rèn ra sức phá cục mà người thường không có. Thuở trẻ dễ bốc đồng tự hại, sau trung niên mới biết hóa sát thành quyền.',
  'gsf-8-3': 'Dương Đà giáp Kỵ: Kình Dương, Đà La kẹp cung có sao Hóa Kỵ, chủ đại hung. Trong năm đó, đại hạn đó phải đặc biệt cảnh giác huyết quang, kiện tụng, biến cố lớn.',
  'gsf-8-4': 'Không Kiếp giáp Mệnh: Địa Không, Địa Kiếp kẹp hai cung trước sau cung Mệnh, chủ cả đời nên làm việc hư không làm việc thực, nên theo văn nghệ, tôn giáo, huyền học và các ngành “phi thực”, không nên kinh doanh đầu tư.',
  'gsf-9-1': 'Cung Mệnh là gốc, tam phương là dụng: Tài Bạch chủ nguồn tiền, Quan Lộc chủ sự nghiệp, Thiên Di chủ ngoại duyên. Cát tinh tam phương tứ chính hội chiếu, mệnh cách mới trọn vẹn phát dụng.',
  'gsf-9-2': 'Cung Phu Thê xem khí chất bạn đời, cung Tử Tức xem duyên con cái, cung Tật Ách xem điểm yếu của cơ thể, cung Thiên Di xem vận khi ra ngoài. Chủ tinh và Tứ Hóa của mỗi cung quyết định cát hung tiến thoái của lĩnh vực đó.',
  'gsf-9-3': 'Cung Điền Trạch là tài khố của lá số, chính tài có giữ được hay không xem cung này; cung Phúc Đức là hưởng thụ tinh thần, lòng có an hay không xem cung này; cung Phụ Mẫu là quan hệ với bậc trưởng bối, cũng chủ văn thư, hợp đồng.',
  'gsf-9-4': 'Cung trống mượn cung đối để luận — khi một cung không có chủ tinh, mượn chủ tinh cung đối để luận việc của cung đó. Như cung Mệnh vô chính diệu, mượn chủ tinh cung Thiên Di để định mệnh cách.',

  // Tử Vi Đẩu Số Toàn Tập
  'qj-1-1': 'Tử Vi Đẩu Số vốn do tổ sư Trần Đoàn truyền lại, lấy Tử Vi làm đế tòa, thống lĩnh trăm sao. Mỗi sao đều có chủ quản riêng, có phân miếu vượng lợi hãm, có khác biệt cát hung khi hội chiếu. Người xem mệnh, trước phải an sao, thứ hai định cung Mệnh và Thân cung, thứ ba xem cát hung của mười hai cung, thứ tư tham khảo phi hóa của đại hạn, lưu niên.',
  'qj-1-2': 'Phép an sao: trước hết lấy thiên can của năm khởi Tử Vi; vị trí cung của Tử Vi đã định thì các sao đều theo phép của nó mà bày vào mười hai cung. Mười bốn chính tinh mỗi sao ở vị trí của mình, lục cát lục sát phụ trợ vận hành. Một lá số đã định, vạn tượng đều hiện.',
  'qj-1-3': 'Cung Mệnh là gốc, chủ cách cục cả đời; Thân cung là phụ, chủ nơi về sau ba mươi tuổi. Mệnh Thân rõ ràng mới biết được tiến thoái của một người. Tam phương tứ chính hội chiếu mới biết được nơi dụng võ của một người. Mười hai cung đều có chủ quản, mới biết được toàn đồ của đời người.',
  'qj-2-1': 'Tử Vi là chủ của Bắc Đẩu, thống lĩnh các sao. Tử Vi thuộc Thổ, là sao tôn quý. Về số là đế tòa, hóa khí là “tôn”, chủ trung hậu có uy nghi, đi con đường riêng. Nam mệnh nữ mệnh đều ưa Tử Vi thủ Mệnh, nhưng cần có Tả Phù, Hữu Bật đến chầu mới là chính cách.',
  'qj-2-2': 'Tử Vi độc tọa cần có Tả Hữu, Xương Khúc, Khôi Việt kẹp giữ mới dùng được — Tử Vi đơn độc không nơi nương tựa, dù quý cũng không bền; được cát tinh tam phương tứ chính hội chiếu mới là đại cách Quân Thần Khánh Hội.',
  'qj-2-3': 'Tử Vi nhập Mệnh, anh em có quý khí, độc lập nổi bật, thường được anh cả giúp đỡ; Tử Vi ở Tử Tức, con cái có quý khí, nhưng dạy dỗ cần bình đẳng; Tử Vi ở Phu Thê, bạn đời đoan trang, nhưng nên kết hôn muộn, không nên sớm.',
  'qj-2-4': 'Tử Vi ở Điền Trạch, chủ có tổ nghiệp lại tự tạo thêm được, bất động sản có thể là trục chính để làm giàu; Tử Vi ở Phúc Đức, về mặt tinh thần theo đuổi phong cách, lòng tự tôn mạnh; Tử Vi ở Quan Lộc, chủ đại phú quý, nên ở vị trí cao.',
  'qj-3-1': 'Thiên Phủ thuộc Thổ, là lệnh tinh của Nam Đẩu, chủ về lộc khố. Thiên Phủ độc tọa chủ phẩm hạnh đoan chính, cơm áo không lo. Thiên Phủ đồng cung với Tử Vi gọi là “Tử Phủ đồng cung”, chủ tôn quý. Thiên Phủ ưa nhất gặp Lộc Tồn, gọi là “Song Lộc Triều Viên”, chủ đại phú.',
  'qj-3-2': 'Thái Âm là chủ tinh của trung thiên, thuộc Thủy. Thái Âm miếu vượng chủ điền trạch, phú quý; lạc hãm chủ lao lực, bôn ba. Nữ mệnh Thái Âm cát nhất, chủ dung mạo đẹp, hiền thục. Thái Âm ở Hợi, Tý chủ đại phú, Thái Âm ở Ngọ, Mùi thì giảm lực.',
  'qj-3-3': 'Tham Lang là sao đào hoa và dục vọng, thuộc Mộc và Thủy. Tham Lang chủ nhiều tài nghệ, giao tế rộng. Tham Lang gặp Hỏa Tinh gọi là “Hỏa Tham cách”, gặp Linh Tinh gọi là “Linh Tham cách”, đều chủ thiên tài hoạnh phát. Nhưng Tham Lang kỵ Không Kiếp, chủ hào nhoáng không thực chất.',
  'qj-3-4': 'Cự Môn thuộc Thủy, hóa khí là “ám”, chủ khẩu thiệt thị phi. Cự Môn là sao khẩu tài, hợp luật sư, giáo viên, truyền thông. Cự Môn Hóa Lộc chủ “lấy miệng sinh tiền”, Hóa Kỵ thì khẩu thiệt kiện tụng không dứt. Cự Môn kỵ nhất đồng cung với Thái Dương ở hai cung Sửu, Mùi, gọi là “Nhật Nguyệt phản bối”.',
  'qj-3-5': 'Thiên Tướng thuộc Thủy, hóa khí là “ấn”, là sao phụ tá. Thiên Tướng trung hậu thật thà, hợp hành chính, thư ký, pháp vụ. Thiên Tướng không thích độc tọa, hợp nhất đồng cung với Tử Vi hoặc Liêm Trinh, nhờ uy nghi của họ mà thành việc.',
  'qj-3-6': 'Thiên Lương thuộc Thổ, hóa khí là “ấm”, là sao của người già. Thiên Lương chủ lương thiện, từ bi, cô khắc, hóa giải. Thiên Lương hợp luật pháp, y học, giáo dục, tôn giáo. Thiên Lương Hóa Khoa chủ danh tiếng, Hóa Lộc ngược lại hư phù.',
  'qj-4-1': 'Tử Vi thuộc Thổ, đã luận ở quyển hai.',
  'qj-4-2': 'Thiên Cơ thuộc Mộc, hóa khí là “thiện”, là sao trí tuệ. Thiên Cơ chủ thông minh, linh hoạt, hiếu động. Thiên Cơ nhập Mệnh, tư duy nhanh nhạy, hợp tư vấn, hoạch định, văn giáo. Thiên Cơ kỵ nhất hay thay đổi không chủ kiến, cần Văn Xương, Văn Khúc hội chiếu mới thành tài.',
  'qj-4-3': 'Thái Dương thuộc Hỏa, hóa khí là “quý”, là sao quý của nam giới. Thái Dương chủ danh dự, công vụ, giao tế. Thái Dương miếu vượng chủ đại quý, lạc hãm thì lao nhọc không thu hoạch. Thái Dương hợp nhất ở các cung Mão, Thìn, Tỵ, Ngọ, rơi vào Tuất, Hợi, Tý, Sửu thì giảm lực.',
  'qj-4-4': 'Vũ Khúc thuộc Kim, hóa khí là “tài”, là chủ của các tài tinh. Vũ Khúc chủ cương nghị quả quyết, giỏi quản lý tiền bạc, kinh doanh. Vũ Khúc Hóa Kỵ chủ phẫu thuật huyết quang, tai nạn do kim loại. Vũ Khúc ở Sửu, Mùi đồng cung với Thất Sát, gọi là cách “Vũ Khúc Thất Sát”, chủ cương trực, võ quý.',
  'qj-4-5': 'Liêm Trinh thuộc Hỏa và Mộc, hóa khí là “tù”, là thứ đào hoa tinh. Liêm Trinh văn võ song toàn, đa tài nghệ. Liêm Trinh Hóa Kỵ chủ huyết quang, kiện tụng, tranh chấp tình cảm. Liêm Trinh đồng cung với Thiên Tướng là “Liêm Tướng cách”, chủ tiếng thanh liêm.',
  'qj-4-6': 'Phá Quân thuộc Thủy, hóa khí là “hao”, là sao phá hoại và đổi mới. Phá Quân chủ khai sáng, biến động, duyên lục thân mỏng. Phá Quân hợp dùng chuyên môn kỹ thuật đi khắp thiên hạ. Phá Quân Hóa Lộc gọi là “phá rồi mới lập”, chủ trước tán sau tụ.',
  'qj-5-1': 'Hóa Lộc chủ nguồn tiền, chủ duyên phận, chủ năng lực chuyển thành giá trị. Hóa Lộc nhập tam phương cung Mệnh, chủ nguồn tiền dồi dào; Hóa Lộc nhập Tài Bạch, chủ tiền đến tiền đi, chính tài ổn định.',
  'qj-5-2': 'Hóa Quyền chủ quyền lực, chủ quyết đoán, chủ đảm đương. Hóa Quyền nhập Mệnh, chủ có thể độc đương nhất diện; Hóa Quyền nhập Quan Lộc, chủ sự nghiệp có sức kiểm soát, nên theo hướng quản lý hoặc uy tín kỹ thuật.',
  'qj-5-3': 'Hóa Khoa chủ danh tiếng, chủ văn thư, chủ quý nhân. Hóa Khoa nhập Mệnh, chủ danh tiếng lan xa; Hóa Khoa nhập Thân, chủ lấy danh làm lợi, hợp văn giáo, nghiên cứu, tư vấn.',
  'qj-5-4': 'Hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc. Hóa Kỵ nhập tam phương cung Mệnh, chủ cả đời có một “điểm cùn” — đó là bài học sâu nhất trong mệnh cách, vượt qua được chính là đại trí tuệ. Khoảng ba mươi tuổi là lúc Hóa Kỵ sắc bén nhất.',
  'qj-5-5': 'Cách Tử Phủ đồng cung: Tử Vi, Thiên Phủ cùng nhập cung Mệnh, chủ phẩm hạnh đoan chính, cơm áo không lo, có tài lãnh đạo. Cần Tả Phù, Hữu Bật phối hợp mới thành đại cách trọn vẹn.',
  'qj-5-6': 'Cách Thất Sát Triều Đẩu: Thất Sát ở các cung Tý, Ngọ, Dần, Thân tọa Mệnh, cung đối có Tử Vi, Thiên Phủ chiếu, chủ tước lộc hưng thịnh — võ chức đại quý, hợp nhất quân cảnh, chính giới hoặc quản lý cấp cao doanh nghiệp.',
  'qj-5-7': 'Cách Song Lộc Triều Viên: Hóa Lộc, Lộc Tồn cùng hội tam phương tứ chính cung Mệnh, nguồn tiền tuôn chảy, cơm áo đầy đủ. Cổ nhân nói “Song Lộc Triều Viên, giàu sánh Đào Chu”, chủ cả đời không lo tiền.',
  'qj-5-8': 'Cách Cơ Nguyệt Đồng Lương: Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc, chủ nho nhã, thông minh giỏi mưu tính. Hợp nhất công chức, học thuật, văn nghệ, y tế, dịch vụ — những ngành cần tích lũy ổn định.',
  'qj-5-9': 'Cách Sát Phá Lang: Thất Sát, Phá Quân, Tham Lang ba sao hội Mệnh, chủ cả đời nhiều biến động, không cam bình thường, nên khởi nghiệp, quân cảnh, kinh doanh, bán hàng. Sau trung niên mới ổn định giữ nghiệp.',
  'qj-5-10': 'Cách Nhật Nguyệt đồng cung: Thái Dương, Thái Âm cùng nhập cung Sửu hoặc Mùi, chủ duyên với người khác giới tốt, sự nghiệp thuận lợi, danh tiếng lan xa. Cung Sửu lực tương đối bình, cung Mùi lực hơi giảm.',

  // Tử Vi Đẩu Số Toàn Thư
  'qs-1-1': 'Cung Mệnh là gốc rễ của một thân, then chốt của vạn sự. Cung Mệnh định thì cách cục cả đời định. Xem cung Mệnh trước hết xem chủ tinh, kế đến phụ tinh và sát tinh, rồi xem Tứ Hóa và sự hội chiếu của tam phương tứ chính.',
  'qs-1-2': 'Chủ tinh cung Mệnh miếu vượng, chủ ưu thế bẩm sinh, làm việc nửa công gấp đôi hiệu quả; lạc hãm thì chủ bất lợi bẩm sinh, nhưng ngược lại chủ đại thành — người lạc hãm có hai chữ “không cam” thúc đẩy, ngược lại có thể bùng nổ sức vượt lên mà mệnh cách miếu vượng không làm được.',
  'qs-1-3': 'Cung Mệnh gặp lục cát tinh (Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt), chủ cả đời quý nhân không dứt; cung Mệnh gặp lục sát tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp), chủ nhiều trắc trở mài giũa, nhưng nếu nhẫn qua được, ngược lại thành đại khí.',
  'qs-2-1': 'Cung Tài Bạch chủ nguồn tiền, thu nhập, cách quản lý tài chính cả đời. Chủ tinh cung Tài Bạch khác nhau thì cách kiếm tiền khác nhau: Tử Vi ở Tài chủ quan tài, Vũ Khúc ở Tài chủ thương tài, Thái Âm ở Tài chủ điền trạch tài, Cự Môn ở Tài chủ khẩu tài.',
  'qs-2-2': 'Cung Tài Bạch Hóa Lộc nhập Mệnh, chủ nguồn tiền dồi dào; cung Tài Bạch Hóa Kỵ, chủ tiền đến rồi đi; cung Tài Bạch gặp Lộc Tồn, chủ tích lũy ổn định; cung Tài Bạch gặp Không Kiếp, chủ hao tài, hư danh.',
  'qs-3-1': 'Cung Quan Lộc chủ sự nghiệp, địa vị, thành tựu xã hội. Chủ tinh cung Quan Lộc khác nhau thì hướng sự nghiệp khác nhau: Tử Vi ở Quan hợp nền tảng lớn, vị trí cao; Thái Dương ở Quan hợp công vụ, danh tiếng; Vũ Khúc ở Quan hợp tài chính, thực nghiệp; Liêm Trinh ở Quan hợp văn võ song toàn.',
  'qs-3-2': 'Cung Quan Lộc Hóa Quyền nhập Mệnh, chủ có thể độc đương nhất diện; Hóa Lộc nhập Quan, chủ tiền từ nghề nghiệp mà đến; Hóa Kỵ nhập Quan, chủ trắc trở nơi công sở.',
  'qs-4-1': 'Cung Phu Thê chủ khí chất bạn đời, tình trạng hôn nhân. Cung Phu Thê có Tử Vi chủ bạn đời đoan trang có uy quyền, nên kết hôn muộn; cung Phu Thê có Tham Lang chủ bạn đời đa tình, đào hoa nặng; cung Phu Thê có Thiên Lương chủ bạn đời trưởng thành điềm đạm, lớn tuổi hơn.',
  'qs-4-2': 'Cung Phu Thê Hóa Kỵ xung Mệnh, chủ hôn nhân nhiều trắc trở. Cung Phu Thê gặp lục sát, cần đặc biệt chú ý sự mài giũa trong tình cảm. Cung Phu Thê gặp lục cát, chủ bạn đời là quý nhân.',
  'qs-5-1': 'Tứ Hóa là tinh hoa của lá số — Hóa Lộc chủ tiền, Hóa Quyền chủ thế, Hóa Khoa chủ danh, Hóa Kỵ chủ bệnh. Cung vị nơi Tứ Hóa đóng quyết định các nút thắt của những sự kiện lớn trong đời.',
  'qs-5-2': 'Tứ Hóa sinh năm là Tứ Hóa bản mệnh, vĩnh viễn cố định; Nghê sư nhấn mạnh các sao Tứ Hóa không động, chỉ xem đại hạn, lưu niên đi đến đâu. Các phái Phi Tinh phương Bắc như tự hóa, cung can phi hóa, lai nhân cung…, Nghê sư không chủ trương sử dụng.',
  'qs-5-3': 'Hóa Lộc nhập tam phương tứ chính cung Mệnh: nguồn tiền ổn định, duyên phận rộng, năng lực có thể quy ra giá trị. Hóa Lộc nhập Phu Thê: hôn nhân ngọt ngào. Hóa Lộc nhập Quan Lộc: sự nghiệp và nguồn tiền tương ứng.',
  'qs-5-4': 'Hóa Kỵ nhập tam phương tứ chính cung Mệnh: cả đời có bài học sâu sắc, nên đối diện chứ không trốn tránh. Hóa Kỵ nhập Phu Thê: hôn nhân nhiều mài giũa. Hóa Kỵ nhập Quan Lộc: sự nghiệp nhiều trắc trở, nhưng sau rèn luyện ngược lại thành nhân tài chuyên nghiệp.',
  'qs-6-1': 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào tam phương tứ chính cung Mệnh, gọi là cách Cơ Nguyệt Đồng Lương. Nho nhã, thông minh giỏi mưu tính, hợp nhất công chức, học thuật, văn nghệ, y tế, dịch vụ — những ngành cần tích lũy ổn định.',
  'qs-6-2': CO_NGUYET,
  'qs-7-1': 'Hóa Lộc và Lộc Tồn cùng hội tam phương tứ chính cung Mệnh, gọi là cách Song Lộc Triều Viên. Cổ nhân nói “Song Lộc Triều Viên, giàu sánh Đào Chu”, chủ cả đời không lo tiền, thường được cả chính tài lẫn hoạnh tài.',
  'qs-7-2': 'Song Lộc Triều Viên kỵ nhất Không Kiếp — Không Kiếp một khi xung, Song Lộc thành hư danh. Cần thấy Tả Phù, Hữu Bật hoặc Văn Xương, Văn Khúc mới là chính cách.',
};

/** Tên + phụ đề chương tiếng Việt. Không có trong bảng thì dùng nguyên bản. */
export function chapterVi(bookSlug: string, chapterIdx: number, chapter: { title: string; subtitle?: string }) {
  return CHAPTER_VI[`${bookSlug}:${chapterIdx}`] ?? { title: chapter.title, subtitle: chapter.subtitle };
}

/** Bản dịch nghĩa của một đoạn, hoặc undefined nếu chưa có. */
export function paragraphVi(id: string): string | undefined {
  return PARAGRAPH_VI[id];
}

const strip = (s: string) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

export interface ClassicsViHit {
  bookSlug: string;
  bookTitle: string;
  chapterTitle: string;
  chapterIdx: number;
  paragraphId: string;
  snippet: string;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

/**
 * Tìm trong bản dịch tiếng Việt, không phân biệt hoa thường và dấu ("that sat" khớp "Thất Sát").
 * Chuỗi truy vấn chỉ gồm chữ Hán sẽ không khớp gì ở đây; phần đó do searchClassics lo.
 */
export function searchClassicsVi(
  books: Array<{ slug: string; title: string; chapters: Array<{ title: string; paragraphs: Array<{ id: string }> }> }>,
  query: string,
  limit = 30,
): ClassicsViHit[] {
  const q = strip(query.trim());
  if (!q) return [];
  const hits: ClassicsViHit[] = [];
  for (const book of books) {
    book.chapters.forEach((chapter, chapterIdx) => {
      for (const p of chapter.paragraphs) {
        if (hits.length >= limit) return;
        const text = PARAGRAPH_VI[p.id];
        if (!text) continue;
        const folded = strip(text);
        const at = folded.indexOf(q);
        // strip() có thể làm đổi độ dài (NFD rồi bỏ dấu giữ nguyên số ký tự gốc với tiếng Việt); nếu lệch thì bỏ qua đoạn để không cắt sai.
        if (at < 0 || folded.length !== text.length) continue;
        const start = Math.max(0, at - 40);
        const end = Math.min(text.length, at + q.length + 40);
        const snippet =
          (start > 0 ? '…' : '') +
          escapeHtml(text.slice(start, at)) +
          `<mark>${escapeHtml(text.slice(at, at + q.length))}</mark>` +
          escapeHtml(text.slice(at + q.length, end)) +
          (end < text.length ? '…' : '');
        hits.push({
          bookSlug: book.slug,
          bookTitle: book.title,
          chapterTitle: chapterVi(book.slug, chapterIdx, chapter).title,
          chapterIdx,
          paragraphId: p.id,
          snippet,
        });
      }
    });
  }
  return hits;
}
