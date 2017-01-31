import User from './user.model.js';

export function twitterCallback(req, res) {
	res.json(req.user);
}
