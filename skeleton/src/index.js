const View = require('./ttt-view.js');
const Game = require('../../solution/game.js');

$(() => {
	const rootEle = $('.ttt')
	const game = new Game();
	new View(game, rootEle);
});


