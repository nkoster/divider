(function () {

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

        console.log(width);

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

        counter += 1;
    }

    newElement('lightgreen');
    newElement('lightblue');
    newElement('yellow');
    newElement('red');

})();
