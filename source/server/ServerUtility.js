

var ServerUtility = function() {
    
    this.networkIdIndex = 0;

    ServerUtility.prototype.getNewNetworkId = function () {
        var that = this;
        that.set("networkIdIndex", 1 + that.get("networkIdIndex"));
        return that.get("networkIdIndex");
    }
};

