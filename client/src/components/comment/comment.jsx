import "./comment.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Comment({ commentB, postId }) {
  const pf = "http://localhost:4000/images/";
  const [comment, setComment] = useState(commentB);
  const [desc, setDesc] = useState(commentB.desc);
  const [like, setLike] = useState();
  const [userComment, setUserComment] = useState({});
  const { user } = useContext(Context);
  const [isComment, setIsComment] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const commentRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios
          .post(`http://localhost:4000/api/comment/comment/${comment._id}`, {
            userId: user._id,
            userName: user.userName,
            desc: commentRef.current.value,
          })
          .then(() => fetchComment(comment._id))
          .then(() => {
            commentRef.current.value = "";
          });
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };

  const fetchUser = async (userId) => {
    axios
      .get(`http://localhost:4000/api/user/${userId}`, {
        headers: {
          accept: "application/json",
          "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      })
      .then((res) => {
        setUserComment(res.data.user);
      });
  };

  useEffect(() => {
    fetchUser(comment.userId);
  }, []);

  const handleDelete = async (e) => {
    axios
      .delete(`http://localhost:4000/api/comment/${comment._id}`, {
        headers: {
          accept: "application/json",
          "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      })
      .then(window.location.replace(`/post/${postId}?delete=true`));
  };

  const fetchComment = async (id) => {
    axios
      .get(`http://localhost:4000/api/comment/${id}`, {
        headers: {
          accept: "application/json",
          "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      })
      .then((res) => {
        setComment(res.data);
      });
  };

  const handleLike = async () => {
    await axios
      .put(`http://localhost:4000/api/comment/like/${commentB._id}`, {
        userId: user._id,
      })
      .then((res) => {
        setLike(res.data.notice.like);
      });
  };

  const handleUpdate = async (e) => {
    axios
      .put(`http://localhost:4000/api/comment/edit/${comment._id}`, {
        desc,
      })
      .then(setIsUpdate(false));
  };
  const handleComment = async () => {
    fetchComment(comment._id);
  };
  return (
    <>
      <div className="be-comment">
        <div className="be-img-comment">
          <img
            src={
              userComment?.profilePicture
                ? pf + userComment.profilePicture
                : "https://bootdey.com/img/Content/avatar/avatar1.png"
            }
            alt=""
            className="be-ava-comment"
          />
        </div>
        <div className="be-comment-content">
          <span className="be-comment-name">
            <Link to={`/?userId=${userComment.userId}`} className="link">
              {userComment.username}
            </Link>
          </span>
          <span className="be-comment-time">
            <i className="fa fa-clock-o"></i>
            {new Date(comment.createdAt).toDateString()}
          </span>
          {isUpdate ? (
            <textarea
              className="singleCommentDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="be-comment-text">{desc}</p>
          )}
          <div className="icon">
            {!isUpdate ? (
              <>
                <div className="col-8">
                  <i
                    className="singlePostIcon fas fa-thumbs-up like"
                    onClick={handleLike}
                  >
                    <span className="number">{like ? like : 0}</span>
                  </i>
                  <i
                    className="fas fa-comment singlePostIcon"
                    onClick={handleComment}
                  >
                    <span className="number">View</span>
                  </i>
                  <i
                    className="fas fa-comment singlePostIcon"
                    onClick={() => setIsComment(!isComment)}
                  >
                    <span className="number">Comment</span>
                  </i>
                </div>
                <div className="icon-User col-4">
                  {comment.userId === user?._id ? (
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setIsUpdate(true)}
                    ></i>
                  ) : (
                    <div></div>
                  )}
                  {comment.userId === user?._id ? (
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            ) : (
              <button className="singlePostButton mb-4" onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        </div>
        {comment.comments?.length > 0 && (
          <div className="replies">
            {comment.comments.map((reply) => (
              <Comment commentB={reply} postId={postId} />
            ))}
          </div>
        )}
        {isComment && (
          <div className="panel">
            <div className="panel-body">
              <textarea
                className="form-control"
                rows="2"
                placeholder="What are you thinking?"
                ref={commentRef}
              ></textarea>
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-primary pull-right"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <i className="fas fa-pencil-alt"></i> Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
