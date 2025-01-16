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
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useTrigger from '../hooks/useTrigger';
import usePageError from '../error/usePageError';
import usePageModalSpinner from './usePageModalSpinner';
import { doGet } from '../functions/fetchFunctions';
import PlatformDataContext from './PlatformDataContext';

const PlatformData = ({ children }) => {
    const [data, setData] = useState(null);
    const [language, setLanguage] = useState(null);
    const [trigger, triggerFetchData] = useTrigger();
    const { isBusy, setBusy } = usePageModalSpinner();
    const { setError } = usePageError();

    useEffect(() => {
        setBusy(true);
        doGet('/-/v3/navbar/data')
            .then((data) => {
                setData(data);
                setLanguage(data?.platform?.language);
            })
            .catch((error) => setError(error))
            .finally(() => setBusy(false));
    }, [trigger]);

    const value = {
        data,
        isFetchingData: isBusy,
        triggerFetchData: triggerFetchData,
        language: language,
    };
    return (
        <PlatformDataContext.Provider value={value}>
            {children}
        </PlatformDataContext.Provider>
    );
};

PlatformData.displayName = 'PlatformData';

PlatformData.propTypes = {
    /** The child elements. */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default PlatformData;
