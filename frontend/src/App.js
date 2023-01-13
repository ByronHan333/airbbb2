import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import ListingIndexPage from "./components/ListingIndexPage"
// import CreateListing from "./components/CreateListing"
import OwnedListing from "./components/OwnedListing"
import ListingIndividualPage from "./components/ListingIndividualPage"
import TripIndexPage from './components/TripIndexPage'
import TripEditPage from './components/TripEditPage'
import ReviewNewPage from './components/Reviews/ReviewNewPage'
import Map from "./components/Map";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <ListingIndexPage />
        </Route>
        <Route exact path="/listings/:listingId">
          <ListingIndividualPage />
        </Route>
        <Route exact path="/listings">
          <OwnedListing />
        </Route>
        <Route exact path="/trips">
          <TripIndexPage />
        </Route>
        <Route exact path="/trips/:tripId/edit">
          <TripEditPage />
        </Route>
        <Route exact path="/reviews">
          {/* <TripIndexPage /> */}
        </Route>
        <Route exact path="/reviews/new">
          <ReviewNewPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      {/* <Footer /> sticky */}
    </>
  );
}

export default App;
