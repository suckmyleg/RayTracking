function onloadVistaAerea(){

    cargarVariables();
    dibujarFondo(viewAerea);
    puntoA = new Point(450, 120);
    puntoB = new Point(450, 240);
    Pared = new Wall(puntoA, puntoB);
    Pared.drawViewAerea();
}

