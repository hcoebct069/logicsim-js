aNum = 0;
oNum = 0;
nNum = 0;
iNum = 0;
waitingForLine = false;
lines = {};
mainShapes = {};
mainInputs = {};
canvas = new fabric.Canvas("canvas");
window.onload = function() {
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	wid = w.innerWidth || e.clientWidth || g.clientWidth,
	hei = w.innerHeight || e.clientHeight || g.clientHeight;

	var header = document.getElementsByTagName('header')[0];
	var head_h = header.offsetHeight;

	canvas.setBackgroundColor("#fff")
	canvas.setWidth(wid);
	canvas.setHeight(hei - head_h);
	canvas.selectable = false;
	closeArea = new fabric.Rect({
		width: 100,
		height: canvas.height,
		left: canvas.width - 100,
		top: 0,
		fill: "#fff",
		selectable: false
	})
	clearAreaBtn = new fabric.Rect({
		top: 10,
		left: 10,
		padding: 10,
		text: 'Clear',
		stroke: "#888",
		strokeWidth: 1,
		width: 100,
		height: 30,
		fill: "#fff"
	})
	canvas.add(closeArea)
	canvas.renderAll()

	canvas.on('mouse:down', function(o) {
		if (waitingForLine) {
			canvas.forEachObject(function(o) {
				o.set({"stroke":"#666","strokeWidth":1});
			});
			closeArea.set({"stroke":"#fff"});
			canvas.renderAll();
			canvas.selectable=false;
			console.log(o)
			if(o.target!==undefined){
				curr = o.target.id;
				if(o.target.dataType=="shape"){
					getShape=mainShapes;
				}else{
					getShape=mainInputs;
				}
				getShape[curr].shape.set({"stroke":"#49c","strokeWidth":2});
				canvas.renderAll();
				if (!lines.hasOwnProperty(curr)) {
					lines[curr] = {
						to: []
					}
				}
			}
		}
	})
	canvas.on('mouse:up', function(o) {
		if (waitingForLine) {
			if(o.target!==undefined){
				if(o.target.dataType=="shape"){
					getShape=mainShapes;
				}else{
					getShape=mainInputs;
				}
				getShape[o.target.id].shape.set({"stroke":"#49c","strokeWidth":2});
				canvas.renderAll();
				if (lines[curr].to.indexOf(o.target.id) == -1) lines[curr].to.push(o.target.id);
				renderLines();
			}
		}
	})

	function renderLines() {
		console.log("Rendering");
		for(i in lines){
			console.log(i,lines[i])
		}
	}
}
