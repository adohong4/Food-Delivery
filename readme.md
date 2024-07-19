Backend với project food-delivery

cài đặt các gói nodemon, cors, mongoose, validate, dotenv, express, stripe, body-parser, bcrypt, multer
- nodemon
- mongoose
- validate
- dotenv
- express
- stripe
- body-parser
- bcrypt
- multer

tạo các file cấu trúc:
- config: dùng để lưu cấu hình
- models: dùng để lưu data, mô hình mongo
- controllers: dùng dể điều hướng 
- middleware: chứa các hàm trung gian để xử lý các yêu cầu http đến route
- routes : định tuyến URL
- upload: lưu trũ hình ảnh đc thêm mới thông qua chức năng lưu trữ

công cụ mới: thunder client: gửi các yêu cầu http và test api

Setup môi trường MongoDB Atlas for database
- tạo database, copy address
- tạo db.js trong config kết nối với mongo atlas bằng moongoose
- định hình database trong mongo trong file foodModel.js

Thêm, hiển thị, xóa list
- tạo foodController.js
- code các function add, list,  remove
- export tới foodRoute trong file route
- test chức năng thông qua công cụ Thunder Client

Tạo đường dẫn tới quản trị viên
- tạo thư mục admin
- xây dựng giao diện admin: addfood, listfood, listorders
- kết nối admin với backend thông qua đường dẫn backend url="http://localhost:${port}
- sử dụng route để truyền dẫn api
- xây dụng navbar, sidebar. Sidebar hiển thị form giao diện addfood, listfood, listorders
- Sử dụng Toast để hiển thị thông báo sau mỗi lần thêm hoặc xóa
- Xây dựng giao diện form Add trong Pages: kết nối với backend để lấy dữ liệu, sử dụng react hooks: useState, xây dựng các function như: Submit, lấy hình ảnh
- Xây dựng giao diện form List: function fetchList để hiện item trong data, sử dụng map(item, index) để in giá trị, xây dựng removeItem
