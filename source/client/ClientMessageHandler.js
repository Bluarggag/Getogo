


var ClientMessageHandler = function(params) {

    this.clientId = params.clientId;
    this.serverId = null;

    this.checkinLoopId = null;

    this.multiplayerSession = params.multiplayerSession;
    this.clientEventHandler = params.clientEventHandler;

    this.clientEventHandler.registerListenerToType(this, EventType.ENTITY);

    if (!this.multiplayerSession) log("ClientMessageHandler: multiplayerSession missing.", LogType.ERROR);
    if (!this.clientEventHandler) log("ClientMessageHandler: clientEventHandler missing.", LogType.ERROR);

    var that = this;


    ClientMessageHandler.prototype.onReceivedMessage = function (senderId, messageType, messageData) {
        if (messageData) {
            var data = JSON.parse(messageData);
            switch (messageType) {
                case NetworkMessageType.EVENT:
                    that.handleServerEvent(senderId, messageType, data);
                    break;
                case NetworkMessageType.SERVERINFO:
                    that.handleServerMessage(senderId, messageType, data);
                    break;
                default:
                    log("ClientMessageHandler: received unknown message type.", LogType.FAILED);
            }
        }
    };

    ClientMessageHandler.prototype.updateListener = function (event) {
        //console.log("ClientMessageHandler: updateListener");
        if (event.eventType === EventType.ENTITY) {
            this.handleClientEvent(NetworkMessageType.EVENT, event);
        }
    };
    //TODO message queue for network events!!

    ClientMessageHandler.prototype.handleClientEvent = function (messageType, data) {
        //console.log("ClientMessageHandler: handleClientEvent");
        this.sendToServer(messageType, data);
    };

    ClientMessageHandler.prototype.handleServerEvent = function (senderId, messageType, data) {
        //console.log("ClientMessageHandler: handleServerEvent");
        this.clientEventHandler.enqueue(data);
    };

    ClientMessageHandler.prototype.handleServerMessage = function (senderId, messageType, data) {
        var that = this;
        if (that.serverId !== senderId && G.client.isInitialized) {
            that.serverId = senderId;
            //alert("ClientMessageHandler: new server " + senderId, LogType.IMPORTANT);
            log("ClientMessageHandler: new server " + senderId, LogType.IMPORTANT);
            G.client.onConnectedInitialize();
        }
    };

    // periodically notify server (or all, if none exists)
    ClientMessageHandler.prototype.checkinServer = function () {
        if (that.serverId) {
            that.sendToServer(NetworkMessageType.CLIENTINFO, "checkin");
        } else {
            that.multiplayerSession.sendToAll(NetworkMessageType.CLIENTINFO, JSON.stringify("checkin"));
            if (G.server) { // also give to local server if exists
                G.server.serverMessageHandler.onReceivedMessage(that.clientId, NetworkMessageType.CLIENTINFO, JSON.stringify("checkin"));
            }
        }
    };

    // all traffic goes through here (except checkin above)
    ClientMessageHandler.prototype.sendToServer = function (messageType, data) {
        var that = this;
        var messageData = JSON.stringify(data);
        if (that.serverId) {
            if (that.serverId != that.clientId)
                that.multiplayerSession.sendTo(that.serverId, messageType, messageData);
            else //give to local server directly
                G.server.serverMessageHandler.onReceivedMessage(that.clientId, messageType, messageData);
        }
    };

    ClientMessageHandler.prototype.destroy = function () {
        var that = this;
        TurbulenzEngine.clearInterval(that.checkinLoopId);
        if (that.serverId) {
            that.sendToServer(NetworkMessageType.CLIENTINFO, "checkout");
        }
    };

    if (!G.server) { //important! or else server cant handle remote clients
        that.multiplayerSession.onmessage = that.onReceivedMessage;
        //alert("remote client");
    } else {
        //alert("local client");
    }
    that.checkinServer();
    that.checkinLoopId = TurbulenzEngine.setInterval(function () { that.checkinServer(); }, 1000);
};