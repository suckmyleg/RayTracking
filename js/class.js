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

