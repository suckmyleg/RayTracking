function on_load()
{
	var view3d = document.getElementById('View3d');

	view3d.innerHTML = "Hail";
}

function key_pressed()
{

}

function mouse_position()
{
	event = window.event;

	mouse_position = {"x":e.clientX, "y":e.clientY];

	on_mouse_moved(mouse_position)

	var t = setTimeout(mouse_position,100);
}

function on_mouse_moved(position)
{

}