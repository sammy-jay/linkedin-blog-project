import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Articles.css";

function Articles() {
  const url = "http://localhost:5000/articles";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</h1>
      ) : (
        articles.map((article) => {
          let { _id, title, author, date, content, upvotes } = article;
          content = `${content.slice(0, 300)}...`;
          return (
            <div key={_id} className="articles-cont">
              <h2>{title}</h2>

              <h4>{date}</h4>
              <p>{content}</p>
              <div>
                <p>Upvotes {upvotes}</p>
                <p>
                  <Link className="link" to={`/${_id}`}>
                    continue reading
                  </Link>
                </p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default Articles;
