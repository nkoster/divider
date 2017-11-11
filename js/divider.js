(function() {

    window.onload = addListeners;

    var middleX = (screen.width / 2).toFixed();

    function reArrangeX(x) {
        var drag = document.getElementById('drag1');
        drag.style.position = 'absolute';
        drag.style.top = '0';
        drag.style.left = x + 'px';
        var west = document.getElementById('w-drag1');
        west.style.position = 'absolute';
        west.style.top = '0';
        west.style.width = x + 'px';
        var east = document.getElementById('e-drag1');
        east.style.position = 'absolute';
        east.style.top = '0';
        east.style.left = x + 'px';
        east.style.right = 0
    }

    reArrangeX(middleX);

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
        reArrangeX(e.clientX);
    }

}());
