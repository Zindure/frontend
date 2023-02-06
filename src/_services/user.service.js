import config from 'config';
import {authHeader, router} from '../_helpers';
//import {post} from "./api";
const base = 'http://localhost:3000';

export const userService = {
    login,
    logout,
    register,
    getLocations,
    deleteLocation
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${base}/users/login`, requestOptions).then(handleResponse);

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    let username = user.username;
    let password = user.password;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${base}/users/register`, requestOptions).then(handleResponse);
}

export function getLocations(jwt) {
    const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { Authorization: 'Bearer ' + jwt, "Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS" ,"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With" },
    };
    return fetch(`${base}/locations?offset=0&limit=100`, requestOptions).then(handleResponse);

}

export function deleteLocation(id){
    let jwt = localStorage.getItem('jwt_token');
    const requestOptions = {
        method: 'DELETE',
        mode:'cors',
        headers: { Authorization: 'Bearer ' + jwt, "Content-Typer": "application/json" },
    };
    return fetch(`${base}/locations/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        if (response.method === "OPTIONS"){

        }
        if (response.status === 200){
            const data = text && JSON.parse(text);
            if (!response.ok) {
                /*if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }*/
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            if (data.jwt){
                //alert(data.jwt);
                localStorage.setItem('jwt_token', data.jwt);
                //router.push('/locations');
            }
            return Promise.resolve(data);
        }
/*        if (response.status === 201){
            router.push('/login');
        }*/
    });
}