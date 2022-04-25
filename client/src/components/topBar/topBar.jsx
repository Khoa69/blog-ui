import "./topbar.css"
import {
  Link
} from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Topbar() {
  const pf = "http://localhost:4000/images/"

  const {user,dispatch} =useContext(Context);

  const handleLogout= ()=>{
    dispatch({type:"LOGOUT"});
    localStorage.removeItem("user");
  }
  return (   
        <div className="top">
          <div className="container">
            <div className="row">
            <div className="topLeft col-lg-2 col-sm-3">
              <i className="topIcon fab fa-facebook-square"></i>
              <i className="topIcon fab fa-instagram-square"></i>
              <i className="topIcon fab fa-pinterest-square"></i>
              <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter col-lg-8 col-sm-6 col-12">
              <ul className="topList">
                <li className="topListItem">
                  <Link to="/" className="link">HOME</Link></li>
                <li className="topListItem">
                  <Link to="/write" className="link">WRITE</Link></li>
                <li className="topListItem">
                  {
                      user?
                        <Link to="/profile" className="link">PROFILE</Link>:
                        <Link to="/" className="link">SETTING</Link>
                  }
                </li>
                <li className="topListItem" onClick={handleLogout}>
                    {
                      user&&"LOGOUT"
                    }
                  </li>
              </ul>
            </div>
            <div className="topRight col-lg-2 col-sm-3">
            {user ? (
            <Link className="link" to="/profile">
              <img
                className="topImg"
                src={user.profilePicture?pf+user.profilePicture:
                  "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"}
                alt=""
              />
            </Link>
                ) : (
                  <ul className="topList">
                    <li className="topListItem" style={{marginRight:0}}>
                      <Link className="link" to="/login">
                        LOGIN
                      </Link>
                    </li>
                  </ul>
                )}
              
            </div>
            </div>
          </div>  
        </div>   
  )
}
