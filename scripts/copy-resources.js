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
const {
    constants: { COPYFILE_FICLONE },
    copyFileSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} = require('node:fs');
const { join } = require('node:path');

const converter = require('@bluecateng/l10n-icu2obj');

const EXTENSIONS = /\.(less|po)$/;
const EXCLUDED = /\.stories\.less$/;
const PO = /\.po$/;

const copyDir = (from, to) =>
    readdirSync(from).forEach((name) => {
        const subFrom = join(from, name);
        const subTo = join(to, name);
        const stats = statSync(subFrom);
        if (stats.isDirectory()) {
            copyDir(subFrom, subTo);
        } else if (
            stats.isFile() &&
            EXTENSIONS.test(name) &&
            !EXCLUDED.test(name)
        ) {
            mkdirSync(to, { recursive: true });
            if (PO.test(name)) {
                writeFileSync(
                    `${subTo}.js`,
                    converter(readFileSync(subFrom, 'utf8'), 'es'),
                );
            } else {
                copyFileSync(subFrom, subTo, COPYFILE_FICLONE);
            }
        }
    });

const output = process.argv[2];
copyDir('src', output);
