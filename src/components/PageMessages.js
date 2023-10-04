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
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@bluecateng/pelagos';
import PageMessagesContext from './PageMessagesContext';

const PageMessages = ({ initialMessages, children }) => {
    const [messages, setMessages] = useState(initialMessages);

    const addMessages = (messages) => {
        const t = Date.now();
        messages.forEach((item, index) => {
            if (!item['id']) {
                item['id'] = t + index;
            }
        });
        setMessages((msgs) => msgs.concat(messages));
    };
    const handleRemoveMessage = (message) => {
        setMessages((messages) => messages.filter((m) => m !== message));
    };

    const addSuccessMessage = (text) =>
        addMessages([{ 'type': 'success', 'text': text }]);
    const addInfoMessage = (text) =>
        addMessages([{ 'type': 'info', 'text': text }]);
    const addWarningMessage = (text) =>
        addMessages([{ 'type': 'warning', 'text': text }]);
    const addErrorMessage = (text) =>
        addMessages([{ 'type': 'error', 'text': text }]);

    const value = {
        addMessages,
        addSuccessMessage,
        addInfoMessage,
        addWarningMessage,
        addErrorMessage,
    };
    return (
        <PageMessagesContext.Provider value={value}>
            <Toast messages={messages} onRemove={handleRemoveMessage} />
            {children}
        </PageMessagesContext.Provider>
    );
};

PageMessages.displayName = 'PageMessages';

PageMessages.propTypes = {
    /** The initial messages. */
    initialMessages: PropTypes.array,
    /** The child elements. */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

PageMessages.defaultProps = {
    /** The initial messages. */
    initialMessages: [],
};

export default PageMessages;
