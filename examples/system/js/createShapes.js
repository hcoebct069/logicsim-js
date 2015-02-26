aCreate = document.getElementById("aCreate");
oCreate = document.getElementById("oCreate");
nCreate = document.getElementById("nCreate");
iCreate = document.getElementById("iCreate");
lCreate = document.getElementById("lCreate");
cClear = document.getElementById("cClear");

aCreate.onclick = function() {
    v = shapeAnd("and_" + aNum, 100 + Math.random() * (canvas.width - 200), 100 + Math.random() * (canvas.height - 200))
    mainShapes["and_" + aNum] = {
        shape: v
    }
    aNum++;
}

oCreate.onclick = function() {
    v = shapeOr("or_" + oNum, 100 + Math.random() * (canvas.width - 200), 100 + Math.random() * (canvas.height - 200))
    mainShapes["or_" + oNum] = {
        shape: v
    }
    oNum++;
}

nCreate.onclick = function() {
    v = shapeNot("not_" + nNum, 100 + Math.random() * (canvas.width - 200), 100 + Math.random() * (canvas.height - 200))
    mainShapes["not_" + nNum] = {
        shape: v
    }
    nNum++;
}

iCreate.onclick = function() {
    var inp = new fabric.IText('0', {
        fontFamily: 'Source Sans Pro',
        left: 100 + Math.random() * (canvas.width - 100),
        top: 100 + Math.random() * (canvas.height - 100),
        fontSize: 20,
        hasControls: false,
        transparentCorners: false,
        padding: 5,
        shapeType: "input",
        type: "i-number",
        dataType: "input",
        linesIn: 0,
        hasBorders: true,
        outputObj: {},
        output: 0,
        input: {}
    });
    inp.set({
        id: "ip_" + iNum
    });
    inp.on('editing:entered', function() {
        onkeydown = function(e) {
            e.preventDefault();
            if (e.keyCode == 48) {
                inp.set("text", "0");
                inp.output = 0;
            }
            if (e.keyCode == 49) {
                inp.set("text", "1");
                inp.output = 1;
            }
            canvas.renderAll();
        }
    })
    if (waitingForLine) inp.selectable = false;
    mainInputs["ip_" + iNum] = {
        shape: inp
    };
    iNum++;
    canvas.add(inp);
}

lCreate.onclick = function() {
    if (!waitingForLine) {
        waitingForLine = true;
        canvas.forEachObject(function(o) {
            o.selectable = false;
        });
        lCreate.setAttribute("class", "menu-selected");
    } else {
        waitingForLine = false;
        canvas.forEachObject(function(o) {
            if (o.dataType != "line") o.selectable = true;
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
        lCreate.removeAttribute("class");
    }
}

cClear.onclick = function() {
    removeAllObjects();
}
