class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	get(){
		return {x: this.x, y: this.y};
	}
}

class Line{
	constructor(a, b){
		this.a = a;
		this.b = b;
	}

	get(){
		return {a:this.a, b:this.b}
	}
}






class Player{
	constructor(x=0, y=0, w=0, h=0, color="black"){
		this.position = new Point(x, y);
		this.size = new Point(w, h);
		this.color = color;
		this.vision = new Vision(this.position);
	}

	get_position()
	{
		return this.position.get();
	}

	get_size()
	{
		return this.size.get();
	}

	get_color(){
		return this.color;
	}

	move_to(point){
		this.position = point;
		this.vision.move_to(point);
	}

	move_to_without_point(x, y){
		this.move_to(new Point(x, y));
	}

	get_vision(){
		return this.vision;
	}
}


class Vision{
	constructor(position, angle, pov=90){
		this.position = position;
		this.pov = pov;
		this.angle = angle;
	}

	move_to(position){
		this.position = position;
	}

	get_position(){
		return this.position.get();
	}
}












class Screen{
	constructor(id){
		this.id = id;
		this.element = document.getElementById(this.id);
		this.ctx = this.element.getContext("2d");

		this.width = this.element.width;
		this.height = this.element.height;

		this.background_color = "white";

		this.objects = [];
	}

	drawPlayer(player){
		this.drawRect(player.get_position(), player.get_size(), player.get_color());
	}

	drawLine(begin, end, stroke = 'black', width = 1){
		if (stroke)
			this.ctx.strokeStyle = stroke;

		if (width)
			this.ctx.lineWidth = width;

		this.ctx.beginPath();
		this.ctx.moveTo(begin[0]+0.5, begin[1]+0.5);
		this.ctx.lineTo(end[0]+0.5, end[1]+0.5);
		this.ctx.stroke();
		this.objects.push(new Line(begin, end));
	}

	empty(){
		this.objects = [];
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
		this.drawRectWithoutPoint(0, 0, this.element.width, this.element.height, this.background_color);
	}

	drawRect(point, size, color){
		this.drawRectWithoutPoint(point.x, point.y, size.x, size.y, color);
	}

	drawRectWithoutPoint(x, y, w, h, color){
		//console.log("Drawing", x, y, w, h, color);
		this.objects.push(new Line({x: x, y: y}, {x: x+w, y: y}));
		this.objects.push(new Line({x: x+w, y: y}, {x: x+w, y: y+h}));

		this.objects.push(new Line({x: x, y: y+h}, {x: x+w, y: y+h}));
		this.objects.push(new Line({x: x, y: y}, {x: x, y: y+h}));

   		this.ctx.fillStyle = color;
    	this.ctx.fillRect(x, y, w, h);
	}

	draw_vision(vision)
	{
		this.drawRect(vision.get_position(), new Point(10, 10), "pink");
	}
}































let d = new Date();

var seconds = d.getSeconds();

var fps = 0;

var counted_fps = 0;

var screen = 2;

var player = new Player(20,0,20,20);

function tick_fps()
{
	counted_fps += 1;

	var d = new Date();

	var new_seconds = d.getSeconds();

	if (new_seconds != seconds)
	{
		seconds = new_seconds;
		fps = counted_fps;
		counted_fps = 0;
	}
}

function on_load2d()
{
	setup_main("View2d", 0, 60);
}

onmousemove = function mouse_position_2d(event)
{
	player.move_to_without_point(event.clientX-17.5, event.clientY-17.5);
}

function setup_main(id="View2d", ms=20, target_fps=false)
{
	screen = new Screen(id);
	
	if (target_fps != false)
	{
		ms = 1000/target_fps;
	}

	target_fps = 1000/ms;

	console.log("Rendering in canvas '"+id+"' with max '"+target_fps+"fps' and minim '"+ms+"ms'");

	main_2d(ms);
}

function main_2d(ms)
{
	run_2d();

	var t = setTimeout(function() {main_2d(ms);}, ms);
}

function run_2d()
{
	screen.empty();

	screen.drawPlayer(player);

	screen.draw_vision(player.get_vision());

	tick_fps();

	console.log("Runned", fps);
}

