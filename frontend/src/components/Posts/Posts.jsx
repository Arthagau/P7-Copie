import React from "react";
import PostModel from "./PostModel";

export default function Posts({ posts, onDelete }) {
  return (
    <div className="row d-flex justify-content-center mb-5 mt-5">
      <div
        className=" col-sm-12 d-flex
          flex-column
          justify-content-around posts"
      >
        {posts.map((post) => (
          <PostModel post={post} key={post.id} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
