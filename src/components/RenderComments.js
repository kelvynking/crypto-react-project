import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

function RenderComments({ isAuth }) {
  const [commentCollection, setCommentCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsColRef = collection(db, "comments");

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getDocs(commentsColRef);
      setCommentCollection(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIsLoading(false);
    };
    fetchComments();
  }, []);

  if (isLoading) {
    return (
      <div className="container-fluid p-3">
        <p>Loading ...</p>
      </div>
    );
  }

  const deleteComment = async (id) => {
    const commentDoc = doc(db, "comments", id);
    console.log(commentDoc);
    await deleteDoc(commentDoc);
    window.location.reload(false);
  };

  return (
    <div className="container-fluid p-3">
      {commentCollection.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="card mb-3">
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
          </div>
        );
      })}
    </div>
  );
}

export default RenderComments;
