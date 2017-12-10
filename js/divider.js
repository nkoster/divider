(function () {

    function getWidth() {
        if (self.innerWidth) {
            return self.innerWidth;
        }

        if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }

        if (document.body) {
            return document.body.clientWidth;
        }
    }

    var
        debug = true,
        counter = 1,
        dragObj = null;

    function dragMove(event) {

        event = event || window.event;

        if (debug) document.getElementById('debug').innerText = event.clientX + ',' + event.clientY;

        if (dragObj == null)
            return;

        var
            elementId = dragObj.id,
            eId = parseInt(elementId.substr(1));

        var
            prev = document.getElementById('d' + (eId - 1)),
            next = document.getElementById('d' + (eId + 1)),
            slideLimitRight = getWidth(),
            slideLimitLeft = parseInt(prev.style.left);

        if (eId < (counter - 2)) {
            slideLimitRight = parseInt(document.getElementById('d' + (eId + 2)).style.left)
        }

        if (isNaN(slideLimitLeft)) slideLimitLeft = 0;
        if ((event.clientX > (slideLimitLeft + 10)) && (event.clientX < (slideLimitRight - 10))) {
            if (dragObj !== null) dragObj.style.left = event.clientX + (event.clientX === 0 ? '' : 'px');
            if (next !== null) next.style.left = event.clientX + (event.clientX === 0 ? '' : 'px')
        }

    }

    function draggable(id) {
        var obj = document.getElementById(id);
        obj.style.position = "absolute";
        obj.onmousedown = function () {
            dragObj = obj
        }
    }

    function newPart(background) {

        var
            body = document.getElementsByTagName('body')[0],
            dSlider = document.createElement("div"),
            dSliderId = 'd' + counter,
            dContent = document.createElement("div"),
            dContentId = 'd' + (counter + 1),
            offset = getWidth() / ((counter + 3) / 2),
            dSliderLeft = offset + (((counter - 1) / 2) * offset);

        dSlider.setAttribute('id', dSliderId);
        dContent.setAttribute('id', dContentId);

        body.appendChild(dSlider);
        body.appendChild(dContent);

        dSlider.style.position = 'absolute';
        dSlider.style.left = dSliderLeft + 'px';
        dSlider.style.top = '0';
        dSlider.style.width = '8px';
        dSlider.style.height = '100vh';
        dSlider.style.background = 'black';
        dSlider.style.cursor = 'ew-resize';
        dSlider.style.zIndex = '999';
        draggable(dSliderId);

        dContent.style.position = 'absolute';
        dContent.style.left = dSliderLeft + 'px';
        dContent.style.top = '0';
        dContent.style.right = '0';
        dContent.style.height = '100vh';
        dContent.style.background = background;

        for (var i = 0; i < counter - 1; i += 1) {
            if (i % 2 !== 0) {
                document.getElementById('d' + i).style.left = (((i + 1) / 2) * offset) + 'px';
                document.getElementById('d' + (i + 1)).style.left = (((i + 1) / 2) * offset) + 'px'
            }
        }

        counter += 2
    }

    window.onresize = function() {
        var
            offset = getWidth() / ((counter + 1) / 2);
        for (i = 0; i < counter - 1; i += 1) {
            if (i % 2 !== 0) {
                document.getElementById('d' + i).style.left = (((i + 1) / 2) * offset) + 'px';
                document.getElementById('d' + (i + 1)).style.left = (((i + 1) / 2) * offset) + 'px'
            }
        }
    };

    document.onmouseup = function (e) {
        dragObj = null
    };

    document.onmousemove = dragMove;

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    document.getElementById('d0').style.background = getRandomColor();

    for (var i = 0; i < (Math.floor(Math.random() * 30)) + 1; i++) {
        newPart(getRandomColor())
    }

})();
