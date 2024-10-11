import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from "react-toastify"


const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
    const [currentFood, setCurrentFood] = useState(null); // Lưu trữ thông tin món ăn được chỉnh sửa

    // Hàm lấy danh sách
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    // Hàm xóa món ăn
    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    // Hàm mở popup và hiển thị dữ liệu món ăn cần chỉnh sửa
    const openUpdatePopup = (food) => {
        setCurrentFood(food);
        setShowPopup(true);
    };

    // Hàm đóng popup
    const closePopup = () => {
        setShowPopup(false);
        setCurrentFood(null);
    };

    // Hàm xử lý khi người dùng nhấn nút Update trong popup
    const handleUpdate = async () => {
        const response = await axios.post(`${url}/api/food/update`, currentFood); // Cập nhật dữ liệu
        if (response.data.success) {
            toast.success('Updated successfully');
            await fetchList(); // Cập nhật lại danh sách
            closePopup(); // Đóng popup sau khi thành công
        } else {
            toast.error('Error updating food');
        }
    };

    // Hàm xử lý khi có thay đổi trên input
    const handleChange = (e) => {
        setCurrentFood({ ...currentFood, [e.target.name]: e.target.value });
    };

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                    <b>Update</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                        <button onClick={() => openUpdatePopup(item)} className="btn-update">Update</button>
                    </div>
                ))}
            </div>

            {/* Popup Form */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Update Food</h3>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={currentFood.name}
                            onChange={handleChange}
                        />
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={currentFood.category}
                            onChange={handleChange}
                        />
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={currentFood.price}
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

export default List;
