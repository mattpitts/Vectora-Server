const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const express = require('express');
const monk = require('monk');
const bcrypt = require('bcrypt');
const db =  monk(process.env.MONGODB_URI);
const users = db.get('users');
const projects = db.get('projects');

const router = express.Router();

// function validUser(user){
// 	const validEmail = typeof user.email == 'string' && user.email.trim() != '';
// 	const validPassword = typeof user.password == 'string' && user.password.trim() != '';
// 	return validEmail && validPassword;
// }

router.get('/users', (req,res,next) => {
	const data = users.find({});
	return data.then((data) => {
		res.json(data);
	})
});

router.get('/:id/projects', (req,res,next) => {
	console.log(req.params.id);
	return projects.find({ userID: req.params.id })
		.then(data => {
			res.json(data)
		})
})

router.post('/projects', (req,res,next) => {
	console.log(req.body);
	projects.insert(req.body)
		.then(response => {
			res.json(response)
		})
})

router.get('/project', (req,res,next) => {
	const data = projects.find({});
	return data.then((data) => {
		res.json(data);
	})

	// res.json({message: 'users'});
});

module.exports = router;
