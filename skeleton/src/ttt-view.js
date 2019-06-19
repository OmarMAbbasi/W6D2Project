class View {
	constructor(game, $el) {
		this.game = game;
		this.$el = $el;
		this.setupBoard();
		this.bindEvents();
	}

	bindEvents() {
		$("ul").click(e => {
			const $square = $(e.target);
			this.makeMove($square);
		});
	}

	makeMove($square) {
		let currentPlayer = this.game.currentPlayer;
		let pos = $square.data("pos");
		try {
			this.game.playMove(pos);
			if (currentPlayer === "x") {
				$square.data("owner", "x");
				$square.text("X");
			} else {
				$square.data("owner", "o");
				$square.text("O");
			}
			$square.css("background-color", "white");
		} catch (error) {
			alert(error.msg);
		}

		if (this.game.isOver()) {
			$("ul").off("click");
			if (this.game.winner() !== null) {
				let winner = this.game.winner().toUpperCase();
				let announce = winner + "  WINS!!!!";
				let $h1 = $("<h1>");
				$h1.text(announce);
				$(".ttt").append($h1);
				$(".square").each(function(index, li) {
					let $li = $(li);
					if ($li.text() === winner) {
						$li.attr(
							"style",
							"background-color:green;color:red;"
						);
					} else {
						$li.attr("style", "background-color:white");
					}
				});
			} else {
				let $h1 = $("<h1>").text("Tie!");
				$(".ttt").append($h1);
				$("li").css("color", "red");	
			}
		}
	}

	setupBoard() {
		const $ul = $("<ul>");
		$ul.addClass("board");
		for (let i = 0; i < 9; i++) {
			const $li = $("<li>");
			$li.data("pos", [Math.floor(i / 3), i % 3]);
			$li.addClass("square");
			$ul.append($li);
		}
		this.$el.append($ul);
	}
}


module.exports = View;
