'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Star } from '@/lib/ziwei/types';
import { STAR_DESCRIPTIONS } from '@/lib/ziwei/constants';
import { tv } from '@/lib/i18n/vi';
import { palaceVi, tvKeyword, tvNature } from '@/lib/i18n/insight-extra';

interface StarDetailPanelProps {
  star: Star | null;
  palaceName?: string;
  onClose: () => void;
}

// Giải đọc từng sao theo hệ thống Nghê Hải Hạ (tham khảo Cố Tường Hoằng《Phi Tinh Tử Vi Đẩu Số Toàn Thư》và Nam Bắc Sơn Nhân《Tử Vi Đẩu Số Toàn Thư》)
// Khóa là tên sao chữ Hán (khớp với star.name của engine); nội dung hiển thị đã Việt hóa.
const STAR_DETAIL: Record<string, {
  niHaixia: string;
  classical: string;
  bestPalace: string;
  worstPalace: string;
  career: string;
  relationship: string;
  wealth: string;
  health: string;
}> = {
  '紫微': {
    niHaixia: 'Nghê sư cho rằng Tử Vi là Hoàng đế tinh, người tọa Mệnh có khí cô ngạo, thích ở một mình, không thích bị quản thúc. Tử Vi cần Tả Phù, Hữu Bật giáp hai bên mới phát huy được khí chất đế vương, nếu không chỉ là vị vua cô độc, giàu mà không sang. Tử Vi ở cung Thìn, Tuất là tốt nhất, đồng cung với Thiên Phủ thành cách song tinh, tài quan song mỹ, có thể xuất tướng nhập tướng. Tử Vi sợ nhất Hỏa Tinh, Linh Tinh, Kình Dương, Đà La đồng cung; gặp sát thì cô quý, có quyền mà không có tài.',
    classical: 'Cổ quyết: "Tử Vi đế tọa lâm Mệnh chủ tôn quý, thống lĩnh chúng tinh, người tọa Mệnh chủ quyền uy hiển đạt." Nam Bắc Sơn Nhân chú: "Tử Vi thủ Mệnh ở vị trí Thìn, tài quan song mỹ, xuất tướng nhập tướng, ngôi đến tam công; an Mệnh tại cung Tý thì phú quý không bền, về sau không tốt đẹp."',
    bestPalace: 'Cung Mệnh (Thìn, Tuất), Cung Quan Lộc',
    worstPalace: 'Cung Tật Ách, Cung Phu Thê',
    career: 'Chính trường, tầng quản lý, tự khởi nghiệp; sinh ra đã có khí chất đế vương, hợp vị trí lãnh đạo độc lập gánh vác một mảng',
    relationship: 'Tình cảm thụ động, tự trọng cao, cần đối phương chủ động, có khuynh hướng cô độc; kết hôn muộn thì cát',
    wealth: 'Tài vận ổn định, giữ của mạnh hơn tiến thủ; vị trí Thìn, Tuất tài quan song mỹ, hợp nhất đầu tư tích lũy',
    health: 'Thuộc Thổ, chú ý tỳ vị, hệ tiêu hóa. Kỵ làm việc quá sức, nên giữ sinh hoạt điều độ',
  },
  '天机': {
    niHaixia: 'Nghê sư nói Thiên Cơ là sao tham mưu, sao thông minh nhất, nhưng thông minh lộ ra ngoài thì hại thân. Thiên Cơ Hóa Kỵ rắc rối nhất, nghĩa là thông minh quá hóa dại. Thiên Cơ thuộc Mộc, hay biến đổi, linh hoạt; người tọa Mệnh tư duy nhanh nhạy nhưng thường nhiều mưu ít quyết, cần rời quê đi xa mới phát triển; ứng biến linh hoạt là đặc trưng lớn nhất.',
    classical: 'Cổ quyết: "Là người tinh ranh, thích kinh doanh, Thiên Cơ thuộc Mộc, buôn bán nhiều cơ hội, ly tông tất xa thân, cơ mưu tất xa thân." Nam Bắc Sơn Nhân chú: "Thiên Cơ ở đất miếu vượng, chủ người tinh minh, giỏi trù hoạch; ở đất hãm thì ảm đạm, người đời đều lấy buôn bán làm nghề."',
    bestPalace: 'Cung Mệnh (vị trí Mão), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê',
    career: 'Chuyên gia kỹ thuật, mưu sĩ, nghiên cứu viên, IT, hoạch định; dùng đầu óc hơn dùng tay chân, hợp phát triển xa quê',
    relationship: 'Tình cảm hay thay đổi, nghĩ nhiều, khó chuyên nhất, nên kết hôn muộn; sau hôn nhân cần học cách buông bớt lo nghĩ',
    wealth: 'Kiếm tiền nhờ trí tuệ và kỹ năng, không giỏi giữ tiền; làm nghề chuyên môn kỹ thuật thì tài vận ổn định',
    health: 'Thuộc Mộc, chú ý gan mật, hệ thần kinh. Suy nghĩ nặng dễ mất ngủ, nên tập tĩnh tâm, thiền định',
  },
  '太阳': {
    niHaixia: 'Nghê sư cho rằng Thái Dương là sao của người đàn ông đại trượng phu, nhập miếu ở các vị trí Mão đến Ngọ, quang minh chính đại; qua trưa dần lạc hãm. Người Thái Dương tọa Mệnh hào phóng, trọng thể diện, hợp mệnh nam, mệnh nữ thì quá mạnh mẽ. Thái Dương đại diện cha và bậc trưởng bối; tại Cung Mệnh thì tính cách hướng ngoại, cởi mở, thích được mọi người nhìn thấy, hợp nhất công chức hoặc sự nghiệp công chúng. Lạc hãm thì trước siêng sau lười, cô quả vất vả.',
    classical: 'Cổ quyết: "Thái Dương cư Ngọ là nhập miếu, quang huy rực rỡ, chủ quý hiển, mệnh nam đẹp nhất; lạc hãm thì cô quả vất vả, trước siêng sau lười." Nam Bắc Sơn Nhân chú: "Thái Dương thủ Mệnh cung Ngọ, tài quan song mỹ, xuất tướng nhập tướng; an Mệnh vị trí Thìn, trung niên tài quan chuyển tốt, người sinh năm Ất gặp hung cũng rất lợi."',
    bestPalace: 'Cung Mệnh (Mão đến Ngọ), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê (mệnh nữ), Cung Tật Ách',
    career: 'Công chức, chính trường, quản lý, quan hệ công chúng, giáo dục, truyền thông; thích đứng trước đám đông, hợp sự nghiệp công chúng',
    relationship: 'Mệnh nam duyên tốt nhưng đa tình, mệnh nữ độc lập mạnh mẽ; hôn nhân cần mài giũa, nên tìm người bạn đời dịu dàng chu đáo',
    wealth: 'Tài vận nhờ nỗ lực, hào phóng thích cho đi, không giỏi tích lũy; nhập miếu thì tài vượng, lạc hãm thì tài vận thăng trầm',
    health: 'Thuộc Hỏa, chú ý tim, mắt. Khi ở vị trí lạc hãm dễ làm việc quá sức, cần nghỉ ngơi đầy đủ',
  },
  '武曲': {
    niHaixia: 'Nghê sư xem Vũ Khúc là chính tinh của tài bạch, cương cứng bất khuất, sợ nhất cô khắc. Người Vũ Khúc tọa Mệnh ý chí kiên định, hợp tài chính, quản lý tiền bạc, nhưng chuyện tình cảm quá thẳng, dễ làm tổn thương người. Vũ Khúc Hóa Kỵ phải cẩn thận tai nạn đổ máu. Vũ Khúc đắc địa vượng ở Thìn, Tuất, Sửu, Mùi, đồng cung với Thất Sát thành cách tướng tài, là cách cục tài phú rất tốt.',
    classical: 'Cổ quyết: "Vũ Khúc thuộc Kim, tính cương cường, một đời nhiều hình khắc; thủ Mệnh ở đất vượng thì xuất tướng nhập tướng." Nam Bắc Sơn Nhân chú: "Vũ Khúc thủ Mệnh, tam phương tứ chính đều cát, tài quan song mỹ, võ chức gặp Phụ Bật Xương Khúc cũng chủ đại quý; đồng cung với Thất Sát là cách tướng tài, chủ đại phú."',
    bestPalace: 'Cung Mệnh (Thìn, Tuất, Sửu, Mùi), Cung Tài Bạch, Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê',
    career: 'Tài chính, quân cảnh, kế toán, kỹ thuật công trình; năng lực chấp hành rất mạnh, hợp lĩnh vực cần khí phách và quyết đoán',
    relationship: 'Tình cảm thẳng thắn, thiếu tình thú, cần người bạn đời dịu dàng bổ trợ, kỵ cô khắc trong tình cảm',
    wealth: 'Tài tinh bản mệnh, tài vận rất mạnh, năng lực quản lý tiền vượt trội; vị trí Thìn, Tuất tài quan song mỹ',
    health: 'Thuộc Kim, chú ý phổi, hệ hô hấp, răng. Khi Hóa Kỵ cần đề phòng tai nạn đổ máu',
  },
  '天同': {
    niHaixia: 'Nghê sư nói Thiên Đồng là phúc tinh, sao lười nhất. Thiên Đồng tọa Mệnh thích hưởng phúc, không thích cạnh tranh, hợp công việc ổn định. Thiên Đồng đồng cung với Thiên Lương là tốt nhất, vừa hưởng phúc vừa có bảo chướng. Thiên Đồng Hóa Lộc là Hóa Lộc đẹp nhất, chủ cả đời cơm áo không lo, vui vẻ thong dong. Thiên Đồng kỵ lạc hãm, lạc hãm thì phúc giảm, cần có sao hung hóa giải.',
    classical: 'Cổ quyết: "Thiên Đồng là sao phúc đức, người tọa Mệnh hưởng phúc có thừa, chủ cả đời tiêu dao tự tại, không phải lao khổ." Nam Bắc Sơn Nhân chú: "Thiên Đồng thủ Mệnh, tam phương không sát, cả đời vui vẻ, cơm áo đầy đủ; gặp cát tinh thì phú quý song toàn, người ôn hòa, nhiều nhân duyên."',
    bestPalace: 'Cung Mệnh, Cung Phúc Đức',
    worstPalace: 'Cung Quan Lộc',
    career: 'Ngành dịch vụ, giải trí, ẩm thực, văn nghệ; môi trường thoải mái dễ chịu là hợp nhất, kỵ cạnh tranh áp lực cao',
    relationship: 'Tình cảm ôn hòa, không chủ động, dễ tiếp nhận một cách thụ động, hôn nhân khá ổn định, tính tình hòa nhã dễ gần',
    wealth: 'Tài vận không nổi bật, dựa vào lương ổn định, không giỏi đầu cơ, cơm áo không lo nhưng khó đại phú',
    health: 'Thuộc Thủy, chú ý thận, bàng quang. Thể chất khá yếu, nên vận động vừa phải, giữ tâm thế thoải mái',
  },
  '廉贞': {
    niHaixia: 'Nghê sư cho rằng Liêm Trinh là thứ đào hoa, tài hoa hơn người nhưng tình cảm phức tạp. Liêm Trinh Hóa Kỵ rất hung, đại diện kiện tụng, tù tội, tai nạn. Liêm Trinh đồng cung với Thiên Tướng thì hóa hung thành cát, thành cách ấn thụ hành chính. Liêm Trinh ngũ hành thuộc Hỏa, tính cương liệt, một đời nhiều thăng trầm, tài nghệ xuất chúng, nếu giữ được chính đạo không tà thì có thể thành đại khí.',
    classical: 'Cổ quyết: "Liêm Trinh là thứ đào hoa, tài hoa hơn người, tình cảm nhiều trắc trở; Liêm Tướng đồng cung, hóa hung thành cát, thành cách ấn thụ hành chính, có thể nắm quyền bính." Nam Bắc Sơn Nhân chú: "Liêm Trinh thủ Mệnh, gặp cát tinh thì tài hoa xuất chúng, Hóa Kỵ thì kiện tụng đeo bám, chủ tai họa đổ máu, cần đề phòng."',
    bestPalace: 'Cung Quan Lộc (phối Thiên Tướng), Cung Mệnh (khi Hóa Lộc)',
    worstPalace: 'Cung Mệnh (khi Hóa Kỵ), Cung Phu Thê',
    career: 'Nghệ thuật, giải trí, pháp luật, công chức (phối Thiên Tướng); tài nghệ xuất chúng, giữ chính nghiệp mới bền lâu',
    relationship: 'Đào hoa nhiều, tình cảm phức tạp, dễ gặp tranh chấp tình cảm, nên kết hôn muộn, chọn người bạn đời vững vàng',
    wealth: 'Tài vận thăng trầm, kiếm tiền nhờ tài nghệ; khi Hóa Kỵ đề phòng tranh chấp tài chính và rủi ro pháp lý',
    health: 'Thuộc Hỏa, chú ý tim, huyết dịch, gan. Khi Hóa Kỵ đề phòng tai nạn và phẫu thuật, lưu ý chuyện đổ máu',
  },
  '天府': {
    niHaixia: 'Nghê sư nói Thiên Phủ là sao tài khố, sao thủ thành, không chủ động phát tài nhưng giữ được của cải. Người Thiên Phủ tọa Mệnh vững vàng bảo thủ, mệnh nữ là tốt nhất, có thể vượng phu hưng gia. Thiên Phủ thích nhất đồng cung hoặc chiếu với Tử Vi, thành cách song tinh, tài quan song mỹ. Thiên Phủ sợ Không Kiếp giáp, gặp Không Kiếp thì tài khố cạn đáy, không giữ được tiền.',
    classical: 'Cổ quyết: "Thiên Phủ là sao tài khố, người thủ Mệnh vững vàng bảo thủ, chủ tích tài vượng gia; mệnh nữ gặp thì vượng phu ích tử, gia đạo hưng long." Nam Bắc Sơn Nhân chú: "Thiên Phủ thủ Mệnh, tam phương cát tụ, tài quan song mỹ, phú quý an khang; gặp Không Kiếp thì tài khố rò rỉ, khó tích tài."',
    bestPalace: 'Cung Mệnh, Cung Tài Bạch, Cung Điền Trạch',
    worstPalace: 'Cung Thiên Di',
    career: 'Quản trị hành chính, tài vụ, bảo hiểm, bất động sản; cầu ổn không mạo hiểm, hợp nghề thủ thành',
    relationship: 'Tình cảm ổn định, chăm lo gia đình, là người bạn đời tốt, coi trọng cảm giác an toàn gia đình và bảo đảm kinh tế',
    wealth: 'Tài vận rất tốt, giữ tiền giỏi, hợp nhất đầu tư tích lũy và mua sắm bất động sản',
    health: 'Thuộc Thổ, chú ý tỳ vị, tiêu hóa. Thể chất vững vàng, nên giữ ăn uống và sinh hoạt điều độ',
  },
  '太阴': {
    niHaixia: 'Nghê sư cho rằng Thái Âm là tài tinh, lợi mệnh nữ, cũng là sao đại diện mẹ và vợ của mệnh nam. Thái Âm nhập miếu thì tài vận rất tốt, hãm địa thì tài vận bị cản trở. Thái Âm Hóa Kỵ cần chú ý vấn đề của người thân nữ. Thái Âm nhập miếu ở vị trí Hợi, Tý, quang huy chiếu khắp, đại diện sự thanh nhã tinh tế, tình cảm phong phú, coi trọng thế giới nội tâm và đời sống tinh thần.',
    classical: 'Cổ quyết: "Thái Âm là tài tinh, lợi mệnh nữ; Hợi Tý nhập miếu, quang huy chiếu khắp, tài vận cực vượng; vị trí Ngọ lạc hãm, u sầu đa tình, tài vận bình thường." Nam Bắc Sơn Nhân chú: "Thái Âm thủ Mệnh, nhập miếu thì tài phú dồi dào, mệnh nữ càng tốt; lạc hãm cần nỗ lực mới giàu, tình cảm tinh tế."',
    bestPalace: 'Cung Mệnh (Hợi, Tý), Cung Tài Bạch',
    worstPalace: 'Cung Mệnh (vị trí Ngọ, hãm địa)',
    career: 'Tài vụ, tài chính, bất động sản, nghệ thuật, giáo dục; tinh tế kiên nhẫn, hợp nghề cần cảm quan thẩm mỹ và sự dịu dàng',
    relationship: 'Tình cảm dịu dàng tinh tế, coi trọng cảm nhận nội tâm, cần mối quan hệ ổn định, có cảm giác an toàn',
    wealth: 'Nhập miếu thì tài vận cực vượng, lạc hãm thì cần nỗ lực; quản lý tiền cẩn thận, giỏi tích lũy, không giỏi mạo hiểm',
    health: 'Thuộc Thủy, chú ý thận, tử cung (mệnh nữ). Cảm xúc dao động ảnh hưởng sức khỏe, nên giữ tâm trạng thư thái',
  },
  '贪狼': {
    niHaixia: 'Nghê sư nói Tham Lang là sao đa tài đa nghệ nhất, đào hoa nặng nhất. Tham Lang Hóa Lộc nhập Mệnh thì sức hút rực rỡ, ai gặp cũng mến. Tham Lang thuộc sao phát muộn, sau trung niên mới thật sự phát đạt. Tham Lang nhập miếu ở vị trí Dần, Thân là tốt nhất, đào hoa vượng, tài nghệ vượt trội; Hóa Lộc xong tài vận đại phát, nhưng nếu gặp Không Kiếp thì cả đời nhiều trắc trở, khó tụ tài.',
    classical: 'Cổ quyết: "Tham Lang phát phúc hanh thông, đa tài đa nghệ, đào hoa nặng nhất; nhưng khó qua ba mươi tuổi, người phát muộn nhiều. Lạc hãm gặp sát lại cát, đó là lý của Tham Lang lạc hãm." Nam Bắc Sơn Nhân chú: "Tham Lang thủ Mệnh, gặp cát thì phúc lộc thọ nhiều, phát phúc hanh thông; nhưng về sau không được chết lành, nên tu thân dưỡng đức mới có thể chung thân tốt đẹp."',
    bestPalace: 'Cung Mệnh (Hóa Lộc), Cung Phúc Đức, Cung Thiên Di',
    worstPalace: 'Cung Tật Ách',
    career: 'Nghệ thuật, giải trí, quan hệ công chúng, bán hàng, phong thủy ngũ thuật; dựa vào các mối quan hệ và tài nghệ, kiểu đa tài đa nghệ',
    relationship: 'Đào hoa cực vượng, tình cảm đa dạng, nên kết hôn muộn; sau hôn nhân cần tiết chế đào hoa mới bạc đầu giai lão',
    wealth: 'Kiếm tiền nhờ quan hệ và tài nghệ, trung niên về sau tài vận mới vững; Hóa Lộc thì nguồn tài rộng mở, thời trẻ nên giữ vững thủ thành',
    health: 'Thuộc Mộc (kèm Thủy), chú ý gan, thận. Đào hoa quá vượng dễ hao tổn tinh lực, nên tiết chế điều dưỡng',
  },
  '巨门': {
    niHaixia: 'Nghê sư cho rằng Cự Môn là sao khẩu thiệt thị phi, nhưng Hóa Lộc, Hóa Quyền xong thì chuyển cát, thành cách cục kiếm tiền bằng tài ăn nói. Người Cự Môn tọa Mệnh đa nghi, giỏi biện luận, hợp làm luật sư, giáo viên, bán hàng. Cự Môn kỵ nhất Hóa Kỵ, chủ khẩu thiệt thị phi không dứt, thậm chí dẫn đến kiện tụng. Cự Môn ở vị trí Tý, Ngọ khá tốt, tài ăn nói giỏi, chủ lập thân bằng ngôn từ.',
    classical: 'Cổ quyết: "Cự Môn là ám diệu, chủ khẩu thiệt thị phi; Hóa Lộc Quyền thì chuyển sang mưu sinh bằng tài ăn nói, chủ phú quý." Nam Bắc Sơn Nhân chú: "Cự Môn thủ Mệnh, gặp Hóa Lộc Quyền, người làm nghề lấy lời nói đại cát; Hóa Kỵ thì khẩu thiệt liên lụy, kiện tụng đeo bám, cần thận trọng lời nói."',
    bestPalace: 'Cung Quan Lộc (Hóa Lộc, Hóa Quyền), Cung Mệnh (Tý, Ngọ)',
    worstPalace: 'Cung Phu Thê, Cung Tật Ách (Hóa Kỵ)',
    career: 'Luật sư, giáo viên, bán hàng, người dẫn chương trình, chuyên gia đàm phán; tài ăn nói là năng lực cạnh tranh cốt lõi',
    relationship: 'Đa nghi đa lự, dễ nghĩ nhiều, giao tiếp là chìa khóa của hôn nhân, nên chọn người bạn đời kiên nhẫn',
    wealth: 'Kiếm tiền nhờ tài ăn nói và kỹ năng chuyên môn, Hóa Lộc thì tài vận khá tốt, Hóa Kỵ đề phòng tranh chấp tài chính, khẩu thiệt liên lụy',
    health: 'Thuộc Thủy, chú ý thận, tai, khoang miệng. Nghĩ nhiều lo nhiều dễ hại thân, nên học cách thư giãn giảm áp lực',
  },
  '天相': {
    niHaixia: 'Nghê sư nói Thiên Tướng là sao ấn thụ, phụ trách hành chính sự vụ. Người Thiên Tướng tọa Mệnh trung quy trung củ, hợp công chức hành chính. Thiên Tướng cần có sao mạnh phối hợp mới phát huy được, đơn độc tọa Mệnh thì khá bình đạm. Thiên Tướng thích nhất Liêm Trinh đi cùng, thành cách Liêm Tướng, có thể nắm đại quyền hành chính; sợ nhất Phá Quân đồng cung, thành cách hình kỵ giáp ấn, chủ hung hiểm.',
    classical: 'Cổ quyết: "Thiên Tướng là sao ấn thụ, chủ hành chính sự vụ; Liêm Tướng đồng cung, hóa hung thành cát, nắm đại quyền hành chính." Nam Bắc Sơn Nhân chú: "Thiên Tướng thủ Mệnh, trung quy trung củ, hợp công chức; được Liêm Trinh phối hợp có thể thành rường cột quốc gia; Phá Quân đồng thủ thì hình khắc khó tránh."',
    bestPalace: 'Cung Quan Lộc, Cung Mệnh (phối Liêm Trinh)',
    worstPalace: 'Cung Tài Bạch, Cung Mệnh (phối Phá Quân thì hình kỵ giáp ấn)',
    career: 'Công chức, quản lý hành chính, thư ký, trợ lý; giỏi vai trò hỗ trợ, cần sao mạnh dẫn đường',
    relationship: 'Tình cảm ổn định, trung hậu thật thà, là người bạn đời tốt, nhưng cần đối phương định hướng',
    wealth: 'Tài vận bình ổn, tích lũy từ lương, không hợp đầu tư mạo hiểm, hợp nhất quản lý tiền theo hướng thủ thành',
    health: 'Thuộc Thủy, chú ý thận, hệ bạch huyết. Thể chất trung bình, nên giữ thói quen sinh hoạt điều độ',
  },
  '天梁': {
    niHaixia: 'Nghê sư cho rằng Thiên Lương là ấm tinh, có thể che chở người khác, cũng đại diện y dược và tôn giáo. Người Thiên Lương tọa Mệnh có duyên với bậc trưởng bối, thời trẻ nhiều gian truân, về già hưởng phúc. Thiên Lương sợ nhất Hóa Kỵ, đại diện vấn đề của trưởng bối hoặc sức khỏe. Thiên Lương đồng cung với Thái Dương là tốt nhất, nhật nguyệt cùng sáng, quý nhân che chở, cả đời có quý nhân giúp đỡ, cuối cùng được bình an.',
    classical: 'Cổ quyết: "Thiên Lương là ấm tinh, chủ che chở bảo hộ; người tọa Mệnh có duyên với bậc trưởng bối, thời trẻ chịu tôi luyện, về già hưởng thanh phúc." Nam Bắc Sơn Nhân chú: "Thiên Lương thủ Mệnh, phải gặp cát tinh mới phát đạt; gặp Thái Dương đồng cung, nhật nguyệt cùng sáng, chủ quý hiển, cả đời nhiều quý nhân tương trợ."',
    bestPalace: 'Cung Mệnh, Cung Phụ Mẫu, Cung Phúc Đức',
    worstPalace: 'Cung Mệnh (khi Hóa Kỵ), Cung Tài Bạch',
    career: 'Y tế, tôn giáo, pháp luật, công tác xã hội, từ thiện; thích giúp đỡ người khác, có lòng che chở mọi người',
    relationship: 'Tình cảm thường với người chênh lệch tuổi khá lớn, hoặc duyên đến muộn, cần kiên nhẫn chờ đợi mới gặp lương duyên',
    wealth: 'Tài vận nhờ quý nhân giúp đỡ, thời trẻ tài vận không tốt, về già tài vận mới vững; nên giữ hơn là xông pha',
    health: 'Thuộc Thổ, chú ý tỳ vị, xương cốt. Cần coi trọng chăm sóc sức khỏe tuổi già, nên phòng ngừa điều dưỡng sớm',
  },
  '七杀': {
    niHaixia: 'Nghê sư nói Thất Sát là tướng quân tinh, quả quyết, xung lực mạnh, nhưng có tính cô khắc. Thất Sát tọa Mệnh phải có phụ tinh hóa giải tính cô độc, nếu không duyên lục thân mỏng. Thất Sát đồng cung với Vũ Khúc là cách tướng tài, rất tốt. Thất Sát sợ nhất tam hạn Trúc La (Dương, Đà, Hỏa, Linh cùng chiếu), chủ đại hung, cần đề phòng tai nạn. Thất Sát Hóa Lộc ngược lại thành cát, có thể thành tài đại tướng.',
    classical: 'Cổ quyết: "Thất Sát là tướng quân tinh, quả quyết, xung lực mạnh; người thủ Mệnh tính cô khắc nặng, duyên lục thân mỏng." Nam Bắc Sơn Nhân chú: "Thất Sát thủ Mệnh, tam hợp cát tụ thì đại quý; gặp tam hạn Trúc La (Dương, Đà, Hỏa, Linh), chủ đại hung, đề phòng tai họa bất ngờ, đề phòng hình khắc."',
    bestPalace: 'Cung Mệnh (có phụ tinh), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê, Cung Phụ Mẫu',
    career: 'Quân cảnh, khởi nghiệp, giao dịch tài chính, các lĩnh vực tự gánh vác một mảng; cần quyết đoán nhanh và khí phách',
    relationship: 'Tình cảm cô khắc, khó tìm bạn đời hợp, cần người bao dung được cá tính mạnh, nên kết hôn muộn',
    wealth: 'Tài vận dao động lớn, có cơ hội đại phú, cũng có lúc thăng trầm lớn; đồng cung Vũ Khúc có thể thành cách tướng tài đại quý',
    health: 'Thuộc Kim, chú ý phổi, đại tràng. Tính nóng nảy dễ hại thân, nên học kiểm soát cảm xúc và tu thân',
  },
  '破军': {
    niHaixia: 'Nghê sư nói Phá Quân là sao phá cũ lập mới giỏi nhất, cũng là một trong những sao cô khắc nhất. Phá Quân Hóa Lộc mới trở nên tốt, đại diện phá rồi mới lập. Phá Quân tọa Mệnh duyên lục thân mỏng, nhưng năng lực khai sáng rất mạnh. Phá Quân hợp nhất cải cách, đổi mới; khi Hóa Lộc thì tài vận chuyển vượng, một phá một lập, cuối cùng thành tựu được sự nghiệp.',
    classical: 'Cổ quyết: "Phá Quân là sao phá cũ lập mới giỏi nhất, người tọa Mệnh cô khắc, duyên lục thân mỏng, nhưng năng lực khai sáng siêu mạnh; Hóa Lộc thì phá rồi mới lập, có thể thành đại nghiệp." Nam Bắc Sơn Nhân chú: "Phá Quân thủ Mệnh, một đời nhiều trắc trở; người Hóa Lộc, phá tài xong mới tái thiết được, tài vận cuối cùng chuyển tốt, chủ thành tựu lúc về già."',
    bestPalace: 'Cung Quan Lộc (Hóa Lộc), Cung Thiên Di',
    worstPalace: 'Cung Phu Thê, Cung Phụ Mẫu',
    career: 'Sự nghiệp khai sáng, quân cảnh, cải cách, quản lý chuyển đổi; hợp công việc tiên phong không ngừng mở lĩnh vực mới',
    relationship: 'Tình cảm nhiều trắc trở, tan hợp bất định, duyên lục thân mỏng, cần chọn người bạn đời độc lập và có sức bao dung mạnh',
    wealth: 'Tài vận thăng trầm lớn, Hóa Lộc thì tài vận chuyển tốt; giữ thành thì tài lui, cần không ngừng mở cục diện mới mới tích được tài',
    health: 'Thuộc Thủy, chú ý thận, bàng quang, hệ sinh dục. Thể chất thăng trầm, nên giữ thói quen vận động đều đặn',
  },
};

// Nhận xét ngắn cho phụ tinh / sát tinh không có trong STAR_DETAIL. Khóa là tên sao chữ Hán.
const LUCKY_NOTES: Record<string, string> = {
  '文昌': 'Văn Xương nhập cung, chủ học hành thi cử thuận lợi, văn thư ấn tín có lợi, hợp làm công việc liên quan đến chữ nghĩa. Cổ quyết: "Văn Xương khoa giáp, chủ văn chương hiển đạt, gặp thi tất đỗ."',
  '文曲': 'Văn Khúc nhập cung, chủ tài nghệ xuất chúng, ăn nói hay, giỏi biểu đạt, thiên phú nghệ thuật mạnh. Cổ quyết: "Văn Khúc là sao tài nghệ, năng văn năng võ, tài ăn nói hơn người."',
  '左辅': 'Tả Phù nhập cung, chủ có quý nhân tương trợ, có người nâng đỡ, các việc thuộc cung này được hỗ trợ thiện ý. Cổ quyết: "Tả Phù là sao trợ lực, tọa Mệnh thì nhiều quý nhân, gặp hung hóa cát."',
  '右弼': 'Hữu Bật nhập cung, chủ có quý nhân tương trợ, phần nhiều là quý nhân nữ, các việc thuộc cung này có người hiệp trợ. Cổ quyết: "Hữu Bật là sao âm trợ, nhiều quý nhân nữ, chuyển nguy thành an."',
  '天魁': 'Thiên Khôi nhập cung, chủ quý nhân sinh ban ngày, nhiều quý nhân nam, có sức chuyển hung thành cát. Cổ quyết: "Thiên Khôi là Thiên Ất quý nhân, gặp ắt có quý nhân phù trì."',
  '天钺': 'Thiên Việt nhập cung, chủ quý nhân sinh ban đêm, nhiều quý nhân nữ, thêm khí cát tường. Cổ quyết: "Thiên Việt là Ngọc Đường quý nhân, chủ âm trợ, nhiều quý nhân nữ."',
  '禄存': 'Lộc Tồn nhập cung, chủ tài lộc giữ thành, cung này có tài khí, nhưng thuộc kiểu tài vận bảo thủ. Cổ quyết: "Lộc Tồn là sao tài lộc, chủ giữ tiền có thừa, tiến tài vững vàng."',
  '天马': 'Thiên Mã nhập cung, chủ bôn ba dao động, tìm tài trong động, nên chủ động xuất kích, không nên ôm cây đợi thỏ. Cổ quyết: "Thiên Mã chủ động, gặp Lộc thì tài lộc song toàn, động trung sinh tài."',
};

const SHA_NOTES: Record<string, string> = {
  '地空': 'Địa Không nhập cung, chủ các việc thuộc cung này có cảm giác hụt hẫng, tinh thần hao tán, nên chú ý sức khỏe tâm lý. Cổ quyết: "Địa Không chủ hư hao, người ở Cung Mệnh thường tinh thần mê mang, cần đề phòng mộng tưởng hão huyền."',
  '地劫': 'Địa Kiếp nhập cung, chủ các việc thuộc cung này có tổn thất bất ngờ, tiền của cần thận trọng, đề phòng tiểu nhân. Cổ quyết: "Địa Kiếp chủ kiếp tài, người ở Cung Mệnh tài vận bị tổn hại, đề phòng mất mát bất ngờ."',
  '火星': 'Hỏa Tinh nhập cung, chủ các việc thuộc cung này nóng nảy bốc đồng, cảm xúc dao động, nhưng nếu gặp Tham Lang thì lại cát. Cổ quyết: "Hỏa Tinh chủ nóng gấp, nhưng gặp Tham Lang đồng cung thì thành cách Hỏa Tham, chủ bạo phát."',
  '铃星': 'Linh Tinh nhập cung, chủ các việc thuộc cung này có trở ngại ngầm, đề phòng tiểu nhân sau lưng, mọi việc nên khiêm tốn. Cổ quyết: "Linh Tinh chủ ám sát, người ở Mệnh thường bị địch ngầm, cần đề phòng thị phi sau lưng."',
  '擎羊': 'Kình Dương nhập cung, chủ hình khắc, các việc thuộc cung này nhiều trắc trở, có tai họa đổ máu hoặc bất ngờ. Cổ quyết: "Kình Dương là sao hình khắc, người ở Cung Mệnh nhiều hình khắc, cần đề phòng tai nạn đổ máu."',
  '陀罗': 'Đà La nhập cung, chủ thị phi đeo bám, các việc thuộc cung này trì hoãn khó quyết, mọi việc nên chuẩn bị sớm. Cổ quyết: "Đà La chủ thị phi trì hoãn, người ở Cung Mệnh làm việc chậm chạp, cần đề phòng dây dưa không dứt."',
};

const levelConfig = {
  major: { label: 'Chính tinh', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  lucky: { label: 'Cát tinh', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
  sha:   { label: 'Sát tinh', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  minor: { label: 'Tạp tinh', color: 'text-slate-400 border-slate-500/25 bg-slate-500/10' },
};

const siHuaColors: Record<string, string> = {
  '禄': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  '权': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  '科': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  '忌': 'text-red-400 bg-red-500/10 border-red-500/30',
};

export default function StarDetailPanel({ star, palaceName, onClose }: StarDetailPanelProps) {
  const desc = star ? STAR_DESCRIPTIONS[star.name] : null;
  const detail = star ? STAR_DETAIL[star.name] : null;
  const typeConfig = star ? levelConfig[star.type] : null;

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="card-glass rounded-xl overflow-hidden"
        >
          {/* Thanh tiêu đề */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--t-border)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: 'var(--t-gold)' }}>{tv(star.name)}</span>
              {typeConfig && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeConfig.color}`}>
                  {typeConfig.label}
                </span>
              )}
              {star.siHua && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${siHuaColors[star.siHua] || ''}`}>
                  {tv(`化${star.siHua}`)}
                </span>
              )}
            </div>
            <button onClick={onClose} aria-label="Đóng" title="Đóng" className="transition-colors text-lg leading-none" style={{ color: 'var(--t-faint)' }}>×</button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[560px]">
            {/* Thông tin cơ bản */}
            {desc && (
              <div className="flex flex-wrap gap-1.5">
                {[
                  { text: `Ngũ hành · ${tv(desc.element)}`, color: 'var(--t-text2)' },
                  { text: `Tính chất · ${tvNature(desc.nature)}`, color: 'var(--t-text2)' },
                  ...(palaceName ? [{ text: `Vị trí · ${palaceVi(palaceName)}`, color: 'var(--t-text2)' }] : []),
                  ...(star.brightness ? [
                    star.brightness === 'bright' ? { text: 'Miếu vượng', color: '#eab308' }
                      : star.brightness === 'dim' ? { text: 'Lạc hãm', color: '#ef4444' }
                      : { text: 'Bình hòa', color: 'var(--t-text2)' },
                  ] : []),
                ].map(tag => (
                  <div key={tag.text} className="text-[10px] px-2 py-1 rounded-full"
                    style={{
                      border: '1px solid var(--t-border)',
                      color: tag.color,
                    }}>
                    {tag.text}
                  </div>
                ))}
              </div>
            )}

            {/* Từ khóa */}
            {desc && (
              <div>
                <div className="text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--t-faint)' }}>Đặc chất của sao</div>
                <div className="flex flex-wrap gap-1.5">
                  {desc.keywords.split('·').map(k => (
                    <span key={k} className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-gold)', border: '1px solid rgba(212,168,67,0.2)', background: 'rgba(212,168,67,0.06)' }}>
                      {tvKeyword(k)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trích cổ thư */}
            {detail && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.12)' }}>
                <div className="text-[10px] tracking-widest mb-1.5 flex items-center gap-1" style={{ color: 'var(--t-gold)', opacity: 0.7 }}>
                  Trích cổ thư
                </div>
                <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--t-gold)', opacity: 0.8 }}>{detail.classical}</p>
              </div>
            )}

            {/* Giải đọc của Nghê Hải Hạ */}
            {detail && (
              <>
                <div>
                  <div className="text-[10px] tracking-widest mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--t-faint)' }}>
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                    Nghê Hải Hạ lão sư giải đọc
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>{detail.niHaixia}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Hướng sự nghiệp', value: detail.career, icon: '◈' },
                    { label: 'Đặc chất tình cảm', value: detail.relationship, icon: '♡' },
                    { label: 'Phân tích tài vận', value: detail.wealth, icon: '◆' },
                    { label: 'Lưu ý sức khỏe', value: detail.health, icon: '☯' },
                  ].map(item => (
                    <div key={item.label} className="card-inner rounded-lg p-3">
                      <div className="text-[10px] mb-1 flex items-center gap-1" style={{ color: 'var(--t-faint)' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(74,222,128,0.15)', background: 'rgba(74,222,128,0.05)' }}>
                    <div className="text-emerald-500 mb-0.5 font-medium">Cung tốt nhất</div>
                    <div className="text-emerald-500/70">{detail.bestPalace}</div>
                  </div>
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(248,113,113,0.15)', background: 'rgba(248,113,113,0.05)' }}>
                    <div className="text-red-500 mb-0.5 font-medium">Cung cần lưu ý</div>
                    <div className="text-red-500/70">{detail.worstPalace}</div>
                  </div>
                </div>
              </>
            )}

            {/* Mô tả phụ tinh / sát tinh */}
            {!detail && star.type !== 'major' && (
              <div className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                {star.type === 'lucky' && LUCKY_NOTES[star.name]}
                {star.type === 'sha' && SHA_NOTES[star.name]}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
