
var ScriptServer = require('scriptserver');
var Path = require('path');
var fs = require('fs');

module.exports = function(server) {

    server.JSONdir = Path.join(process.cwd(), 'JSON');
    fs.stat(server.JSONdir, err => {
        if (err) fs.mkdir(server.JSONdir);
    });
};

ScriptServer.prototype.getJSON = function(path, attribute) {
    var self = this;

    return getJSONFile(Path.join(self.JSONdir, path + '.json'))
        .then(d => attribute ? d[attribute] : d);
};

ScriptServer.prototype.setJSON = function(path, attribute, newValue) {
    var self = this;

    return getJSONFile(Path.join(self.JSONdir, path + '.json'))
        .then(d => {
            d[attribute] = newValue;
            return writeJSONFile(Path.join(self.JSONdir, path + '.json'), d);
        });
};

function getJSONFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) resolve({});
            else resolve(JSON.parse(data));
        });
    });
}

function writeJSONFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data, null, 4), err => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
