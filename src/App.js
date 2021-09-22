import React, { useState, useEffect } from "react";

import Header from "./components/fragments/Header";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routes from "./configs/routes";
import localStorageService from "./configs/localStorageService";
import * as loginAction from "./actions/login.action";
import * as adminAction from "./actions/admin.action";

export default function App() {
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const dispatch = useDispatch();
  // const role = localStorageService.getRole();
  const [role, setRole] = useState(localStorageService.getRole())
  const allowedRoutes = routes[role].allowedRoutes;
  const redirectRoutes = routes[role].redirectRoutes;
  useEffect(() => {
    if (role === "user") {
      dispatch(loginAction.reLogin());
    } else if (role === "admin") {
      dispatch(adminAction.reLogin());
    }
    // console.log(role)
  }, []);

  return (
    <div >
      <Router>
        {loginReducer.result && <Header />}
        <Switch>
          {allowedRoutes.map((route) => (
            <Route
              exact
              key={route.url}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect to={redirectRoutes} />
        </Switch>
      </Router>
    </div>
  );
}
