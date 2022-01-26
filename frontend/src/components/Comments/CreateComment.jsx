import React, { useState } from "react";
import Axios from "axios";

export default function CreateComment(post) {
  const postId = post.id;
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

  const commentHandler = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/comment/`, data, {
      headers: {
        authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(data);
        console.log(err);
      });
  };

  return (
    <div>
      <form method="post" onSubmit={commentHandler}>
        <div className="form-group">
          <p className="lead">Ajouter un commentaire </p>
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
        </div>
      </form>
    </div>
  );
}
