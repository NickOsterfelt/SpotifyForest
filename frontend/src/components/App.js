import React, { useEffect, useState } from "react";
import '../static/App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from "../routes/Routes";

/**
 * App.js is the main app component that encloses routes
 * in a react router to provide frontend routing.
 *  
 * It also keeps track of whether the user is logged in
 * and how the logging out should be handled.
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  //if token exists, the user is logged in
  useEffect(() => {
    if(localStorage.getItem("_jwt")) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  }, [loggedIn, setLoggedIn]);

  //to logout, clear local storage and change logout state 
  //which affects what routes are available.
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes 
          loggedIn={loggedIn} 
          handleLogin={setLoggedIn.bind(true)} 
          handleLogout={handleLogout} 
        />
      </BrowserRouter>
    </div>
  );
}

export default App;