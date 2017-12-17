(function () {

    function getRandomColor() {
        var
            letters = '0123456789ABCDEF',
            color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }
    
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

    function dragMove(ev) {
        ev = ev || window.ev;
        if (debug) {
            document.getElementById('debug').innerText =
                (dragObj == null ? '' : dragObj.previousElementSibling.clientWidth) +
                ' ' + ev.clientX + ',' + ev.clientY
        }
        if (dragObj == null) return;
        var
            prev = dragObj.previousElementSibling,
            next = dragObj.nextElementSibling,
            slideLimitRight = getWidth(),
            slideLimitLeft = parseInt(prev.style.left);
        if (next.nextElementSibling) {
            slideLimitRight = parseInt(next.nextElementSibling.style.left)
        }
        if ((ev.clientX > (slideLimitLeft + 9)) && (ev.clientX < (slideLimitRight - 7))) {
            dragObj.style.left = (ev.clientX - 2) + 'px';
            if (next !== null) {
                next.style.left = ev.clientX + 'px';
                if (next.nextElementSibling) {
                    next.style.width = (parseInt(next.nextElementSibling.style.left) -
                        parseInt(ev.clientX) + 1) + 'px'
                } else {
                    next.style.width = getWidth() - parseInt(ev.clientX) + 'px'
                }
            }
            prev.style.width = (parseInt(dragObj.style.left) - parseInt(prev.style.left)) + 'px';
        }
    }

    function orderWidth() {
        var
            slider = document.getElementsByClassName('slider'),
            content = document.getElementsByClassName('content'),
            offset = getWidth() / (((slider.length * 2) + 2) / 2);
        for (var i = 0; i < content.length; i++) {
            if (i < slider.length) slider[i].style.left = (((i + 1) * offset)) - 2 + 'px';
            content[i].style.left = ((i + 1) * offset) + 'px';
            content[i].style.width = offset + 'px'
        }
        slider[0].previousElementSibling.style.width = offset + 'px'
    }

    function newPart(url) {

        var iframe = '<iframe width="100%" height="100%" src="' + url + '"></iframe>';

        if (document.getElementsByClassName('first').length < 1) {
            var firstContent = document.createElement('div');
            document.body.appendChild(firstContent);
            firstContent.setAttribute('class', 'first');
            firstContent.style.position = 'absolute';
            firstContent.style.left = '0';
            firstContent.style.top = '0';
            firstContent.style.right = '0';
            firstContent.style.height = '100vh';
            firstContent.style.background = getRandomColor();
            firstContent.style.width = getWidth() + 'px';
            firstContent.innerHTML = iframe;
            return
        }

        var
            newSlider = document.createElement("div"),
            newContent = document.createElement("div");
        newSlider.setAttribute('class', 'slider');
        newContent.setAttribute('class', 'content');
        document.body.appendChild(newSlider);
        document.body.appendChild(newContent);
        newSlider.style.position = 'absolute';
        newSlider.style.top = '0';
        newSlider.style.width = '8px';
        newSlider.style.height = '100vh';
        newSlider.style.background = 'white';
        newSlider.style.cursor = 'ew-resize';
        newSlider.style.zIndex = '999';
        newSlider.onmousedown = function () {
            dragObj = newSlider
        };
        newContent.style.position = 'absolute';
        newContent.style.top = '0';
        newContent.style.right = '0';
        newContent.style.height = '100vh';
        newContent.style.background = getRandomColor();
        newContent.innerHTML = iframe;
        orderWidth()
    }

    window.onresize = function() {
        orderWidth()
    };

    document.onmouseup = function () {
        dragObj = null
    };

    document.body.addEventListener('click', function (ev) {
        if (ev.target.className === 'content' || ev.target.className === 'first') {
            document.querySelectorAll('iframe').forEach(function (value) {
                value.style.pointerEvents = 'auto';
                value.addEventListener('mouseout', function () {
                    document.querySelectorAll('iframe').forEach(function (value) {
                        value.style.pointerEvents = 'none'
                    })
                })
            })
        }
    }, false);

    document.onmousemove = dragMove;

    var random = (Math.floor(Math.random() * 9)) + 2;
    for (i = 0; i < random; i++) {
        newPart('http://peppengouw7.nl/map.php?zoom=' +
            (i + 11) +
            (i % 2 !== 0 ? '&map=true' : ''))
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';

    document.querySelectorAll('iframe').forEach(function (value) {
        value.style.pointerEvents = 'none'
    });

})();
