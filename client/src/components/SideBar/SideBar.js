import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
function SideBar() {
  const [articles, setArticles] = useState({ _id: "", title: "", author: "" });

  const url = "http://localhost:5000/articles";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((articles) => {
        setArticles({
          _id: articles._id,
          title: articles.title,
          author: articles.author,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h3>Latest Articles</h3>
      {articles.map((article) => {
        const { _id, title, author } = article;
        return (
          <div>
            <h4>{title}</h4>
            <h5>{author}</h5>
            <p>
              <Link className="link" to={`/${_id}`}>
                read
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
