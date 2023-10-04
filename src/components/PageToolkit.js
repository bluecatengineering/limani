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
import PageToolkitBase from './PageToolkitBase';
import PlatformData from './PlatformData';
import SideNavContextProvider from '../sideNav/SideNavContextProvider';
import useLanguage from '../hooks/useLanguage';
import setLanguage from '../functions/setLanguage';
import ThemeSwitch from './ThemeSwitch';

const L10N = ({ onLanguageChange, children }) => {
    const [isLimaniLanguageLoaded, setIsLimaniLanguageLoaded] = useState(false);
    const [isWfLanguageLoaded, setIsWfLanguageLoaded] = useState(
        !onLanguageChange,
    );
    const { language } = useLanguage();

    useEffect(() => {
        if (!language) {
            return;
        }

        // Load the L10N content of Limani itself.
        setLanguage(language).finally(() => setIsLimaniLanguageLoaded(true));

        // Load the L10N content of the application/workflow.
        if (onLanguageChange) {
            onLanguageChange(language).finally(() =>
                setIsWfLanguageLoaded(true),
            );
        }
    }, [language]);

    return language && isLimaniLanguageLoaded && isWfLanguageLoaded && children;
};

const PageToolkit = ({ onLanguageChange, children }) => {
    return (
        <PageToolkitBase>
            <PlatformData>
                <SideNavContextProvider>
                    <ThemeSwitch />
                    <L10N onLanguageChange={onLanguageChange}>{children}</L10N>
                </SideNavContextProvider>
            </PlatformData>
        </PageToolkitBase>
    );
};

PageToolkit.propTypes = {
    /** Function to handle localization for the nested content */
    onLanguageChange: PropTypes.func,
    /** Child content to be rendered inside the PageToolkit */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default PageToolkit;
