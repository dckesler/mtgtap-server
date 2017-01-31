import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import './users/twitter.js';
import * as gatherer from './resources/gatherer.resources.js';
import { checkForUser } from './utils/authorization.js';
import { newDeck, userDecks, getUserDeck, updateDeck, deleteDeck } from './decks/deck.hub.js';

const app = express();
const port = 8686;

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(session({resave: false, saveUninitialized: false, secret: "this.props.dipsatch"}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use("/", express.static("../mtgtap/static"));
app.use("/app", checkForUser);
app.use("/app", express.static("../mtgtap/public"));


app.get("/card/:name", gatherer.getCard);

app.get("/auth/twitter", passport.authenticate('twitter'));
app.get("/auth/twitter/callback", passport.authenticate('twitter', {
	successRedirect: '/app',
	failureRedirect: '/',
}));

app.post("/new-deck", checkForUser, newDeck);
app.put("/update-deck/:name", checkForUser, updateDeck);
app.delete("/delete-deck/:name", checkForUser, deleteDeck);
app.get("/user-decks", checkForUser, userDecks);
app.get("/user-deck/:name", checkForUser, getUserDeck);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

