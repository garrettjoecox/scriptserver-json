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
server.use(require('scriptserver-json'));
```

## Usage
This module provides the following interface which allows for reading and writing of files in the `JSON` directory of your server. The directory in which these are stored will soon be configurable but for now are in the `JSON` directory

#### server.JSON.get(path, attribute)
- Path - [required] Relative to JSON folder, can be nested folders or a direct name. (see example)
- Attribute - [optional] if given, will only return this attribute from the requested file, if not will return entire file

```javascript
// Path argument can be nested folders
server.JSON.get('players/proxysaw', 'home')
  .then(home => console.log(home));

// Or directly in the main folder
server.JSON.get('world', 'spawn')
  .then(spawn => console.log(spawn));
```

#### server.JSON.set(path, attribute, newValue)
- Path - [required] Relative to JSON folder, can be nested folders or a direct name.
- Attribute - [required] Name of attribute to set
- NewValue - [required] value of attribute to set

```javascript
var newHome = {
  x: 0,
  y: 70,
  z: 0
};

server.JSON.set('players/proxysaw', 'home', newHome);
```
