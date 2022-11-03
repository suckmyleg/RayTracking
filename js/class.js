var viewAerea;
var ctxAerea;
var Pared;
var Jugador;

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Wall {
    constructor(puntoA, puntoB){
        this.PuntoA = puntoA; 
        this.PuntoB = puntoB;
        this.dis = calcularDistanciaPuntos(this.PuntoA, this.PuntoB)
    }
    
    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'red', width = 1) {
        drawLine(viewAerea, this.PuntoA, this.PuntoB, color, width);
    }

    update(){
        this.draw()
    }
}

class Player{
    constructor(punto, r=5, speed = 1.5){
        this.Pos = punto;
        this.dx = 0;
        this.dy = 0;
        this.r = r;
        this.speed = speed;
    }

    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'black') {
        drawCircle(viewAerea, this.Pos, this.r, color);
    }

    update(){
        this.calcularVelocidad();
        this.actualizarPos();
        this.draw()
    }

    calcularVelocidad(){

        var dUp = (Controles.up)?this.speed:0;
        var dLeft = (Controles.left)?this.speed:0;
        var dDown = (Controles.down)?this.speed:0;
        var dRight = (Controles.right)?this.speed:0; 
        this.dy = dUp-dDown;
        this.dx = dRight-dLeft;
        var vel = calcularDistanciaPuntos(new Point(0,0), new Point(this.dx, this.dy));
        if(vel>5)
            this.ajustarVelocidad();
    }

    ajustarVelocidad(){
        var vel = calcularDistanciaPuntos(new Point(0,0), new Point(this.dx, this.dy));
        var rel = this.speed/vel;
        this.dx *= rel;
        this.dy *= rel;
    }

    actualizarPos(){
        this.Pos.x+=this.dx;
        this.Pos.y+=this.dy;
    }

}

function drawLine(view, begin, end, stroke = 'black', width = 1){
    beginCanvas = convertirPuntoCanvas(view, begin);
    endCanvas = convertirPuntoCanvas(view, end);
    ctx = view.getContext('2d');
    if (stroke)
        ctx.strokeStyle = stroke;
    if (width)
        ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(beginCanvas.x+0.5, beginCanvas.y+0.5);
    ctx.lineTo(endCanvas.x+0.5, endCanvas.y+0.5);
    ctx.stroke();
}

function dibujarFondo(view){
    drawRect(view, new Point(0, view.height-1), view.width-1, view.height-1, "white");
}

function drawRect(view, punto, w, h, color){
    puntoCanvas = convertirPuntoCanvas(view, punto);
    ctx = view.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(puntoCanvas.x, puntoCanvas.y, w, h);
}

function convertirPuntoCanvas(view ,punto){
    res = new Point(punto.x, punto.y)
    res.y = view.height-res.y;
    return res;
}

function calcularDistanciaPuntos(PuntoA, PuntoB){
    x = PuntoA.x-PuntoB.x;
    y = PuntoA.y-PuntoB.y;
    dis = Math.pow(x, 2)+Math.pow(y, 2);
    dis = Math.sqrt(dis)
    return dis;
}

function limpiarCanvas(view) {
    ctx.clearRect(0, 0, view.width, view.height);
    dibujarFondo(view);
}

function drawCircle(view, punto, r, color){
    puntoCanvas = convertirPuntoCanvas(view, punto);
    ctx = view.getContext("2d");
    ctx.beginPath();
    ctx.arc(puntoCanvas.x, puntoCanvas.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
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

// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(update,1000/framePerSecond);