import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./commentForm.css";

export default function CommentForm({ commentId }) {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const commentRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const res = await axios
          .post(`http://localhost:4000/api/comment/comment/${commentId}`, {
            userId: user._id,
            userName: user.userName,
            desc: commentRef.current.value,
          })
          .then(() => {
            commentRef.current.value = "";
          });
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };

  return (
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
  );
}
