export const metadata = { title: 'Chính sách quyền riêng tư · Lá số Tử Vi (紫微命盘)', description: 'Chính sách quyền riêng tư của Lá số Tử Vi (紫微命盘)' };

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Chính sách quyền riêng tư</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: tháng 4 năm 2026</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Thông tin chúng tôi thu thập</h2>
      <p>Để cung cấp dịch vụ lập lá số và luận giải Tử Vi, chúng tôi có thể thu thập các thông tin sau:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Thông tin cần thiết cho lá số</strong>: họ tên (không bắt buộc), ngày tháng năm sinh theo Dương lịch, giờ sinh, giới tính, kinh độ nơi sinh</li>
        <li><strong>Thông tin tài khoản (sau khi đăng ký)</strong>: số điện thoại (dùng để xác thực qua SMS và cho dịch vụ hội viên)</li>
        <li><strong>Thông tin tương tác</strong>: các lượt nhấp, duyệt xem của bạn trên trang, lịch sử lá số</li>
        <li><strong>Thông tin phản hồi</strong>: điểm đánh giá "chuẩn / không chuẩn" và phản hồi bằng văn bản của bạn đối với nội dung luận giải</li>
        <li><strong>Thông tin thanh toán</strong>: khi mua hội viên hoặc dịch vụ lẻ, việc thanh toán được xử lý qua bên thứ ba (Alipay / WeChat Pay); nền tảng không lưu trữ số thẻ đầy đủ hoặc mật khẩu</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Cách chúng tôi sử dụng thông tin</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>Thông tin lá số chỉ dùng cho lần luận giải này và lịch sử lá số trong tài khoản của bạn</li>
        <li>Số điện thoại dùng để đăng ký, đăng nhập, thông báo đơn hàng</li>
        <li>Thông tin phản hồi dùng để liên tục cải thiện chất lượng nội dung mệnh lý (phân tích tổng hợp sau khi đã khử thông tin nhạy cảm)</li>
        <li>Dữ liệu tổng hợp có thể được dùng cho nghiên cứu ngành và tối ưu nền tảng</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. Chia sẻ thông tin và bên thứ ba</h2>
      <p>Ngoài các trường hợp sau, chúng tôi sẽ không chia sẻ thông tin cá nhân của bạn cho bên thứ ba:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>Nhà cung cấp dịch vụ thanh toán (Alipay / WeChat Pay): xử lý quyết toán đơn hàng</li>
        <li>Nhà cung cấp dịch vụ SMS (như Alibaba Cloud SMS): gửi mã xác thực</li>
        <li>Nhà cung cấp dịch vụ đám mây (như Vercel / Cloudflare / Alibaba Cloud): vận hành hạ tầng kỹ thuật</li>
        <li>Dịch vụ luận giải AI (như Anthropic Claude): xử lý các cuộc hội thoại "hỏi tự do" của bạn (đã ẩn danh hóa)</li>
        <li>Cơ quan tư pháp hoặc cơ quan chính phủ theo yêu cầu hợp pháp căn cứ vào pháp luật, quy định</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. An toàn thông tin</h2>
      <p>Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phổ biến trong ngành để bảo vệ thông tin của bạn (mã hóa truyền tải HTTPS, mã hóa lưu trữ cơ sở dữ liệu, kiểm soát quyền truy cập, v.v.). Tuy nhiên xin lưu ý, việc truyền tải qua Internet không thể bảo đảm an toàn 100%.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Quyền của bạn</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Tra cứu</strong>: có thể xem toàn bộ lịch sử lá số và đơn hàng của bạn qua trung tâm tài khoản</li>
        <li><strong>Xóa</strong>: liên hệ chăm sóc khách hàng để xóa lá số chỉ định trong tài khoản / hủy tài khoản</li>
        <li><strong>Xuất dữ liệu</strong>: có thể yêu cầu xuất toàn bộ dữ liệu cá nhân của bạn</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>6. Cookie và lưu trữ cục bộ</h2>
      <p>Trang này sử dụng cookie / localStorage để: lưu tùy chọn giao diện tối/sáng của bạn, lịch sử lá số gần đây, trạng thái đăng nhập hội viên. Bạn có thể tắt trong cài đặt trình duyệt, nhưng một số chức năng có thể bị ảnh hưởng.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>7. Người chưa thành niên</h2>
      <p>Nội dung mệnh lý của nền tảng hướng đến người dùng trưởng thành từ 18 tuổi trở lên. Người chưa thành niên vui lòng sử dụng khi có sự đồng ý của người giám hộ, và không được dùng nội dung luận giải cho các quyết định lớn trong cuộc đời.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>8. Thay đổi chính sách</h2>
      <p>Chính sách này có thể được cập nhật không định kỳ. Các thay đổi quan trọng sẽ được thông báo bằng cách nổi bật. Tiếp tục sử dụng đồng nghĩa với việc đồng ý với phiên bản đã cập nhật.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>Điều khoản dịch vụ</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
