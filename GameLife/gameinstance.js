class GameInstance {
    constructor(row, col, random = 0) {
        this._field = new Array(row);
        this._table_field = document.getElementById("field");

        this._width = col; this._heigth = row;
        
        for (let i = 0; i < row; i++) {
            this._field[i] = new Array(col);
            for (let j = 0; j < col; j++) 
                this._field[i][j] = new Cell(Math.random() < random);
        }
        this.refreshField();
    }

    refreshField() { 
        this._table_field.replaceChild(
            GameContext.drawField(this._field), this._table_field.firstChild
        );
    }

    nextGeneration() {
        const to_change = new Array();

        for (let i = 0; i < this._field.length; i++)
            for (let j = 0; j < this._field[i].length; j++) {
                const neighbors_k = this._checkNeighbors(i, j);

                if (!this._field[i][j].isAlive() && neighbors_k === 3) 
                    to_change.push(this._field[i][j]);
                
                if (this._field[i][j].isAlive() && (neighbors_k > 3 || neighbors_k < 2))
                    to_change.push(this._field[i][j]);
            }
        to_change.forEach((val) => val.changeLifeStatus());
    }

    _checkNeighbors(row, col) {
        let count = 0;
        
        for (let i = -1; i < 2; i++) {
            const cur_row = this._cycleArr(row, i, this._heigth);
            
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;

                const cur_col = this._cycleArr(col, j, this._width);
                if (this._field[cur_row][cur_col].isAlive()) count++;
            }
        }
        return count;
    }

    _cycleArr(row, index, edge) {
        if (row + index >= edge) return 0;
        if (row + index < 0) return edge - 1;
        
        return row + index;
    }
}