import {SERVER_URL} from '../config';

export function getCategoryById(id) {
    let url = `${SERVER_URL}/api/categories/${id}`;

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

export function deleteCategory(id) {
    let url = `${SERVER_URL}/api/categories/delete/${id}`;

    let settings = {
        method: "DELETE",
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

export function getSubcategories(id) {
    let url = `${SERVER_URL}/api/categories/subcategories/${id}`;

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

export function createCategory(cateogry) {
    let url = `${SERVER_URL}/api/categories/create`;

    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cateogry)
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

export function addSubcategory(parent, subcategory) {
    let url = `${SERVER_URL}/api/categories/add-child/${parent}`;

    let settings = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcategory)
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