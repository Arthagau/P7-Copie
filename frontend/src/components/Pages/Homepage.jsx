import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Topbar from "../Topbar/Topbar";

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/post/");
    setPosts(res.data);
  };

  const updatePosts = async () => {
    await fetchPosts();
  };

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkUser();
    return () => {};
  }, [isLogged]);

  function checkUser() {
    if (localStorage.getItem("UserName")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  return (
    <div>
      <div className="row vh-100 m-0 p-0">
        <Topbar />
        <div className="row bg-dark justify-content-between m-0 p-0 mainContainer">
          <div className="homepage-sides p-0 col-md-1 bg-secondary"></div>
          <div
            className="
          col-md-6
          col-sm-12
          h-100
          d-flex
          flex-column
          justify-content-around
          shadow-3
        "
          >
            {isLogged ? (
              <CreatePost onUpdate={updatePosts} />
            ) : (
              <div className="d-flex bg-dark p-0 mt-5 ">
                <div className="m-auto d-flex justify-content-center flex-column">
                  <h1 className="text-danger">Vous n'êtes pas connecté</h1>
                  <button className="btn btn-success mt-3">
                    <Link to="/login" className="nav-link text-white">
                      Se connecter
                    </Link>
                  </button>
                </div>
              </div>
            )}
            {isLogged && posts.length >= 1 ? (
              <Posts posts={posts} onDelete={updatePosts} />
            ) : (
              <div className="d-flex bg-dark p-0 m-0 mainContainer">
                <div className="m-auto d-flex justify-content-center flex-column">
                  <h1 className="text-danger">
                    Aucun post trouvé, vérifiez que vous êtes bien connecté et
                    postez un message !
                  </h1>
                </div>
              </div>
            )}
          </div>
          <div className="homepage-sides p-0 col-md-1 bg-secondary"></div>
        </div>
        <footer className="bg-success text-center text-white w-100">
          <div className="text-center p-3">Propriété de Groupomania</div>
        </footer>
      </div>
    </div>
  );
}
