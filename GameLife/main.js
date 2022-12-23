let game_instance, interval_id;

function newGameInstance(random = 0) {
    const row = parseInt(document.getElementById("row").value);
    const col = parseInt(document.getElementById("col").value);

    game_instance = new GameInstance(row, col, random);
}

function next() { game_instance.nextGeneration(); }

function random() { newGameInstance(0.4); }

function stop() { clearInterval(interval_id); }

function start() { stop(); interval_id = setInterval(next, 200); }
