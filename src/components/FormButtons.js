/*
Copyright 2023-2024 BlueCat Networks Inc.

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
import { Button } from '@bluecateng/pelagos';
import { FormSubmit } from '@bluecateng/pelagos-forms';
import { t } from '@bluecateng/l10n.macro';
import './FormButtons.less';

/**
 * Button component for forms, this component depends on pelagos directly.
 * If you would like this component to be at the bottom of the page, please
 * make sure to apply a flex of value 1 on the component above.
 */

const FormButtons = ({
    cancelButtonLabel = t`Cancel`,
    saveButtonLabel = t`Save`,
    childrenPosition = 'end',
    children,
    className,
}) => {
    return (
        <div className={`FormButtons${className ? ' ' + className : ''}`}>
            {childrenPosition === 'start' ? children : null}
            <FormSubmit id='formSubmit' text={saveButtonLabel} />
            <Button
                id='formCancel'
                text={cancelButtonLabel}
                onClick={() => window.location.reload()}
            />
            {childrenPosition === 'end' ? children : null}
        </div>
    );
};

FormButtons.propTypes = {
    /** Label for the cancel button */
    cancelButtonLabel: PropTypes.string,

    /** Label for the save button */
    saveButtonLabel: PropTypes.string,

    /** Children position in the layout */
    childrenPosition: PropTypes.oneOf(['start', 'end']),

    /** Child components */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),

    /** The component class name(s). */
    className: PropTypes.string,
};

export default FormButtons;
