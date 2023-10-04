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
import { useLayoutEffect } from 'react';

/**
 * This is used to resize the button menu, in cases where
 * the top nav have dynamic buttons which can be hidden.
 *
 * @param {boolean} expanded The expanded value from useMenuHandler
 * @param {string} buttonId The ID of the button to be clicked to show the menu
 * @param {string} menuId The ID of the Layer in which menu is displayed
 * * **/
export function resizeButtonMenu(expanded, buttonId, menuId) {
    useLayoutEffect(() => {
        if (expanded) {
            const button = document.getElementById(buttonId);
            const { bottom, right } = button.getBoundingClientRect();
            const screenWidth = document.getElementById('root').clientWidth;

            const menu = document.getElementById(menuId);
            menu.style.right = `${screenWidth - right}px`;
            menu.style.top = `${bottom}px`;
        }
    }, [expanded]);
}
