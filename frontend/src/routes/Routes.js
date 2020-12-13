import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

import Login from "./Login";
import LoginCallback from "./LoginCallback"
import HomeAnon from "./HomeAnon";
import Home from "./Home";
import Groups from "./Groups";
import FindGroup from "./FindGroups";
import CreateGroup from "./CreateGroup"

function Routes({ loggedIn, handleLogin, handleLogout }) {

    function renderLoginCallback(props) {
        return <LoginCallback {...props} handleLogin={handleLogin} />
    }
    function renderLogout() {
        handleLogout();
        return <Redirect to="/" />
    }
    function renderCreateGroup(props) {
        return <CreateGroup {...props} /> 
    }
    if (loggedIn) {
        return (
            <div className="">
                <NavBar />
                <Switch>
                    <Route exact path="/"> <Home /> </Route>
                    <Route exact path="/groups"><Groups /></Route>
                    <Route exact path="/newgroup" render={renderCreateGroup} />
                    <Route exact path="/findgroup"> <FindGroup /> </Route>
                    <Route exact path="/logout" render={renderLogout}/>
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
    else {
        return (
            <Switch>
                <Route exact path="/"><HomeAnon /></Route>
                <Route exact path="/login"><Login /></Route>
                <Route path="/loginCallback" render={renderLoginCallback} />
                <Redirect to="/" />
            </Switch>
        );
    }

}

export default Routes;