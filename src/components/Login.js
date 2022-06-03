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
    <div>
      <p>Sign In With Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
}

export default Login;
