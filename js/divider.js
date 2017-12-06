(function () {

    var
        debug = false,
        counter = 1,
        dragObj = null;

    function dragMove(e) {

        if (dragObj == null)
            return;

        e = e || window.event;

        var
            elementId = dragObj.id,
            eId = parseInt(elementId.substr(1));

        var
            prev = document.getElementById('d' + (eId - 1)),
            next = document.getElementById('d' + (eId + 1)),
            slideLimitRight = screen.width,
            slideLimitLeft = parseInt(prev.style.left);

        if (eId < (counter - 2)) {
            slideLimitRight = parseInt(document.getElementById('d' + (eId + 2)).style.left);
        }

        if (!slideLimitRight) slideLimitRight = screen.width;
        if (isNaN(slideLimitLeft)) slideLimitLeft = 0;
        if ((e.clientX > (slideLimitLeft + 10)) && (e.clientX < (slideLimitRight - 10))) {
            if (dragObj !== null) dragObj.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
            if (next !== null) next.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
        }

        if (debug) document.getElementById('debug').innerText = e.clientX;

    }

    function draggable(id) {
        var obj = document.getElementById(id);
        obj.style.position = "absolute";
        obj.onmousedown = function () {
            dragObj = obj;
        }
    }

    function newPart(background) {

        var
            body = document.getElementsByTagName('body')[0],
            dSlider = document.createElement("div"),
            dSliderId = 'd' + counter,
            dContent = document.createElement("div"),
            dContentId = 'd' + (counter + 1),
            offset = document.getElementById('d0').offsetWidth / ((counter + 3) / 2),
            dSliderLeft = offset + (((counter-1) / 2) * offset);

        dSlider.setAttribute('id', dSliderId);
        dContent.setAttribute('id', dContentId);

        body.appendChild(dSlider);
        body.appendChild(dContent);

        document.getElementById(dSliderId).style.position = 'absolute';
        document.getElementById(dSliderId).style.left = dSliderLeft + 'px';
        document.getElementById(dSliderId).style.top = '0';
        document.getElementById(dSliderId).style.width = '8px';
        document.getElementById(dSliderId).style.height = '100vh';
        document.getElementById(dSliderId).style.background = 'black';
        document.getElementById(dSliderId).style.cursor = 'ew-resize';
        document.getElementById(dSliderId).style.zIndex = '999';
        draggable(dSliderId);

        document.getElementById(dContentId).style.position = 'absolute';
        document.getElementById(dContentId).style.left = dSliderLeft + 'px';
        document.getElementById(dContentId).style.top = '0';
        document.getElementById(dContentId).style.right = '0';
        document.getElementById(dContentId).style.height = '100vh';
        document.getElementById(dContentId).style.background = background;

        for (var i = 0; i < counter - 1; i += 1) {
            if (i % 2 !== 0) {
                document.getElementById('d' + i).style.left = (((i+1) / 2) * offset) + 'px';
                document.getElementById('d' + (i + 1)).style.left = (((i+1) / 2) * offset) + 'px';
            }
        }

        counter += 2;

    }

    document.onmouseup = function (e) {
        dragObj = null;
    };

    document.onmousemove = dragMove;

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    for (var i = 0; i < 10; i++) {
        newPart(getRandomColor())
    }

})();
