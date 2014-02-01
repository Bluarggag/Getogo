
var NetworkMessageType = {
    SERVERINFO: 1,
    CLIENTINFO: 2,
    EVENT: 3,
};


var EventType = {
    ENTITY: 1, //entity data to server
    LOCALENTITY: 2,
    UPDATE: 3 //update clients
    
    //ANY: 1, //default
    //SCENE: 3,
    //INPUT: 4,
    //UNIT: 5
};

// for CLIENT only!
function enqueueEvent(event) {
    G.client.clientEventHandler.enqueue(event);
};



//client event sent to server
var CreateEntityEvent = function (params) {
    this.eventName = "createEntity";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;

    //var entityData = {
    //    entityType: "Dummy",
    //    spatial: {
    //        position: [0, 0, 0]
    //    },
    //    movement: {
    //        velocity: [0, 0, 0.01]
    //    }
    //};
}

// modifies raw values 
var EntityAddDataEvent = function (params) { //try to avoid this event
    this.eventName = "addData";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;

    //var entityData = {
    //    entityId: 1,
    //    movement: {
    //        velocity: [0, 0, 0.01]
    //    }
    //};
}

// sets raw values
var EntitySetDataEvent = function (params) {
    this.eventName = "setData";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;

    //var entityData = {
    //    entityId: 1,
    //    spatial: {
    //        position: [0, 0, 0]
    //    },
    //    movement: {
    //        velocity: [0, 0, 0]
    //    }
    //};
}



var EntitySetRTEvent = function (params) {
    this.eventName = "setRT";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;
}

var EntityAddLocalRTEvent = function (params) {
    this.eventName = "addLocalRT";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;

    //enqueueEvent(new EntityLocalRTEvent({
    //    entityData: {
    //        entityId: entityId
    //        , spatial: {
    //            position: [0, 0, 2] //instantly 2 forwards (local space)
    //        }
    //        , movement: {
    //            velocity: [0, 0, 0.01] //velocity 0.01 forwards (local space)
    //        }
    //        , spin: {
    //            velocity: [roll[0], roll[1], roll[2], roll[3]] //rolling around like theres no tomorrow
    //        }
    //    }
    //}));
}

// events viel intuitiver erstellen! 
// roll, pitch statt orientation quaternion in localRT
// etc.

var EntityAddWorldRTEvent = function (params) {
    this.eventName = "addWorldRT";
    this.eventType = EventType.ENTITY;
    this.isLocal = params.isLocal || false;
    this.entityData = params.entityData;
}



//server event sent to all clients
var UpdateEntityEvent = function (params) {
    this.eventName = "updateEntity";
    this.eventType = EventType.UPDATE;
    this.updateData = params.updateData;
}


//////////////////////////////////////////////
//
//var Event = Backbone.Model.extend({
//    defaults: {
//        eventType: EventType.ANY,
//        eventName: "none",
//        isNetworkEvent: false,
//        networkId: null
//    }
//});
//
//////////////////////////////////////////////

//
//var SpatialComponentSetTranslationEvent = Event.extend({
//    defaults: {
//        eventType: EventType.SCENE,
//        eventName: "setTranslation",
//        isNetworkEvent: true
//    },
//    initialize: function (params) {
//        this.entityId = params.entityId;
//        this.position = params.position;
//        this.rotationX = params.rotationX;
//        this.rotationY = params.rotationY;
//        this.rotationZ = params.rotationZ;
//    }
//});
//
//var SpatialComponentAddTranslationEvent = Event.extend({
//    defaults: {
//        eventType: EventType.SCENE,
//        eventName: "addTranslation",
//        isNetworkEvent: true
//    },
//    initialize: function (params) {
//        this.scope = params.scope || "local";
//        this.entityId = params.entityId;
//        this.position = params.position;
//        this.rotationX = params.rotationX;
//        this.rotationY = params.rotationY;
//        this.rotationZ = params.rotationZ;
//    }
//});
//
//
//var SpatialComponentLookAtEvent = Event.extend({
//    defaults: {
//        eventType: EventType.SCENE,
//        eventName: "lookAt",
//        isNetworkEvent: true
//    },
//    initialize: function (params) {
//        this.entityId = params.entityId;
//        this.targetEntityId = params.targetEntityId;
//        this.targetPoint = params.targetPoint;
//    }
//});