import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import ListingIndexPage from "./components/ListingIndexPage"
// import CreateListing from "./components/CreateListing"
import OwnedListing from "./components/OwnedListing"
import Map from "./components/Map";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <ListingIndexPage />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
        <Route exact path="/listings">
          <OwnedListing />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
