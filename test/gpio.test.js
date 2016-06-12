var mock = require('mock-fs');
var fs = require('fs');
var should = require('should');

var gpio = require('../gpio');

describe('GPIO API', function () {
  it('opens a pin with out', function (done) {
    mock({
      '/sys/class/gpio/gpio23/direction': ''
    });

    gpio.open(16, 'out', function () {
      const direction = fs.readFileSync('/sys/class/gpio/gpio23/direction').toString();

      should(direction).equal('out');

      done();
    });
  });

  it('writes to a pin with a high value', function (done) {
    mock({
      '/sys/class/gpio/gpio23/value': '0'
    });

    gpio.write(16, 5, function () {
      const value = fs.readFileSync('/sys/class/gpio/gpio23/value').toString();

      should(value).equal('1');

      done();
    });
  });

  it('writes to a pin with a low value', function (done) {
    mock({
      '/sys/class/gpio/gpio23/value': '1'
    });

    gpio.write(16, 0, function () {
      const value = fs.readFileSync('/sys/class/gpio/gpio23/value').toString();

      should(value).equal('0');

      done();
    });
  });

  afterEach(function () {
    mock.restore();
  });
});
