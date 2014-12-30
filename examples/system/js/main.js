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
	canvas.renderAll()
}