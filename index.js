'use strict';

const fs = require('fs');
const join = require('path').join;

module.exports = function() {

  // Setup

  const server = this;
  const dir = join(process.cwd(), 'JSON');

  fs.stat(dir, err => {
    if (err) fs.mkdir(dir);
  });

  // Retrieve & Setting

  server.JSON = {

    get(path, attr) {
      path = join(dir, path.toLowerCase() + '.json');

      return readJson(path)
        .then(data => attr ? data[attr] : data);
    },

    set(path, attr, value) {
      path = join(dir, path.toLowerCase() + '.json');

      return readJson(path)
        .then(data => {
          data[attr] = value;
          return writeJson(path, data);
        });
    }

  }
}

// Helper Functions

function readJson(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) resolve({});
      else resolve(JSON.parse(data));
    });
  });
}

function writeJson(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), err => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}