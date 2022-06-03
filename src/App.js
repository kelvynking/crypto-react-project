import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import CoinCards from "./components/CoinCards";
import CoinCard from "./components/CoinCard";
import CreateComment from "./components/CreateComment";
import RenderComments from "./components/RenderComments";
import Login from "./components/Login";
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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/coincard/:id">Crypto</Link>
        <Link to="/commentlist">Comments Page</Link>
        {!isAuth ? (
          <Link to="/Login">Login</Link>
        ) : (
          <>
            <Link to="/comment">Post Comment</Link>
            <button onClick={signOutUser}>Logout</button>
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
      </Switch>
    </Router>
  );
}

export default App;
