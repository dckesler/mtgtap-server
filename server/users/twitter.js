import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from './user.model.js';
import thinky from '../utils/thinky.js';

passport.use(new TwitterStrategy(
	{
		consumerKey: "xYCS6FXN3LlYjBVUTT8NYVSzj",
		consumerSecret: "FLBXoWr1uUZWDPUykb9F1OnIdlbexaMDrRGXpSgV0G1AYogL2d",
		callbackURL: "http://localhost:8686/auth/twitter/callback",
	},
	function(token, tokenSecret, profile, done){
		User.filter({socialId: profile.id}).run().then(result => {
			console.log(result.length);
			if (result.length === 1) done(null, result[0]);
			else if (result.length === 0) {
				User.insert({name: profile.displayName, socialId: profile.id}, {returnChanges: true}).run()
					.then(result2 => {
						done(null, result2.changes[0].new_val);
					})
			}
		})
	}
));

