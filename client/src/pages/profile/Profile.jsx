import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./profile.css";

export default function Profile() {
  const pf = "http://localhost:4000/images/";
  const [file, setFile] = useState();
  const [password, setPassword] = useState("");

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      password,
    };
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
    try {
      axios
        .put(`http://localhost:4000/api/user/edit/${user._id}`, updatedUser, {
          headers: {
            accept: "application/json",
            "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
          },
        })
        .then((res) => {
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data.data });
          window.location.replace("/");
        });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings container">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : pf + user.profilePicture}
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
