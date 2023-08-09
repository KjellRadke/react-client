import axios from "axios";

export async function getRequest(path, params) {

    let url = path;

    if (params !== undefined) {
        url = constructURL(path, params);
    }

    function constructURL(basePath, params) {
        const braceIndex = basePath.indexOf('{');
        const path = basePath.substring(0, braceIndex);
        const url = new URL(path);
        url.search = new URLSearchParams(params).toString();
        return url;
    }

    const requestOptions = {
        // method: "GET",
        // headers: {'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'}
    }

    try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const etag = response.headers.get("etag");
            const json = await response.json();
            json.etag = etag;
            return json;
        } else {
            console.error('Fehler beim Abrufen der Daten:', response.status);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

export async function getWithAxios(path, params) {
    let url = path;

    if (params != null) {
        url = constructURL(path, params);
    }

    function constructURL(basePath, params) {
        const braceIndex = basePath.indexOf('{');
        const path = basePath.substring(0, braceIndex);
        const url = new URL(path);
        url.search = new URLSearchParams(params).toString();
        return url;
    }

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const etag = response.headers;
            return await response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function postRequest(path, requestBody) {

    const url = new URL(path)

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(url.pathname, requestOptions);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Fehler beim Abrufen der Daten:', response.status);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

export async function putRequest(path, employee, requestBody) {
    const url = new URL(path)
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'If-Match': employee.etag
        },
        body: JSON.stringify(requestBody)
    };
    try {
        const response = await fetch(url.pathname, requestOptions);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Fehler beim Abrufen der Daten: ", response.status)
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten: ")
    }
}


export async function deleteRequest(path) {
    const url = new URL(path)
    const requestOptions = {
        method: "DELETE",
    };
    try {
        const response = await fetch(url.pathname, requestOptions);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Fehler beim Abrufen der Daten: ', response.status);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }
}