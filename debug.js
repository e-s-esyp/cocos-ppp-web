function print_info(stage) {
    let text00 = "Scale: " + _scale + "  w: " + _w.toFixed(0) + "  h: " + _h.toFixed(0) + "\n" +
        "Scene info:\n" + print_children(stage, 0);
    document.getElementById("debugview").value = text00;
}

let level_tabs = ["\t", "\t\t", "\t\t\t", "\t\t\t\t", "\t\t\t\t\t", "\t\t\t\t\t\t", "\t\t\t\t\t\t\t",
    "\t\t\t\t\t\t\t\t"];

function print_children(c, level) {
    let text00 = "v:" + c.visible + " pos:(" + c.position.x.toFixed(0) + "," + c.position.y.toFixed(0) + ") " +
        c.constructor.name + " \"" + c._name + "\" " + c._text + "\n";
    for (let i = 0; i < c.children.length; i++) {
        text00 += level_tabs[level] + i + ": " + print_children(c.children[i], level + 1);
    }
    return text00;
}