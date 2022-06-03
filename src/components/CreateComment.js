import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useHistory } from "react-router-dom";

function CreateComment({ isAuth }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const commentsColRef = collection(db, "comments");
  const history = useHistory();

  const createComment = async () => {
    await addDoc(commentsColRef, {
      title,
      comment,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    history.replace("/");
  };

  useEffect(() => {
    if (!isAuth) {
      history.replace("/login");
    }
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="form">
        <h5 className="mb-3">Create A Comment</h5>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            className="form-control"
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputDivs">
          <label className="form-label">Comment:</label>
          <textarea
            className="form-control"
            placeholder="Enter Text Here..."
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </div>
        <button
          className="mt-3 btn btn-small btn-success"
          onClick={createComment}
        >
          {" "}
          Submit Comment
        </button>
      </div>
    </div>
  );
}

export default CreateComment;
