const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req,res,next) {
	let token = req.get('Authorization').split(' ')[1];
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if(err) {
			next();
		} else {
			req.user = decoded;
			next();
		}
	})
}

function allowAccess(req,res,next) {
	console.log('asdas');
	console.log(req.params.id);
	console.log(req.user.id);
	if(req.params.id === req.user.id) {

		next();
	} else {
		req.status(401);
		next(new Error('You are not authorized to see this.'))
	}
}


module.exports = {
	checkTokenSetUser,
	allowAccess
}
