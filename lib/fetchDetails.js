'use strict';
'use strong';

const getDOM = require('./getDOM.js');

const dateMatch = /^([0-9]{2})-([0-9]{2})-([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
function parseDate(text) {
  const parts = text.match(dateMatch).slice(1).map(Number);
  return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]).getTime();
}

function getDetails(instnr, callback) {
  const href = `http://statweb.uni-c.dk/InstRegV2/VisInstitution.aspx?InstNr=${instnr}`;

  getDOM(href, function (err, $) {
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
module.exports = getDetails;
