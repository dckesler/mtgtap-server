import Deck from './deck.model.js';
import { filter } from 'lodash';

export function newDeck(req, res) {
	Deck.filter({name: req.body.name}).run()
		.then(decks => {
			if (decks.length) return res.status(400).json({msg: "A deck with that name already exists"})
			const newDeck = new Deck({...req.body, userId: req.user.id, cards: []});
			newDeck.save().then(
				result => res.json(result),
				err => res.status(500).json(err)
			)
		}, err => res.status(500).json(err))
}

export function userDecks(req, res) {
	Deck.filter({userId: req.user.id}).run()
		.then(
			result => res.json(result),
			err => res.status(500).json(err)
		)
}

export function getUserDeck(req, res) {
	Deck.filter({userId: req.user.id, name: req.params.name}).run()
		.then(
			result => {
				delete result[0].userId;
				res.json(result[0]);
			},
			err => res.status(500).json(err)
		);
}

export function updateDeck(req, res) {
	delete req.body.id;
	Deck.filter({userId: req.user.id, name: req.params.name})
		.update(req.body).run()
		.then(
			result => res.json(result),
			error => {
				console.log(error);
				res.status(500).json(error)
			}
		);
}

export function deleteDeck(req, res) {
	Deck.filter({userId: req.user.id, name: req.params.name})
		.delete().run()
		.then(
			result => res.json(result),
			error => res.status(500).json(error)
		)
}
