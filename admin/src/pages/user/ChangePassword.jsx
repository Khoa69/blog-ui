import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userId } = useParams();

    const alert = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert.error("Password does not match!");
        }

        const data = {
            oldPassword,
            newPassword: password,
        };

        await axios
            .put(
                `http://localhost:8080/doubleK/api/user/password/${userId}`,
                data,
                {
                    headers: {
                        Authorization: document?.cookie
                            ?.split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((response) => alert.success(response.data.message))
            .catch((error) => alert.error(error.response.data.message));
    };

    return (
        <div className="passwordContainer">
            <form onSubmit={handleSubmit}>
                <h1>Change password</h1>
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Old password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="New password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                />
                <button type="submit">Change password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
