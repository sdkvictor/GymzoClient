import {SERVER_URL} from '../config';

export async function getRoutines(userId) {
    let url =`${SERVER_URL}/get_routines`;

    console.log(url);
    let settings = {
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'x-access-tokens': localStorage.getItem('token')
        }
    }

    let response = await fetch(url, settings);
    console.log(response);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.length > 0) {
        return responseJSON;
    } else {
        throw new Error();
    }
}

export async function getRoutine(prodProfileApiId, routineName) {
    let urlizedRoutineName =encodeURIComponent(routineName.trim())
    let url =`${SERVER_URL}/HID-services/routine.php?idp=${prodProfileApiId}&idt=${urlizedRoutineName}`;
    console.log(url);
    let settings = {
        method: "GET"
    }
    console.log(url)

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error("Invalid Response");
    }

    let responseJSON = await response.json();
    
    if (responseJSON.length > 0) {
        console.log("Campos: ", responseJSON[0].campos)
        return responseJSON[0].campos;
    } else {
        throw new Error("No Data");
    }
}

export function registerRoutine(routineName, routineOrder) {
    let token = localStorage.getItem('token');

    let url = `${SERVER_URL}/register_routine`
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens': token
        },
        body: JSON.stringify({
            name: routineName,
            order: routineOrder
        })
        
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            console.log(responseJSON.message);
            return {success: true, routineId: responseJSON.routine_id};
        })
} 