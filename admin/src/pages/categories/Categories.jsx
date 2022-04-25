import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./categories.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useAlert } from "react-alert";
import { useGlobalContext } from "../../context/context";

function Categories() {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const alert = useAlert();
  const { category } = useGlobalContext();

  const fetchCategories = async () => {
    await axios.get(`http://localhost:4000/api/category`).then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    setCategories(category);
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "cateName",
      headerName: "Category Name",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.cateName}</div>;
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={categories}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default Categories;
