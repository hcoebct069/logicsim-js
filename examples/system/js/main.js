window.onload=function(){
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	wid = w.innerWidth || e.clientWidth || g.clientWidth,
	hei = w.innerHeight|| e.clientHeight|| g.clientHeight;

	var header = document.getElementsByTagName('header')[0];
	var head_h=header.offsetHeight;

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.style.width = (wid)+"px";
	canvas.style.height = (hei-head_h)+"px";;

	var ws = document.getElementById("workspace");
	ws.style.width = wid+"px";
	ws.style.height = (hei-head_h)+"px";

	canvas.style.left=(wid-canvas.offsetWidth)/2+"px";
	canvas.style.top=(hei-canvas.offsetHeight-head_h)/2+"px";

	var scroll = 0;
	document.onmousewheel=function(e){
		res=e.wheelDeltaY;
		//console.log(res)
		scroll+=res/120;
		scale=1+scroll/10;
		if(scale<0.4) {
			scale=0.4;
			scroll=-6;
		}
		if(scale>2.4) {
			scale=2.4;
			scroll=14;
		}
		canvas.style.transform = "scale("+scale+")";
		canvas.style.moztransform = "scale("+scale+")";
		//if(canvas.)
	}
	var dragging = false;
	canvas.onmousedown = function(e){
		dragging = true;
		dragX=e.x;
		dragY=e.y;
		initX=canvas.offsetLeft;
		initY=canvas.offsetTop;
	}
	document.onmousemove=function(e){
		if(dragging){
			canvas.style.left=(initX+e.x-dragX)+"px";
			canvas.style.top=(initY+e.y-dragY-head_h)+"px";
		}
	}
	document.onmouseup=function(){
		dragging=false;
	}
}