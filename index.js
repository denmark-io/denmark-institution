'use strict';
'use strong';

const mappoint = require('mappoint');
const startpoint = require('startpoint');

const fetchIds = require('./lib/fetchIds.js');
const fetchDetails = require('./lib/fetchDetails.js');

function institutions() {
  const ret = mappoint({ objectMode: true }, fetchDetails);
  fetchIds(function (err, ids) {
    startpoint(err === null ? ids : err, { objectMode: true })
      .pipe(ret);
  });
  return ret;
}
module.exports = institutions;
