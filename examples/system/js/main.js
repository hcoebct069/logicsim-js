//Initial Values
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

    //Canvas Properties
    canvas.setBackgroundColor("#fff");
    canvas.setWidth(wid);
    canvas.setHeight(hei - head_h);
    canvas.selectable = false;

    //Area on the right of the canvas where objects are dragged to be deleted
    closeArea = new fabric.Rect({
        width: 100,
        height: canvas.height,
        left: canvas.width - 100,
        top: 0,
        selectable: false,
        id: "closeArea",
        opacity: 0,
        fill: "#f22"
    })
    canvas.add(closeArea);
    canvas.renderAll();
}

canvas.on('mouse:down', function(o) {
    if (waitingForLine) { //In line drawing mode
        canvas.forEachObject(function(o) {
            o.set({
                "stroke": "#666",
                "strokeWidth": 1
            })
        })
        canvas.renderAll();
        canvas.selectable = false;
        if (o.target !== undefined) {
            if (o.target.hasOwnProperty("shapeType")) {
                //Select shape based on type : logic shape or logic input
                if (o.target.dataType == "shape") {
                    getShape = mainShapes;
                } else {
                    getShape = mainInputs;
                }
                //Select source of line *
                curr = o.target.id;
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
        }
    } else { //Not in line drawing mode
        if (o.target !== undefined) {
            if (o.target.hasOwnProperty("id") && o.target.id != "closeArea") {
                //On object select, set border of object to thickness 2 and color blue to denote selection
                o.target.set({
                    "stroke": "#49c",
                    "strokeWidth": 2
                });
                canvas.renderAll();
            }
        }
    }
    closeArea.set({
        opacity: 0,
        selectable: false
    });
    canvas.renderAll();
})

canvas.on('mouse:up', function(o) {
    if (waitingForLine) {
        if (o.target !== undefined) {
            if (o.target.hasOwnProperty("id") && o.target.id != "closeArea") {
                //Select destination of line *
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
            if (o.target.id != "closeArea") {
                //If object is line, delete line
                if (o.target.isLine) {
                    delete lines[o.target.from].to[o.target.to]
                    canvas.remove(o.target);
                }
                //If object is at the right end of the canvas, delete the object
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
    }
    closeArea.set({
        opacity: 0,
        selectable: false
    });
    canvas.renderAll();
})

canvas.on('object:moving', function(o) {
    if (o.target.left > (canvas.width - 200)) { //Highlight right end of canvas if object is moved there
        o.target.set({
            "stroke": "#e22",
            "strokeWidth": 2
        })
        closeArea.set({
            opacity: 0.6,
            selectable: false
        });
        canvas.renderAll();
    } else { //Dragged object is hightlighted
        o.target.set({
            "stroke": "#49c",
            "strokeWidth": 2
        })
        closeArea.set({
            opacity: 0,
            selectable: false
        });
        canvas.renderAll();
    }
    canvas.renderAll();
    renderLines();

})

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
    compile();
}

function drawLine(s, d) {
    if (s.hasOwnProperty("shape") && d.hasOwnProperty("shape")) {
        if (s.shape.id != d.shape.id) {
            d.shape.input[s.shape.id] = s.shape.output;
            //Shape general positioning
            //Source
            sl = s.shape.left + s.shape.width;
            st = s.shape.top + s.shape.height / 2;
            //Destination
            dl = d.shape.left;
            if (d.shape.shapeType == "not" || d.shape.shapeType == "input") {
                dt = d.shape.top + d.shape.height * 0.5;
            } else {
                if (s.shape.top + s.shape.height / 2 < d.shape.top + d.shape.height / 3) {
                    dtPos = -0.3;
                } else if (s.shape.top + s.shape.height / 2 > d.shape.top + d.shape.height * 2 / 3) {
                    dtPos = +0.3;
                } else {
                    dtPos = 0;
                }
                dt = d.shape.top + d.shape.height * (0.5 + dtPos);
            }
            //Shape specific positioning
            slComp = 0;
            stComp = 0;
            dlComp = 0;
            dtComp = 0;
            if (s.shape.shapeType == "not") {
                slComp = -(s.shape.width * 0.15);
            }
            if (s.shape.shapeType == "or") {
                slComp = -(s.shape.width * 0.25);
            }
            if (d.shape.shapeType == "or") {
                if (dtPos == 0) {
                    dlComp = (d.shape.width * 0.25);
                } else {
                    dlComp = (d.shape.width * 0.16)
                }
            }
            if (s.shape.shapeType == "input") {
                slComp = 7;
                stComp = 1;
            }
            if (d.shape.shapeType == "input") {
                dlComp = -6;
                dtComp = 1;
            }
            //Positioning the start point of line
            if ((sl + slComp) > (dl + dlComp)) xl = dl + dlComp;
            else xl = sl + slComp;
            if ((st + stComp) > (dt + dtComp)) xt = dt + dtComp;
            else xt = st + stComp;
            l = new fabric.Line([sl + slComp, st + stComp, dl + dlComp, dt + dtComp], {
                stroke: "#666",
                left: xl,
                top: xt,
                selectable: false,
                id: "ln_" + lNum,
                dataType: "line",
                from: s.shape.id,
                to: d.shape.id,
                isLine: true
            })
            canvas.remove(lines[s.shape.id].to[d.shape.id]);
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

function compile() {
    op = 0;
    for (i in mainShapes) {
        //console.log(mainShapes[i].shape.input);
        for (d in mainShapes[i].shape.input) {
            if (mainShapes.hasOwnProperty(d)) {
                gShape = mainShapes;
            } else {
                gShape = mainInputs;
            }
            mainShapes[i].shape.input[d] = gShape[d].shape.output;
        }
        if (mainShapes[i].shape.shapeType == "and") {
            mainShapes[i].shape.output = 1;
            for (var da in mainShapes[i].shape.input) {
                if (mainShapes[i].shape.input[da] == 0) {
                    mainShapes[i].shape.output = 0;
                    break;
                }
            }
        }
        if (mainShapes[i].shape.shapeType == "or") {
            mainShapes[i].shape.output = 0;
            for (var da in mainShapes[i].shape.input) {
                if (mainShapes[i].shape.input[da] == 1) {
                    mainShapes[i].shape.output = 1;
                    break;
                }
            }
        }
        if (mainShapes[i].shape.shapeType == "not") {
            for (var da in mainShapes[i].shape.input) {
                if (mainShapes[i].shape.input[da] == 0) {
                    mainShapes[i].shape.output = 1;
                } else {
                    mainShapes[i].shape.output = 0;
                }
            }
        }
        op = (mainShapes[i].shape.output);
        if(lines.hasOwnProperty(i)){
            for(z in lines[i].to){
                if(mainInputs.hasOwnProperty(z)){
                    //console.log(z)
                    mainInputs[z].shape.set("text",op.toString());
                    canvas.renderAll();
                }
            }
        }
    }
    return (op);
}
