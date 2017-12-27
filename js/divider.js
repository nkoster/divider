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

    function getHeight(){
        if (self.innerHeight) {
            return self.innerHeight;
        }
        if (document.documentElement && document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        }
        if (document.body) {
            return document.body.clientHeight;
        }
    }

    var
        debug = false,
        dragObj = null;

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
            content[i].style.left = (i * offset) + 'px';
            content[i].style.width = offset + 'px'
        }
        if (slider.length > 0) {
            if (slider[0].previousElementSibling != null)
                slider[0].previousElementSibling.style.width = offset + 'px'
        }
    }

    function newPartX(url, obj) {

        var iframe = '<iframe width="100%" height="100%" style="opacity:0" src="' + url + '"></iframe>';

        if (document.getElementsByClassName('content').length < 1) {
            var firstContent = document.createElement('div');
            document.body.appendChild(firstContent);
            firstContent.setAttribute('class', 'content');
            firstContent.style.position = 'absolute';
            firstContent.style.left = '0';
            firstContent.style.top = '0';
            firstContent.style.right = '0';
            firstContent.style.height = getHeight() + 'px';
            firstContent.style.width = getWidth() + 'px';
            if (url === 'http://') firstContent.style.background = getRandomColor();
            firstContent.innerHTML = iframe;
            return
        }

        var
            newSlider = document.createElement('div'),
            newContent = document.createElement('div');

        newSlider.setAttribute('class', 'slider');
        newContent.setAttribute('class', 'content');

        if (obj == null) {
            document.body.appendChild(newSlider);
            document.body.appendChild(newContent)
        } else {
            obj.parentNode.insertBefore(newContent, obj.nextElementSibling);
            obj.parentNode.insertBefore(newSlider, obj.nextElementSibling)
        }

        newSlider.style.position = 'absolute';
        newSlider.style.top = '0';
        newSlider.style.width = '8px';
        newSlider.style.height = getHeight() + 'px';
        newSlider.style.background = '#DDDDDD';
        newSlider.style.cursor = 'ew-resize';
        newSlider.style.zIndex = '999';
        newSlider.onmousedown = function () {
            dragObj = newSlider
        };
        newContent.style.position = 'absolute';
        newContent.style.top = '0';
        newContent.style.right = '0';
        newContent.style.height = getHeight() + 'px';
        if (url === 'http://') newContent.style.background = getRandomColor();
        newContent.innerHTML = iframe;
        orderWidth()
    }

    function newPartY(url, obj) {

        var
            iframe = '<iframe width="100%" height="100%" style="opacity:0" src="' + url + '"></iframe>',
            newContentTop = document.createElement('div'),
            newSlider = document.createElement('div'),
            newContentBottom = document.createElement('div');

        obj.style.transition = 'border';
        obj.style.transitionDuration = '0.2s';
        obj.style.border = 'solid 0px #DDDDDD';

        newContentTop.setAttribute('class', 'contentY');
        newContentTop.innerHTML = obj.innerHTML;
        newContentTop.style.position = 'absolute';
        newContentTop.style.top = '0';
        newContentTop.style.right = '0';
        newContentTop.style.width = '100%';
        newContentTop.style.height = '50%';
        obj.innerHTML = '';
        obj.appendChild(newContentTop);

        newSlider.style.position = 'absolute';
        newSlider.style.left = '0';
        newSlider.style.top = '50%';
        newSlider.style.width = getWidth() + 'px';
        newSlider.style.height = '8px';
        newSlider.style.background = '#DDDDDD';
        newSlider.style.cursor = 'ns-resize';
        newSlider.style.zIndex = '999';
        obj.appendChild(newSlider);

        newContentBottom.setAttribute('class', 'contentY');
        newContentBottom.innerHTML = iframe;
        newContentBottom.style.position = 'absolute';
        newContentBottom.style.bottom = '0';
        newContentBottom.style.right = '0';
        newContentBottom.style.width = '100%';
        newContentBottom.style.height = '50%';
        if (url === 'http://') newContentBottom.style.background = getRandomColor();
        obj.appendChild(newContentBottom);
    }

    window.onresize = function() {
        orderWidth()
    };

    document.onmouseup = function () {
        dragObj = null
    };

    document.onmousemove = dragMove;

    var url = prompt('Please enter a URL');
    if (url.substr(0, 4) !== 'http') url = 'http://' + url;
    newPartX(url, null);

    document.body.addEventListener('click', function (ev) {
        if (ev.target.className === 'content') {
            ev.target.style.transition = 'border';
            ev.target.style.transitionDuration = '0.2s';
            ev.target.style.borderTop = 'solid 6px #DDDDDD';
            document.querySelectorAll('iframe').forEach(function (value) {
                value.style.pointerEvents = 'auto';
                value.addEventListener('mouseout', function () {
                    document.querySelectorAll('iframe').forEach(function (value) {
                        value.style.pointerEvents = 'none';
                        value.parentNode.style.transition = 'border';
                        value.parentNode.style.transitionDuration = '0.2s';
                        value.parentNode.style.border = 'solid 0px #DDDDDD'
                    })
                })
            })
        }
        if (ev.target.className === 'contentY') {
            ev.target.style.transition = 'border';
            ev.target.style.transitionDuration = '0.2s';
            ev.target.style.borderTop = 'solid 6px yellow';
            document.querySelectorAll('iframe').forEach(function (value) {
                value.style.pointerEvents = 'auto';
                value.addEventListener('mouseout', function () {
                    document.querySelectorAll('iframe').forEach(function (value) {
                        value.style.pointerEvents = 'none';
                        value.parentNode.style.transition = 'border';
                        value.parentNode.style.transitionDuration = '0.2s';
                        value.parentNode.style.border = 'solid 0px yellow'
                    })
                })
            })
        }
    }, false);

    function showFrames(ms) {
        window.setTimeout(function () {
            document.querySelectorAll('iframe').forEach(function (value) {
                value.style.transition = 'opacity';
                value.style.transitionDuration = '1.5s';
                value.style.opacity = '1'
            })
        }, ms)
    }

    document.onkeydown = function (ev) {
        ev = (ev == null ? event : ev);
        if (ev.shiftKey && ev.ctrlKey) {
            if (ev.keyCode === 68) {
                ev.preventDefault();
                if (document.getElementsByClassName('content').length > 1) {
                    document.querySelectorAll('.content').forEach(function (value) {
                        if (value.style.borderTopWidth === '6px') {
                            value.parentNode.removeChild(value.previousSibling);
                            value.parentNode.removeChild(value);
                            orderWidth()
                        }
                    });
                    if (document.getElementsByClassName('slider').length ===
                    document.getElementsByClassName('content').length) {
                        document.getElementsByClassName('slider')[0].parentNode
                            .removeChild(document.getElementsByClassName('slider')[0]);
                        orderWidth()
                    }
                }
            }
            if (ev.keyCode === 69) {
                ev.preventDefault();
                document.querySelectorAll('.content').forEach(function (value) {
                    if (value.style.borderTopWidth === '6px') {
                        var url = prompt('Please enter a URL');
                        if (url.substr(0, 4) !== 'http') url = 'http://' + url;
                        newPartX(url, value);
                        value.firstChild.style.opacity = '1'
                    }
                });
                showFrames(1000);
            }
            if (ev.keyCode === 79) {
                ev.preventDefault();
                console.log('---> ' + ev.target.className);
                document.querySelectorAll('.content').forEach(function (value) {
                    if (value.style.borderTopWidth === '6px') {
                        var url = prompt('Please enter a URL');
                        if (url.substr(0, 4) !== 'http') url = 'http://' + url;
                        newPartY(url, value);
                        value.firstChild.style.opacity = '1'
                    }
                });
                showFrames(1000)
            }
        }
    };

    showFrames(1000);

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';

    document.querySelectorAll('iframe').forEach(function (value) {
        value.style.pointerEvents = 'none'
    });

})();
