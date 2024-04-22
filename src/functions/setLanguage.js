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
import l10n from '../l10n';

const loaders = {
    en: () => import('../l10n/en.po'),
    zz: () => import('../l10n/zz.po'),
};

/**
 * Sets the language for Limani. The default language is English, there is no
 * need to call this function unless the selected language is different.
 * This function should be called as early as possible,
 * the caller must catch the returned promise and handle any errors.
 * @param {'en'|'es'} language The language translated content to load for.
 * @returns {*|Promise<never>}
 *
 * @example
 * import {setLanguage} from '@bluecateng/limani';
 *
 * setLanguage('es').catch((error) => {
 *     // handle error
 * })
 */
const setLanguage = (language) => {
    const loader = loaders[language];
    return loader
        ? loader().then(({ default: data }) => l10n.load(data))
        : Promise.resolve(console.warn(`Unknown language ${language}`));
};

export default setLanguage;
