
var InputEventType = {
    KEYDOWN: 0, //keyCode
    KEYUP: 1, //keyCode
    MOUSEDOWN: 2, //mouseCode, x, y
    MOUSEUP: 3, //mouseCode, x, y
    MOUSEWHEEL: 4, //delta
    MOUSEOVER: 5, //x, y
    MOUSEMOVE: 6 //x, y
};


var InputHandler = function () {

    this.mouseX = 0;
    this.mouseY = 0;

    this.listeners = new Array();

    //keep priority values low
    InputHandler.prototype.registerListener = function (listener, priorityLevel) {
        while (isValid(this.listeners[priorityLevel])) {
            priorityLevel++; //not entirely reliable order but should do
        }
        this.listeners[priorityLevel] = listener;
    };

    InputHandler.prototype.removeListener = function (listener) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (listener === this.listeners[i]) {
                this.listeners.splice(i, 1);
            }
        }
    };

    InputHandler.prototype.dispatchInputEvent = function (inputEvent) {
        for (var i = this.listeners.length - 1; i >= 0; i--) { //highest first ()
            if (arrayHasOwnIndex(this.listeners, i)) {
                if (false === this.listeners[i].handleInputEvent(inputEvent))
                    break; //the state decides if it passes the event to states below (by return value)
            }
        }
    };


    InputHandler.prototype.initialize = function () {
        var that = this;
        //catch ALL the input events
        //maybe look beforehand if theres the need for these events to be dispatched

        T.inputDevice.addEventListener('keydown', function (keyCode) {
            that.dispatchInputEvent({
                inputEventType: InputEventType.KEYDOWN,
                keyCode: keyCode,
            });
        });
        T.inputDevice.addEventListener('keyup', function (keyCode) {
            that.dispatchInputEvent({
                inputEventType: InputEventType.KEYUP,
                keyCode: keyCode,
            });
        });
        T.inputDevice.addEventListener('mousedown', function (mouseCode, x, y) {
            that.dispatchInputEvent({
                inputEventType: InputEventType.MOUSEDOWN,
                mouseCode: mouseCode,
                x: x, y: y
            });
        });
        T.inputDevice.addEventListener('mouseup', function (mouseCode, x, y) {
            that.dispatchInputEvent({
                inputEventType: InputEventType.MOUSEUP,
                mouseCode: mouseCode,
                x: x, y: y
            });
        });
        T.inputDevice.addEventListener('mousewheel', function (delta) {
            that.dispatchInputEvent({
                inputEventType: InputEventType.MOUSEWHEEL,
                delta: delta
            });
        });
        T.inputDevice.addEventListener('mouseover', function (x, y) { //only when mouse unlocked
            that.mouseX = x;
            that.mouseY = y;
            //that.mouseX = (x / T.graphicsDevice.width);
            //that.mouseY = (y / T.graphicsDevice.height);
            //console.log(that.mouseX + ", " + that.mouseY);
            that.dispatchInputEvent({
                inputEventType: InputEventType.MOUSEOVER,
                x: x, y: y
            });
        });
        T.inputDevice.addEventListener('mousemove', function (x, y) { //only when mouse locked
            that.dispatchInputEvent({
                inputEventType: InputEventType.MOUSEMOVE,
                x: x, y: y
            });
        });
    };
    this.initialize();

    InputHandler.prototype.update = function () {
        T.inputDevice.update();
    };
}









//keydown/keyup events
//mousedown/mouseup events
//mousemove events (When mouse is locked)
//paddown/padup events
//padmove events
//touchstart/touchend events
//touchmove events

//focus/blur events
//mouseenter/mouseover/mouseleave events
//mousewheel events
//mouselocklost events
//touchenter/touchleave/touchcancel events