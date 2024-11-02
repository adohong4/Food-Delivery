import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url, category }) => {
    const [list, setList] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
    const [currentFood, setCurrentFood] = useState(null); // Lưu trữ thông tin món ăn được chỉnh sửa
    const [newImage, setNewImage] = useState(null); // State lưu hình ảnh mới
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sort, setSort] = useState('Sort By');

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


    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            await fetchList();
            return;
        }

        // const response = await axios.get(`${url}/api/user/getUserName/search?term=${searchTerm}`);
        const response = await axios.get(`${url}/api/food/searchFood`, { params: { term: searchTerm } })
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };
    const sortedList = [...list]
        .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
        .sort((a, b) => {
            if (sort === 'Asc') {
                return a.price - b.price;
            } else if (sort === 'Desc') {
                return b.price - a.price;
            }
            return 0;
        });


    return (
        <div className='list add flex-col'>
            <div className='top-list-tiltle'>
                <div className='col-lg-6 tittle-right'>
                    <p>All Foods List</p>
                </div>
                <div className="sort-container">
                    <select id="sort" onChange={handleSortChange}>
                        <option value="Sort By">Sort By</option>
                        <option value="Asc">Asc</option>
                        <option value="Desc">Desc</option>
                    </select>
                </div>


                <div className="selected-container">
                    <select id="category" onChange={handleCategoryChange}>
                        <option value="All" selected>All</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Drink">Drink</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className='col-lg-6 search-left'>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Food name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>

            </div>



            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                    <b>Update</b>
                </div>
                {sortedList.map((item, index) => (
                    // if (category === "All" || category === item.category) {}
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <button onClick={() => removeFood(item._id)} className='cursor1' > Delete</button>
                        <button onClick={() => openUpdatePopup(item)} className="btn-update1">Update</button>
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
