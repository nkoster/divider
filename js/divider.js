(function() {
    window.onload = addListeners;

    var middleX = (screen.width / 2).toFixed();
    var drag = document.getElementById('drag1');
    drag.style.position = 'absolute';
    drag.style.top = '0';
    drag.style.left = middleX + 'px';
    var west = document.getElementById('w-drag1');
    west.style.position = 'absolute';
    west.style.top = '0';
    west.style.width = middleX + 'px';
    var east = document.getElementById('e-drag1');
    east.style.position = 'absolute';
    east.style.top = '0';
    east.style.left = middleX + 'px';
    east.style.right = 0;

    function addListeners() {
        document.getElementById('drag1').addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false)
    }

    function mouseUp() {
        window.removeEventListener('mousemove', dragMove, true)
    }

    function mouseDown(e) {
        window.addEventListener('mousemove', dragMove, true)
    }

    function dragMove(e) {
        var drag = document.getElementById('drag1');
        drag.style.position = 'absolute';
        drag.style.top = '0';
        drag.style.left = e.clientX + 'px';
        var west = document.getElementById('w-drag1');
        west.style.position = 'absolute';
        west.style.top = '0';
        west.style.width = e.clientX + 'px';
        var east = document.getElementById('e-drag1');
        east.style.position = 'absolute';
        east.style.top = '0';
        east.style.left = e.clientX + 'px';
        east.style.right = 0
    }
}());
