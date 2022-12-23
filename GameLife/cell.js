class Cell {
    constructor(is_alive = false) {
        this._is_alive = is_alive;
        
        this._td = document.createElement("td");
        this._div = document.createElement("div");
        
        this._td.appendChild(this._div);
        this._div.setAttribute("class", this._is_alive ? "alive" : "");
        this._div.addEventListener("click", () => { this.changeLifeStatus(); });
    }

    draw() { return this._td }

    changeLifeStatus() {
        this._is_alive = !this._is_alive;
        this._div.setAttribute("class", this._is_alive ? "alive" : "");
    }

    isAlive() { return this._is_alive; }
}