
// ServerMessageHandler

// interface for messages in/out
// maintains clients and pings frequently


var ServerMessageHandler = function(params) {

    this.serverId = params.serverId;
    this.clientIds = new Array();

    this.checkinLoopId = null;

    this.multiplayerSession = params.multiplayerSession;
    this.serverEventHandler = params.serverEventHandler;
    this.entityStash = params.entityStash;

    this.serverEventHandler.registerListenerToType(this, EventType.UPDATE);

    if (!this.multiplayerSession) log("ServerMessageHandler: multiplayerSession missing.", LogType.ERROR);
    if (!this.serverEventHandler) log("ServerMessageHandler: serverEventHandler missing.", LogType.ERROR);

    var that = this;

    ServerMessageHandler.prototype.onReceivedMessage = function (senderId, messageType, messageData) {
        if (messageData) {
            var data = JSON.parse(messageData);
            switch (messageType) {
                case NetworkMessageType.EVENT:
                    that.handleClientEvent(senderId, messageType, data);
                    break;
                case NetworkMessageType.CLIENTINFO:
                    that.handleClientMessage(senderId, messageType, data);
                    break;
                default:
                    log("ServerMessageHandler: received unknown message type.", LogType.FAILED);
            }
        };
    };

    ServerMessageHandler.prototype.updateListener = function (event) {
        //console.log("ServerMessageHandler: updateListener");
        if (event.eventType === EventType.UPDATE) {
            this.handleServerEvent(NetworkMessageType.EVENT, event);
        }
    };

    ServerMessageHandler.prototype.handleServerEvent = function (messageType, data) {
        //console.log("ServerMessageHandler: handleServerEvent");
        this.sendToClients(messageType, data);
    };

    ServerMessageHandler.prototype.handleClientEvent = function (senderId, messageType, data) {
        var that = this;
        that.serverEventHandler.enqueue(data);
    };

    ServerMessageHandler.prototype.handleClientMessage = function (senderId, messageType, data) {
        var that = this;
        switch (data) {
            case "checkin":
                var index = that.clientIds.indexOf(senderId);
                if ( index <= -1 ) {
                    that.clientIds.push(senderId);
                    //alert("ServerMessageHandler: new client " + senderId, LogType.IMPORTANT);
                    log("ServerMessageHandler: new client " + senderId, LogType.IMPORTANT);
                    //send everything to new client (everybody)
                    that.serverEventHandler.enqueue(new UpdateEntityEvent({
                        updateData: that.entityStash
                    }));
                }
                break;
            case "checkout":
                var index = that.clientIds.indexOf(senderId);
                if ( index > -1 ) {
                    that.clientIds.splice(index, 1);
                    log("ServerMessageHandler: lost client " + senderId, LogType.IMPORTANT);
                }
                break;
            default:
                log("ServerMessageHandler: received unknown message type.", LogType.FAILED);
        }
    };

    //periodically notify all clients
    ServerMessageHandler.prototype.checkinClients = function () {
        that.sendToClients(NetworkMessageType.SERVERINFO, "server says hullo");
    };

    // all traffic goes through here
    ServerMessageHandler.prototype.sendToClients = function (messageType, data) {
        var that = this;
        var messageData = JSON.stringify(data);
        if (that.clientIds.length > 0) {
            var index = that.clientIds.indexOf(that.serverId);
            if (index > -1) {
                // send to all clients except local client
                var clients = that.clientIds.slice();
                clients.splice(index, 1);
                that.multiplayerSession.sendToGroup(clients, messageType, messageData);
                // also give to local client directly
                G.client.clientMessageHandler.onReceivedMessage(that.serverId, messageType, messageData);
            } else {
                that.multiplayerSession.sendToGroup(that.clientIds, messageType, messageData);
            }
        }
    };

    ServerMessageHandler.prototype.destroy = function () {
        var that = this;
        that.clientIds.length = 0;
        TurbulenzEngine.clearInterval(that.checkinLoopId);
    };

    that.multiplayerSession.onmessage = that.onReceivedMessage;
    that.checkinLoopId = TurbulenzEngine.setInterval(function () { that.checkinClients(); }, 1000);
};

