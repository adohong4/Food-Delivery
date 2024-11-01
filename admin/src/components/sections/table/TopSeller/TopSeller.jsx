import React, { useEffect, useState } from 'react';
import './TopSeller.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const TopSeller = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/table/all`);
            // Kiểm tra xem dữ liệu có hợp lệ không
            if (response.status === 200) {
                setList(response.data);
            } else {
                toast.error("Error fetching data");
            }
        } catch (error) {
            toast.error("Error fetching data");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Count</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p>{item.count}</p> {/* Hiển thị số lượng món ăn */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSeller;
