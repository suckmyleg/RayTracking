var viewAerea;
var Pared;
var Jugador;
var EsquinasMapa;

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

class Vision{
    constructor(punto, angulo = 90, speed = 1){
        this.Pos = punto;
        this.angulo = angulo;
        this.angulos=calcularAngulosEsquinasMapa(this.Pos);
        this.calcularPared();
        this.calcularPuntoPared();
        this.dangulo = 0;
        this.speed = speed;
    }

    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(){
        this.angulos = calcularAngulosEsquinasMapa(this.Pos);
        this.calcularPared();
        this.drawVisionAerea();
    }

    drawVisionAerea(){
        this.calcularPuntoPared();
        drawLine(viewAerea, this.Pos, this.PuntoPared)
    }

    calcularPuntoPared(){
        var rel;
        if(this.pared == 2){
            rel = viewAerea.height-1-this.Pos.y;
            rel /= SenAng(this.angulo);
            var x = CosAng(this.angulo)*rel+this.Pos.x;
            this.PuntoPared = new Point(x ,viewAerea.height-1);
        }
    }

    calcularPared(){
        this.angulo
        this.pared = 3
        for(var i=0; i<EsquinasMapa.length-1; i++){
            if(this.angulo>this.angulos[i]&&this.angulo<this.angulos[i+1])
                this.pared = i;
        }
    }

    update(Pos){
        this.Pos = Pos;
        this.calcularVelocidad();
        this.actualizarAngulo();
        this.draw();
    }

    calcularVelocidad(){
        var dLeft = (Controles.arrowLeft)?this.speed:0;
        var dRight = (Controles.arrowRight)?this.speed:0; 
        this.dangulo = dLeft-dRight;
    }

    actualizarAngulo(){
        this.angulo += this.dangulo;
        if(this.angulo<0)
            this.angulo += 360;
        if(this.angulo>360)
            this.angulo -= 360;
    }
}

class Player{
    constructor(punto, r=5, speed = 1.5){
        this.Pos = punto;
        this.dx = 0;
        this.dy = 0;
        this.r = r;
        this.speed = speed;
        this.Vista = new Vision(this.Pos);
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
        this.draw();
        this.Vista.update(this.Pos);
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

