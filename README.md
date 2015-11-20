scriptserver-json
====================

[![](http://i.imgur.com/zhptNme.png)](https://github.com/garrettjoecox/scriptserver)

FYI: This package is an addon for ScriptServer and requires ScriptServer to be set up, please see [here](https://github.com/garrettjoecox/scriptserver) for more information.

## Installation
While in root directory of your server run:
```
npm install scriptserver-json
```
And in your `server` file:
```javascript
server.use('scriptserver-json');
```

## Usage
This module provides the following interface which allows for reading and writing of files in the JSON directory of your server.

#### server.getJSON(path, attribute)
- Path - [required] Relative to JSON folder, can be nested folders or a direct name. (see example)
- Attribute - [optional] if given, will only return this attribute from the requested file, if not will return entire file

```javascript
// Path argument can be nested folders
server.getJSON('players/proxysaw', 'home')
  .then(home => console.log(home));

// Or directly in the main folder
server.getJSON('world', 'spawn')
  .then(spawn => console.log(spawn));
```

#### server.setJSON(path, attribute, newValue)
- Path - [required] Relative to JSON folder, can be nested folders or a direct name.
- Attribute - [required] Name of attribute to set
- NewValue - [required] value of attribute to set

```javascript
var newHome = {
  x: 0,
  y: 70,
  z: 0
};

server.setJSON('players/proxysaw', 'home', newHome);
```
