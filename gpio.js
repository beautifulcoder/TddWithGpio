var fs = require('fs');

// Post 3.18.x kernel
var sysFsPath = '/sys/class/gpio/gpio';
var pinMapping = {
  '16': 23
};

function open(pinNumber, direction, callback) {
  const path = sysFsPath + pinMapping[pinNumber] + '/direction';

  fs.writeFile(path, direction, (callback || noOp));
}

function write(pinNumber, value, callback) {
  const path = sysFsPath + pinMapping[pinNumber] + '/value';
  value = !!value ? '1' : '0';

  fs.writeFile(path, value, 'utf8', callback);
}

function noOp() {}

module.exports = {
  open: open,
  write: write
};
