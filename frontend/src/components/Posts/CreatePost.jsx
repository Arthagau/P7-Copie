import React, { useState, useRef } from "react";
import { useLinkClickHandler } from "react-router-dom";
import Axios from "axios";

export default function CreatePost({ onUpdate }) {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  /* ----- Récupération du message et de l'image ----- */
  const onInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  /* ----- Permet de réinitialiser l'image choisi par l'utilisateur ----- */
  const ref = useRef();
  function handleClick() {
    ref.current.value = "";
    setSelectedImage(null);
  }

  /* ----- Fonction pour poster une publication ----- */
  const postHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("postImage", selectedImage);
    data.append("postMessage", inputMessage);
    if (
      data.get("postImage") === "undefined" &&
      data.get("postMessage") === "undefined"
    ) {
      console.log("Your post is empty, send a message or a picture to share !");
    } else {
      if (data.get("postMessage") === "undefined") {
        data.delete("postMessage");
        data.append("postMessage", " ");
      }
      Axios.post("http://localhost:5000/post", data, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => {
          setErrorMessage("");
          setInputMessage("");
          handleClick();
          onUpdate();
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
        });
    }
  };

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-10 col-lg-8 bg-white rounded">
        <h3 className="d-flex justify-content-center mt-3 pb-3">
          Partagez vos idées avec vos collègues
        </h3>
        <form method="post" onSubmit={postHandler}>
          {errorMessage && (
            <span className="ErrorMessage text-danger"> {errorMessage} </span>
          )}
          <textarea
            label="Entre votre message"
            className="w-100"
            name="postMessage"
            rows="4"
            placeholder="Ecrivez votre message"
            type="textarea"
            onChange={onInputChange}
            value={inputMessage}
          />
          <input
            className="mb-2"
            name="postImage"
            id="postImage"
            type="file"
            ref={ref}
            accept="image/"
            onChange={handleImage}
          />
          {selectedImage ? (
            <button
              type="button"
              className="btn btn-danger m-3"
              onClick={handleClick}
            >
              Supprimer image
            </button>
          ) : (
            <div></div>
          )}
          <button type="submit" className="btn btn-primary m-3">
            Partager
          </button>
        </form>
      </div>
    </div>
  );
}
