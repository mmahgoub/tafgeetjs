# TafgeetJS
An NPM module to convert currency digits into written Arabic words

## How to use:
### Install
`npm install tafgeetjs`
### Usage
`Tafgeet = require('tafgeetjs');`

`var stringText = new Tafgeet('556563.20', 'SDG').parse();` this will produce: 'فقط خمسمائة وستة وخمسين ألف وخمسمائة وثلاثة وستين جنيه سوداني وعشرين قرش لا غير'
You need to pass number and currency symbol as strings otherwise you will not get accurate readings for the fractions.

## Supported currencies: 
- SDG (Sudanese Pound) - *Default*
- SAR (Saudi Riyal)
- QR (Qatari Riyal)
- AED (Emarati Dirham)
- EGP (Egyptian Pound)
- USD (US Dollars)
- TND (Tunisian Dinar) - *by [@atefBB](https://github.com/atefBB)*

## TODOs: 
- Support more currencies
- Better grammer support
- Add test cases