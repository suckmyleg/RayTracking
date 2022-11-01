function on_load()
{
    var view2d = document.getElementById('View2d');
	var view3d = document.getElementById('View3d');

	view3d.innerHTML = "Hail";


    DrawView2d(view2d);
}

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Esquina {
    constructor(xi, yi, xf, yf){
        this.xi = xi;
        this.yi = yi;
        this.xf = xf;
        this.yf = yf;
    }
}

class VistaJugador {
    constructor(x, y, angulo){
        this.x = x;
        this.y = y;
        this.angulo = angulo;
    }

    point (){
        return {x: this.x, y: this.y}
    }
}

var Vista = new VistaJugador(5,225, 50);

function DrawView2d(view2d) {

    ctx = view2d.getContext("2d");
    
    //dibujar fondo
    drawRect(ctx, 0, 0, view2d.width, view2d.height, "white")
    //dibujar jugador
    drawLine(ctx, Vista.point(), new Point(5, 399));
    //dibujar cono de vision
    drawVision(ctx, Vista.point());

}

function drawVision(ctx){
    //calcular puntos de colision de la vista con el techo y el suelo
    puntos = calcularCono();
    drawLine(ctx, Vista.point(), puntos.techo, "red");
    drawLine(ctx, Vista.point(), puntos.suelo, "red");
}

function calcularCono() {
    tan = getTanFromDegrees(Vista.angulo/2);
    //punto techo
    x = Vista.x + (Vista.y/tan);
    y = 0;
    puntoTecho = {x: x, y: y};
    //punto suelo
    x = Vista.x + (175/tan);
    y = 399;
    puntoSuelo = {x: x, y: y};

    puntos = {techo: puntoTecho, suelo: puntoSuelo};
    return puntos;
}

function getTanFromDegrees(degrees) {
    return Math.tan(degrees * Math.PI / 180);
}

function drawRect(ctx, x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke)
        ctx.strokeStyle = stroke;

    if (width)
        ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(begin.x+0.5, begin.y+0.5);
    ctx.lineTo(end.x+0.5, end.y+0.5);
    ctx.stroke();
}

function key_pressed()
{

}

function mouse_position()
{
	event = window.event;

	mouse_position = {"x":e.clientX, "y":e.clientY};

	on_mouse_moved(mouse_position)

	var t = setTimeout(mouse_position,100);
}

function on_mouse_moved(position)
{
	vista.x = position.x;
	vista.y = position.y;
}