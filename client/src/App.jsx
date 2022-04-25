import Topbar from "./components/topBar/topBar";
import Homepage from "./pages/homepage/homepage";
import Single from "./pages/single/Single";
import 'bootstrap/dist/css/bootstrap.min.css';
import Write from "./pages/write/Write";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


const App = () => {
    const {user} =useContext(Context);

  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/:id" element={<Homepage/>}/>
        <Route exact path="/register" element={user? <Homepage/>: <Register/>}/>
        <Route exact path="/login" element={user? <Homepage/>: <Login/>}/>
        <Route exact path="/profile" element={user? <Profile/>: <Homepage/>}/>
        <Route exact path="/write" element={user?<Write/>:<Login/>}/>
        <Route exact path="/post/:postId" element={ <Single/>}/>   
      </Routes>
    </Router>
  );
};

export default App;