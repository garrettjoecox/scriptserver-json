
const fs = require('fs');
const { join } = require('path');
const defaultsDeep = require('lodash.defaultsdeep');

module.exports = function () {
  const server = this;
  const config = server.config.json = defaultsDeep({}, server.config.json, {
    dir: join(process.cwd(), 'JSON'),
  });

  fs.stat(config.dir, (err) => {
    if (err) fs.mkdir(config.dir);
  });

  server.JSON = {
    get(path, attr) {
      path = join(config.dir, path.toLowerCase() + '.json');

      return readJson(path)
        .then(data => attr ? data[attr] : data);
    },

    set(path, attr, value) {
      path = join(config.dir, path.toLowerCase() + '.json');

      return readJson(path)
        .then((data) => {
          data[attr] = value;
          return writeJson(path, data);
        });
    },
  };
};

function readJson(path) {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      if (err) resolve({});
      else resolve(JSON.parse(data));
    });
  });
}

function writeJson(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
