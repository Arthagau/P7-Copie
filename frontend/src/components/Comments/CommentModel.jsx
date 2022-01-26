import React, { useState, useEffect } from "react";
import moment from "moment";
import Axios from "axios";

export default function CommentModel({ comment, onDelete }) {
  const [checkedUser, setCheckedUser] = useState(false);

  /* ----- Identification de l'utilisateur ----- */
  useEffect(() => {
    checkUser();
    return () => {};
  }, [checkedUser]);

  function checkUser() {
    if (
      localStorage.getItem("isAdmin") === "true" ||
      localStorage.getItem("UserName") === comment.user.firstName
    ) {
      setCheckedUser(true);
    } else {
      setCheckedUser(false);
    }
  }

  /* ----- Suppression de commentaire ----- */
  const deleteComment = (e) => {
    if (confirm("Supprimer le commentaire ?")) {
      e.preventDefault();
      Axios.delete(`http://localhost:5000/comment/${comment.id}`, {
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

  return (
    <div className="d-flex justify-content-center row">
      <div className="col-md-12 mt-3">
        <div className="d-flex flex-column comment-section">
          <div className="bg-white p-2">
            <div className="d-flex flex-row user-info position-relative">
              <img
                className=" rounded-circle profilePicture col-md-2"
                src={require("../../images/image-utilisateur-base.jpg")}
              />
              <div className="d-flex flex-column justify-content-start ml-2">
                <span className="d-block font-weight-bold name">
                  {comment.user.firstName}
                </span>
                <div className="d-flex flex-direction-row justify-content-between">
                  <span className="date text-black-50 pt-3">
                    {" "}
                    posté le {moment(comment.createdAt).format(
                      "DD/MM/YYYY"
                    )} à {moment(comment.createdAt).format("HH:mm:ss")}
                  </span>
                </div>
              </div>
              {checkedUser ? (
                <div className="trash position-absolute top-0 end-0">
                  <button onClick={deleteComment} className="btn btn-danger">
                    <i
                      className="bi bi-trash text-light"
                      alt="Supprimer commentaire"
                    ></i>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="mt-2">
              <p className="border-top border-secondary pt-2">
                {comment.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
