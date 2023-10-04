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
import { useCallback, useMemo, useState } from 'react';

export default (initialSortKey, initialSortOrder, getComparator, data) => {
    const [sortKey, setSortKey] = useState(initialSortKey);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);

    const handleHeaderClick = useCallback(
        ({ target }) => {
            const th = target.closest('th');
            const column = th?.dataset?.column;
            if (column && getComparator(column)) {
                if (sortKey === column) {
                    setSortOrder(sortOrder === 'a' ? 'd' : 'a');
                } else {
                    setSortKey(column);
                    setSortOrder('a');
                }
            }
        },
        [sortKey, sortOrder],
    );

    const sortedData = useMemo(() => {
        const comparator = getComparator(sortKey);
        const modifier = sortOrder === 'a' ? 1 : -1;
        return data && [...data].sort((a, b) => comparator(a, b) * modifier);
    }, [data, getComparator, sortKey, sortOrder]);

    return [sortKey, sortOrder, sortedData, handleHeaderClick];
};
