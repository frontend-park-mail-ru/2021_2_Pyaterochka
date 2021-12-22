export default function post (path: string, params: {
    [key: string]: string | number
}, method = 'post') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    Object.entries(params).forEach(([key, value]) => {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = String(value);

        if (typeof (value) === 'number') {
            hiddenField.setAttribute('data-type', 'number');
        }

        form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
}
