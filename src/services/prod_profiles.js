import {SERVER_URL} from '../config';

export async function getUserProfile() {
    let url =`${SERVER_URL}/info`;
    let token = localStorage.getItem('token');
    console.log(url);
    let settings = {
        method: "GET",
        headers: {
            'x-access-tokens': token

        }
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    
    if (responseJSON) {
        return responseJSON;
    }
}