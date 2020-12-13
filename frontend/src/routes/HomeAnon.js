import React from "react";
import "../static/HomeAnon.css";

function HomeAnon(props) {

    return (
        <div className="home-anon">
            <div className=" container pt-5">
                <div className="row justify-content-center mt-5">
                    <div className="col-6 mt-5 align-middle">
                        <div className="jumbotron mt-5 bg-dark text-light">
                            <div id="login">
                                <h1>Welcome to Musical Forest!</h1>
                                <p className="mt-3">To get started, <a href="/login" className="btn btn-success">Log in with Spotify</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAnon;