function on_load()
{
    var view2d = document.getElementById('View2d');
	var view3d = document.getElementById('View3d');

	view3d.innerHTML = "Hail";

    DrawView2d(view2d);
}


class VistaJugador {
    contructor (x, y){
        this.x = 5;
        this.y = 225;
    }
}

function DrawView2d(view2d) {
    
    ctx = view2d.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 100);
    ctx.lineTo(70, 100);
    ctx.stroke();
}