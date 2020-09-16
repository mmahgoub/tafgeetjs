# TafgeetJS

An NPM module to convert currency digits into written Arabic words
[https://www.npmjs.com/package/tafgeetjs](https://www.npmjs.com/package/tafgeetjs)

## How to use:

### Install

`npm install tafgeetjs`

### Usage

`var Tafgeet = require('tafgeetjs', YOUR_OPTIONS);`

`var stringText = new Tafgeet(556563.20, { currency: 'SDG' }).parse();` this will produce: 'فقط خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش لا غير'.

`var stringText = new Tafgeet(556563.20, { currency: 'SDG', startWith: null }).parse();` this will produce: 'خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش لا غير'.

`var stringText = new Tafgeet(556563.20, { currency: 'SDG', startWith: null, endtWith: null }).parse();` this will produce: 'خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش'.

`var stringText = new Tafgeet(556563, { currency: null, startWith: null, endtWith: null }).parse();` this will produce: 'خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون'.

## Options

|           | Default Value | Type   | Description                         |
| --------- | ------------- | ------ | ----------------------------------- |
| currency  | "SDG"         | String | the currency name                   |
| startWith | "فقط"         | String | the first word before currency text |
| endWith   | "لا غير"      | String | the last word before currency text  |

## Supported currencies:

- SDG (Sudanese Pound) - _Default_
- SAR (Saudi Riyal)
- QAR (Qatari Riyal)
- AED (Emarati Dirham)
- EGP (Egyptian Pound)
- USD (US Dollar)
- TND (Tunisian Dinar) - _by [@atefBB](https://github.com/atefBB)_
- AUD (Australian Dollar) - _by [@mohamedabbasos](https://github.com/mohamedabbasos)_
- TRY (Turkish Lira) - _by [@lokutech](https://github.com/lokutech)_

## TODOs:

- Support more currencies
- Better grammer support
- ~~Add test cases~~

## Angular Demo

TafgeetJS NPM module could also be imported using ES6 import syntax, below are links to an Angular example project:

- [Project Repo](https://github.com/mmahgoub/tafgeetjs-angular-demo/)
- [Live Demo](https://mmahgoub.github.io/tafgeetjs-angular-demo/)
