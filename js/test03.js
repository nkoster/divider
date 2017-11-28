(function () {

    window.onload = addListeners;

    function addListeners() {
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
        var
            elementId = (e.target || e.srcElement).id,
            eId = parseInt(elementId.substr(1)),
            realId = elementId;
        if (eId % 2 === 0) {
            eId++;
            elementId = 'd' + eId;
        }
        try {
            var
                drag = document.getElementById(elementId),
                prev = document.getElementById(document.getElementById(elementId).previousElementSibling.id),
                next = document.getElementById(document.getElementById(elementId).nextElementSibling.id),
                slideLimitRight = parseInt(document.getElementById(next.nextElementSibling.id).style.left),
                slideLimitLeft = parseInt(prev.style.left);
            if (!slideLimitRight) slideLimitRight = screen.width;
            if (isNaN(slideLimitLeft)) slideLimitLeft = 0;
            if ((e.clientX > (slideLimitLeft + 20)) && (e.clientX < (slideLimitRight - 20))) {
                drag.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
                next.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
            }
            document.getElementById('debug').innerText = elementId;
        } catch (e) {
            document.getElementById('debug').innerText = 'error: ' + realId;
        }
    }

    document.getElementById('d1').addEventListener('mousedown', mouseDown, true);
    document.getElementById('d3').addEventListener('mousedown', mouseDown, true);

})();
