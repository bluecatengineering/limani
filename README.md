<!-- Copyright 2023 BlueCat Networks Inc.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE. -->

# @bluecateng/limani

## Getting started

Limani is a React component library which consists of Gateway shared react components.

These components are expected to only work with Gateway.

## Prerequisites

-   Make sure to use this package along with `@bluecateng/pelagos`. Installing `@bluecateng/limani` will automatically install `@bluecateng/pelagos` as it is a peer dependency of Limani.
-   When using Limani we depend on components from `@bluecateng/pelagos`.

### Light and dark theme support

-   It is recommended to use SimplePage component as it encapsulates navigation and styling/themes.
-   However, for independently customizing the style or theme, proper CSS needs to be applied. Please make sure to add the following in your main Less style sheet file:-

    ```
    @import '~@bluecateng/pelagos/less/core';
    @import '~@bluecateng/pelagos/less/inputs';
    @import '~@bluecateng/pelagos/less/themes';

    // data-theme attribute must be set on the html tag
    [data-theme='light'] {
      .theme-light();
    }

    [data-theme='dark'] {
      .theme-dark();
    }
    ```

-   For themes to take effect, the HTML DOM `dataset.theme` has to be modified.
-   Below is an example of how that can be achieved for `light` or `dark` themes.
    ```
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.dataset.theme = 'light';
    ```

## How to use Limani

```
# Install the limani package
npm install @bluecateng/limani

# Import components
import { FormLayout } from '@bluecateng/limani'
```
