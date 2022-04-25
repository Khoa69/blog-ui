import React from "react";
import { Link } from "react-router-dom";
import "./subMenu.css";

function UserSubMenu({ subMenuName }) {
  return (
    <div className="subMenu">
      <h1>{subMenuName}</h1>
      {subMenuName !== "New User" && (
        <Link to="/user/newuser">
          <button className="addButton">New User</button>
        </Link>
      )}
      {subMenuName !== "Trash User" && (
        <Link to="/usersDelete">
          <button className="addButton">View Trash User</button>
        </Link>
      )}
      {subMenuName !== "User Manage" && (
        <Link to="/users">
          <button className="addButton">User Manage</button>
        </Link>
      )}
    </div>
  );
}

export default UserSubMenu;
