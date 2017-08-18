# TafgeetJS
An NPM module to convert currency digits into written Arabic words
[https://www.npmjs.com/package/tafgeetjs](https://www.npmjs.com/package/tafgeetjs)

## How to use:
### Install
`npm install tafgeetjs`
### Usage
`Tafgeet = require('tafgeetjs');`

`var stringText = new Tafgeet('556563.20', 'SDG').parse();` this will produce: 'فقط خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش لا غير' 
~~You need to pass number and currency symbol as strings otherwise you will not get accurate readings for the fractions~~.

## Supported currencies: 
- SDG (Sudanese Pound) - *Default*
- SAR (Saudi Riyal)
- QAR (Qatari Riyal)
- AED (Emarati Dirham)
- EGP (Egyptian Pound)
- USD (US Dollars)
- TND (Tunisian Dinar) - *by [@atefBB](https://github.com/atefBB)*

## TODOs: 
- Support more currencies
- Better grammer support
- ~~Add test cases~~

## Angular Demo
TafgeetJS NPM module could also be imported using ES6 import syntax, below are links to an Angular example project:

- [Project Repo](https://github.com/mmahgoub/tafgeetjs-angular-demo/) 
- [Live Demo](https://mmahgoub.github.io/tafgeetjs-angular-demo/)