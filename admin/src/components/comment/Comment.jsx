import "./comment.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Comment({commentId}) {
    const pf = "http://localhost:4000/images/"
    const [comment,setComment] = useState({});
    const [like,setLike] = useState();
    const [userComment,setUserComment] = useState({});

    const fetchUser = async(userId) =>{
            axios.get(`http://localhost:4000/api/user/${userId}`)
            .then(res => {
                setUserComment(res.data.user);
            });     
        }  

    useEffect (() => {
        const fetchComment = async() =>{
            axios.get(`http://localhost:4000/api/comment/${commentId}`)
            .then(res => {
                setComment(res.data);
                fetchUser(res.data.userId);
                setLike(res.data.likes.length);
            });     
        }   
        fetchComment();
        
    },[])
    
    return (
   <>
   <div className="be-comment">
		<div className="be-img-comment">	  
				<img 
                src={userComment?.profilePicture?pf+userComment.profilePicture:
                "https://bootdey.com/img/Content/avatar/avatar1.png"}
                alt="" 
                className="be-ava-comment"/>
		</div>
		<div className="be-comment-content">
				<span className="be-comment-name">
                        {userComment.username}
				</span>
				<span className="be-comment-time">
					<i className="fa fa-clock-o"></i>
					{new Date(comment.createdAt).toDateString()}
				</span>
			<p className="be-comment-text">
				{comment.desc}
			</p>
                <i className="singlePostIcon fas fa-thumbs-up" >
                  <span className="number">{like?like: 0}</span>
                </i>
		</div>
	</div>
   </>
    )
}
