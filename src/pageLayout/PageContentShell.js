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
import Error from '../error/Error';
import usePageError from '../error/usePageError';
import useSideNav from '../sideNav/useSideNav';
import './PageContentShell.less';

const PageContentShell = ({ className, children }) => {
    const { isExpanded } = useSideNav();
    const { error } = usePageError();

    const classNames = ['PageContentShell'];
    if (isExpanded) {
        classNames.push('PageContentShell--leftNavIsOpen');
    }
    // TODO: Add 'PageContentShell--rightPanelIsOpen' conditionally.
    if (className) {
        classNames.push(className);
    }
    return (
        <main id='content-shell' className={classNames.join(' ')}>
            {error ? <Error error={error} /> : children}
        </main>
    );
};

PageContentShell.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
    /** Child content to be rendered inside the PageContentShell */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default PageContentShell;
