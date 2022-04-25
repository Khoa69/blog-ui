import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./comments.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useAlert } from "react-alert";

function Comments() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const alert = useAlert();
  const fetchPost = async () => {
    await axios
      .get(`http://localhost:4000/api/post/comments/${path}`)
      .then((res) => {
        setComments(res.data);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/comment/${id}`, {
        headers: {
          accept: "application/json",
          "x-access-token": document?.cookie
            .split("; ")
            .find((token) => token.includes("doubleKToken"))
            .split("=")[1],
        },
      })
      .then(() => alert.success("Comment deleted!"))
      .then(() => {
        fetchPost();
      })
      .catch((error) => alert.error("Error!"));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "desc",
      headerName: "Content",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.desc}</div>;
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
          <>
            <div className="productListItem">
              {params.row.likes ? params.row.likes.length : 0}
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={comments}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default Comments;
