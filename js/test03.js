(function () {

    window.onload = addListeners;

    var
        counter = 1;

    function dragMove(e) {
        e = e || window.event;
        var
            elementId = (e.target || e.srcElement).id,
            eId = parseInt(elementId.substr(1));

        if (eId % 2 === 0) {
            eId++;
            elementId = 'd' + eId;
        }
        var
            drag = document.getElementById(elementId),
            prev = document.getElementById('d' + (eId - 1)),
            next = document.getElementById('d' + (eId + 1)),
            slideLimitRight = screen.width,
            slideLimitLeft = parseInt(prev.style.left);

         if (eId < (counter - 2)) {
             slideLimitRight = parseInt(document.getElementById('d' + (eId + 2)).style.left);
         }

        if (!slideLimitRight) slideLimitRight = screen.width;
        if (isNaN(slideLimitLeft)) slideLimitLeft = 0;
        if ((e.clientX > (slideLimitLeft + 20)) && (e.clientX < (slideLimitRight - 20))) {
            drag.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
            next.style.left = e.clientX + (e.clientX === 0 ? '' : 'px');
        }

        document.getElementById('debug').innerText = counter + ' ' + slideLimitLeft + ' ' + slideLimitRight;

    }

    function newPart(background) {
        
        var
            body = document.getElementsByTagName('body')[0],
            dSliderLeft = screen.width,
            dSlider = document.createElement("div"),
            dSliderId = 'd' + counter,
            dContent = document.createElement("div"),
            dContentId = 'd' + (counter + 1);

        for (var i = 1; i <= counter; i += 2) {
            dSliderLeft = dSliderLeft / 2;
        }
        dSliderLeft = screen.width - dSliderLeft;

        dSlider.setAttribute('id', dSliderId);
        dContent.setAttribute('id', dContentId);

        body.appendChild(dSlider);
        body.appendChild(dContent);

        document.getElementById(dSliderId).style.position = 'absolute';
        document.getElementById(dSliderId).style.left = dSliderLeft + 'px';
        document.getElementById(dSliderId).style.top = '0';
        document.getElementById(dSliderId).style.width = '10px';
        document.getElementById(dSliderId).style.height = '100vh';
        document.getElementById(dSliderId).style.background = '#999999';
        document.getElementById(dSliderId).style.cursor = 'ew-resize';
        document.getElementById(dSliderId).style.zIndex = '999';

        document.getElementById(dContentId).style.position = 'absolute';
        document.getElementById(dContentId).style.left = dSliderLeft + 'px';
        document.getElementById(dContentId).style.top = '0';
        document.getElementById(dContentId).style.right = '0';
        document.getElementById(dContentId).style.height = '100vh';
        document.getElementById(dContentId).style.background = background;

        document.getElementById(dSliderId).addEventListener('mousedown', mouseDown, true);

        counter += 2;
        console.log(counter + ' ' + dSliderLeft);

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

    newPart('red');
    newPart('blue');
    newPart('yellow');

})();
