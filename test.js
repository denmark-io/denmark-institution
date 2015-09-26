
'use strict';
'use strong';

const test = require('tap').test;
const endpoint = require('endpoint');
const slicepoint = require('slicepoint');
const institutions = require('./index.js');

test('keys are numbers, items are objects', {timeout: 0}, function (t) {
  institutions().pipe(endpoint({ objectMode: true }, function (err, items) {
    t.ifError(err);
    t.ok(items.length > 0);

    for (const item of items) {
      t.ok(typeof item === 'object' && item !== null, 'item is object');
      t.ok(typeof item.instnr === 'number', 'instr is number');
    }
    t.end();
  }));
});
