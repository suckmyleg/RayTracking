
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
        this.altura = this.ScreenBot.y-this.ScreenTop.y;
    }

    draw(ctx, color = "green"){
        drawLine(ctx, this.ScreenBot, this.ScreenTop, color);
    }

    calcularInterseccion(Recta){
        var x = this.ScreenBot.x;
        var y = Recta.m * x + Recta.b;
        return {x: x, y: y};
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

    change_x_y(x, y)
    {
        this.x = x;
        this.y = y;
    }

    forward_x_y(x, y)
    {
        this.x += x;
        this.y += y;
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

function DrawView2d(view2d, view3d) {

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
    Vista.Screen.draw(ctx);

    //dibujamos 
    RectaJugadorEsquinaSuelo = new Recta (Esquina1.inicio);
    RectaJugadorEsquinaSuelo.draw(ctx, "blue");

    RectaJugadorEsquinaTecho = new Recta (Esquina1.final);
    RectaJugadorEsquinaTecho.draw(ctx, "blue");

    //Calcular puntos de interseccion de la esquina con la pantalla
    PuntoScreenEsquina1Suelo = Vista.Screen.calcularInterseccion(RectaJugadorEsquinaSuelo);
    PuntoScreenEsquina1Techo = Vista.Screen.calcularInterseccion(RectaJugadorEsquinaTecho);

    //dibujamos vista "3d"
    DrawView3d(view3d, PuntoScreenEsquina1Suelo, PuntoScreenEsquina1Techo);

}

function DrawView3d(view3d, puntoA, puntoB){

    ctx = view3d.getContext("2d");
    
    //dibujar fondo
    drawRect(ctx, 0, 0, view3d.width, view3d.height, "green");

    //ajustar puntos a la altura de la pantalla
    puntoA = ajustarAltura(puntoA.y, view3d.width, view3d.height);
    puntoB = ajustarAltura(puntoB.y, view3d.width, view3d.height);

    //dibujar suelo hasta pared
    origen = {x: view3d.width/2, y: 399};
    drawLine(ctx, origen, puntoA, "grey",5);
    drawLine(ctx, puntoA, puntoB, "black",5);

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

function ajustarAltura(punto, width, height){
    res = {x:width/2, y:0};
    punto -= Vista.Screen.ScreenTop.y;
    res.y = (punto * height)/Vista.Screen.altura;
    return res;
}


















function key_pressed()
{
    
}

onmousemove = function (event)
{
    Vista.change_x_y(event.clientX-8, event.clientY-9)
}

function on_load()
{
    var view2d = document.getElementById('View2d');
    var view3d = document.getElementById('View3d');
    main(view2d, view3d);
}

function main(view2d, view3d)
{
    DrawView2d(view2d, view3d);

    //var t = setTimeout(function() {main(view2d);}, 10);
}