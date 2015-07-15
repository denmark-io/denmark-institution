#denmark-institution

> Get information about an institution given its institution number

## Installation

```sheel
npm install denmark-institution
```

## Documentation

On installation this module a CSV file containing data for parents income
in 2012 and 2011. This is then parsed and stored as a JSON file.

```javascript
const institutions = require('denmark-institution')
```

`institutions` is a `Map` object, with institution numbers as keys and associated
information as values.

See http://statweb.uni-c.dk/InstRegV2/Fremfind.aspx?SearchType=AlphaInst for
what institution numbers are.

```javascript
for (let [instnr, info] of institutions) {
  // instnr is a number
  instnr = 671200;

  // info is an object
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
  }
}
```

## Source

A list of all institution numbers is fetched from:
http://www.dst.dk/da/Statistik/dokumentation/Times/institutionsregister/instnr

The details for each institution number is then fetched from the links at:
http://statweb.uni-c.dk/InstRegV2/Fremfind.aspx?SearchType=AlphaInst

##License

**The software is license under "MIT"**

> Copyright (c) 2015 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
