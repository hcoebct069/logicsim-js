aNum = 0;
oNum = 0;
nNum = 0;
iNum = 0;
lNum = 0;
waitingForLine = false;
lines = {};
mainShapes = {};
mainInputs = {};
mainLines = {};
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
		selectable: false,
		id: "closeArea"
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
				o.set({
					"stroke": "#666",
					"strokeWidth": 1
				});
			});
			closeArea.set({
				"stroke": "#fff"
			});
			canvas.renderAll();
			canvas.selectable = false;
			if (o.target !== undefined) {
				curr = o.target.id;
				if (o.target.dataType == "shape") {
					getShape = mainShapes;
				} else {
					getShape = mainInputs;
				}
				getShape[curr].shape.set({
					"stroke": "#49c",
					"strokeWidth": 2
				});
				canvas.renderAll();
				if (!lines.hasOwnProperty(curr)) {
					lines[curr] = {
						to: {}
					}
				}
			}
		}
	})
	canvas.on('mouse:move', function(o) {
		if (o.e.x > (canvas.width - 180)) {
			closeArea.set({
				"fill": "#f00",
				"opacity": ".5"
			});
			canvas.renderAll();

		} else {
			closeArea.set("fill", "#fff");
			canvas.renderAll();
		}
	})
	canvas.on('mouse:up', function(o) {
		if (waitingForLine) {
			if (o.target !== undefined) {
				if (o.target.dataType == "shape") {
					getShape = mainShapes;
				} else {
					getShape = mainInputs;
				}
				getShape[o.target.id].shape.set({
					"stroke": "#49c",
					"strokeWidth": 2
				});
				canvas.renderAll();
				lines[curr].to[o.target.id] = true;

				renderLines();
			}
		}

		if (o.target !== undefined) {
			if (o.target.left > (canvas.width - 200)) {
				delete mainShapes[o.target.id];
				delete mainInputs[o.target.id];
				delete lines[o.target.id];
				canvas.remove(o.target);
				//renderLines();
			}
		}
	})

	canvas.on('object:moving',function(o){
		renderLines();
	})

}

function renderLines() {
	canvas.renderAll();
	for (i in lines) {
		if (mainShapes.hasOwnProperty(i)) source = mainShapes[i];
		else source = mainInputs[i];
		for (j in lines[i].to) {
			if (mainShapes.hasOwnProperty(j)) destination = mainShapes[j];
			else destination = mainInputs[j];
			drawLine(source, destination);
		}
	}
}

function drawLine(s, d) {
	if (s.shape.id != d.shape.id) {
		l = new fabric.Line([s.shape.left + s.shape.width, s.shape.top + s.shape.height / 2, d.shape.left, d.shape.top + d.shape.height * 0.25], {
			stroke: "#666",
			top: s.shape.top + s.shape.height / 2,
			left: s.shape.left + s.shape.width,
			selectable: false,
			id: "ln_" + lNum,
			dataType: "line",
			from: s.shape.id,
			to: d.shape.id
		})
		canvas.remove(lines[s.shape.id].to[d.shape.id])
		canvas.add(l);
		lines[s.shape.id].to[d.shape.id] = l;
	}
}
