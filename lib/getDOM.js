'use strict';
'use strong';

const http = require('http');
const cheerio = require('cheerio');
const endpoint = require('endpoint');

function getDOM(href, callback) {
  const req = http.get(href, function (res) {
    res.pipe(endpoint(function (err, content) {
      if (err) return callback(err, null);
      callback(null, cheerio.load(content.toString()));
    }));
  });
  req.once('error', callback);
}

module.exports = getDOM;
