//MODIFIED CODE FROM SPOTIFY "web-api-auth-example".
const express = require("express");
const querystring = require('querystring');
const router = new express.Router();
const request = require('request'); // "Request" library
const stateKey = 'spotify_auth_state';
const createToken = require("../helpers/createToken")
const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} = require("../config.js");

const redirect_uri = 'http://localhost:3001/login/callback';

//State parameter is created with a random string.
//The state parameter is used to prevent Cross-Site-Forgery attacks
let generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// GET '/login' generates random state, sends redirect with client keys, state, and redirect url
// to spotify login portal.
router.get('/', function(req, res){
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played';
  
  res.redirect("https://accounts.spotify.com/authorize?" + querystring.stringify({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
});

//After successful login, get the current user's data that logged in, and then redirect back to the frontend with JWT holding data
router.get('/callback', async function(req, res){
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  //If state mismatches, redirect to spotify portal handler
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_SECRET).toString('base64'))
      },
      json: true
    };

    //Get current user's data based on parameters access tokens
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
              refresh_token = body.refresh_token;
        //Create jwt with access and refresh token
        const jwt = createToken({access_token, refresh_token})
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
      
        // pass data back to frontend browser window / react server
        res.redirect('http://localhost:3000/loginCallback?' +
          querystring.stringify({
            jwt : jwt
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

module.exports = router;

