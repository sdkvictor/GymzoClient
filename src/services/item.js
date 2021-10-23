import {SERVER_URL} from '../config';

export function uploadImage(id, filesraw) {
    let url = `${SERVER_URL}/api/items/upload-picture/${id}`;

    const files = Array.from(filesraw)

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    let settings = {
        method: "PUT",
        body: formData
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