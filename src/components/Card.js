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
import { t } from '@bluecateng/l10n.macro';
import './Card.less';

/**
 * Card component presents a rectangle box layout
 * with some data to fill it up with.
 */

const Card = ({ title, href, description, path, className }) => {
    function getFullPath() {
        let fullPath = '';
        path.forEach((pathSection, index) => {
            if (index === path.length - 1) {
                fullPath = fullPath.concat(String(pathSection));
            } else {
                fullPath = fullPath.concat(String(pathSection), '/');
            }
        });
        return fullPath;
    }

    return (
        <a className={`Card${className ? ' ' + className : ''}`} href={href}>
            <span className='Card__title'>{title}</span>
            {description ? (
                <span className='Card__description'>{description}</span>
            ) : null}
            {path ? (
                <span>
                    <span className='Card__pathTitle'> {t`Path`} </span>
                    <span className='Card__path'>{getFullPath()}</span>
                </span>
            ) : null}
        </a>
    );
};

Card.propTypes = {
    /** Title for the card */
    title: PropTypes.string.isRequired,

    /** Link is attached to the href attribute for the card */
    href: PropTypes.string.isRequired,

    /** Description inside in the card */
    description: PropTypes.string,

    /** Group to which the card belongs to */
    path: PropTypes.arrayOf(PropTypes.string),

    /** The component class name(s). */
    className: PropTypes.string,
};

export default Card;
