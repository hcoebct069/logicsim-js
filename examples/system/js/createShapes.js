aCreate = document.getElementById("aCreate");
oCreate = document.getElementById("oCreate");
nCreate = document.getElementById("nCreate");

aCreate.onclick=function(){
	v = shapeAnd("and_"+aNum,Math.random()*canvas.width-100,Math.random()*canvas.height-100)
	mainShapes["and_"+aNum] = {
		shape:v
	}
	aNum++;
}

oCreate.onclick=function(){
	v = shapeOr("or_"+oNum,Math.random()*canvas.width-100,Math.random()*canvas.height-100)
	mainShapes["or_"+oNum] = {
		shape:v
	}
	oNum++;
}

nCreate.onclick=function(){
	v = shapeNot("not_"+nNum,Math.random()*canvas.width-100,Math.random()*canvas.height-100)
	mainShapes["not_"+nNum] = {
		shape:v
	}
	nNum++;
}