aNum = 0;
oNum = 0;
nNum = 0;
iNum = 0;
lNum = 0;
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

    canvas.setBackgroundColor("#fff");
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
    canvas.renderAll();

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
                getShape[o.target.id].shape.set({
                    "stroke": "#49c",
                    "strokeWidth": 2
                });
                canvas.renderAll();
                if (!lines.hasOwnProperty(o.target.id)) {
                    lines[o.target.id] = {
                        to: {}
                    }
                }
            }
        } else {
            if (o.target !== undefined) {
                if (o.target.hasOwnProperty("id")) {
                    o.target.set({
                        "stroke": "#49c",
                        "strokeWidth": 2
                    });
                    canvas.renderAll();
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
                if (o.target.hasOwnProperty("id")) {
                    o.target.set({
                        "stroke": "#49c",
                        "strokeWidth": 2
                    });
                    o.target.linesIn++;
                    canvas.renderAll();
                    lines[curr].to[o.target.id] = true;

                    renderLines();
                }
            }
            for (i in mainInputs) {
                mainInputs[i].shape.selectable = false;
                canvas.renderAll();
            }
        } else {
            if (o.target !== undefined) {
                if (o.target.left > (canvas.width - 200)) {
                    if (lines.hasOwnProperty(o.target.id)) {
                        for (i in lines[o.target.id].to) {
                            canvas.remove(lines[o.target.id].to[i]);
                        }
                        delete lines[o.target.id];
                    }
                    for (i in lines) {
                        canvas.remove(lines[i].to[o.target.id]);
                        delete lines[i].to[o.target.id];
                    }
                    canvas.remove(o.target);
                    delete mainShapes[o.target.id];
                    delete mainInputs[o.target.id];
                    renderLines();
                }
                o.target.set({
                    "stroke": "#666",
                    "strokeWidth": 1
                })
                canvas.renderAll();
            }
        }
    })

    canvas.on('object:moving', function(o) {
        if (o.target.left > (canvas.width - 200)) {
            o.target.set({
                "stroke": "#d22",
                "strokeWidth": 2
            });
        } else {
            o.target.set({
                "stroke": "#49c",
                "strokeWidth": 2
            });
        }
        canvas.renderAll();
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
    if (s.hasOwnProperty("shape") && d.hasOwnProperty("shape")) {
        if (s.shape.id != d.shape.id) {
            sl = s.shape.left + s.shape.width;
            st = s.shape.top + s.shape.height / 2;
            dl = d.shape.left;
            dt = d.shape.top + d.shape.height * 0.5;
            if (sl > dl) xl = dl;
            else xl = sl;
            if (st > dt) xt = dt;
            else xt = st;
            l = new fabric.Line([sl, st, dl, dt], {
                stroke: "#666",
                left: xl,
                top: xt,
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
}

function removeAllObjects() {
    lines = {};
    mainShapes = {};
    mainInputs = {};
    canvas.forEachObject(function(o) {
        canvas.remove(o);
    })
}
