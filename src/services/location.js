import {SERVER_URL} from '../config';

export function getRootLocations(id) {
    let url = `${SERVER_URL}/api/locations/roots/${id}`;

    let settings = {
        method: "GET"
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function getLocationById(id) {
    let url = `${SERVER_URL}/api/locations/${id}`;

    let settings = {
        method: "GET",
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function getChildren(parent) {
    let url = `${SERVER_URL}/api/locations/children/${parent}`;

    let settings = {
        method: "GET",
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function addChild(parent, newLocation) {
    let url = `${SERVER_URL}/api/locations/add-child/${parent}`;

    let settings = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocation)
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function createRoot(newLocation) {
    let url = `${SERVER_URL}/api/locations/create-root`;

    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocation)
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function getAncestors(child) {
    let url = `${SERVER_URL}/api/locations/ancestors/${child}`;

    let settings = {
        method: "GET",
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return responseJSON;
        })
}

export function deleteLocation(id) {
    let url = `${SERVER_URL}/api/locations/delete/${id}`;

    let settings = {
        method: "DELETE",
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response
            }

            throw new Error();
        })

}