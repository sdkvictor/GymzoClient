import {SERVER_URL} from '../config';


export function registerRecord(exerciseId, weight, sets, reps) {
    let token = localStorage.getItem('token');

    let url = `${SERVER_URL}/register-record`
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens': token
        },
        body: JSON.stringify({
            exercise_id: exerciseId,
            weight: weight,
            sets: sets,
            reps: reps
        })
        
    }

    console.log(settings.body)

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            console.log(responseJSON.message);
            return {success: true, record: responseJSON};
        })
} 


export async function getRecords(exerciseId) {
    let url =`${SERVER_URL}/get_rocords`;

    console.log(url);
    let settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'x-access-tokens': localStorage.getItem('token')
        },
        body: JSON.stringify({
            exercise_id: exerciseId,
            
        })
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
