import { 
    FIELD_COLOR, 
    LINE_COLOR, 
    LINE_HEIGHT, 
    CELL_COLOR 
} from "../constants";

export default class Cell {
    constructor (x, y, width, is_alive) {
        this._x = x; 
        this._y = y;
        
        this._width = width;
        this._is_alive = is_alive;
    }

    draw(ctx) {
        if (this._is_alive)
            this._drawOuterRect(ctx)
                ._drawInnerRect(ctx)
                ._drawCell(ctx);
    }

    alive() { this._is_alive = true; }

    dead() { this._is_alive = false; }

    _drawOuterRect(ctx) {
        ctx.fillStyle = `rgb${LINE_COLOR}`;
        ctx.fillRect(this._x, this._y, this._width, this._width);

        return this;
    }

    _drawInnerRect(ctx) {
        ctx.fillStyle = `rgb${FIELD_COLOR}`;
        ctx.fillRect(this._x - LINE_HEIGHT, this._y - LINE_HEIGHT, this.width, this.width);

        return this;
    }

    _drawCell(ctx) {
        ctx.fillStyle = `rgb${CELL_COLOR}`;

        const offset = this._width / 2;
        const radius = this._width - 2 * LINE_HEIGHT;
        ctx.arc(this._x + offset, this._y + offset, radius, 0, Math.PI * 2);
        
        return this;
    }
}