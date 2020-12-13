const jwt = require('jsonwebtoken');

let JWT_KEY = 'secret';

module.exports = (req, res, next)=>{
	try {
		let token = req.headers['x-access-token'] || req.headers.authorization;
		if(token.startsWith('Bearer ')){
			token = token.split(' ')[1];
		}
		const decoded = jwt.verify(token, JWT_KEY);
		req.decoded = decoded;
		next();
	} catch(e) {
		console.log(e);
		return res.statusJson(401, { message: 'Auth failed' });
	}
}