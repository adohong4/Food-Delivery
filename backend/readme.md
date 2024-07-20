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


Tạo xác thực tài khoản (login, register)
- xây dựng route login, register trong backend
- xây dựng function login, register trong userController
- sử dụng bcrypt, jwt, validate

Xây dựng giao diện và kết nối từ frontend sang backend
- xây dựng function onChangeHandler, onLogin
- kết nối backend
- xây dựng lại trạng thái giao diện sau khi đăng nhập, đăng xuất
- sử dựng localStorage để lưu giữ tạm thời token tài khoản

Xây dựng fetch data
- xây dựng fetch data trong StoreContext để lấy data từ mongodb
- sử dụng url để fetch data từ Be sang Fe

Shop Cart Functionality
- tạo file cartController, tạo các function addCart, removeCart, getCart
- truyền dẫn route qua cartRoute và server,js
- Tạo file auth.js trong Middleware, sử dụng jwt để xây dựng và xác thực người dùng.
- xay dựng nốt các function add, remove, get 
- sử dụng thunder client để test đường dẫn
- xây dựng và truyền url BE tới các function addToCart, removeFromCart trong StoreContext

Tạo order trong BE và cổng thanh toán
- xây dựng noSQL trong orderModel và truyền dẫn tới orderController
- xây dựng orderController với import Stripe, userModel, userModel
- xây dựng oder của người dùng tới FE
- xây dựng function, trong đó có tạo đường dẫn tới nơi thanh toán Stripe
- sử dụng thunder client để test đường dẫn
- tại PlaceOrder trong FE, xây dựng function setData, onChaneHandler, placeOrder

Verify
- xay dựng nốt function verify trong orderController
- tạo verify trong pages FE
- xây dựng function và sử dựng axios để lấy route từ BE

My Order là nơi ấn thanh toán xong, sẽ tạo hóa đơn user ở đó
- xây dựng funtion userOrder trong orderController
- tạo các route, test đường dẫn trong thunder client
- tạo file MyOrder và css nó
- tạo 2 đường dẫn ở logo user: MyOrder và Logout, css nó
- tạo fetchOrder và setData trong MyOrder.jsx
- tạo useEffect để truyền dãn link tới cart, 1 là chưa đăng nhập ấn thanh toán sẽ tới cart, đăng nhập nhưng ko có hàng, ấn thanh toán sẽ tới cart

Tạo Order Page trong file Admin
- tạo các user, list, update trong orderController
- truyền route và test thunder client
- xây dựng nốt file order và css
- sử dụng axios để láy route trong BE
- fetchAllOrder để in toàn bộ order ng dùng trong Mongo
- statusHandler để cập nhật trạng thái tới PlaceOrder

