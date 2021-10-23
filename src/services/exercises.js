import {SERVER_URL} from '../config';

export async function getExercises(routineID) {
    let url =`${SERVER_URL}/get_exercises`;
    console.log("Routine id is ", routineID);
    let settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'x-access-tokens': localStorage.getItem('token')
        },
        body: JSON.stringify({
            routine_id: routineID
        })
    }

    let response = await fetch(url, settings);
    console.log(response);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON) {
        return responseJSON;
    } else {
        throw new Error();
    }
}

export async function getFields(prodProfileApiId, routineName) {
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

export function registerExercise(exName, exSets, exReps, exHasWeight, routineID) {
    let token = localStorage.getItem('token');

    let url = `${SERVER_URL}/register_exercise`
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens': token
        },
        body: JSON.stringify({
            name: exName,
            sets: exSets,
            reps: exReps,
            has_weight: exHasWeight,
            routine_id: routineID
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
            return {success: true, exerciseID: responseJSON.exercise_id};
        })
} 