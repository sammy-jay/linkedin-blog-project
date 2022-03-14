import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import About from "./components/About/About";
import Articles from "./components/Articles/Articles";
import Article from "./components/Articles/Article/Article";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <h1>Articles</h1>
            <div className="home-div">
              <div className="articles-list">
                <Articles />
              </div>
              <div className="sidebar">
                <SideBar />
              </div>
            </div>
          </Route>
          <Route path="/:id" children={<Article />}></Route>
          <Route path="/about" component={<About />}></Route>
        </Switch>
      </Router>
    </>
  );
}

{
  /* */
}

export default App;
