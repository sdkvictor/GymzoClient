import {SERVER_URL} from '../config';

export async function getPrintCount(userEmail) {
    let url =`${SERVER_URL}/HID-services/jobs_by_user.php?email=${userEmail}`;
    console.log(url);
    let settings = {
        method: "GET"
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log("ResponseJSON:", responseJSON)
    if (responseJSON) {
        return responseJSON.count;
    } else {
        throw new Error();
    }
}

export async function getUserDetails(userEmail) {
    let url =`${SERVER_URL}/HID-services/user_details.php?email=${userEmail}`;
    console.log(url);
    let settings = {
        method: "GET"
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log("ResponseJSON User Details:", responseJSON)
    if (responseJSON) {
        return responseJSON;
    } else {
        throw new Error();
    }
}

export async function getPrinterDetails(printerId) {
    let url =`${SERVER_URL}/HID-services/printer_details_by_id.php?id=${printerId}`;
    console.log(url);
    let settings = {
        method: "GET"
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log("ResponseJSON Printer Details:", responseJSON)
    if (responseJSON) {
        return responseJSON;
    } else {
        throw new Error();
    }
}

export async function changePassword(email, password) {
    let url =`${SERVER_URL}/HID-services/change_password.php`;
    console.log(url);


    let settings = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    console.log("ResponseJSON Printer Details:", responseJSON)
    if (responseJSON) {
        return responseJSON;
    } else {
        throw new Error();
    }
}



