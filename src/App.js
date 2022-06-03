import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import CoinCard from "./components/CoinCard";
import CreateComment from "./components/CreateComment";
import RenderComments from "./components/RenderComments";
import Login from "./components/Login";
import About from "./components/About";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.path = "/login";
    });
  };

  return (
    <Router>
      <nav className="navbar bg-dark">
        <div className="navbar-brand text-white ms-3">Crypto Info</div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="btn btn-sm btn-outline-secondary mx-2">
              Home
            </Link>
          </li>
        </ul>
        <Link to="/about" className="btn btn-sm btn-outline-secondary mx-2">
          About
        </Link>
        <Link
          to="/commentlist"
          className="btn btn-sm btn-outline-secondary mx-2"
        >
          Comments Page
        </Link>
        {!isAuth ? (
          <Link className="btn btn-sm btn-success mx-2" to="/Login">
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/comment"
              className="btn btn-sm btn-outline-secondary mx-2"
            >
              Post Comment
            </Link>
            <button
              onClick={signOutUser}
              className="btn btn-sm btn-success mx-2"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/coincard/:id" component={CoinCard} />
        <Route exact path="/commentlist">
          <RenderComments isAuth={isAuth} />
        </Route>
        <Route exact path="/comment">
          <CreateComment isAuth={isAuth} />
        </Route>
        <Route exact path="/login">
          <Login setIsAuth={setIsAuth} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
