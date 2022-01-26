import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProfile from "../Profile/CardProfile";
import Posts from "../Posts/Posts";
import Topbar from "../Topbar/Topbar";
import axios from "axios";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(
      `http://localhost:5000/post/userPosts/${userId}`
    );
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
    <div className="container-fluid p-0 m-0">
      <Topbar />
      {isLogged ? (
        <div className="row bg-dark p-0 m-0 mainContainer">
          <CardProfile />
          <div
            className="
          col-md-6
          m-auto
          d-flex
          flex-column
          shadow-3
        "
          >
            {posts.length >= 1 ? (
              <Posts posts={posts} onDelete={updatePosts} />
            ) : (
              <div className="d-flex bg-dark p-0 m-0 mainContainer">
                <div className="m-auto d-flex justify-content-center flex-column">
                  <h1 className="text-danger">
                    Aucun posts, retourner sur la page d'accueil pour poster{" "}
                  </h1>
                  <button className="btn btn-success mt-3">
                    <Link to="/homepage" className="nav-link text-white">
                      Homepage
                    </Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="d-flex bg-dark p-0 m-0 mainContainer">
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
      <footer className="bg-success text-center text-white">
        <div className="text-center p-3">Propriété de Groupomania</div>
      </footer>
    </div>
  );
}
