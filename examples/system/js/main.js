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
	document.addEventListener("mousewheel", function(e){
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
	})
	var scrollff = 0;
	document.addEventListener("DOMMouseScroll",function(e){
		if(e.detail){
			resff=-e.detail;
			scrollff+=resff/3;
			scaleff=1+scrollff/10;
			if(scaleff<0.4) {
				scaleff=0.4;
				scrollff=-6;
			}
			if(scaleff>2.4) {
				scaleff=2.4;
				scrollff=14;
			}
			canvas.style.MozTransform = "scale("+scaleff+")";
		}
	})
	var dragging = false;
	canvas.onmousedown = function(e){
		console.log(e)
		dragging = true;
		if(e.clientX){
			dragX=e.clientX;
			dragY=e.clientY;
		}else{
			dragX=e.x;
			dragY=e.y;
		}
		initX=canvas.offsetLeft;
		initY=canvas.offsetTop;
	}

	document.onmousemove=function(e){
		if(dragging){
			if(e.clientX){
				canvas.style.left=(initX+e.clientX-dragX)+"px";
				canvas.style.top=(initY+e.clientY-dragY-head_h)+"px";
			}else{
				canvas.style.left=(initX+e.x-dragX)+"px";
				canvas.style.top=(initY+e.y-dragY-head_h)+"px";
			}
		}
	}
	document.onmouseup=function(){
		dragging=false;
	}
}