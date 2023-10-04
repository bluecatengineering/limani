/*
Copyright 2023 BlueCat Networks Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { t } from '@bluecateng/l10n.macro';

class FetchError extends Error {
    constructor(message, status, code, details, responseText, response) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
        this.responseText = responseText;
        this.response = response;
    }
}

const isJSON = (response) =>
    /^application\/json/.test(response.headers.get('Content-Type')) &&
    response.headers.get('Content-Length') !== '0';

export const doFetch = (method, path, data, contentType) => {
    const headers = {
        Accept: 'application/json, */*;q=0.5',
    };
    if (contentType) {
        headers['Content-Type'] = contentType;
    }
    return fetch(path, {
        method: method,
        headers,
        body:
            data === undefined
                ? undefined
                : contentType === 'application/json'
                ? JSON.stringify(data)
                : data,
    })
        .catch((error) => {
            console.log(error); // DEBUG
            Promise.reject({
                'message': t`Error while communicating with server.`,
                'status': null,
                'code': null,
                'details': null,
            });
        })
        .then((response) => {
            return response.text().then((text) => {
                if (response.ok) {
                    return isJSON(response) ? JSON.parse(text) : text;
                } else {
                    if (isJSON(response)) {
                        const body = JSON.parse(text);
                        if (
                            'message' in body &&
                            'status' in body &&
                            'code' in body &&
                            'details' in body
                        ) {
                            throw new FetchError(
                                body.message,
                                body.status,
                                body.code,
                                body.details,
                                text,
                                response,
                            );
                        } else {
                            throw new FetchError(
                                // eslint-disable-next-line max-len
                                t`Error response does not match expected format.`,
                                response.status,
                                null,
                                null,
                                text,
                                response,
                            );
                        }
                    } else {
                        throw new FetchError(
                            t`Error response does not match expected format.`,
                            response.status,
                            null,
                            null,
                            text,
                            response,
                        );
                    }
                }
            });
        });
};

export const doGet = (path, data, contentType) =>
    doFetch('GET', path, data, contentType);

export const doPost = (path, data, contentType) =>
    doFetch('POST', path, data, contentType);

export const doPut = (path, data, contentType) =>
    doFetch('PUT', path, data, contentType);

export const doDelete = (path, data, contentType) =>
    doFetch('DELETE', path, data, contentType);

export const processErrorMessages = (error, fields, flatten) => {
    // `error` is the structured error (representing the response from the BE).
    // `fields` is a list of known fields.
    fields = fields || [];
    const errors = error.details ? error.details.errors || [] : [];
    const map1 = new Map(); // for found/known fields
    const map2 = new Map(); // otherwise

    errors.forEach((e) => {
        const field = e['field']; // May be `undefined`.
        const map = fields.indexOf(field) > -1 ? map1 : map2;
        if (!map.has(field)) {
            map.set(field, []);
        }
        map.get(field).push(e.text);
    });
    // `pageTexts` will be an array of strings.
    const pageTexts = [error.message].concat(
        flatten
            ? Array.from(map2.values(), (item) => item.join(' ')).flat()
            : Array.from(map2.values()).flat(),
    );
    /** `fieldsTexts` is an object whose values are
        either strings (if flatten is `true`) or arrays of strings, otherwise.*/
    const fieldsTexts = Object.fromEntries(
        Array.from(map1.entries(), ([key, value]) =>
            flatten ? [key, value.join(' ')] : [key, value],
        ),
    );

    return { 'page': pageTexts, 'fields': fieldsTexts };
};
