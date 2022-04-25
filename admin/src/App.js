import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import UserDeleteList from "./pages/userDelete/UserDeleteList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Blogs from "./pages/Blogs/Blogs";
import TrashBlogs from "./pages/trashBlogs/trashBlog";
import ManageCategory from "./pages/manageCategory/ManageCategory";
import Login from "./pages/login/LogIn";
import ChangePassword from "./pages/user/ChangePassword";
import ForgotPassword from "./pages/login/ForgotPassword";
import Comments from "./pages/comments/Comments.jsx";
import Categories from "./pages/categories/Categories.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/profile/:userId" element={<User />} />
            <Route
              path="/changepassword/:userId"
              element={<ChangePassword />}
            />
            <Route path="/resetpassword" element={<ForgotPassword />} />
            <Route path="/users" exact element={<UserList />} />
            <Route path="/usersDelete" exact element={<UserDeleteList />} />
            <Route path="/user/:userId" exact element={<User />} />
            <Route path="/user/newuser" element={<NewUser />} />
            <Route path="/blogs" exact element={<Blogs />} />
            <Route path="/trashblogs" exact element={<TrashBlogs />} />
            <Route
              path="/product/managecategory"
              element={<ManageCategory />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/comment/:postID" exact element={<Comments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
