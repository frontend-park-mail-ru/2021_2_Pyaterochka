import config from './config';

const basename = config.basename;

async function getCsrfToken () {
    const req = await sendJSON({
        url: '/token',
        method: 'get'
    });

    const data = await req.json();

    return data.token;
}

async function sendJSON ({
    url,
    method = 'post',
    csrf = false,
    body = null,
    credentials = true
}) {
    const req = await fetch(basename + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrf ? await getCsrfToken() : undefined
        },
        body: body ? JSON.stringify(body) : null,
        mode: 'cors',
        credentials: credentials ? 'include' : undefined
    });

    return req;
}

/**
 * Загрузка файла
 */
async function uploadFile (file, fieldName, url, method = 'put') {
    const form = new FormData();
    form.set(fieldName, file);
    const req = await fetch(basename + url, {
        method,
        headers: {
            'x-csrf-token': await getCsrfToken()
        },
        body: form,
        mode: 'cors',
        credentials: 'include'
    });

    return req;
}

export { sendJSON, uploadFile };
