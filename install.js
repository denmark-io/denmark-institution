
'use strict';
'use strong';

const fs = require('fs');
const path = require('path');
const http = require('http');
const async = require('async');
const cheerio = require('cheerio');
const endpoint = require('endpoint');

function getInstInfoHref(instnr) {
  return `http://statweb.uni-c.dk/InstRegV2/VisInstitution.aspx?InstNr=${instnr}`;
}

const allHref = 'http://www.dst.dk/da/Statistik/dokumentation' +
                '/Times/institutionsregister/instnr';

function getDOM(href, callback) {
  // Make a POST request

  http.get(href, function (req) {
    req.pipe(endpoint(function (err, content) {
      if (err) return callback(err, null);
      callback(null, cheerio.load(content.toString()));
    }));
  });
}

function getList(callback) {
  // One this page there is a big table with
  // all instnrs but not much else.
  getDOM(allHref, function (err, $) {
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

const dateMatch = /^([0-9]{2})-([0-9]{2})-([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
function parseDate(text) {
  const parts = text.match(dateMatch).slice(1).map(Number);
  return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]).getTime();
}

let total = 0;
let current = 0;

function getDetails(instnr, callback) {
  current += 1;
  if (current % 10 === 0) {
    console.log('progress: ' + ((current / total) * 100) + ' %');
  }

  getDOM(getInstInfoHref(instnr), function (err, $) {
    if (err) return callback(err, null);

    const instnr = parseInt($('#ctl00_ContentPlaceHolder1_EditSideLinkButton').text(), 10);
    const name = $('#ctl00_ContentPlaceHolder1_InstNavn').text();
    const leader = $('#ctl00_ContentPlaceHolder1_InstLeder').text();
    const address = $('#ctl00_ContentPlaceHolder1_Adresse').text();
    const zipcode = parseInt($('#ctl00_ContentPlaceHolder1_Postnr').text(), 10);
    const city = $('#ctl00_ContentPlaceHolder1_By').text();
    const phone = $('#ctl00_ContentPlaceHolder1_Telefonnr').text().replace(' ', '');
    const email = $('#ctl00_ContentPlaceHolder1_Email').text();
    const website = $('#ctl00_ContentPlaceHolder1_WWW').text();
    const updated = parseDate($('#ctl00_ContentPlaceHolder1_AjourDato').text());

    const details = {
      instnr, name, leader, address,
      zipcode, city, phone, email,
      website, updated
    };

    callback(null, details);
  });
}

getList(function (err, instnrs) {
  if (err) throw err;

  total = instnrs.length;

  async.mapSeries(instnrs, getDetails, function (err, results) {
    if (err) throw err;

    fs.writeFileSync(
      path.resolve(__dirname, 'data.json'),
      JSON.stringify(results)
    );
  });
});
