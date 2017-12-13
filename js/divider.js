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
        i, debug = false,
        counter = 1,
        dragObj = null;

    function dragMove(event) {

        event = event || window.event;

        if (debug) {
            document.getElementById('debug').innerText =
                (dragObj == null ? '' : dragObj.previousElementSibling.clientWidth) +
                ' ' + event.clientX + ',' + event.clientY;
        }

        if (dragObj == null)
            return;

        var
            elementId = dragObj.id,
            eId = parseInt(elementId.substr(1)),
            prev = document.getElementById('d' + (eId - 1)),
            next = document.getElementById('d' + (eId + 1)),
            slideLimitRight = getWidth(),
            slideLimitLeft = parseInt(prev.style.left);

        if (eId < (counter - 2)) {
            slideLimitRight = parseInt(document.getElementById('d' + (eId + 2)).style.left)
        }

        if (isNaN(slideLimitLeft)) slideLimitLeft = 0;
        if ((event.clientX > (slideLimitLeft + 9)) && (event.clientX < (slideLimitRight - 7))) {
            dragObj.style.left = (event.clientX - 2) + (event.clientX === 0 ? '' : 'px');
            if (next !== null) {
                next.style.left = event.clientX + (event.clientX === 0 ? '' : 'px');
                if (next.nextElementSibling) {
                    next.style.width = (parseInt(next.nextElementSibling.style.left) -
                        parseInt(event.clientX) + 1) + 'px'
                } else {
                    next.style.width = getWidth() - parseInt(event.clientX) + 'px'
                }
            }
            prev.style.width = (parseInt(dragObj.style.left) - parseInt(prev.style.left)) + 'px';
            if (dragObj.id === 'd1') {
                document.getElementById('d0').style.width = event.clientX + 'px'
            }
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
            dSlider = document.createElement("div"),
            dSliderId = 'd' + counter,
            dContent = document.createElement("div"),
            dContentId = 'd' + (counter + 1),
            offset = getWidth() / ((counter + 3) / 2),
            dSliderLeft = offset + ((((counter - 1) / 2) * offset)) - 1;

        dSlider.setAttribute('id', dSliderId);
        dContent.setAttribute('id', dContentId);

        document.body.appendChild(dSlider);
        document.body.appendChild(dContent);

        dSlider.style.position = 'absolute';
        dSlider.style.left = dSliderLeft + 'px';
        dSlider.style.top = '0';
        dSlider.style.width = '8px';
        dSlider.style.height = '100vh';
        dSlider.style.background = 'white';
        dSlider.style.cursor = 'ew-resize';
        dSlider.style.zIndex = '999';

        draggable(dSliderId);

        dContent.style.position = 'absolute';
        dContent.style.left = dSliderLeft + 'px';
        dContent.style.top = '0';
        dContent.style.right = '0';
        dContent.style.height = '100vh';
        dContent.style.background = background;
        dContent.innerHTML = '<iframe width="100%" height="100%" src="http://nu.nl"></iframe>';

        for (var i = 0; i < counter - 1; i += 1) {
            if (i % 2 !== 0) {
                document.getElementById('d' + i).style.left = ((((i + 1) / 2) * offset)) - 2 + 'px';
                document.getElementById('d' + (i + 1)).style.left = (((i + 1) / 2) * offset) + 'px'
            } else {
                document.getElementById('d' + i).style.width = offset + 'px'
            }
        }
        counter += 2
    }

    window.onresize = function() {
        var
            offset = getWidth() / ((counter + 1) / 2);
        for (i = 0; i < counter - 1; i += 1) {
            if (i % 2 !== 0) {
                document.getElementById('d' + i).style.left = ((((i + 1) / 2) * offset)) - 2 + 'px';
                document.getElementById('d' + (i + 1)).style.left = (((i + 1) / 2) * offset) + 'px'
            } else {
                document.getElementById('d' + i).style.width = offset + 'px'
            }
        }
        document.getElementById('d' + (counter - 1)).style.width = offset + 'px'
    };

    document.onmouseup = function () {
        dragObj = null
    };

    document.body.addEventListener('click', function (ev) {
        if (parseInt(ev.target.id.substr(1)) % 2 === 0) {
            var iframes = document.getElementsByTagName('iframe');
            for (i = 0; i < iframes.length; i++) {
                iframes[i].style.pointerEvents = 'auto';
                iframes[i].addEventListener('mouseout', function () {
                    var iframes = document.getElementsByTagName('iframe');
                    for (i = 0; i < iframes.length; i++) {
                        iframes[i].style.pointerEvents = 'none'
                    }
                })
            }
        }
    }, false);

    document.onmousemove = dragMove;

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    var d0 = document.createElement('div');
    d0.setAttribute('id', 'd0');
    document.body.appendChild(d0);
    d0.style.position = 'absolute';
    d0.style.left = '0';
    d0.style.top = '0';
    d0.style.right = '0';
    d0.style.height = '100vh';
    d0.style.background = getRandomColor();
    d0.style.width = getWidth() + 'px';
    d0.innerHTML = '<iframe width="100%" height="100%" src="http://nu.nl"></iframe>';


    for (i = 0; i < (Math.floor(Math.random() * 40)) + 1; i++) {
        newPart(getRandomColor())
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    var iframes = document.getElementsByTagName('iframe');
    for (i = 0; i < iframes.length; i++) {
        iframes[i].style.pointerEvents = 'none'
    }

})();
