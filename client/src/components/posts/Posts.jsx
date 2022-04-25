import Post from "../post/Post";
import "./posts.css";
import { Link } from "react-router-dom";


export default function Posts({data}) {
  var indents = [];
  for (var i = 1; i <= data.totalPage; i++) {
    if(i===data.currentPage){
      indents.push(
      <li className="page-item" active>
         <Link to={`/${i}`} className="page-link">
          {i}
        </Link>
      </li>);
    }
    else{
      indents.push(
      <li className="page-item">
        <Link to={`/${i}`} className="page-link">
          {i}
        </Link>
      </li>);
    }
  }
  return (
    <div className="posts row mt-4 col-lg-9">
      {data.posts.map(p=>(
        <Post post={p}/>
      ))}
      <div className="pagi">
        <nav aria-label="...">
          <ul className="pagination pagi">
           {indents}
          </ul>
        </nav>
      </div>
    </div>
  );
}
