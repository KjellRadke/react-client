function constructURL(basePath, params) {
    const basePathWithoutTemplate = basePath.replace(/\{.*?\}/g, ''); // Entferne den Template-Teil
    const url = new URL(basePathWithoutTemplate, window.location.origin);

    if (params !== undefined) {
        url.search = new URLSearchParams(params).toString();
    }

    return url.pathname + url.search;
}

export async function getRequest(path, params) {
    let url = constructURL(path, params)
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
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


export async function postRequest(path, requestBody) {

    const url = new URL(path)

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
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


export async function loginRequest(path, requestBody) {
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

            const jwt = response.headers.get("authorization");
            localStorage.setItem("jwt", jwt);
            return jwt;
        } else {
            alert("Invalid login attempt");
        }
    } catch (error) {
        alert(error);
    }
}


export async function putRequest(path, employee, requestBody) {
    const url = new URL(path)
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'If-Match': employee.etag,
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(requestBody)
    };
    try {
        const response = await fetch(url.pathname, requestOptions);
        if (response.ok) {
            return await response.json();
        } else if (response.status === 412) {
            alert("DNIED: Bearbeitung nicht möglich " +
                employee._links.self.href + ".")
        } else if (response.status === 403) {
            alert("ACCESS DENIED: You are not authorized to update" + employee._links.self.href)
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
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
    };
    try {
        const response = await fetch(url.pathname, requestOptions);
        if (response.ok) {
            return await response.json();
        }
            // else if (response.status === 403) {
            //     alert("ACCESS DENIED: You are not authorized to delete" + employee._links.self.href)
        // }
        else {
            console.error('Fehler beim Abrufen der Daten: ', response.status);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }

}