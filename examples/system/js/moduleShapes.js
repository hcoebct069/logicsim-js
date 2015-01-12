function shapeAnd(id,x,y,size){
	if(size===undefined) size=50;
	var path="M0,0L50,0A50,50 0 0,1 50,100L0,100Z";
	var andShape = new fabric.Path(path);
	andShape.set({
		fill:"#fff",
		stroke:"#666",
		id:id,
		width:100,
		height:100,
		top:y,left:x,
		hasControls:false,
		scaleX:size/50,
		scaleY:size/50
	})
	canvas.add(andShape);
	canvas.renderAll();
	canvas.setActiveObject(andShape);
	return andShape;
}
function shapeOr(id,x,y,size){
	if(size===undefined) size=50;
	var path="M0,0Q150,50,0,100M0,0Q50,50,0,100";
	var orShape = new fabric.Path(path);
	orShape.set({
		fill:"#fff",
		stroke:"#666",
		id:id,
		width:100,
		height:100,
		top:y,left:x,
		hasControls:false,
		scaleX:size/50,
		scaleY:size/50
	})
	canvas.add(orShape);
	canvas.renderAll();
	canvas.setActiveObject(orShape);
	return orShape;
}
function shapeNot(id,x,y,size){
	if(size===undefined) size=50;
	var path="M0,0L75,50L0,100ZM75,50C75,43,85,43,85,50M75,50C75,57,85,57,85,50M75,50C75,43,85,43,85,50M75,50C75,57,85,57,85,50";
	var notShape = new fabric.Path(path);
	notShape.set({
		fill:"#fff",
		stroke:"#666",
		id:id,
		width:100,
		height:100,
		top:y,left:x,
		hasControls:false,
		scaleX:size/50,
		scaleY:size/50
	})
	canvas.add(notShape);
	canvas.renderAll();
	canvas.setActiveObject(notShape);
	return notShape;
}

