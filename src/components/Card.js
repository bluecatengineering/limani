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
import { Layer } from '@bluecateng/pelagos';
import { ArrowRight } from '@carbon/icons-react';
import './Card.less';

/**
 * Card component presents a rectangle box layout
 * with some data to fill it up with.
 */

const Card = ({ title, href, description, className }) => {
    return (
        <Layer className={`Card${className ? ' ' + className : ''}`}>
            <a className='Card__link' href={href}>
                <div>
                    <span className='Card__title'>{title}</span>
                    {description && (
                        <span className='Card__description'>{description}</span>
                    )}
                </div>
                <div className='Card__iconContainer'>
                    <ArrowRight size={20} className='Card__arrowRight' />
                </div>
            </a>
        </Layer>
    );
};

Card.propTypes = {
    /** Title for the card */
    title: PropTypes.string.isRequired,

    /** Link is attached to the href attribute for the card */
    href: PropTypes.string.isRequired,

    /** Description inside in the card */
    description: PropTypes.string,

    /** The component class name(s). */
    className: PropTypes.string,
};

export default Card;
