import Deck from '../decks/deck.model.js';
import thinky from '../utils/thinky.js';
const type = thinky.type;

const User = thinky.createModel("User", {
	name: type.string(),
	socialId: type.string(),
});

User.hasMany(Deck, "decks", "id", "userId");

export default User;
