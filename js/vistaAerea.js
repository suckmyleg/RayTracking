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

