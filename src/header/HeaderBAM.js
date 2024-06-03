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
import { Link } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import usePlatformData from '../hooks/usePlatformData';
import './HeaderBAM.less';

/**
 * HeaderBAM component displays the connected BAM alias and URL. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData.
 */
const HeaderBAM = ({ className }) => {
    const { data } = usePlatformData();
    const bamAlias = data?.user?.bam_info?.alias;
    const bamLink = data?.user?.bam_info?.url;

    return (
        <>
            {bamAlias ? (
                <div
                    className={`HeaderBAM__bam${
                        className ? ' ' + className : ''
                    }`}>
                    <span>
                        BAM &nbsp;
                        <Link id='link-icon' />
                        &nbsp;
                        <a
                            href={bamLink}
                            target='_blank'
                            rel='noreferrer'
                            title={bamAlias}>
                            {bamAlias}
                        </a>
                    </span>
                </div>
            ) : null}
        </>
    );
};

HeaderBAM.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderBAM;
