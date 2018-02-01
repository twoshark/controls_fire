
import gpio from "./gpio_model";

export default class Effects {
  constructor(json_config) {
    var config = JSON.parse(json_config);

    this.name = config.name;
    this.version = config.version;
    this.effect_array = this.build_array(config.parts);
  }

  build_array = function(parts) {

    if (parts!= null && parts.length > 0) {
      if (parts.length > gpio.gpio_pins.length) {
        throw "TOO MANY PARTS. Configure fewer parts.";
      }
      var fxs = [];
      for (var i = 0; i< parts.length; i++) {
        //TODO: do something with the different input types
        //TODO: load initial values from config
        fxs[i] =
        {
            "part" : parts[i],
            "gpio" : "init"
        };
      }
      return fxs;
    } else {
      throw "No Parts Configured.\nYou must configure parts to control fire.";
    }
  }

   build_demo_array = function() {
    //just a dummy array of 12 effects
    var fxs = [];
    for(var i=0; i<12; i++) {
      fxs[i] = "init";
    }
    return fxs;
  }

  info = function() {
    //TODO: pretty print this
    return JSON.stringify(this);
  }

  get_array_details = function() {
    return JSON.stringify(this.effect_array);
  }

  get_effect_details = function(id) {
    return JSON.stringify(this.effect_array[id]);
  }

  command_effect = function(id, state) {
    if(this.effect_array[id].gpio != "Disabled") {
      if (this.set_effect_state(id, state)) {
        console.log("New effect state set");
        return true;
      } else {
        console.log("Failed to set new effect state");
        return false;
      }
    } else {
      console.log("Cannot Command Disabled Effect ID: " + id);
      return false;
    }
  }

  set_effect_state = function(id, state) {
    try {
      //check for valid state
      if (!(state == 1 || state == 0 )) {
        throw "\ninvalid state:" + state + "\nfor id: " + id;
      }
      this.effect_array[id].gpio.Value = state;
      return true;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  enable_effect = function(id) {
    try {
      this.effect_array[id].gpio = new gpio(id, this.mode_test(), 0);
      console.log (this);
      return true;
    }
    catch(err) {
      return false;
    }
  }

  disable_effect = function(id, graceful) {
    try {
      if (graceful) {
        this.effect_array[id].gpio.Value = 0;
      }
      this.effect_array[id].gpio = "Disabled";
      return true;
    }
    catch(err) {
      return false;
    }
  }

  master_shut_off = function(graceful) {
    try {
      this.effect_array.forEach(
        (element) =>
        {
          this.disable_effect(element.id, graceful);
        }
      );
      return true;
    }
    catch(err) {
      return false;
    }
  }

  mode_test = function() {
    //TODO: add Beaglebone black mode
    //only mocking gpio work for now
    return "mock";
  }

  id_check = function(test_id) {
    //TODO: handle the ids better. a db would probably help.
  	if (typeof !isNaN(parseInt(test_id)) && isFinite(test_id)) {
  		if (test_id < this.effect_array.length) {
  			return test_id;
  		}
  		else {
  			return "bad id";
  		}
  	}
    for(var i = 0; i<this.effect_array.length; i++) {
      if (this.effect_array[i].part.name == test_id) {
        return i;
      }
    }
  }
}