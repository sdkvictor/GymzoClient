import {SERVER_URL} from '../config';

function createFieldArguments(fields) {
    let argument = "";

    for (let field of fields) {
        argument += field.name + ',' + field.value + ';';
    }

    return argument.substr(0, argument.length-1)
}

export async function getPrinters(userEmail) {
    let url =`${SERVER_URL}/HID-services/printers.php?email=${userEmail}`;
    console.log(url);
    let settings = {
        method: "GET"
    }

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error();
    }

    let responseJSON = await response.json();
    
    if (responseJSON.length > 0) {
        return responseJSON[0].printers;
    } else {
        throw new Error();
    }
}

export async function sendPrintRequest(prodProfileApiId, templateName, fields, email) {
    let urlizedTemplateName =encodeURIComponent(templateName.trim());
    console.log("FIELDS: ", fields);
    let fieldArguments = createFieldArguments(fields);
    let url = `${SERVER_URL}/HID-services/print.php`;
    console.log("URL: ", url);

    let entry = {
        "idp": prodProfileApiId,
        "idt": templateName,
        "data": fields,
        "email": email
    }
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }
    console.log("BODY:", JSON.stringify(entry));

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error("Invalid Response");
    }

    let responseJSON = await response.json();
    
    if (responseJSON.length > 0) {
        return responseJSON[0].Idjob;
    } else {
        throw new Error("No Data");
    }
}

export async function getPreviewJob(prodProfileApiId, templateName, fields, email) {
    let urlizedTemplateName = encodeURIComponent(templateName.trim());
    console.log("FIELDS: ", fields);
    let fieldArguments = createFieldArguments(fields);
    let url = `${SERVER_URL}/HID-services/preview.php`;
    console.log("URL: ", url);

    let entry = {
        "idp": prodProfileApiId,
        "idt": templateName,
        "data": fields,
        "email": email
    }
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }
    console.log("BODY:", JSON.stringify(entry));

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error("Invalid Response");
    }

    let responseJSON = await response.json();
    
    return responseJSON.job
}

export async function getPreviewImage(prodProfileApiId, email, job) {
    let url = `${SERVER_URL}/HID-services/preview_job.php`;
    console.log("URL: ", url);

    let entry = {
        "idp": prodProfileApiId,
        "email": email,
        "job": job
    }
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }
    console.log("BODY:", JSON.stringify(entry));

    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error("Invalid Response");
    }

    let responseJSON = await response.json();
    
    return responseJSON.preview;
}