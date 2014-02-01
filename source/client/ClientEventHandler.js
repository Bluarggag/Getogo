

var ClientEventHandler = function (params) {

    this.eventQueue = new Array();
    this.typeListeners = new Array();
    this.clientMessageHandler = params.clientMessageHandler;

    ClientEventHandler.prototype.enqueue = function (event) {
        var that = this;
        that.eventQueue.push(event);
    };

    ClientEventHandler.prototype.registerListenerToType = function (listener, type) {
        var that = this;
        if (undefined === that.typeListeners[type])
            that.typeListeners[type] = new Array();
        that.typeListeners[type].push(listener);
    };

    ClientEventHandler.prototype.unregisterListenerFromType = function (listener, type) {
        var that = this;
        if (undefined === that.typeListeners[type])
            return;
        that.typeListeners[type].splice(that.typeListeners[type].indexOf(listener), 1);
    };

    ClientEventHandler.prototype.dispatchAll = function () {
        var that = this;
        while (that.eventQueue.length > 0) {
            var event = that.eventQueue.splice(0,1)[0]; //get & remove first
            that.dispatch(event);
        }
    };

    ClientEventHandler.prototype.dispatch = function (event) {
        var that = this;
        if (undefined !== that.typeListeners[event.eventType]) {
            //log("ClientEventHandler: dispatch event: type " + event.eventType);
            that.typeListeners[event.eventType].map(function (item) { item.updateListener(event); });
        }
    };

    ClientEventHandler.prototype.update = function () {
        var that = this;
        //TODO: dispatch by priority (networkEvents first, and/or from timestamp, max. amount per frame, effort-attribute of event)

        that.dispatchAll();
    };
};