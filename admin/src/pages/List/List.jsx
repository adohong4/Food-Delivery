import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
    const [currentFood, setCurrentFood] = useState(null); // Lưu trữ thông tin món ăn được chỉnh sửa
    const [newImage, setNewImage] = useState(null); // State lưu hình ảnh mới

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
        setNewImage(null); // Reset lại hình ảnh khi đóng popup
    };

    // Hàm xử lý khi người dùng nhấn nút Update trong popup
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('id', currentFood._id);
        formData.append('name', currentFood.name);
        formData.append('category', currentFood.category);
        formData.append('price', currentFood.price);
        formData.append('description', currentFood.description); // Thêm mô tả vào formData

        // Nếu người dùng chọn ảnh mới thì thêm ảnh vào formData
        if (newImage) {
            formData.append('image', newImage);
        }

        const response = await axios.put(`${url}/api/food/update/${currentFood._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

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

    // Hàm xử lý khi người dùng chọn hình ảnh mới
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
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

                        <label>Current Image:</label>
                        {currentFood.image && <img src={`${url}/images/${currentFood.image}`} alt="Current Food" style={{ width: '100px', height: '100px' }} />}

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

                        <label>Product Description:</label>
                        <textarea
                            name="description"
                            value={currentFood.description}
                            onChange={handleChange}
                            rows="4"
                        />

                        <label>Upload New Image (Optional):</label>
                        <input type="file" name="image" onChange={handleImageChange} />

                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
