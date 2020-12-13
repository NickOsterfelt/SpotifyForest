import React, { useEffect } from "react";
import queryString from "querystring"
// import axios from "axios"
// const REDIRECT_URL = "http://localhost:3000/home";

function LoginCallback({handleLogin, ...props}) {
    let values = queryString.parse(props.location.search);
    useEffect(function () {

        localStorage.setItem("_jwt", values["?jwt"]);
        handleLogin();
        window.location.assign("http://localhost:3000/")
    }, [values, handleLogin]);
    return <div>Loading...</div>;
}

export default LoginCallback;