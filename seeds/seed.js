require('dotenv').config();
//process.env.MONGODB_URI
const db = require('monk')('localhost:27017/vectora');

const userSeed = require('./userSeed.js');
const projectSeed = require('./projectSeed');
const users = db.get('users');
const projects = db.get('projects');

users.remove();
projects.remove();

users.insert(userSeed).then((result) => {
	console.log(result);
	db.close();
})

projects.insert(projectSeed).then((result) => {
	console.log(result);
	db.close();
})
