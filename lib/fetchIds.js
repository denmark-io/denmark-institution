'use strict';
'use strong';

const getDOM = require('./getDOM.js');
const href = 'http://www.dst.dk/da/Statistik/dokumentation' +
             '/Times/institutionsregister/instnr';

function fetchIds(callback) {
  getDOM(href, function (err, $) {
    if (err) return callback(err, null);

    const instnrs = [];

    $('table.dataTable tbody')
      .last()
      .children()
      .each(function (i, tr) {
        const instnr = parseInt($(tr.children[2]).text(), 10);
        if (instnr !== 999999) {
          instnrs.push(instnr);
        }
      });

    callback(null, instnrs);
  });
}
module.exports = fetchIds;
