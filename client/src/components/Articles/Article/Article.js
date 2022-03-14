import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Article.css";

function Article() {
  const { id } = useParams();
  const genUrl = `http://localhost:5000/articles/${id}`;
  const [article, setArticle] = useState({});
  const [addComment, setAddComment] = useState({ name: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setAddComment({ ...addComment, [prop]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/articles/`;
    if (addComment.name && addComment.comment) {
      const newComment = {
        id,
        reader: addComment.name,
        comment: addComment.comment,
      };
      axios
        .patch(url, newComment)
        .then((response) => response.data)
        .then((article) => {
          setAddComment({ name: "", comment: "" });
          axios
            .get(genUrl)
            .then((response) => response.data.comments)
            .then((comments) => {
              setArticle({ ...article, comments });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      console.log(addComment);
    }
  };
  useEffect(() => {
    axios
      .get(genUrl)
      .then((response) => response.data)
      .then((article) => {
        setArticle(article);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
          Loading Article...
        </h1>
      ) : (
        <div className="article-container">
          <h1>{article.title}</h1>
          <h5>{article.author}</h5>
          <h5>{article.date}</h5>
          <p className="content">{article.content}</p>
          <p className="upvotes">Upvotes: {article.upvotes}</p>
          <h2>Comments</h2>
          {article.comments &&
            article.comments.map((comment, index) => {
              return (
                <>
                  <div key={index} className="comment">
                    <h4>{comment.reader}</h4>
                    <p>{comment.comment}</p>
                  </div>
                </>
              );
            })}
          <h2>Add Comment</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="reader">Name: </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                onChange={handleChange}
                value={addComment.name}
              />
              <label htmlFor="comment">Comment: </label>
              <textarea
                onChange={handleChange}
                name="comment"
                value={addComment.comment}
                rows="5"
                autoComplete="off"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Article;
