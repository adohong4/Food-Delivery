import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="section-sidebar">
            <div className="sidebar">
                <div className="sidebar-options">
                    <NavLink to='/add' className="sidebar-option">
                        <i className="bi bi-plus-circle"></i>
                        <p>Add item</p>
                    </NavLink>
                    <NavLink to='/list' className="sidebar-option">
                        <i className="bi bi-list-ul"></i>
                        <p>List item</p>
                    </NavLink>
                    <NavLink to='/user' className="sidebar-option">
                        <i className="bi bi-box"></i>
                        <p>User</p>
                    </NavLink>
                    <NavLink to='/orders' className="sidebar-option">
                        <i className="bi bi-box"></i>
                        <p>Orders item</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
