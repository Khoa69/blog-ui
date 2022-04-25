import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [roles, setRoles] = useState([]);

  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [trashBlogs, setTrashBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersD, setUsersD] = useState([]);
  const [admin, setAdmin] = useState({});

  const checkLogin = () => {
    if (
      !(
        document.cookie &&
        document.cookie
          .split("; ")
          .find((item) => item.includes("doubleKToken"))
          .split("=")[1] !== "" &&
        localStorage.roles &&
        localStorage.roles.includes("ROLE_ADMIN")
      )
    ) {
      document.cookie = `doubleKToken=;expires=${new Date(
        new Date().setFullYear() - 100,
      ).toUTCString()};Secure`;
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      localStorage.removeItem("email");
      localStorage.removeItem("imageUser");
      return false;
    }

    return true;
  };

  const logOut = () => {
    document.cookie = `doubleKToken=;expires=${new Date(
      new Date().setFullYear() - 100,
    ).toUTCString()};Secure`;
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("imageUser");
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCategory = async () => {
    const res = await axios.get("http://localhost:4000/api/category", {
      headers: {
        accept: "application/json",
      },
    });

    if (res.data) {
      setCategory(res.data);
    } else {
      setCategory([]);
    }
  };

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:4000/api/post", {
      headers: {
        accept: "application/json",
      },
    });
    if (res.data) {
      setBlogs(res.data);
    } else {
      setBlogs([]);
    }
  };

  const fetchTrashBlogs = async () => {
    const res = await axios.get("http://localhost:4000/api/post/trash", {
      headers: {
        accept: "application/json",
      },
    });
    if (res.data) {
      setTrashBlogs(res.data);
    } else {
      setTrashBlogs([]);
    }
  };

  const fetchUsers = async () => {
    const datatoken = document?.cookie
      .split("; ")
      .find((item) => item.includes("doubleKToken"))
      .split("=")[1];
    await axios
      .get("http://localhost:4000/api/user", {
        headers: {
          accept: "application/json",
          "x-access-token": `${datatoken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setUsers(res.data.user);
        } else {
          setUsers([]);
        }
      });
  };
  const fetchUsersDelete = async () => {
    const datatoken = document?.cookie
      .split("; ")
      .find((item) => item.includes("doubleKToken"))
      .split("=")[1];
    await axios
      .get("http://localhost:4000/api/user/sortDelete/all", {
        headers: {
          accept: "application/json",
          "x-access-token": `${datatoken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setUsersD(res.data.user);
        } else {
          setUsersD([]);
        }
      });
  };

  const fetchRoles = async () => {
    const datatoken = document?.cookie
      .split("; ")
      .find((item) => item.includes("doubleKToken"))
      .split("=")[1];
    await axios
      .get("http://localhost:4000/api/role", {
        headers: {
          accept: "application/json",
          "x-access-token": `${datatoken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setRoles(res.data);
        } else {
          setRoles([]);
        }
      });
  };

  useEffect(() => {
    if (checkLogin()) {
      fetchCategory();
      fetchBlogs();
      fetchRoles();
      fetchUsersDelete();
      fetchTrashBlogs();
    }
  }, []);

  useEffect(() => {
    if (
      document.cookie &&
      document.cookie.split("; ").find((item) => item.includes("doubleKToken"))
    ) {
      fetchUsers();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        category,
        blogs,
        users,
        usersD,
        fetchUsers,
        fetchUsersDelete,
        admin,
        roles,
        trashBlogs,
        setAdmin,
        logOut,
        formatNumber,
        checkLogin,
        fetchBlogs,
        fetchTrashBlogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
