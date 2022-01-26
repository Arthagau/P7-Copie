import React, { useState, useEffect } from "react";
import moment from "moment";
import Comments from "../Comments/Comments";
import Axios from "axios";

export default function PostModel({ post, onDelete }) {
  const postId = post.id;

  /* ----- Récupération des values pour poster un commentaire ----- */
  const [data, setData] = useState({
    comment: "",
    postId: postId,
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  /* ----- Récupération des commentaires pour chaque post ----- */
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await Axios.get(`http://localhost:5000/comment/all/${postId}`);
    setComments(res.data);
  };

  const updateComments = async () => {
    await fetchComments();
  };

  /* ----- Vérification de l'utilisateur ----- */
  const [checkedUser, setCheckedUser] = useState(false);

  useEffect(() => {
    checkUser();
    return () => {};
  }, [checkedUser]);

  function checkUser() {
    if (
      localStorage.getItem("isAdmin") === "true" ||
      localStorage.getItem("UserName") === post.poster
    ) {
      setCheckedUser(true);
    } else {
      setCheckedUser(false);
    }
  }

  /* ----- Fonction pour poster un commentaire ----- */
  const [errorMessage, setErrorMessage] = useState();

  const commentHandler = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/comment/`, data, {
      headers: {
        authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((res) => {
        setErrorMessage("");
        setData({ comment: "", postId: postId });
        updateComments();
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  };

  /* ----- Fonction pour supprimer un post ----- */
  const deletePost = (e) => {
    if (confirm("Supprimer le post ?")) {
      e.preventDefault();
      Axios.delete(`http://localhost:5000/post/${post.id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => {
          onDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  /* ----- Vérification pour savoir si l'utilisateur est connecté ou non ----- */
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    userLogged();
    return () => {};
  }, [isLogged]);

  function userLogged() {
    if (localStorage.getItem("UserName")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  return (
    <div className="card bg-white post m-3" key={post.id}>
      <div className="card-header d-flex">
        <img
          src={require("../../images/image-utilisateur-base.jpg")}
          className=" rounded-circle profilePicture col-md-2 pt-1"
          alt="Image Utilisateur"
        />
        <div
          className="
                col-md-10
                m-2
                d-flex
                flex-column
                align-items-left
                justify-content-start
              "
        >
          <h5>{post.poster}</h5>
          <span>
            {" "}
            posté le {moment(post.createdAt).format("DD/MM/YYYY")} a{" "}
            {moment(post.createdAt).format("HH:mm:ss")}
          </span>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        {checkedUser ? (
          <div className="trash position-absolute top-0 end-0">
            <button onClick={deletePost} className="btn btn-danger">
              <i className="bi bi-trash text-light" alt="Supprimer post"></i>
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {post.postImage && (
          <img
            src={post.postImage}
            alt="Image envoyée par l'Utilisateur"
            className="card-body-img"
          />
        )}
        <div className="d-flex justify-content-between mt-3">
          <p className="card-body-text postMessage">{post.postMessage}</p>
        </div>
      </div>
      <div className="card-footer">
        {isLogged ? (
          <div>
            <form method="post" onSubmit={commentHandler}>
              <div className="form-group">
                <label htmlFor="FormControlTextarea">
                  Ajouter un commentaire{" "}
                </label>
                <textarea
                  className="form-control mt-1"
                  id="comment"
                  name="comment"
                  value={data.comment}
                  rows="1"
                  onChange={(e) => handle(e)}
                ></textarea>
                <button type="submit" className="btn btn-primary mt-2">
                  Poster
                </button>
                {errorMessage && (
                  <div className="pt-2">
                    <span className="ErrorMessage text-danger">
                      {" "}
                      {errorMessage}{" "}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
        <h6 className="mt-3">Commentaires</h6>
        <Comments comments={comments} onDelete={updateComments} />
      </div>
    </div>
  );
}
