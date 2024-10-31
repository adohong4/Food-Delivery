import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';

export const Sidebar = () => {
    return (
        <div className="section-sidebar">
            <div className="sidebar">
                <div className='logo-sidebar'>
                    <img className="logo" src={assets.logo} alt="Logo" />
                </div>
                <div className="sidebar-options">
                    <NavLink to='/dashboard' className="sidebar-option">
                        <i class="bi bi-file-earmark-bar-graph"></i>
                        <p>Dash Board</p>
                    </NavLink>
                    <NavLink to='/add' className="sidebar-option">
                        <i className="bi bi-plus-circle"></i>
                        <p>Add item</p>
                    </NavLink>
                    <NavLink to='/list' className="sidebar-option">
                        <i className="bi bi-list-ul"></i>
                        <p>List item</p>
                    </NavLink>
                    <NavLink to='/user' className="sidebar-option">
                        <i className="bi bi-file-person"></i>
                        <p>User</p>
                    </NavLink>
                    <NavLink to='/orders' className="sidebar-option">
                        <i className="bi bi-box"></i>
                        <p>Orders item</p>
                    </NavLink>
                    <NavLink to='/comment' className="sidebar-option">
                        <i class="bi bi-chat-left-text"></i>
                        <p>Comment Order</p>
                    </NavLink>
                    <div className='Logout'>
                        <NavLink
                        to="#"
                        className="sidebar-option"
                        onClick={(e) => {
                            e.preventDefault(); // Ngăn điều hướng ngay lập tức
                            Swal.fire({
                                title: 'Bạn có chắc chắn muốn đăng xuất?',
                                text: "Bạn sẽ phải đăng nhập lại để tiếp tục!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#000000c0',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Đăng xuất',
                                cancelButtonText: 'Hủy',
                                customClass: {
                                    popup: 'swal-popup' 
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = 'http://localhost:5173/'; 
                                }
                            });
                        }}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <p>Log Out</p>
                    </NavLink>
                    </div>
                    


                </div>
            </div>
        </div>
    );
}
