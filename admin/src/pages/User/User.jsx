import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const User = ({ url }) => {
    const [list, setList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Function to fetch the user list
    const fetchList = async (page = 1) => {
        const response = await axios.get(`${url}/api/table/users?page=${page}&limit=20`);
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

    // Function to search users
    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            // If no search term, fetch the original user list
            await fetchList(currentPage);
            return;
        }

        // const response = await axios.get(`${url}/api/user/getUserName/search?term=${searchTerm}`);
        const response = await axios.get(`${url}/api/user/getUserName`, { params: { term: searchTerm } })
        if (response.data.success) {
            setList(response.data.data);
            setTotalUser(response.data.totalUsers);
            setTotalPages(response.data.totalPages);
        } else {
            toast.error("Error");
        }
    };

    // Function to delete user
    const removeUser = async (userId) => {
        const response = await axios.post(`${url}/api/user/deleteUser`, { id: userId });
        await fetchList(currentPage); // Fetch list again after deletion
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    // Function to open update popup
    const openUpdatePopup = (user) => {
        setCurrentUser(user);
        setShowPopup(true);
    };

    // Function to close update popup
    const closePopup = () => {
        setShowPopup(false);
        setCurrentUser(null);
    };

    // Function to handle update
    const handleUpdate = async () => {
        const formData = {
            name: currentUser.name,
            email: currentUser.email,
            password: currentUser.password ? currentUser.password : undefined
        };

        try {
            const response = await axios.put(`${url}/api/user/updateUser/${currentUser._id}`, formData);
            if (response.data.success) {
                toast.success('Updated successfully');
                await fetchList(currentPage); // Update the list after successful update
                closePopup(); // Close the popup
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating User');
        }
    };

    // Function to handle input changes
    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    return (
        <div className='user-list-container'>
            <p>User List</p>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table className="user-list-table">
                <thead>
                    <tr className="table-header">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Delete</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index} className='table-row'>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>
                                <button onClick={() => removeUser(item._id)} className='btn-delete'> Delete</button>
                            </td>
                            <td>
                                <button onClick={() => openUpdatePopup(item)} className="btn-update">Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
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
