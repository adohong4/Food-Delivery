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