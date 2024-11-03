import React from 'react';

const UserPopup = ({ currentUser, onChange, onUpdate, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Update User</h3>

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={onChange}
                />

                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={currentUser.email}
                    onChange={onChange}
                />

                <label>Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={onChange}
                />

                <button onClick={onUpdate}>Update</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UserPopup;
