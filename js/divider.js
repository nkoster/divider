(function() {

    window.onload = addListeners;

    var middleX = (screen.width / 2).toFixed();

    function reArrangeX(dragObj) {
        var drag = document.getElementById(dragObj.id);
        drag.style.position = 'absolute';
        drag.style.top = '0';
        drag.style.left = dragObj.x + 'px';
        var west = document.getElementById(dragObj.id + '-w');
        west.style.position = 'absolute';
        west.style.top = '0';
        west.style.width = dragObj.x + 'px';
        var east = document.getElementById(dragObj.id + '-e');
        east.style.position = 'absolute';
        east.style.top = '0';
        east.style.left = dragObj.x + 'px';
        east.style.right = 0
    }

    reArrangeX({ x: middleX, id: 'drag0' });

    function addListeners() {
        document.getElementById('drag0').addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false)
    }

    function mouseUp() {
        window.removeEventListener('mousemove', dragMove, true)
    }

    function mouseDown() {
        window.addEventListener('mousemove', dragMove, true)
    }

    function dragMove(e) {
        e = e || window.event;
        var elementId = (e.target || e.srcElement).id;
        if (elementId.indexOf('-') > 0)
            elementId = elementId.replace(/-.*/, '');
        reArrangeX({ x: e.clientX, id: elementId });
    }

}());
