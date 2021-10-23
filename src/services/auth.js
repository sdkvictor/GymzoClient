import {SERVER_URL} from '../config';

export function checkIsAuthenticated() {
    let token = localStorage.getItem('token');
    var authenticated = false;
    console.log("Token:",token);

    let url = `${SERVER_URL}/info`
    let settings = {
        method: "GET",
        headers: {
            'x-access-token': token
        }
        
        
    }
    //console.log(settings)

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return {success: true, email: responseJSON.email, name: responseJSON.name};
        })
} 

export function authSignUp(credentials) {
    let url = `${SERVER_URL}/signin`;
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
            height: credentials.height
        })
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            return {success: true}
        })
}

export function authLogin(credentials) {
    let url = `${SERVER_URL}/login`
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Max-Age': 86400
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            localStorage.setItem('token', responseJSON.token);
            console.log(responseJSON.token);
            return {success: true, email: credentials.email, id: responseJSON.id}
        })
}

export function authLogout() {
    localStorage.removeItem('token');
    return new Promise((resolve, reject) => (resolve(true)))
}