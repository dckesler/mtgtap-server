import tutor from 'tutor';
import { find } from 'lodash';

export function getCard(req, res) {
	tutor.card(req.params.name, (err, card) => {
		if (err) return gathererError(res, err);
		if (!card) return gathererError(res, {msg: `${req.params.name} is not in the gatherer database.`})

		const transformObj = find(
			transformPairs,
			pair => pair.start === card.name || pair.transformed === card.name
		);
		if (!transformObj) return res.json(card);

		const isTransformed = card.name !== transformObj.start ? true : false;
		tutor.card(
			isTransformed ? transformObj.start : transformObj.transformed,
			(error, flipCard) => {
				if (error) return gathererError(res, error);
				if (isTransformed) {
					flipCard.transform = card;
					res.json(flipCard);
				} else {
					card.transform = flipCard;
					res.json(card);
				}
		});
	})
}

function gathererError(res, error) {
	res.status(400).json({msg: "Gatherer Error", error});
}

export function findTransform(cardName) {
	const pair = find(
		transformPairs,
		pair => pair.start === cardName || pair.transformed === cardName
	);
}

const transformPairs = [
	{
		start: "Aberrant Researcher",
		transformed: "Perfected Form"
	},
	{
		start: "Accursed Witch",
		transformed: "Infectious Curse"
	},
	{
		start: "Afflicted Deserter",
		transformed: "Werewolf Ransacker",
	},
	{
		start: "Archangel Avacyn",
		transformed: "Avacyn, the Purifier",
	},
	{
		start: "Arlinn Kord",
		transformed: "Arlinn, Embraced by the Moon",
	},
	{
		start: "Autumnal Gloom",
		transformed: "Ancient of the Equinox",
	},
	{
		start: "Avacynian Missionaries",
		transformed: "Lunarch Inquisitors",
	},
	{
		start: "Thing in the Ice",
		transformed: "Awoken Horror",
	},
	{
		start: "Hanweir Watchkeep",
		transformed: "Bane of Hanweir",
	},
	{
		start: "Bloodline Keeper",
		transformed: "Lord of Lineage",
	},
	{
		start: "Convicted Killer",
		transformed: "Branded Howler",
	},
	{
		start: "Breakneck Rider",
		transformed: "Neck Breaker",
	},
	{
		start: "Chalice of Life",
		transformed: "Chalife of Death",
	},
	{
		start: "Chandra, Fire of Kaladesh",
		transformed: "Chandra, Roaring Flame",
	},
	{
		start: "Chosen of Markov",
		transformed: "Markov's Servant",
	},
	{
		start: "Civilized Scholar",
		transformed: "Homicidal Brute",
	},
	{
		start: "Cloistered Youth",
		transformed: "Unholy Fiend",
	},
	{
		start: "Convicted Killer",
		transformed: "Branded Howler",
	},
	{
		start: "Daring Sleuth",
		transformed: "Bearer of Overwhelming Truths",
	},
	{
		start: "Daybreak Ranger",
		transformed: "Nightfall Predator",
	},
	{
		start: "Delver of Secrets",
		transformed: "Insectile Aberration",
	},
	{
		start: "Kindly Stranger",
		transformed: "Demon-Posessed Witch",
	},
	{
		start: "Duskwatch Recruiter",
		transformed: "Krallenhorde Howler",
	},
	{
		start: "Elbrus, the Binding Blade",
		transformed: "Withengar Unbound",
	},
	{
		start: "Elusive Tormentor",
		transformed: "Insidious Mist",
	},
	{
		start: "Kessig Forgemaster",
		transformed: "Flameheart Werewolf",
	},
	{
		start: "Garruk Relentless",
		transformed: "Garruk, the Veil-Cursed",
	},
	{
		start: "Gatstaf Arsonists",
		transformed: "Gatstaf Ravagers",
	},
	{
		start: "Gatstaf Shepherd",
		transformed: "Gatstaf Howler",
	},
	{
		start: "Geier Reach Bandit",
		transformed: "Vildin-Pack Alpha",
	},
	{
		start: "Grizzled Outcasts",
		transformed: "Krallenhorde Wantons",
	},
	{
		start: "Hanweir Militia Captain",
		transformed: "Westvale Cult Leader",
	},
	{
		start: "Harvest Hand",
		transformed: "Scrounged Scythe",
	},
	{
		start: "Heir of Falkenrath",
		transformed: "Heir to the Night",
	},
	{
		start: "Hermit of the Natterknolls",
		transformed: "Lone Wolf of the Natterknolls",
	},
	{
		start: "Hinterland Hermit",
		transformed: "Hinterland Scourge",
	},
	{
		start: "Hinterland Logger",
		transformed: "Timber Shredder",
	},
	{
		start: "Mayor of Avabruck",
		transformed: "Howlpack Alpha",
	},
	{
		start: "Villagers of Estwald",
		transformed: "Howlpack of Estwald",
	},
	{
		start: "Huntmaster of the Fells",
		transformed: "Ravager of the Fells",
	},
	{
		start: "Instigator Gang",
		transformed: "Wildblood Pack",
	},
	{
		start: "Village Ironsmith",
		transformed: "Ironfang",
	},
	{
		start: "Jace, Vryn's Prodigy",
		transformed: "Jace, Telepath Unbound",
	},
	{
		start: "Kruin Outlaw",
		transformed: "Terror of Kruin Pass",
	},
	{
		start: "Kytheon, Hero of Akros",
		transformed: "Gideon, Battle-Forged",
	},
	{
		start: "Lambholt Pacifist",
		transformed: "Lambholt Butcher",
	},
	{
		start: "Lambholt Elder",
		transformed: "Silverpelt Werewolf",
	},
	{
		start: "Liliana, Heretical Healer",
		transformed: "Liliana, Defiant Necromancer",
	},
	{
		start: "Loyal Cathar",
		transformed: "Unhallowed Cathar",
	},
	{
		start: "Ludevic's Test Subject",
		transformed: "Ludevic's Abomination",
	},
	{
		start: "Reckless Waif",
		transformed: "Merciless Predator",
	},
	{
		start: "Mondronen Shaman",
		transformed: "Tovolar's Magehunter",
	},
	{
		start: "Village Messenger",
		transformed: "Moonrise Intruder",
	},
	{
		start: "Scorned Villager",
		transformed: "Moonscarred Werewolf",
	},
	{
		start: "Neglected Heirloom",
		transformed: "Ashmouth Blade",
	},
	{
		start: "Nissa, Vastwood Seer",
		transformed: "Nissa, Sage Animist",
	},
	{
		start: "Solitary Hunter",
		transformed: "One of the Pack",
	},
	{
		start: "Pious Evangel",
		transformed: "Wayward Disciple",
	},
	{
		start: "Tormented Pariah",
		transformed: "Rampaging Werewolf",
	},
	{
		start: "Ravenous Demon",
		transformed: "Archdemon of Greed",
	},
	{
		start: "Sage of Ancient Lore",
		transformed: "Werewolf of Ancient Hunger",
	},
	{
		start: "Screeching Bat",
		transformed: "Stalking Vampire",
	},
	{
		start: "Skin Invasion",
		transformed: "Skin Shedder",
	},
	{
		start: "Soul Seizer",
		transformed: "Ghastly Haunting",
	},
	{
		start: "Startled Awake",
		transformed: "Persistent Nightmare",
	},
	{
		start: "Thraben Gargoyle",
		transformed: "Stonewing Antagonizer",
	},
	{
		start: "Thraben Sentry",
		transformed: "Thraben Militia",
	},
	{
		start: "Town Gossipmonger",
		transformed: "Incited Rabble",
	},
	{
		start: "Ulvenwald Mystics",
		transformed: "Ulvenwald Primordials",
	},
	{
		start: "Uninvited Geist",
		transformed: "Unimpeded Trespasser",
	},
	{
		start: "Westvale Abbey",
		transformed: "Ormendahl, Profane Prince",
	},
	{
		start: "Wolfbitten Captive",
		transformed: "Krallenhorde Killer",
	},
	{
		start: "Voldaren Pariah",
		transformed: "Abolisher of Bloodlines",
	},
	{
		start: "Conduit of Storms",
		transformed: "Conduit of Emrakul",
	},
	{
		start: "Cryptolith Fragment",
		transformed: "Aurora of Emrakul",
	},
	{
		start: "Curious Homunculus",
		transformed: "Voracious Reader",
	},
	{
		start: "Docent of Perfection",
		transformed: "Final Iteration",
	},
	{
		start: "Extricator of Sin",
		transformed: "Extricator of Flesh",
	},
	{
		start: "Grizzled Angler",
		transformed: "Grisly Anglerfish",
	},
	{
		start: "Kessig Prowler",
		transformed: "Sinuous Predator",
	},
	{
		start: "Lone Rider",
		transformed: "It That Rides as One",
	},
	{
		start: "Shrill Howler",
		transformed: "Howling Chorus",
	},
	{
		start: "Smoldering Werewolf",
		transformed: "Erupting Dreadwolf",
	},
	{
		start: "Tangleclaw Werewolf",
		transformed: "Fibrous Entangler",
	},
	{
		start: "Ulrich of the Krallenhorde",
		transformed: "Ulrich, Uncontested Alpha",
	},
	{
		start: "Ulvenwald Captive",
		transformed: "Ulvenwald Abomination",
	},
	{
		start: "Vildin-Pack Outcast",
		transformed: "Dronepack Kindred",
	},
	{
		start: "Bruna, the Fading Light",
		transformed: "Brisela, Voice of Nightmares",
	},
	{
		start: "Gisela, the Broken Blade",
		transformed: "Brisela, Voice of Nightmares",
	},
	{
		start: "Graf Rats",
		transformed: "Chittering Host",
	},
	{
		start: "Hanweir Battlements",
		transformed: "Hanweir, the Writhing Township",
	},
	{
		start: "Hanweir Garrison",
		transformed: "Hanweir, the Writhing Township",
	},
	{
		start: "Midnight Scavengers",
		transformed: "Chittering Host",
	},
];
