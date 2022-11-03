var viewAerea;
var ctxAerea;

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
        drawLine(viewAerea, convertirPuntoCanvas(viewAerea,this.PuntoA), convertirPuntoCanvas(viewAerea,this.PuntoB), color, width);
    }
}

class Player{
    constructor(punto, w=10, h=10){
        this.Pos = punto;
        this.dx = 0;
        this.dy = 0;
        this.width = w;
        this.height = h;
    }

    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'brown') {
        drawRect(viewAerea, this.Pos.x-this.width/2, this.Pos.y+this.height/2, this.width, this.height, color);
    }

}

function drawLine(view, begin, end, stroke = 'black', width = 1) {
    ctx = view.getContext('2d');
    if (stroke)
        ctx.strokeStyle = stroke;
    if (width)
        ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(begin.x+0.5, begin.y+0.5);
    ctx.lineTo(end.x+0.5, end.y+0.5);
    ctx.stroke();
}

function dibujarFondo(view){
    drawRect(view, 0, view.height-1, view.width-1, view.height-1, "white");
}

function drawRect(view, x, y, w, h, color){
    ctx = view.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, view.height-1-y, w, h);
}

function convertirPuntoCanvas(view ,puntoA){
    res = puntoA
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




function cargarVariables(){
    viewAerea = document.getElementById('ViewAerea');
}