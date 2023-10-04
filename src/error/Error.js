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
import { Button } from '@bluecateng/pelagos';
import bluecatErrorLogo from '../../assets/bluecat-error.svg';
import { t } from '@bluecateng/l10n.macro';
import './Error.less';
import PropTypes from 'prop-types';

const Reasons = new Map([
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [402, 'Payment Required'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [405, 'Method Not Allowed'],
    [406, 'Not Acceptable'],
    [407, 'Proxy Authentication Required'],
    [408, 'Request Timeout'],
    [409, 'Conflict'],
    [410, 'Gone'],
    [411, 'Length Required'],
    [412, 'Precondition Failed'],
    [413, 'Payload Too Large'],
    [414, 'URI Too Long'],
    [415, 'Unsupported Media Type'],
    [416, 'Range Not Satisfiable'],
    [417, 'Expectation Failed'],
    [418, "I'm a teapot"],
    [421, 'Misdirected Request'],
    [422, 'Unprocessable Entity'],
    [423, 'Locked'],
    [424, 'Failed Dependency'],
    [425, 'Too Early'],
    [426, 'Upgrade Required'],
    [428, 'Precondition Required'],
    [429, 'Too Many Requests'],
    [431, 'Request Header Fields Too Large'],
    [451, 'Unavailable For Legal Reasons'],
    [500, 'Internal Server Error'],
    [501, 'Not Implemented'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable'],
    [504, 'Gateway Timeout'],
    [505, 'HTTP Version Not Supported'],
    [507, 'Insufficient Storage'],
    [508, 'Loop detected'],
    [510, 'Not Extended'],
]);

/**
 * Error component is designed to visually represent an
 * error or failure in a user interface.
 * It consists of a BlueCat logo and a section to
 * display the details of the error beside it.
 */

const Error = ({ error }) => {
    // NOTE: `error` is expected to have the following fields:
    // message, code, status, details

    const reason = Reasons.get(error.status) || 'Error';
    const goBack = () => history.go(-1);
    console.debug(error);
    return (
        <div className='Error'>
            <div className='Error__left'>
                <div className='Error__logo'>
                    <img src={bluecatErrorLogo} alt='BlueCat logo' />
                </div>
            </div>
            <main className='Error__right'>
                <div>
                    <div className='Error__status'>
                        {error.status ? `${error.status} ` : ''}
                        {reason}
                    </div>
                    <div className='Error__message'>{error.message}</div>
                    {error.code ? (
                        <div className='Error__code'>[{error.code}]</div>
                    ) : null}
                    {/* TODO: Render `error.details`.*/}
                    <Button
                        className='Error__goBack'
                        size='medium'
                        type='primary'
                        text={t`Go back`}
                        onClick={goBack}
                    />
                </div>
            </main>
        </div>
    );
};

Error.propTypes = {
    /** Error object is expected to contain the following fields:
     *  message, code, status */
    error: PropTypes.object,
};

export default Error;
