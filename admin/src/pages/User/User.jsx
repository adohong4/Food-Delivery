import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const User = ({ url }) => {
    const [list, setList] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
    const [currentUser, setCurrentUser] = useState(null); // Lưu trữ thông tin món ăn được chỉnh sửa
    const [totalUser, setTotalUser] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    // Hàm lấy danh sách
    const fetchList = async (page) => {
        const response = await axios.get(`${url}/api/user/users?page=${page}&limit=5`);
        if (response.data.success) {
            setList(response.data.data);
            setTotalUser(response.data.totalUsers);
            setTotalPages(response.data.totalPages);
        } else {
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchList(currentPage);
    }, [currentPage]);

    //function delete user
    const removeUser = async (userId) => {
        const response = await axios.post(`${url}/api/user/remove`, { id: userId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };


    // Hàm mở popup và hiển thị dữ liệu món ăn cần chỉnh sửa
    const openUpdatePopup = (user) => {
        setCurrentUser(user);
        setShowPopup(true);
    };

    // Hàm đóng popup
    const closePopup = () => {
        setShowPopup(false);
        setCurrentUser(null);
    };

    // Hàm xử lý khi người dùng nhấn nút Update trong popup
    const handleUpdate = async () => {
        const formData = {
            name: currentUser.name,
            email: currentUser.email,
            password: currentUser.password ? currentUser.password : undefined // Chỉ gửi mật khẩu nếu có
        };

        try {
            const response = await axios.put(`${url}/api/user/updateUser/${currentUser._id}`, formData);

            console.log(response.data); // Kiểm tra phản hồi từ API

            if (response.data.success) {
                toast.success('Updated successfully');
                await fetchList(); // Cập nhật lại danh sách
                closePopup(); // Đóng popup sau khi thành công
            } else {
                toast.error(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating User');
        }
    };



    // Hàm xử lý khi có thay đổi trên input
    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        setCurrentPage(+event.selected + 1);

    }


    return (
        <div className='list add flex-col'>
            <p>All User List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Name</b>
                    <b>Email</b>
                    <b>Password</b>
                    <b>Status</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        <p>{item.password}</p>
                        <p onClick={() => removeUser(item._id)} className='cursor'>X</p>
                        <button onClick={() => openUpdatePopup(item)} className="btn-update">Update</button>
                    </div>
                ))}

            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}


                pageClassName="page-item"
                pageLinkClassName="page-link" previousClassName="page-item"
                previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination" activeClassName="active"
            />
            {/* Popup Form */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Update User</h3>

                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={currentUser.name}
                            onChange={handleChange}
                        />

                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                        />

                        <label>Password:</label>
                        <input
                            type="text"
                            name="password"
                            onChange={handleChange}
                        />

                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
