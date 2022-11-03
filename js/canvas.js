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
    ctx = view.getContext('2d');
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