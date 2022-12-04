# TafgeetJS
An NPM module to convert currency digits into written Arabic words
[https://www.npmjs.com/package/tafgeetjs](https://www.npmjs.com/package/tafgeetjs)

## How to use:
### Install
`npm install tafgeetjs`
### Usage
`var Tafgeet = require('tafgeetjs');`

`var stringText = new Tafgeet(556563.20, 'SDG').parse();` this will produce: 'فقط خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش لا غير'.

## Supported currencies: 

- IQD (Iraqi Dinar)
- SDG (Sudanese Pound) - *Default*
- SAR (Saudi Riyal)
- QAR (Qatari Riyal)
- AED (Emarati Dirham)
- EGP (Egyptian Pound)
- USD (US Dollar)
- TND (Tunisian Dinar) - *by [@atefBB](https://github.com/atefBB)*
- AUD (Australian Dollar) - *by [@mohamedabbasos](https://github.com/mohamedabbasos)*
- TRY (Turkish Lira) - *by [@lokutech](https://github.com/lokutech)*

## TODOs: 
- Support more currencies
- Better grammer support
- ~~Add test cases~~

## Angular Demo
TafgeetJS NPM module could also be imported using ES6 import syntax, below are links to an Angular example project:

- [Project Repo](https://github.com/mmahgoub/tafgeetjs-angular-demo/) 
- [Live Demo](https://mmahgoub.github.io/tafgeetjs-angular-demo/)
