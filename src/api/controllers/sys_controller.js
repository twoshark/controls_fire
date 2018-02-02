import gpio from '../models/gpio_model';
import System from '../models/sys_model';

exports.system_info = function(req,res) {
	//GET /system/info
	console.log('\nSystem Information Request: ' + Date.now());
	var msg = {
		"system": req.app.locals.system.values,
		"effects": req.app.locals.effects
	};
	res.send(msg);
}
exports.get_system_value = function(req,res) {
	var value;
	if (req.params.key in req.app.locals.system.values) {
		value = req.app.locals.system.values[req.params.key];
		res.send(value);
	} else {
		res.send("Key Not Found.")
	}

}
