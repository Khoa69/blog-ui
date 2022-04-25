import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import Comment from "../comment/comment";
import "./comments.css";

export default function Comments({ data }) {
  const { user } = useContext(Context);
  const commentRef = useRef();
  const [post, setPost] = useState({});

  const fetchPost = async (id) => {
    axios
      .get(`http://localhost:4000/api/post/${id}`)
      .then((res) => {
        setPost(res.data.data);
      })
      .then(() => {
        commentRef.current.value = "";
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios
          .post(`http://localhost:4000/api/comment/post/${data.postId}`, {
            userId: user._id,
            userName: user.userName,
            desc: commentRef.current.value,
          })
          .then(() => fetchPost(data.postId));
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };

  return (
    <div className="container">
      <div className="be-comment-block">
        <h1 className="comments-title">Comments</h1>
        {post?.comments ? (
          post.comments.map((comment) => {
            return <Comment commentB={comment} postId={data.postId} />;
          })
        ) : data?.comments ? (
          data.comments.map((comment) => {
            return <Comment commentB={comment} postId={data.postId} />;
          })
        ) : (
          <></>
        )}
      </div>
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
    </div>
  );
}
