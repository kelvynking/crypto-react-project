import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

function RenderComments({ isAuth }) {
  const [commentCollection, setCommentCollection] = useState([]);
  const commentsColRef = collection(db, "comments");

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getDocs(commentsColRef);
      setCommentCollection(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    const commentDoc = doc(db, "posts", id);
    await deleteDoc(commentDoc);
  };
  return (
    <div className="renderComments">
      {commentCollection.map((comment) => {
        <div className="container-fluid p-3">
          <div className="card" key={comment.id}>
            <div className="card-header d-flex flex-row justify-content-between">
              <div>{comment.title}</div>
              <div>
                {isAuth && comment.author.id === auth.currentUser.uid && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="card-body text-center">
              <blockquote className="blockquote mb-0">
                <p>{comment.comment}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{comment.author.name}</cite>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* <div className="comment" key={comment.id}>
              <div className="commentHeader">
                <div className="title">
                  <h1>{comment.title}</h1>
                </div>
                <div className="deleteComment">
                  {isAuth && comment.author.id === auth.currentUser.id && (
                    <button
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
              <div className="commentTextContainer"> {comment.comment}</div>
              <h3>@{comment.author.name}</h3>
            </div> */}
        </div>;
      })}
    </div>
  );
}

export default RenderComments;
