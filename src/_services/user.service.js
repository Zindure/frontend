import config from 'config';
import {authHeader, router} from '../_helpers';
//import {post} from "./api";
const base = 'https://secure-web-dev-backend-mg2u.onrender.com';

export const userService = {
    login,
    logout,
    register,
    getLocations,
    deleteLocation,
    addLocation,
    editLocation
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
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
        headers: { Authorization: 'Bearer ' + jwt},
    };
    return fetch(`${base}/locations?offset=0&limit=100`, requestOptions).then(handleResponse);

}

export function deleteLocation(id){
    let jwt = localStorage.getItem('jwt_token');
    const requestOptions = {
        method: 'DELETE',
        mode:'cors',
        headers: { Authorization: 'Bearer ' + jwt},
    };
    return fetch(`${base}/locations/${id}`, requestOptions).then(handleResponse);
}
export function addLocation(location){
    let jwt = localStorage.getItem('jwt_token');
    let body = JSON.stringify(location);
    const requestOptions = {
        method: 'POST',
        body:body,
        headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" },
    };
    return fetch(`${base}/locations/`, requestOptions).then(handleResponse);
}

export function editLocation(location){
    let jwt = localStorage.getItem('jwt_token');
    let body = JSON.stringify(location);
    const requestOptions = {
        method: 'PATCH',
        mode:'cors',
        body:body,
        headers: { Authorization: 'Bearer ' + jwt, "Content-Typer": "application/json" },
    };
    return fetch(`${base}/locations/${location._id}`, requestOptions).then(handleResponse);
}

function getSelf(){
    let jwt = localStorage.getItem('jwt_token');
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + jwt },
    };
    return fetch(`${base}/users/me`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        if (response.status === 401){
            console.log('rejected');
            return Promise.reject();
        }
        if (response.method === "OPTIONS"){

        }
        if (response.status === 200){
            const data = text && JSON.parse(text);
            console.log('accepted');
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
                getSelf();
                //router.push('/locations');
            }
            if(data.role){
                localStorage.setItem('role', data.role);
                console.log(localStorage.getItem('role'));
            }
            return Promise.resolve(data);
        }
/*        if (response.status === 201){
            router.push('/login');
        }*/
    });
}