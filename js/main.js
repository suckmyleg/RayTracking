function onload(){
    cargarVariables();
    puntoA = new Point(450, 120);
    puntoB = new Point(450, 240);
    Pared = new Wall(puntoA, puntoB);
    Jugador = new Player(new Point(5,5));
    start();    
}

function cargarVariables(){
    viewAerea = document.getElementById('ViewAerea');
}

function update(){  
    limpiarCanvas(viewAerea);
    updateAll();
}

function updateAll(){
    Jugador.update()
    Pared.update()
}

function start(){
    // number of frames per second
    let framePerSecond = 50;

    //call the game function 50 times every 1 Sec
    let loop = setInterval(update,1000/framePerSecond);
}
