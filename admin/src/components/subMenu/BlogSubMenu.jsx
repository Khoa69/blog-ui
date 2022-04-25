import React from "react";
import { Link } from "react-router-dom";
import "./subMenu.css";

function BlogSubMenu({ subMenuName }) {
  return (
    <>
      <div className="subMenu">
        <h1 className="productTitle">{subMenuName}</h1>
        {subMenuName !== "Blog Trash" && (
          <Link to="/trashblogs">
            <button className="addButton">View Trash Blog</button>
          </Link>
        )}
        {subMenuName !== "Blog" && (
          <Link to="/blogs">
            <button className="addButton">View Blog</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default BlogSubMenu;
