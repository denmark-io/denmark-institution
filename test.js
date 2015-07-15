
'use strict';
'use strong';

const test = require('tap').test;
const schools = require('./index.js');

test('all keys are numbers', function (t) {
  for (const key of schools.keys()) {
    t.ok(typeof key === 'number', 'is number');
  }
  t.end();
});

test('all values are objects', function (t) {
  for (const obj of schools.values()) {
    t.ok(typeof obj === 'object' && obj !== null, 'is object');
  }
  t.end();
});
