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

var vista = VistaJugador(0,0);

function DrawView2d(view2d) {
    
    ctx = view2d.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 100);
    ctx.lineTo(70, 100);
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