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
        <div className='top-seller-container'>            
            <table className="top-seller-table">                 
                <thead>
                    <tr className="top-seller-header">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index} className='top-seller-item'> 
                            <td>
                                <img src={`${url}/images/${item.image}`} alt={item.name} className="item-image" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.count}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        
    );
};

export default TopSeller;
