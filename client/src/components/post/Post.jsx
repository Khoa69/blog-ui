import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./post.css";

export default function Post({post}) {
  const pf = "http://localhost:4000/images/"
  const {user} =useContext(Context);
  const [like,setLike] = useState(post.likes.length);

   const handleLike=async(e)=>{
     axios.put(`http://localhost:4000/api/post/like/${post._id}`,{
       userId:user._id,
    }).then(
      res=>{
        setLike(res.data.status.like);
      }
    )    
  }
  return (
    <div className="post col-lg-4 col-md-6 col-sm-6 mt-4">
      {post.img &&(<img
        className="postImg"
        src={pf + post.img}
        alt=""
      />)}
      <div className="postInfo">
        <div className="postCats">
          {post.category.map(cate=>(
            <Link to={`/?cateName=${cate}`} className="link">
              <span className="postCat">
                  {cate}
              </span>
            </Link>
          )
          )}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">
              {post.title}
          </span>
        </Link>
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc justify-content-center">
        {post.desc}
      </p>
      <div className="d-flex justify-content-center">
          <div className="icon" >
            <i className="fas fa-comment"> 
              <span className="number">{post.comments?post.comments.length: 0}</span>
            </i>
          </div>
          <div className="icon" onClick={handleLike}>
              <i className="fas fa-thumbs-up">
                <span className="number">{like?like: 0}</span>
              </i>
          </div>
      </div>
    </div>
  );
}
