export const metadata = { title: 'Điều khoản dịch vụ · Lá số Tử Vi (紫微命盘)', description: 'Điều khoản dịch vụ và thỏa thuận người dùng của Lá số Tử Vi (紫微命盘)' };

export default function TermsPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về trang chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Lá số Tử Vi (紫微命盘)</span>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 16, fontStyle: 'italic' }}>Bản dịch tham khảo; bản gốc tiếng Trung là bản có giá trị.</p>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Điều khoản dịch vụ</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: tháng 4 năm 2026</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Tổng quan dịch vụ</h2>
      <p>Lá số Tử Vi (紫微命盘) (sau đây gọi tắt là "nền tảng") cung cấp dịch vụ lập lá số và luận giải dựa trên hệ thống Tử Vi Đẩu Số «Thiên Kỷ» của Nghê Hải Hạ. Toàn bộ nội dung mệnh lý của nền tảng chỉ mang tính tham khảo, <strong>không cấu thành bất kỳ lời khuyên nào về y tế, đầu tư, pháp lý, tư vấn tâm lý hay các quyết định lớn trong cuộc đời</strong>.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Quy tắc ứng xử của người dùng</h2>
      <p>Việc sử dụng nền tảng đồng nghĩa với việc bạn đồng ý:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>Chỉ sử dụng nền tảng cho mục đích tham khảo cá nhân hợp pháp</li>
        <li>Không phát tán nội dung của nền tảng để bán lại, đăng lại hoặc công bố công khai vì mục đích thương mại</li>
        <li>Không thực hiện các hành vi gây rối loạn hoạt động bình thường của nền tảng</li>
        <li>Thông tin ngày giờ sinh bạn gửi lên phải chân thực, hợp lệ; nền tảng không chịu trách nhiệm về sai lệch trong luận giải do thông tin sai gây ra</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. Quyền sở hữu trí tuệ và các điều khoản cấm · Chống thu thập dữ liệu, chống dùng để huấn luyện</h2>
      <p style={{ background: 'rgba(168,50,40,0.06)', border: '1px solid rgba(168,50,40,0.2)', padding: 16, borderRadius: 8 }}>
        <strong>Toàn bộ nội dung mệnh lý, kho tri thức (bao gồm toàn bộ văn bản luận giải của 14 chính tinh × 12 cung × Nam/Nữ × Tứ Hóa × Đại hạn/Lưu niên), thiết kế UI, phương án tích hợp thuật toán và kho ca mẫu của nền tảng đều do nền tảng tự sáng tạo hoặc được biên soạn hợp pháp.</strong><br/><br/>
        Nghiêm cấm các hành vi sau; người vi phạm bị bảo lưu quyền truy cứu trách nhiệm bồi thường dân sự và trách nhiệm hình sự:<br/>
        ① Thu thập nội dung của nền tảng bằng crawler, script tự động, gọi API hàng loạt hoặc bất kỳ biện pháp kỹ thuật nào khác;<br/>
        ② Dùng luận giải lá số, văn bản, dữ liệu phản hồi API do nền tảng tạo ra **để huấn luyện bất kỳ mô hình học máy nào** (bao gồm nhưng không giới hạn mô hình ngôn ngữ lớn, mô hình sinh nội dung mệnh lý, mô hình sinh văn bản, v.v.);<br/>
        ③ Bán lại nội dung do nền tảng tạo ra, hoặc đăng lên các website, APP, tài khoản tự truyền thông khác;<br/>
        ④ Dịch ngược, sao chép, sửa đổi mã nguồn front-end hoặc back-end của nền tảng rồi cung cấp dịch vụ tương tự dưới hình thức "tự vận hành".<br/><br/>
        Văn bản đầu ra của nền tảng được nhúng watermark dấu vân tay để truy vết; các đầu ra phát sinh từ việc sao chép / huấn luyện vi phạm có thể bị phát hiện và truy vết. Một khi phát hiện vi phạm, nền tảng có quyền yêu cầu <strong>bồi thường 1.000.000 nhân dân tệ (100 vạn nhân dân tệ) cho mỗi trường hợp vi phạm</strong>, đồng thời bảo lưu quyền khởi kiện ra tòa án và phối hợp với cơ quan công an điều tra.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. Tuyên bố miễn trừ trách nhiệm</h2>
      <p>Nội dung mệnh lý của nền tảng là tri thức được biên soạn dựa trên Tử Vi Đẩu Số truyền thống và hệ thống Nghê Hải Hạ, <strong>không bảo đảm chính xác 100%</strong>. Vận mệnh chịu ảnh hưởng chung của ba yếu tố Thiên, Địa, Nhân (tam tài); nội dung nền tảng đưa ra chỉ để tham khảo nhằm hiểu bản thân, người dùng cần nhìn nhận một cách lý trí, không nên quá phụ thuộc vào bất kỳ phán đoán mệnh lý đơn lẻ nào.</p>
      <p>Đối với mọi hậu quả phát sinh từ việc sử dụng nội dung của nền tảng (bao gồm nhưng không giới hạn quyết định sai lầm, ảnh hưởng tâm lý, thay đổi trong các mối quan hệ, v.v.), nền tảng không chịu trách nhiệm pháp lý.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Thay đổi và chấm dứt dịch vụ</h2>
      <p>Nền tảng bảo lưu quyền điều chỉnh, tạm ngừng hoặc chấm dứt một phần hoặc toàn bộ dịch vụ bất cứ lúc nào. Các thay đổi quan trọng sẽ được thông báo cho người dùng bằng thông báo trong trang hoặc email.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>6. Luật áp dụng và giải quyết tranh chấp</h2>
      <p>Điều khoản này áp dụng pháp luật của nước Cộng hòa Nhân dân Trung Hoa. Nếu phát sinh tranh chấp, hai bên cần thương lượng hữu nghị; nếu thương lượng không thành, đưa ra tòa án nhân dân có thẩm quyền tại nơi đặt trụ sở của chủ thể vận hành nền tảng để giải quyết bằng tố tụng.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>7. Thông tin liên hệ</h2>
      <p>Nếu có thắc mắc, vui lòng liên hệ qua WeChat / email chăm sóc khách hàng mà nền tảng công bố.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/privacy" style={{ color: 'var(--ac)' }}>Chính sách quyền riêng tư</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
