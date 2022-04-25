import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import Comments from "../comments/Comments";

export default function SinglePost() {
  const pf = "http://localhost:4000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updates, setUpdates] = useState(false);
  const [like, setLike] = useState();
  const { user } = useContext(Context);
  const { search } = useLocation();
  const ExampleContext = React.createContext();
  const fetchPost = async () => {
    axios.get(`http://localhost:4000/api/post/${path}`).then((res) => {
      setPost(res.data.data);
      setTitle(res.data.data.title);
      setDesc(res.data.data.desc);
      setLike(res.data.data.likes.length);
    });
  };
  useEffect(() => {
    fetchPost();
  }, [search]);
  const handleDelete = async (e) => {
    axios
      .delete(`http://localhost:4000/api/post/${path}`, {
        headers: {
          accept: "application/json",
          "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      })
      .then(window.location.replace("/"));
  };
  const handleUpdate = async (e) => {
    axios
      .put(`http://localhost:4000/api/post/${path}`, {
        title,
        desc,
      })
      .then(setUpdates(false));
  };

  const handleLike = async (e) => {
    await axios
      .put(`http://localhost:4000/api/post/like/${post._id}`, {
        userId: user._id,
      })
      .then((res) => {
        setLike(res.data.status.like);
      });
  };
  const data = {
    comments: post.comments,
    postId: post._id,
  };
  return (
    <>
      <ExampleContext.Provider value={{ postId: path }}>
        <div className="singlePost">
          <div className="singlePostWrapper">
            {post.img && (
              <img src={pf + post.img} className="singlePostImg" alt="" />
            )}
            {updates ? (
              <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            ) : (
              <h1 className="singlePostTitle">
                {title}
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon fas fa-thumbs-up"
                    onClick={handleLike}
                  >
                    <span className="number">{like ? like : 0}</span>
                  </i>
                  {post.userId === user?._id ? (
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdates(true)}
                    ></i>
                  ) : (
                    <div></div>
                  )}
                  {post.userId === user?._id ? (
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  ) : (
                    <div></div>
                  )}
                </div>
              </h1>
            )}
            <div className="singlePostInfo">
              <span>
                Author:
                <Link to={`/?userId=${post.userId}`} className="link">
                  <b className="singlePostAuthor">{post.username}</b>
                </Link>
              </span>
              <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updates ? (
              <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            ) : (
              <p className="singlePostDesc">{desc}</p>
            )}
            {updates ? (
              <button className="singlePostButton" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <Comments data={data} />
            )}
          </div>
        </div>
      </ExampleContext.Provider>
    </>
  );
}
