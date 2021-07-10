import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Pages

const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
// Listings
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
const Listingdetailsone = React.lazy(() => import("./components/pages/Listingdetailsone"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));

const Profilelistings = React.lazy(() => import("./components/pages/Profilelistings"));



function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
         
          <Route exact path="/" component={Listinggrid} />
        
          <Route path="/error-404" component={Error} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Login} />
          {/* Listings */}
        
          <Route path="/listing-details/:id" exact   component={Listingdetailsone} />
          <Route path="/submit-listing" component={Submitlisting} />
          <Route path="/profile" component={Profilelistings} />
         
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
