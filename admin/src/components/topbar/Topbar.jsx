import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import DropdownMenu from "./DropdownMenu";
import { useGlobalContext } from "../../context/context";
import Avatar from "@mui/material/Avatar";

function Topbar() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { checkLogin } = useGlobalContext();

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Blog UI</span>
                </div>
                {checkLogin() ? (
                    <button
                        className="topRight"
                        onClick={() => {
                            setOpenDropdown(!openDropdown);
                        }}
                        type="button"
                    >
                        <Avatar
                            src={
                                localStorage.avatar != "null" 
                                    ? `http://127.0.0.1:8887/userImages/${localStorage.avatar}`
                                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            sx={{ width: 42, height: 42 }}
                            className="avatar"
                        />
                        {openDropdown && <DropdownMenu />}
                    </button>
                ) : (
                    <Link to="/login" className="link">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Topbar;
