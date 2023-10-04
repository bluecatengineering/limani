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
import PropTypes from 'prop-types';
import { PageToolkit } from '../components';
import PageBody from './PageBody';
import PageContent from './PageContent';

const SimplePage = ({ pageTitle, appTitle, children, onLanguageChange }) => {
    return (
        <PageToolkit onLanguageChange={onLanguageChange}>
            {/* ^- setLanguage of Limani and the workflow */}

            <PageBody>
                {/* ^- render Header */}
                <PageContent pageTitle={pageTitle} appTitle={appTitle}>
                    {children}
                </PageContent>
            </PageBody>
        </PageToolkit>
    );
};

SimplePage.propTypes = {
    /** Page's header title. */
    pageTitle: PropTypes.string,
    // eslint-disable-next-line max-len
    /** Application's title (for example, "Bluecat Gateway") to be displayed in the browser tab. */
    appTitle: PropTypes.string,
    /** Child content to be rendered inside the SimplePage */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
    /** Function to call once the language for the UI is known/changed */
    onLanguageChange: PropTypes.func,
};

export default SimplePage;
