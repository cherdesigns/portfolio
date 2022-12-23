// Responses found here: https://docs.google.com/spreadsheets/d/1tjpXWKeNR__uwVhLISPIEu4U2WDQ3GlwnzOvFxgb248/edit#gid=0
// From: https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
export const FORM_ACTION =
    'https://script.google.com/macros/s/AKfycbxN50Le8Ol1c7B8wv6Z0HTwZew1BV8DTBZognTcYrK-dUgfN9ASZQiYRjFa2kIw-VRF3A/exec';

type FormData = {
    [inputName: string]: string;
    formDataNameOrder: string;
    formGoogleSheetName: string;
    formGoogleSend: string;
};

type Input = HTMLInputElement | HTMLTextAreaElement;

// get all data in form and return object
const getFormData = (form: HTMLFormElement) => {
    const elements = form.elements;
    let honeypot;

    const fields: Input[] = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements.item(i) as Input;

        if (!element) continue;

        if (element.name === 'honeypot') {
            honeypot = element.value;
        } else {
            const name = element.name;

            if (name) {
                fields.push(element);
            } else {
                console.error(`Element ${element} has an empty name field`);
            }
        }
    }

    const formData: FormData = {
        formDataNameOrder: JSON.stringify(fields.map(({ name }) => name)),
        formGoogleSheetName: form.dataset.sheet || 'responses', // default sheet name
        formGoogleSend: form.dataset.email || '', // no email by default
    };

    fields.forEach((element) => {
        formData[element.name] = element.value;
    });

    return { data: formData, honeypot };
};

export const handleFormSubmit = (form: HTMLFormElement, callback = () => {}) => {
    // handles form submit without any jquery
    const { data, honeypot } = getFormData(form);

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (honeypot) return false;

    const url = form.action;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = callback;
    // url encode form data for sending as post data
    var encoded = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
    xhr.send(encoded);
};
