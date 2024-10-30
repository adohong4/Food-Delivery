import React, { useEffect, useState } from 'react';
import './Comment.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const Comment = ({ url }) => {
    const [list, setList] = useState([]);
    const [totalComment, setTotalComment] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // Function to fetch the Comment list
    const fetchList = async (page = 1) => {
        try {
            const response = await axios.get(`${url}/api/table/comment?page=${page}&limit=20`);
            if (response.data.success) {
                setList(response.data.data);
                setTotalComment(response.data.totalComments);
                setTotalPages(response.data.totalPages);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("Error fetching comments");
        }
    };

    useEffect(() => {
        fetchList(currentPage);
    }, [currentPage]);

    // Function to delete Comment
    const removeComment = async (commentId) => {
        const response = await axios.post(`${url}/api/comment/deleteComment`, { id: commentId });
        await fetchList(currentPage);
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error deleting comment");
        }
    };
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return stars;
    };
    
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
<div className="comment-list-container">
    <h1>Comment List</h1>
    <div className="comment-cards">
        {list.map((item, index) => (
            <div key={index} className="comment-card">
                <div className="comment-header">
                    <p className="comment-email">{item.email}</p>
                    <div className="comment-rating">{renderStars(item.rating)}</div>
                </div>
                <p className="comment-text">{item.comment}</p>
                <div className="comment-footer">
                    <p className="comment-order">Order ID: {item.orderId}</p>
                    <button onClick={() => removeComment(item._id)} className="btn-delete-cmt">
                        Delete
                    </button>
                </div>
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
</div>

    );
};

export default Comment;
