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

function validUser(user){
	const validEmail = typeof user.email == 'string' && user.email.trim() != '';
	const validPassword = typeof user.password == 'string' && user.password.trim() != '';
	return validEmail && validPassword;
}

router.post('/auth/login', (req,res,next) => {
	if(validUser(req.body)) {
		users.findOne({ email: req.body.email })
			.then(user => {
				if(user) {
					bcrypt.compare(req.body.password, user.password)
						.then(result => {
							if(result) {
								jwt.sign({
									id: user._id,
								}, process.env.TOKEN_SECRET, {
									expiresIn: '7d'
								}, (err, token) => {
									res.json({
										userID: user._id,
										username: user.username,
										token,
										message: 'You Are Successfully Logged In'
									});
								});
							} else {
								console.log('invalid');
								next(new Error('Invalid Password'));
							}
						})
				}
			})
	}
})

router.post('/auth/signup', (req,res,next) => {
	if(validUser(req.body)) {
		users.findOne({ email: req.body.email})
			.then(user => {
				if(user) {
					next(new Error('Email in use'))
				} else {
					let newUser = req.body
					bcrypt.hash(req.body.password, 8)
					.then(hash => {
						newUser.password = hash;
						users.insert(newUser)
							.then(user => {
								jwt.sign({
									id: user._id,
									}, process.env.TOKEN_SECRET, {
										expiresIn: '7d'
									}, (err, token) => {
										res.json({
											username: user.username,
											userID: user._id,
											token: token,
											message: 'Success!'
										});
									});
							});
					})
				}
			})
	}
})


module.exports = router;
