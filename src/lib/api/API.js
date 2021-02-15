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
    }
};
export default API;
