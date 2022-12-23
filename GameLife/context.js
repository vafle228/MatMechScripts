class GameContext {
	static drawField(field) {
		const tbody = document.createElement("tbody");
		
		for (let i = 0; i < field.length; i++) {
			const tr = document.createElement("tr");
			
			for (let j = 0; j < field[i].length; j++)
				tr.appendChild(field[i][j].draw());
			tbody.appendChild(tr);
		}
		return tbody;
	}
}
