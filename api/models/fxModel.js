
class fxModel{

	constructor(id, gpio_pin) {
	this.id = id;
	this.gpio_pin = gpio_pin;
}

fxModel.prototype.CreateEffect = function () {

};

fxModel.prototype.SetEffectState = function (key, val) {

};

fxModel.prototype.WriteState = function(newState) {
	var base_path = "/sys/class/gpio";
	if (!(newState == 1 || newState == 0 )) {
		return "invalid state";
	}
	var fs = require('fs');
	fs.writeFile("/sys/class/gpio/gpio" + gpio[this.id]
	, (gpio_pin.active_low ? newState : 1 - newState)
	, function(err) {
    	if(err) {
    		console.log(err);
        	return err;
    	}
    	console.log("New State Written: " + newState);
	});

};
}
