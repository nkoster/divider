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
        dragObj = null,
        testIframe = '<iframe width="100%" height="100%" src="http://peppengouw7.nl/map.php"></iframe>';
        //testIframe = '';

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
            prev = dragObj.previousElementSibling,
            next = dragObj.nextElementSibling,
            slideLimitRight = getWidth(),
            slideLimitLeft = parseInt(prev.style.left);

        if (next.nextElementSibling) {
            slideLimitRight = parseInt(next.nextElementSibling.style.left)
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
        }

    }

    function newPart(background) {

        var
            dSlider = document.createElement("div"),
            dContent = document.createElement("div");

        dSlider.setAttribute('class', 'slider');
        dContent.setAttribute('class', 'content');

        document.body.appendChild(dSlider);
        document.body.appendChild(dContent);

        dSlider.style.position = 'absolute';
        dSlider.style.top = '0';
        dSlider.style.width = '8px';
        dSlider.style.height = '100vh';
        dSlider.style.background = 'white';
        dSlider.style.cursor = 'ew-resize';
        dSlider.style.zIndex = '999';

        dSlider.onmousedown = function () {
            dragObj = dSlider
        };

        dContent.style.position = 'absolute';
        dContent.style.top = '0';
        dContent.style.right = '0';
        dContent.style.height = '100vh';
        dContent.style.background = background;
        dContent.innerHTML = testIframe;

        var
            slider = document.getElementsByClassName('slider'),
            content = document.getElementsByClassName('content'),
            offset = getWidth() / (((slider.length * 2) + 2) / 2);

        for (i = 0; i < content.length; i++) {
            if (i < slider.length) slider[i].style.left = (((i + 1) * offset)) - 2 + 'px';
            content[i].style.left = ((i + 1) * offset) + 'px';
            content[i].style.width = offset + 'px'
        }
        slider[0].previousElementSibling.style.width = offset + 'px';
    }

    window.onresize = function() {
        var
            slider = document.getElementsByClassName('slider'),
            content = document.getElementsByClassName('content'),
            offset = getWidth() / ((((slider.length * 2) + 1) + 1) / 2);

        for (i = 0; i < content.length; i++) {
            if (i < slider.length) slider[i].style.left = (((i + 1) * offset)) - 2 + 'px';
            content[i].style.left = ((i + 1) * offset) + 'px';
            content[i].style.width = offset + 'px'
        }
        if (slider[0]) slider[0].previousElementSibling.style.width = offset + 'px'
    };

    document.onmouseup = function () {
        dragObj = null
    };

    document.body.addEventListener('click', function (ev) {
        if (ev.target.className === 'content' || ev.target.className === 'first') {
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
        var
            letters = '0123456789ABCDEF',
            color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    var first = document.createElement('div');
    document.body.appendChild(first);
    first.setAttribute('class', 'first');
    first.style.position = 'absolute';
    first.style.left = '0';
    first.style.top = '0';
    first.style.right = '0';
    first.style.height = '100vh';
    first.style.background = getRandomColor();
    first.style.width = getWidth() + 'px';
    first.innerHTML = testIframe;

    for (i = 0; i < (Math.floor(Math.random() * 20)) + 1; i++) {
        newPart(getRandomColor())
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';

    document.querySelectorAll('iframe').forEach(function (value) {
        value.style.pointerEvents = 'none'
    });

})();
