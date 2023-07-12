# D_SHOP_WEBSITE

# Mô tả các chức năng chính:
Bên phía người dùng(user):
- Đăng nhập, đăng ký (Khi người dùng đăng ký tài khoản mới thì sẽ nhận được email để kích hoạt tài khoản), đăng xuất.
- Người dùng sau khi đăng nhập có thể tìm kiếm, xem chi tiết, thêm vào danh sách yêu thích, thêm vào giỏ hàng, đánh giá
cửa hàng, thêm bình luận cho sản phẩm,...
- Thanh toán sử dụng stripe.
- Chỉnh sửa thông tin cá nhân, đổi mật khẩu, địa chỉ,...
- Theo dõi đơn hàng.
- Trò chuyện với người bán (socket.io).
Bên phía người bán(seller):
- Đăng nhập, đăng ký (Khi người bán đăng ký tài khoản mới thì sẽ nhận được email để kích hoạt tài khoản), đăng xuất.
- Xem số dư tài khoản, theo dõi tất cả đơn hàng đã được người dùng đặt. Yêu cầu rút tiền với admin.
- CRUD sản phẩm, theo dõi tất cả sản phẩm.
- CRUD sự kiện, mã giảm giá, theo dõi tất cả sự kiện, mã giảm giá đã tạo.
- Trò chuyện với người mua (socket.io).
- Chỉnh sửa thông tin cửa hàng, thông tin cá nhân.
Bên phía quản trị viên(admin):
- Xem tất cả đơn hàng, sản phẩm, sự kiện.
- Xem và có thể xoá người dùng, người bán.
- Kiểm tra yêu cầu rút tiền của người bán.
