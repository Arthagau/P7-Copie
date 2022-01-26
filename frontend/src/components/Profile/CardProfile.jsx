import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CardProfile() {
  const userName = localStorage.getItem("UserName");
  const userId = localStorage.getItem("UserId");

  let navigate = useNavigate();

  const deleteUser = (e) => {
    if (
      confirm("Supprimer votre compte et tous les posts liés à ce profil ?")
    ) {
      e.preventDefault();
      Axios.delete(`http://localhost:5000/auth/${userId}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => {
          localStorage.clear();
          navigate("/signup");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  return (
    <div className="profile col-md-3 bg-secondary">
      <div className="card mt-3">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={require("../../images/image-utilisateur-base.jpg")}
              className=" rounded-circle imageProfileCard col-md-2 pt-1"
              alt="Image Utilisateur"
            />
            <div className="mt-3 d-flex flex-column justify-content-between">
              <h4 className="text-dark">{userName}</h4>
              <button className="btn btn-outline-primary">
                Editer mon profil
              </button>
              <button className="btn btn-outline-warning" onClick={deleteUser}>
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <h5>Description</h5>
            <p>Description de l'Utilisateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}
