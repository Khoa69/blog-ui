import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./blogs.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useAlert } from "react-alert";
import BlogSubMenu from "../../components/subMenu/BlogSubMenu";
import Login from "../login/LogIn";

function TrashBlogs() {
  const alert = useAlert();
  const navigate = useNavigate();
  const pf = "http://localhost:4000/images/";

  const { trashBlogs, checkLogin, fetchTrashBlogs, fetchBlogs } =
    useGlobalContext();

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/post/sortDelete/${id}`, {
        headers: {
          accept: "application/json",
          "x-access-token": document?.cookie
            .split("; ")
            .find((token) => token.includes("doubleKToken"))
            .split("=")[1],
        },
      })
      .then(() => alert.success("Post deleted!"))
      .then(() => fetchTrashBlogs())
      .then(() => fetchBlogs())
      .catch((error) => alert.error("Error!"));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={
                params.row?.img
                  ? `${pf}${params.row?.img}`
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Auth",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.username}</div>;
      },
    },
    {
      field: "comments",
      headerName: "Comment",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.comments ? params.row.comments.length : 0}
          </div>
        );
      },
    },
    {
      field: "likes",
      headerName: "Like",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.likes ? params.row.likes.length : 0}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            <Link to={"/comment/" + params.row._id}>
              <button className="productListEdit">View Comment</button>
            </Link>
          </>
        );
      },
    },
  ];

  if (!checkLogin()) {
    return <Login />;
  }

  return (
    <div className="productList">
      <BlogSubMenu subMenuName="Blog Trash" />
      <DataGrid
        rows={trashBlogs}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default TrashBlogs;
