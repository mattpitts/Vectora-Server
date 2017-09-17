const bcrypt = require('bcrypt');

const userSeed =
	[
		{
			username: 'default',
			email: 'default@default.com',
			password: bcrypt.hashSync('password', 8)
		}
	];


module.exports = userSeed;
