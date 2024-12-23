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
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './PageContent.less';

const PageContent = ({
    className,
    pageTitle,
    appTitle = 'BlueCat Gateway',
    titleComponent,
    children,
}) => {
    const classNames = className ? ['PageContent', className] : ['PageContent'];
    const windowTitle = [appTitle, pageTitle].filter(Boolean).join(' - ');

    useEffect(() => {
        // eslint-disable-next-line max-len
        windowTitle && (document.title = windowTitle); //`BlueCat Gateway - ${title}`
    }, [windowTitle]);

    return (
        <div className={classNames.join(' ')}>
            {titleComponent ? (
                titleComponent
            ) : pageTitle ? (
                <div className={'PageContent__title'}>
                    <h1 id='pageTitle'>{pageTitle}</h1>
                </div>
            ) : null}
            <div className={'PageContent__content'}>{children}</div>
        </div>
    );
};

PageContent.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
    /** Page title */
    pageTitle: PropTypes.string,
    /** App title */
    appTitle: PropTypes.string,
    /** Child content to be rendered inside the PageContent */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default PageContent;
