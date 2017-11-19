(function () {

    window.onload = addListeners;

    var
        mX = (screen.width / 2).toFixed(),
        counter = 1;

    function newElement(background) {

        var
            dWest = document.createElement("div"),
            dEast = document.createElement("div"),
            dHor = document.createElement("div"),
            dWestId = 'd' + counter + '-w',
            dEastId = 'd' + counter + '-e',
            dHorId = 'd' + counter,
            dParentId = 'd' + (counter - 1) + '-e',
            dParent = document.getElementById(dParentId);

        dWest.setAttribute('id', 'd' + counter + '-w');
        dEast.setAttribute('id', 'd' + counter + '-e');
        dHor.setAttribute('id', 'd' + counter);
        dParent.appendChild(dWest);
        dParent.appendChild(dHor);
        dParent.appendChild(dEast);

        var
            width = (parseInt(document.getElementById(dParentId).style.width) / 2).toFixed();

        if (counter === 1) width = (screen.width / 2).toFixed();

        //console.log(width);

        document.getElementById(dWestId).style.position = 'absolute';
        document.getElementById(dWestId).style.left = '0';
        document.getElementById(dWestId).style.top = '0';
        document.getElementById(dWestId).style.width = width + (width === 0 ? '' : 'px');
        document.getElementById(dWestId).style.height = '100vh';
        document.getElementById(dWestId).style.background = background;

        document.getElementById(dEastId).style.position = 'absolute';
        document.getElementById(dEastId).style.right = '0';
        document.getElementById(dEastId).style.top = '0';
        document.getElementById(dEastId).style.width = width + (width === 0 ? '' : 'px');
        document.getElementById(dEastId).style.height = '100vh';
        document.getElementById(dEastId).style.background = 'green';

        document.getElementById(dHorId).style.position = 'absolute';
        document.getElementById(dHorId).style.left = width + (width === 0 ? '' : 'px');
        document.getElementById(dHorId).style.top = '0';
        document.getElementById(dHorId).style.width = '8px';
        document.getElementById(dHorId).style.height = '100vh';
        document.getElementById(dHorId).style.background = 'black';
        document.getElementById(dHorId).style.cursor = 'ew-resize';
        document.getElementById(dHorId).style.zIndex = '999';
        document.getElementById(dHorId).addEventListener('mousedown', mouseDown, false);

        counter += 1;
    }

    function reArrangeX(dragObj) {
        var drag = document.getElementById(dragObj.id);
        if (drag !== null) {
            var
                pId = (parseInt(dragObj.id.substr(1)) - 1);

            if (pId > 0) {
                parentWestWidth = parseInt(document.getElementById('d' + pId + '-w').style.width);
            } else {
                parentWestWidth = '0';
            }
            drag.style.position = 'absolute';
            drag.style.top = '0';
            drag.style.left = (dragObj.x - parentWestWidth) + 'px';
            var west = document.getElementById(dragObj.id + '-w');
            west.style.position = 'absolute';
            west.style.top = '0';
            west.style.width = (dragObj.x - parentWestWidth) + 'px';
            var east = document.getElementById(dragObj.id + '-e');
            east.style.position = 'absolute';
            east.style.top = '0';
            east.style.left = (dragObj.x - parentWestWidth) + 'px';
            east.style.right = '0';
            east.style.width = (drag.parentElement.clientWidth - (dragObj.x - parentWestWidth)) + 'px';
            //console.log('-- ' + (drag.parentElement.clientWidth - dragObj.x) + ' -- ' + document.getElementById(east.parentNode.id).style.cursor);
        }
            console.log(east.parentNode.id);
            console.log((parseInt(dragObj.id.substr(1)) - 1) + ' --- ' + parentWestWidth);
    }

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
        var elementId = (e.target || e.srcElement).id;
        if (elementId.indexOf('-') > 0)
            elementId = elementId.replace(/-.*/, '');
        //console.log(elementId);
        reArrangeX({ x: e.clientX, id: elementId });
    }

    newElement('lightgreen');
    newElement('lightblue');
    //newElement('yellow');
    //newElement('red');
    //newElement('blue');

})();
