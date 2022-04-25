import React, { useState } from "react";
import { useGlobalContext } from "../../context/context";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./manageCategory.css";
import axios from "axios";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/BlogSubMenu";
import TextField from "@mui/material/TextField";
import Login from "../login/LogIn";

function ManageCategory() {
    const alert = useAlert();

    const { categories, checkLogin } = useGlobalContext();

    const [newCategory, setNewCategory] = useState("");

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/doubleK/api/category/${id}`, {
            headers: {
                accept: "application/json",
                Authorization: document?.cookie
                    .split("; ")
                    .find((token) => token.includes("doubleKToken"))
                    .split("=")[1],
            },
        });
        alert.success("Category deleted!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            categories.find(
                (category) => category?.category.toLowerCase() === newCategory
            )
        ) {
            alert.error(`${newCategory} already exist!`);
        } else {
            await axios
                .post(
                    "http://localhost:8080/doubleK/api/category/save",
                    {
                        category: newCategory,
                    },
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: document?.cookie
                                .split("; ")
                                .find((token) => token.includes("doubleKToken"))
                                .split("=")[1],
                        },
                    }
                )
                .then(setNewCategory(""))
                .then(() => alert.success("Category created!"))
                .catch((e) => {
                    console.log(e);
                    alert.error("Error in create!");
                });
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "category", headerName: "Category", width: 800 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutline
                            className="categoryDelete"
                            onClick={() => handleDelete(params.row.id)}
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
        <div className="category">
            <ProductSubMenu subMenuName="Category" />
            <form onSubmit={handleSubmit} className="newCategoryForm">
                <TextField
                    label="New category"
                    variant="outlined"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="newCategoryInput"
                />
                <button className="newCategoryButton" type="submit">
                    Add Category
                </button>
            </form>
            <DataGrid
                rows={categories}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default ManageCategory;
