exports.list_fxs = function(req,res) {
	//GET /fxs
	//TODO: Create Config

	var msg = 'Full Effect Array Requested\n time: ' + Date.now() + "\n";
	console.log(msg);
	res.send(JSON.stringify(req.app.locals.effects));
}

exports.enable_fx = function(req,res) {
	//POST /fxs
	//Request to enable client control of req.params.fxId
	//console.log(req);
	console.log('\nRequest to enable fxId: ' + req.body.fxId + '\n' + Date.now() );
	var msg = "";
	if (req.app.locals.effects.Enable_Effect(req.body.fxId)) {
		msg = 'SUCCESS: Enabled fxId: ' + req.body.fxId + '\n' + Date.now();
	} else {
		msg = "FAIL: Request to Enable fxId ";
	}
	console.log('\nResponse to enable fxId: ' + req.body.fxId + '\n' + Date.now() );
	res.send(msg);
}

exports.disable_fxs = function(req,res) {
	//DELETE /fxs
	//turn EVERYTHING off. Disable all fx.
	console.log('Master Shut Off Request');
	res.send('Master Shut Off Request Received' +'\n' + Date.now() );

}

exports.get_fx_details = function(req,res) {
	//GET /fx/:fxId
	//type and state informatiom for req.params.fxId
	console.log('Details request for fxId:'+  req.params.fxId);

	res.send(JSON.stringify(req.app.locals.effects.effect_array[req.params.fxId]));
	//res.send('Details requst for fxId: ' + req.params.fxId);
}

exports.set_fx_state = function(req,res) {
	//POST /fx/:fxId
	//change state of req.params.fxId to req.params.fxState
	console.log('\nState change requested for fxId: ' + req.params.fxId);
	console.log('\nNew State Requested: ' + req.body.fxState);
	var msg;
	if (req.app.locals.effects.CommandEffect(req.params.fxId, req.body.fxState)) {
		msg = "\nSUCCESS: Effect commanded.";
	} else {
		msg = "\nFAIL: Unable to CommandEffect";
	}
	res.send(msg);
}


exports.disable_fx = function(req,res){
	//DELETE /fxs/:fx
	//Turn off and disable client control of req.params.fxId
	console.log('Disable request for fxId: ' + req.params.fxId);
	res.send('Disable request for fxId: ' + req.params.fxId);
}
