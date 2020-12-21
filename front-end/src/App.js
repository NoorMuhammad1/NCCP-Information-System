import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/index";
import AdminHomePage from "./containers/Dashboard/adminDashboard";
import Signup from "./containers/Signup/index";
import Signin from "./containers/SignIn/index";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  });
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/admin/" component={AdminHomePage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
