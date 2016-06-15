var gpio = require('./gpio');

gpio.open(16, 'out', function () {
  var on = 0;

  var blinker = setInterval(function () {
    gpio.write(16, on, function () {
      on = (on + 1) % 2;

      console.log('ON = ' + on);
    });
  }, 1000);

  setTimeout(function () {
    clearInterval(blinker);
  }, 12000);
});
