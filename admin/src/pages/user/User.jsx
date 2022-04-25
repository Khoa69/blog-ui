import React, { useState, useEffect } from "react";
import "./user.css";
import { useParams } from "react-router-dom";
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
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
  Button,
  Checkbox,
} from "@mui/material";
import Login from "../login/LogIn";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

function User() {
  const { userId } = useParams();
  const { checkLogin, roles, fetchUsers } = useGlobalContext();
  const alert = useAlert();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [rolesB, setRolesB] = useState([]);
  const [file, setFile] = useState();
  const pf = "http://localhost:4000/images/";

  const handleCheckbox = (event) => {
    setRolesB({ ...rolesB, [event.target.value]: event.target.checked });
  };
  const fetchUser = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/user/${id}`, {
      headers: {
        accept: "application/json",
        "x-access-token": document?.cookie
          .split("; ")
          .find((token) => token.includes("doubleKToken"))
          .split("=")[1],
      },
    });
    if (res.data) {
      setUser(res.data.user);
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    if (checkLogin()) {
      fetchUser(userId);
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = {};
    updatedUser.roles = Object.keys(rolesB).filter((key) => rolesB[key]);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {}
    }

    await axios
      .put(`http://localhost:4000/api/user/edit/${userId}`, updatedUser, {
        headers: {
          accept: "application/json",
          "x-access-token": document?.cookie
            ?.split("; ")
            .find((token) => token.includes("doubleKToken"))
            .split("=")[1],
        },
      })
      .then((response) => alert.success("Update success"))
      .then(() => fetchUsers())
      .then(() => navigate("/users"))
      .catch((error) => alert.error("Don't update success!"));
  };

  if (!checkLogin()) {
    return <Login />;
  }

  return (
    <div className="userPage">
      {window.location.href.includes("http://localhost:3001/user") && (
        <div className="userTitleContainer">
          <UserSubMenu subMenuName="Edit User" />
        </div>
      )}
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user?.profilePicture
                  ? `${pf}${user?.profilePicture}`
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <div className="settingsPP">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : user?.profilePicture
                        ? pf + user.profilePicture
                        : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                    }
                    alt=""
                  />
                  <label htmlFor="fileInput">
                    <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    className="settingsPPInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
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
              <button className="settingsSubmitButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
