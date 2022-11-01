function get_parts_cubo(p, s){
	parts = []
	
	parts.push(new Line({x: p.x, y: p.y}, {x: p.x+s.w, y: p.y}));
	parts.push(new Line({x: p.x+s.w, y: p.y}, {x: p.x+s.w, y: p.y+s.h}));

	parts.push(new Line({x: p.x, y: p.y+s.h}, {x: p.x+s.w, y: p.y+s.h}));
	parts.push(new Line({x: p.x, y: p.y}, {x: p.x, y: p.y+s.h}));

	return parts
}



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

class Part{
	constructor(a, b){
		this.line = new Line(a, b);
	}

	get_line(){
		return this.line;
	}
}



class FisicObject{
	constructor(position = new Point(0,0), size = new Point(0,0), parts = []){
		this.position = position;
		this.size = size;

		this.parts = parts;
	}



	get_parts(){
		return this.parts;
	}

	get_position(){
		return this.position;
	}

	move_to(position){
		this.position = position;
	}

	get_size(){
		return this.size;
	}
}




class Cubo{
	constructor(position, size){
		parts = get_parts_cubo(position, size);

		this.fisicObject = new FisicObject(position, size, parts);
	}

	get_object(){
		return this.fisicObject;
	}
}

class Wall{
	constructor(position, size){
		this.fisicObject = new FisicObject(position, [
			new Line({x: position.x, y: position.y}, 
				{x: position.x+size.w, y: position.y+size.h})])

	}

	get_object(){
		return this.fisicObject;
	}
}




class Entity{
	constructor(position, size, type="cubo", color="black"){
		if (type == "cubo"){
			this.entity = new Cubo(position, size);
		} else if (type == "wall"){
			this.entity = new Wall(position, size);
		}
		else{
			this.entity = new Cubo(position, size);
		}

		this.vision = new Vision(position);
		this.color = color;
	}

	get_color(){
		return this.color;
	}

	get_vision(){
		return this.vision;
	}

	get_entity(){
		return this.entity;
	}

	move_to(position){
		this.vision.move_to(position);
		this.entity.get_object().move_to(position);
	}

	get_position(){
		return this.entity.get_object().get_position();
	}

	get_size(){
		return this.entity.get_object().get_size();
	}
}



class Player{
	constructor(x=0, y=0, w=0, h=0, color="black"){
		this.entity = new Entity(new Point(x, y), new Point(w, h));
		this.color = color;
	}

	get_object(){
		return this.entity;
	}

	get_position()
	{
		return this.entity.get_position();
	}

	get_size()
	{
		return this.entity.get_size();
	}

	get_color(){
		return this.color;
	}

	move_to(point){
		this.entity.move_to(point);
	}

	move_to_without_point(x, y){
		this.move_to(new Point(x, y));
	}

	get_vision(){
		return this.entity.get_vision();
	}
}


class Vision{
	constructor(position, angle, pov=90){
		this.pov = pov;
		this.angle = angle;

		this.object = new FisicObject(position,new Point(0,0), [
		new Line(position, new Point(position.get().x + 10, position.get().y+10))]);
	}

	move_to(position){
		this.object.move_to(position);
	}

	get_position(){
		return this.object.position.get();
	}
}





// Player(x, y, w, h, color)

// Player.Entity(position, size, type, color)

// Player.Entity.vision(position, angle, pov)

// Player.Entity.Object(position, size)

// Player.Entity.Object.FisicalObject(position, size, parts)

// Player.Entity.Object.FisicalObject.position

// Player.Entity.Object.FisicalObject.size




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

	drawEntity(entity){
		this.drawRect(entity.get_position().get(), entity.get_size().get(), entity.get_color());
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






























// SETUP AND ALL THAT STUFF

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
	setup_main("View2d", 0, 150);
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

	screen.drawEntity(player.entity);

	screen.draw_vision(player.get_vision());

	tick_fps();

	console.log("Runned", fps, seconds);
}




// KEY MAPING AND STUFF LIKE THAT

var holding = false;

function holding_false(){
    holding = false;
}

function holding_true(){
    holding = true;
}

onmousemove = function mouse_position_2d(event)
{
    if (holding) player.move_to_without_point(event.clientX-17.5, event.clientY-17.5);
}