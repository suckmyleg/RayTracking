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
        this.puntoA = puntoA; 
        this.puntoB = puntoB;
    }
    
    drawViewAerea(color = 'red', width = 1) {
        drawLine(viewAerea, convertirPuntoCanvas(viewAerea,this.puntoA), convertirPuntoCanvas(viewAerea,this.puntoB), color, width)
    }
}

function drawLine(view, begin, end, stroke = 'black', width = 1) {
    console.log(begin)
    console.log(end)
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

function cargarVariables(){
    viewAerea = document.getElementById('ViewAerea');
}