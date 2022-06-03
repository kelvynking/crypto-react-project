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
      <div className="createCommentPage">
        <div className="ccContainer">
          <h1>Create A Comment</h1>
          <div className="inputDivs">
            <label>Title:</label>
            <input
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputDivs">
            <label>Comment:</label>
            <textarea
              placeholder="Enter Text Here..."
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </div>
          <button onClick={createComment}> Submit Comment</button>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
