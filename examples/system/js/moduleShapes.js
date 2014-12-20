function shapeAnd(x,y,size){
	context.strokeStyle="#666";
	context.beginPath();
	context.translate(0.5,0.5);
	context.moveTo(x,y);
	context.lineTo(x+size,y);
	context.arc(x+size,y+size,size,-Math.PI/2,Math.PI/2,false);
	context.lineTo(x,y+size*2);
	context.closePath();
	context.stroke();
}
function shapeOr(x,y,size){
	context.strokeStyle="#666";
	context.beginPath();
	context.translate(0.5,0.5);
	context.moveTo(x,y);
	context.quadraticCurveTo(x+size*3,y+size,x,y+size*2);
	context.quadraticCurveTo(x+size,y+size,x,y);
	context.stroke();
}
function shapeNot(x,y,size){
	context.strokeStyle="#666";
	context.beginPath();
	context.translate(0.5,0.5);
	context.moveTo(x,y);
	context.lineTo(x+size*1.5,y+size);
	context.lineTo(x,y+size*2);
	context.closePath();
	context.moveTo(x+size*1.5,y+size)
	context.arc(x+size*1.5+4,y+size,4,Math.PI,Math.PI*4,false);
	context.stroke();
}
