#denmark-institution

> Get information about an institution given its institution number

## Installation

```sheel
npm install denmark-institution
```

## Documentation

On installation this module downloads a list of all institution numbers and
fetches the details for all institutions.

```javascript
const institutions = require('denmark-institution')
```

`institutions` is an object stream, with institution numbers and associated
information.

See http://www.dst.dk/da/Statistik/dokumentation/Times/institutionsregister/instnr
for what institution numbers are.

```javascript
institutions().once('data', function (info) {
  info = {
    instnr: 671200,
    name: 'Pædagogisk-Psykologisk Rådgivning',
    leader: 'Helle Øster Enstrøm',
    address: 'Bremdal Torv 4',
    zipcode: 7600,
    city: 'Struer',
    phone: '96848555',
    email: 'boernefam@struer.dk',
    website: '',
    updated: new Date(1381225241000)
  };
});
```

## Source

A list of all institution numbers is fetched from:
http://www.dst.dk/da/Statistik/dokumentation/Times/institutionsregister/instnr

The details for each institution number is then fetched from the links at:
http://statweb.uni-c.dk/InstRegV2/Fremfind.aspx?SearchType=AlphaInst
