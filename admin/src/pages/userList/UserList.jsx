import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import UserSubMenu from "../../components/subMenu/UserSubMenu";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import Login from "../login/LogIn";
import { useAlert } from "react-alert";

function UserList() {
  const navigate = useNavigate();
  const pf = "http://localhost:4000/images/";
  const alert = useAlert();

  const {
    users,
    fetchUsers,
    checkLogin,
    fetchUsersDelete,
    fetchTrashBlogs,
    fetchBlogs,
  } = useGlobalContext();

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/user/sortDelete/${id}`, {
        headers: {
          accept: "application/json",
          "x-access-token": document?.cookie
            .split("; ")
            .find((token) => token.includes("doubleKToken"))
            .split("=")[1],
        },
      })
      .then(() => fetchUsers())
      .then(() => fetchUsersDelete())
      .then(() => fetchTrashBlogs())
      .then(() => fetchBlogs())
      .then((response) => alert.success("Delete success"))
      .catch((error) => alert.error(error.response.data.message));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    {
      field: "username",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row?.profilePicture
                  ? `${pf}${params.row?.profilePicture}`
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  if (!checkLogin()) {
    return <Login />;
  }

  return (
    <div className="userList">
      <UserSubMenu subMenuName="User Manage" />
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default UserList;
