import thinky from '../utils/thinky.js';
const type = thinky.type;

 const Deck = thinky.createModel("Deck", {
	name: type.string().min(1),
	userId: type.string(),
	cards: type.array().schema(type.object().schema({
		name: type.string(),
		image_url: type.string(),
		mana_cost: type.string(),
		converted_mana_cost: type.number(),
		types: type.array().schema(
			type.string().enum(
				["Planeswalker", "Land", "Creature", "Artifact", "Enchantment", "Sorcery", "Instant"]
			)
		),
	})),
});

export default Deck;
