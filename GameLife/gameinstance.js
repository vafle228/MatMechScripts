export default class GameInstance {
    constructor(width, height) {
        this._field = new Array(width);

        for (let i = 0; i < width; i++)
            this._field[i] = new Array(height);
    }

    
}