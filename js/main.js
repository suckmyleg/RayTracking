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

class Recta {
    constructor(puntoA, puntoB = Vista.point()){
        this.m = calcularPendienteRecta(puntoA, puntoB);
        this.b = calcularComponenteRecta(puntoA, this.m);
        this.puntoA = puntoA;
        this.puntoB = puntoB;
        //console.log(this);
    }
    draw (ctx, color = "black"){
        drawLine(ctx, this.puntoA, this.puntoB, color);
    }
}

class Esquina {
    constructor(xi, yi, xf, yf){
        this.inicio = {x: xi, y: yi};
        this.final = {x: xf, y: yf};
    }
}

class Screen {
    constructor(ScreenTop, ScreenBot){
        this.ScreenTop = ScreenTop;
        this.ScreenBot = ScreenBot;
    }

    draw(ctx, color = "green"){
        drawLine(ctx, this.ScreenBot, this.ScreenTop, color);
    }
}

class VistaJugador {
    constructor(x, y, angulo){
        this.x = x;
        this.y = y;
        this.angulo = angulo;
        this.calcularCono();
        var ScreenTop = this.calcularScreenTop();
        var ScreenBot = this.calcularScreenBot();
        this.Screen = new Screen (ScreenTop, ScreenBot);
    }

    point (){
        return {x: this.x, y: this.y};
    }

    calcularCono() {
        var tan = getTanFromDegrees(this.angulo/2);
        //punto techo
        var x = this.x + (this.y/tan);
        var y = 0;
        var techo = {x: x, y: y};
        this.RectaTecho = new Recta (techo, this.point());
        //punto suelo
        var x = this.x + (175/tan);
        var y = 399;
        var suelo = {x: x, y: y};
        this.RectaSuelo = new Recta (suelo, this.point());
    }

    drawVision(ctx, color = "red"){
        this.RectaSuelo.draw(ctx, color);
        this.RectaTecho.draw(ctx, color);
    }

    calcularScreenTop(dis = 50){
        var x = this.x + dis;
        var y = this.RectaTecho.m * x + this.RectaTecho.b;
        return {x: x, y: y};
    }

    calcularScreenBot(dis = 50){
        var x = this.x + dis;
        var y = this.RectaSuelo.m * x + this.RectaSuelo.b;
        return {x: x, y: y};
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
    Vista.drawVision(ctx);
    //crear y dibujar esquina
    Esquina1 = new Esquina(500,399,500,200);
    drawLine(ctx, Esquina1.inicio, Esquina1.final);
    RectaJugadorEsquinaSuelo = new Recta (Esquina1.inicio);
    RectaJugadorEsquinaSuelo.draw(ctx);
    console.log(Vista.Screen);
    Vista.Screen.draw(ctx, "green");
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

function calcularPendienteRecta(puntoA, puntoB){
    //m = ( y2 - y1 )/( x2 - x1 )
    res = puntoB.y-puntoA.y;
    res /= puntoB.x-puntoA.x;
    return res;
}

function calcularComponenteRecta(puntoA, m){
    //b = -x1 * m + y1
    res = -puntoA.x * m + puntoA.y;
    return res;
}