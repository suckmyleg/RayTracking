Controles = {
    up: false,
    down: false,
    left: false,
    right: false
}

function onloadVistaAerea(){

    cargarVariables();
    dibujarFondo(viewAerea);
    puntoA = new Point(450, 120);
    puntoB = new Point(450, 240);
    Pared = new Wall(puntoA, puntoB);
    Jugador = new Player(new Point(5,5));
    Pared.draw();
    Jugador.draw();
    
}

document.addEventListener("keydown", function(event){

    if (event.key === "w") {
        Controles.up = true;
    }else if (event.key === "a") {
        Controles.left = true;
    }else if (event.key === "s") {
        Controles.down = true;
    }else if (event.key === "d") {
        Controles.right = true;
    }

});

document.addEventListener("keyup", function(event){

    if (event.key === "w") {
        Controles.up = false;
    }else if (event.key === "a") {
        Controles.left = false;
    }else if (event.key === "s") {
        Controles.down = false;
    }else if (event.key === "d") {
        Controles.right = false;
    }

});

