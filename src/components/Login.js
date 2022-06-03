import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

function Login({ setIsAuth }) {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/";
    });
  };
  return (
    <div className="container-fluid p-3">
      <h5 className="fw-bold mb-3">Sign In With Google to Continue</h5>
      <button className="btn btn-small btn-success" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
