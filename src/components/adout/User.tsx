import React from 'react';
import type { UserType } from "../../types";
import './Users.css'; // Import the CSS file

const User = ({ userData }: { userData: UserType[] }) => {
  return (
    <div className="user-container">
      {userData.map((user) => {
        return (
          <div key={user.id} className="user-item">
            <h3>
              Name: {`${user.name.firstname} ${user.name.lastname}`}
            </h3>
            <p>Email: {user.email}</p>
            <p>Address At: {`${user.address.city} - ${user.address.street}`}</p>
            <p>Phone: {user.phone}</p>
            <p>Username: {user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default User;
