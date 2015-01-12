aNum=0;
oNum=0;
nNum=0;
iNum=0;
mainShapes={};
mainInputs={};
canvas = new fabric.Canvas("canvas");
window.onload=function(){
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	wid = w.innerWidth || e.clientWidth || g.clientWidth,
	hei = w.innerHeight|| e.clientHeight|| g.clientHeight;

	var header = document.getElementsByTagName('header')[0];
	var head_h=header.offsetHeight;

	canvas.setBackgroundColor("#fff")
	canvas.setWidth(wid);
	canvas.setHeight(hei-head_h);
	closeArea = new fabric.Rect({
		width:100,
		height:canvas.height,
		left:canvas.width-100,
		top:0,
		fill:"#fff",
		selectable:false
	})
	clearAreaBtn = new fabric.Rect({
		top:10,
		left:10,
		padding:10,
		text:'Clear',
		stroke:"#888",
		strokeWidth:1,
		width:100,
		height:30,
		fill:"#fff"
	})
	canvas.add(closeArea)
	canvas.renderAll()
}