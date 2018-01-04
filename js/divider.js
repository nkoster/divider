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
        ev = ev || window.event;
        if (debug) {
            document.getElementById('debug').innerText =
                (dragObj == null ? '' : dragObj.previousElementSibling.clientWidth) +
                ' ' + ev.clientX + ',' + ev.clientY
        }
        if (dragObj == null) return;

        if (dragObj.className === 'slider') {

            var
                prevX = dragObj.previousElementSibling,
                nextX = dragObj.nextElementSibling,
                slideLimitRight = getWidth(),
                slideLimitLeft = parseInt(prevX.style.left);
            if (nextX.nextElementSibling) {
                slideLimitRight = parseInt(nextX.nextElementSibling.style.left)
            }
            if ((ev.clientX > (slideLimitLeft + 9)) && (ev.clientX < (slideLimitRight - 7))) {
                dragObj.style.left = (ev.clientX - 2) + 'px';
                if (nextX !== null) {
                    nextX.style.left = ev.clientX + 'px';
                    if (nextX.nextElementSibling) {
                        nextX.style.width = (parseInt(nextX.nextElementSibling.style.left) -
                            parseInt(ev.clientX) + 1) + 'px'
                    } else {
                        nextX.style.width = getWidth() - parseInt(ev.clientX) + 'px'
                    }
                }
                prevX.style.width = (parseInt(dragObj.style.left) - parseInt(prevX.style.left)) + 'px';
            }

        }
        if (dragObj.className === 'sliderY') {
            var
                prevY = dragObj.previousElementSibling,
                nextY = dragObj.nextElementSibling,
                slideLimitBottom = getHeight(),
                slideLimitTop = parseInt(prevY.style.top);
            if (nextY.nextElementSibling) {
                slideLimitBottom = parseInt(nextY.nextElementSibling.style.top)
            }
            if ((ev.clientY > (slideLimitTop + 9)) && (ev.clientY < (slideLimitBottom - 7))) {
                dragObj.style.top = (ev.clientY - 2) + 'px';
                if (nextY !== null) {
                    nextY.style.top = ev.clientY + 'px';
                    if (nextY.nextElementSibling) {
                        nextY.style.height = (parseInt(nextY.nextElementSibling.style.top) -
                            parseInt(ev.clientY) + 1) + 'px'
                    } else {
                        nextY.style.height = getHeight() - parseInt(ev.clientY) + 'px'
                    }
                }
                prevY.style.height = (parseInt(dragObj.style.top) - parseInt(prevY.style.top)) + 'px';
            }
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

    function orderHeight() {
        var
            slider = document.getElementsByClassName('sliderY'),
            content = document.getElementsByClassName('contentY'),
            offset = getHeight() / (((slider.length * 2) + 2) / 2);
        for (var i = 0; i < content.length; i++) {
            if (i < slider.length) slider[i].style.top = (((i + 1) * offset)) - 2 + 'px';
            content[i].style.top = (i * offset) + 'px';
            content[i].style.height = offset + 'px'
        }
        if (slider.length > 0) {
            if (slider[0].previousElementSibling != null)
                slider[0].previousElementSibling.style.height = offset + 'px'
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
            firstContent.style.height = '100vh';
            firstContent.style.width = getWidth() + 'px';
            firstContent.style.boxSizing = 'border-box';
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
        newSlider.style.borderLeft = 'solid 1px #CCCCCC';
        newSlider.style.borderRight = 'solid 1px #222222';
        newSlider.style.height = '100vh';
        newSlider.style.background = '#666666';
        newSlider.style.cursor = 'ew-resize';
        newSlider.style.zIndex = '999';
        newSlider.onmousedown = function () {
            dragObj = newSlider
        };
        newContent.style.position = 'absolute';
        newContent.style.top = '0';
        newContent.style.right = '0';
        newContent.style.height = '100vh';
        newContent.style.boxSizing = 'border-box';
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
        newContentTop.style.boxSizing = 'border-box';
        newContentTop.style.height = '0';
        obj.innerHTML = '';
        obj.appendChild(newContentTop);

        newSlider.style.position = 'absolute';
        newSlider.style.left = '8px';
        newSlider.style.top = (getHeight() / 2) + 'px';
        newSlider.style.width = getWidth() + 'px';
        newSlider.style.height = '8px';
        newSlider.style.borderTop = 'solid 1px #CCCCCC';
        newSlider.style.borderBottom = 'solid 1px #222222';
        newSlider.style.background = '#666666';
        newSlider.style.cursor = 'ns-resize';
        newSlider.style.zIndex = '999';
        newSlider.setAttribute('class', 'sliderY');
        newSlider.onmousedown = function () {
            dragObj = newSlider
        };
        obj.appendChild(newSlider);

        newContentBottom.setAttribute('class', 'contentY');
        newContentBottom.innerHTML = iframe;
        newContentBottom.style.position = 'absolute';
        newContentBottom.style.bottom = '0';
        newContentBottom.style.right = '0';
        newContentBottom.style.width = '100%';
        newContentBottom.style.height = '0';
        newContentBottom.style.boxSizing = 'border-box';
        if (url === 'http://') newContentBottom.style.background = getRandomColor();
        obj.appendChild(newContentBottom);

        orderHeight()
    }

    window.onresize = function() {
        orderWidth();
        orderHeight()
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
                if (document.getElementsByClassName('contentY').length > 1) {
                    document.querySelectorAll('.contentY').forEach(function (value) {
                        if (value.style.borderTopWidth === '6px') {
                            if (value.previousSibling) value.parentNode.removeChild(value.previousSibling);
                            value.parentNode.removeChild(value);
                            orderHeight()
                        }
                    });
                    if (document.getElementsByClassName('sliderY').length ===
                        document.getElementsByClassName('contentY').length) {
                        document.getElementsByClassName('sliderY')[0].parentNode
                            .removeChild(document.getElementsByClassName('sliderY')[0]);
                        orderHeight()
                    }
                }
                if (document.getElementsByClassName('contentY').length === 1) {
                    document.getElementsByClassName('contentY')[0].parentNode.innerHTML =
                        document.getElementsByClassName('contentY')[0].innerHTML;
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
