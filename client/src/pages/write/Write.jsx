import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchcategory = async () => {
      axios
        .get(`http://localhost:4000/api/category`, {
          headers: {
            accept: "application/json",
            "x-access-token": `${JSON.parse(localStorage.getItem("jwt"))}`,
          },
        })
        .then((res) => {
          setCategory(res.data);
        });
    };
    fetchcategory();
  }, []);

  const handleClick = async (e) => {
    setCategories([...categories, e.target.getAttribute("value")]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id.toString(),
      username: user.username,
      category: categories,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {}
    }
    try {
      axios
        .post("http://localhost:4000/api/post/create", newPost)
        .then((res) => {
          window.location.replace("/post/" + res.data.data._id);
        });
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        <div className="listCate">
          {category.map((cate) => (
            <div
              className="buttonCates"
              value={cate.cateName}
              onClick={handleClick}
            >
              {cate.cateName}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
