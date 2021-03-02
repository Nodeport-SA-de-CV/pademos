/* Copyright (C) Nodeport SA de CV - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Darien Miranda <dmiranda@nodeport.co> & América Mendoza <america@nodeport.co>, February 2021
 */
const API = {
    API_URL: process.env.REACT_APP_API_URL,
    /*
     * Gets current logged in user
     */
    getMe() {
        return fetch(`${API.API_URL}/users/me`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    /*
     * Create user
     */
    createUser(name,last_name,email,password) {
        let params = {
            name:name,
            last_name:last_name,
            email: email,
            password: password,
        };
        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${API.API_URL}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    /*
     * login
     */
    login(email,password) {
        let params = {
            email: email,
            password: password,
        };
        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${API.API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getContributions() {
        return fetch(`${API.API_URL}/contributions`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
};
export default API;
