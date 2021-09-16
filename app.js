//CONFIG APP
const envConfig 	 = require("./config/env"),
	  mongoose 	     = require("./config/database"),
	  express 		 = require("./config/express"),
	  passportConfig = require("./config/passport");

const env	   = envConfig(),
	  db  	   = mongoose(),
      app 	   = express(),
	  passport = passportConfig();

// START THE SERVER
app.listen(process.env.PORT, process.env.IP, function(){
	console.log('server has started');
});