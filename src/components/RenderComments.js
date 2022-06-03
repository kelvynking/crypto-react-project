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
        return (
          <div className="comment" key={comment.id}>
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
          </div>
        );
      })}
    </div>
  );
}

export default RenderComments;
