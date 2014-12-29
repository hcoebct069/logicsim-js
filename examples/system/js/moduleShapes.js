function shapeAnd(id,size){
	if(size===undefined) size=50;
	var path="M0,0L50,0A50,50 0 0,1 50,100L0,100Z";
	var andShape = new fabric.Path(path);
	canvas.add(andShape);
	andShape.set({fill:"#fff",stroke:"#666",id:id,width:100,height:100})
	//andShape.set({left:x,top:y})
	canvas.setActiveObject(andShape);
	canvas.renderAll();
	return andShape;
}
function shapeOr(id,size){
	if(size===undefined) size=50;
	var path="M0,0Q150,50,0,100M0,0Q50,50,0,100";
	var orShape = new fabric.Path(path);
	canvas.add(orShape);
	orShape.set({fill:"#fff",stroke:"#666",id:id,width:100,height:100})
	//orShape.set({left:x,top:y})
	canvas.renderAll();
	return orShape;
}
function shapeNot(id,size){
	if(size===undefined) size=50;
	var path="M0,0L75,50L0,100ZM75,50C75,43,85,43,85,50M75,50C75,57,85,57,85,50M75,50C75,43,85,43,85,50M75,50C75,57,85,57,85,50";
	var notShape = new fabric.Path(path);
	canvas.add(notShape);
	notShape.set({fill:"#fff",stroke:"#666",id:id,width:100,height:100})
	//notShape.set({left:x,top:y})
	canvas.renderAll();
	return notShape;
}

