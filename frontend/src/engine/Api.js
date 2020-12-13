/**
 * engine/Api includes the functionality to communicate with the backend
 * server. Every single request to the backend server is made through the Api
 * class.
 * 
 * Logging in and refreshing tokens when needed have their own logic
 * while other routes for backend data share much of the same logic
 * in the request function.
 */

import axios from "axios";
const { BACKEND_API_URL } = require("../config")

axios.defaults.headers.common['Device'] = "device";
//Axios interceptor to refresh token if a 401 error occurs
axios.interceptors.response.use(response => {
    return response;
}, err => {
    //If error, retry request but use fetch this time (axios headers already set)
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        //if error is a 401, error has err.config (was a request) and request is not a retry.
        if (err.response && err.response.status === 401 && err.config && !err.config._retry) {
            originalReq._retry = true;

            let res = fetch('http://localhost:3001/users/refresh-token', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Device': 'device',
                    'refresh_token': localStorage.getItem("_jwt")
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    refresh_token: localStorage.getItem("_jwt")
                }),
            }).then(res => res.json()).then(res => {
                //replace old token with new token.
                localStorage.setItem("_jwt", res.newToken);
                originalReq.headers['Device'] = "device";
                return axios(originalReq);
            });
            resolve(res);
        }
        return Promise.reject(err);
    });
});

class Api {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        const _jwt = localStorage.getItem("_jwt");
        console.debug("API Call:", endpoint, paramsOrData, verb);

        try {
            let res = await axios({
                method: verb,
                url: `${BACKEND_API_URL}${endpoint}`,
                headers: { _jwt },
                [verb === "get" ? "params" : "data"]: paramsOrData
            })

            return res.data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }

        catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCurrentUserData() {
        let res = await this.request('/users/curr-user');
        return res.user;
    }
    static async getUser(id) {
        let res = await this.request(`/users/${id}`);
        return res.user;
    }
    static async getCurrUserTracks(id) {
        let res = await this.request(`/users/curr-user/tracks/${id}`)
        return res.tracks;
    }
    static async getCurrUserArtists(id) {
        let res = await this.request(`/users/curr-user/artists/${id}`);
        return res.artists;
    }
    static async getUserTracks(id) {
        let res = await this.request(`/users/tracks/${id}`)
        return res.tracks;
    }
    static async getUserArtists(id) {
        let res = await this.request(`/users/artists/${id}`);
        return res.artists;
    }
    static async getUserGroups(id) {
        let res = await this.request(`/users/${id}/groups`);
        return res.groups;
    }
    static async addUserToGroup(groupId, userId) {
        let res = await this.request(`/groups/join/${groupId}`, { userId }, "post");
        return res.msg;
    }
    static async removeUserFromGroup(groupId, userId) {
        let res = await this.request(`/groups/${groupId}`, { userId }, "post");
        return res.msg;
    }
    static async createGroup(data) {
        let res = await this.request(`/groups/new`, { data }, "post");
        return res.group;
    }
    static async getGroup(groupId) {
        let res = await this.request(`/groups/${groupId}`);
        return res.group;
    }
    static async searchGroupsByName(search) {
        let res = await this.request('/groups/search', { search }, "post");
        return res.groups;
    }
    static async searchGroupsByTracks(tracks) {
        let res = await this.request('/groups/search/tracks', { tracks }, "post");
        return res.groups;
    }
    static async searchGroupsByArtists(artists) {
        let res = await this.request(`/groups/search/artists`, { artists }, "post");
        return res.groups;
    }
}

export default Api;