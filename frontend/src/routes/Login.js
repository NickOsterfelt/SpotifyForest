import React, { useEffect } from "react";
// import {Redirect} from "react-router-dom";
// import axios from "axios"
// const REDIRECT_URL = "http://localhost:3000/home";

function Login() {
    useEffect(function() {
        window.location.assign("http://localhost:3001/login")
    }, []);
    return <div>Loading...</div>;
}

export default Login;