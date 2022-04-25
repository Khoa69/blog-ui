import axios from "axios";
import React, { useState } from "react";
import "./newUser.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
import { useGlobalContext } from "../../context/context";
import Login from "../login/LogIn";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import FormControl from "@mui/material/FormControl";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";

function NewUser() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { fetchUsers, checkLogin, roles } = useGlobalContext();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rolesB, setRolesB] = useState([]);
  const [file, setFile] = useState();

  const handleCheckbox = (event) => {
    setRolesB({ ...rolesB, [event.target.value]: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    data.roles = Object.keys(rolesB).filter((key) => rolesB[key]);

    if (file) {
      const data1 = new FormData();
      const filename = Date.now() + file.name;
      data1.append("name", filename);
      data1.append("file", file);
      data.profilePicture = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data1);
      } catch (err) {
        alert.error("Error File!");
      }
    }

    await axios
      .post("http://localhost:4000/api/user/register", data, {
        headers: {
          accept: "application/json",
          "x-access-token": document?.cookie
            ?.split("; ")
            .find((token) => token.includes("doubleKToken"))
            .split("=")[1],
        },
      })
      .then((response) => alert.success("Create Success!"))
      .then(() => fetchUsers())
      .then(() => navigate("/users"))
      .catch((error) => {
        alert.error("Error!");
      });
  };

  if (!checkLogin()) {
    return <Login />;
  }

  return (
    <div className="newUser">
      <UserSubMenu subMenuName="New User" />
      <form onSubmit={handleSubmit}>
        <div className="newUserForm">
          <FormControl className="newUserFormLeft">
            <div className="newUserItem">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <TextField
              label="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl className="newUserFormRight">
            <FormControl className="userUpdateItem">
              <FormLabel component="legend">Roles</FormLabel>
              <div className="newUserRole">
                <Checkbox
                  value={roles[0]._id}
                  onChange={handleCheckbox}
                  id="user"
                />
                <FormLabel htmlFor="user">User</FormLabel>
                <Checkbox
                  value={roles[1]._id}
                  onChange={handleCheckbox}
                  id="admin"
                />
                <FormLabel htmlFor="admin">Admin</FormLabel>
                <Checkbox
                  value={roles[2]._id}
                  onChange={handleCheckbox}
                  id="manager"
                />
                <FormLabel htmlFor="shipper">Manager</FormLabel>
              </div>
            </FormControl>
            <button type="submit" className="newUserButton">
              Create
            </button>
          </FormControl>
        </div>
      </form>
    </div>
  );
}

export default NewUser;
