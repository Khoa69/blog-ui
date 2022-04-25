import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobalContext } from "../../context/context";
import { ButtonGroup, Box, Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MopedIcon from "@mui/icons-material/Moped";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./topbar.css";

function DropdownMenu() {
    const { logOut, checkLogin } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate("/");
    };

    if (!checkLogin()) {
        return <></>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                "& > *": {
                    m: 1,
                },
            }}
            className="dropdownMenu"
        >
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
            >
                <Link
                    to={`/profile/${localStorage.getItem("id")}`}
                    className="link"
                >
                    <Avatar
                        src={
                            localStorage.avatar != "null" 
                                ? `http://127.0.0.1:8887/userImages/${localStorage.avatar}`
                                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                        }
                        sx={{ width: 24, height: 24 }}
                        className="avatar"
                    />
                    My Profile
                </Link>
                <Link
                    to={`/changepassword/${localStorage.getItem("id")}`}
                    className="link"
                >
                    <VpnKeyIcon className="icon" />
                    Change Password
                </Link>
                {localStorage.roles.includes("ROLE_USER") && (
                    <div className="link">
                        <a href="http://localhost:3000" target="_self">
                            <ManageAccountsIcon className="icon" />
                            <p>User page</p>
                        </a>
                    </div>
                )}
                {localStorage.roles.includes("ROLE_SHIPPER") && (
                    <div className="link">
                        <a href="http://localhost:3003" target="_self">
                            <MopedIcon className="icon" />
                            <p>Shipper Page</p>
                        </a>
                    </div>
                )}
                <Link to={"/"} onClick={handleLogout} className="link">
                    <LogoutIcon className="icon" />
                    Sign out
                </Link>
            </ButtonGroup>
        </Box>
    );
}

export default DropdownMenu;
