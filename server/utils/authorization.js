export function checkForUser(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect("/")
	}
}
