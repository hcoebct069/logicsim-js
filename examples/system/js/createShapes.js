aCreate = document.getElementById("aCreate");
oCreate = document.getElementById("oCreate");
nCreate = document.getElementById("nCreate");
iCreate = document.getElementById("iCreate");

aCreate.onclick=function(){
	v = shapeAnd("and_"+aNum,100+Math.random()*(canvas.width-100),100+Math.random()*(canvas.height-100))
	mainShapes["and_"+aNum] = {
		shape:v
	}
	aNum++;
}

oCreate.onclick=function(){
	v = shapeOr("or_"+oNum,100+Math.random()*(canvas.width-100),100+Math.random()*(canvas.height-100))
	mainShapes["or_"+oNum] = {
		shape:v
	}
	oNum++;
}

nCreate.onclick=function(){
	v = shapeNot("not_"+nNum,100+Math.random()*(canvas.width-100),100+Math.random()*(canvas.height-100))
	mainShapes["not_"+nNum] = {
		shape:v
	}
	nNum++;
}

iCreate.onclick=function(){
	var inp = new fabric.IText('0',{
		fontFamily:'Source Sans Pro',
		left:100+Math.random()*(canvas.width-100),
		top:100+Math.random()*(canvas.height-100),
		fontSize:20,
		hasControls:false,
		transparentCorners:false,
		padding:5,
		type:"number"
	})
	inp.set({id:"ip_"+iNum});
	mainInputs["ip_"+iNum] = inp;
	iNum++;
	canvas.add(inp)
}