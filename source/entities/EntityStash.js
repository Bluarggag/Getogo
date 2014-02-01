

var EntityTableColumns = function() {
    this.ENTITYTYPES = { "name": 0, "label": 1, "description": 2 };
    this.COMPONENTTYPES = { "name": 0, "description": 1, "datatable": 2 };
    
    this.ENTITIES = { "entitytype_id": 0 };
    this.COMPONENT_SPATIAL = { "position": 0, "orientation": 1 };
    this.COMPONENT_MOVEMENT = { "velocity": 0, "acceleration": 1 }; //per frame added to spatial position
    this.COMPONENT_SPIN = { "velocity": 0, "acceleration": 1 }; //per frame added to spatial orientation
    
    this.COMPONENT_RENDER = { "position": 0, "orientation": 1, "scale": 2, "asset": 3 };
    this.COMPONENT_CAMERA = { "position": 0, "orientation": 1 };
    this.COMPONENT_OWNERSHIP = { "client_id": 0, "username": 1 };

    //todo
    this.COMPONENT_INPUT = { "keymap": 0 };
    this.COMPONENT_PHYSICS = {};
}

var EntityStash = function () {
    this.ENTITIES = [];

    this.COMPONENT_SPATIAL = [];
    this.COMPONENT_MOVEMENT = [];
    this.COMPONENT_SPIN = [];

    this.COMPONENT_RENDER = [];
    this.COMPONENT_CAMERA = [];
    this.COMPONENT_OWNERSHIP = [];
}

var EntityTypeStash = function () {

    //entity type definitions
    this.ENTITYTYPES = [];
    this.ENTITYTYPES[0] = ["Dummy", "Duck", "an entity type for testing and stuff"];
    this.ENTITYTYPES[1] = ["DummyCamera", "DummyCam", "a simple camera"];
    
    //component type definitions 
    this.COMPONENTTYPES = [];
    this.COMPONENTTYPES[0] = ["spatial", "exists in 3D space", "COMPONENT_SPATIAL"];
    this.COMPONENTTYPES[1] = ["movement", "continuous movement", "COMPONENT_MOVEMENT"];
    this.COMPONENTTYPES[2] = ["spin", "continuous turning", "COMPONENT_SPIN"];
    this.COMPONENTTYPES[3] = ["render", "can be visible", "COMPONENT_RENDER"];
    this.COMPONENTTYPES[4] = ["camera", "provides a viewport", "COMPONENT_CAMERA"];
    this.COMPONENTTYPES[5] = ["input", "has a keymap", "COMPONENT_INPUT"];
    this.COMPONENTTYPES[6] = ["ownership", "has a client as owner", "COMPONENT_OWNERSHIP"];

    
    //default component data of entity types
    this.COMPONENT_SPATIAL = [];
    this.COMPONENT_SPATIAL[0] = [[0, 0, 0], [0, 0, 0, 1]];
    this.COMPONENT_SPATIAL[1] = [[0.0, 5.0, 10.0], [0, 0, 0, 1]];
    
    this.COMPONENT_MOVEMENT = [];
    this.COMPONENT_MOVEMENT[0] = [[0, 0, 0], [0, 0, 0]];
    this.COMPONENT_MOVEMENT[1] = [[0, 0, 0], [0, 0, 0]];

    this.COMPONENT_SPIN = [];
    this.COMPONENT_SPIN[0] = [[0, 0, 0, 1], [0, 0, 0, 1]];
    
    this.COMPONENT_RENDER = [];
    this.COMPONENT_RENDER[0] = [[0, 0, 0], [Constants.quat.yaw90[0], Constants.quat.yaw90[1], Constants.quat.yaw90[2], Constants.quat.yaw90[3]], [1, 1, 1], "models/duck.dae"];

    this.COMPONENT_CAMERA = [];
    this.COMPONENT_CAMERA[1] = [[0, 0, 0], [0, 0, 0, 1]];
    
    this.COMPONENT_INPUT = [];

    this.COMPONENT_OWNERSHIP = [];
    this.COMPONENT_OWNERSHIP[0] = [-1, ""];
    
    EntityTypeStash.prototype.getTableOfComponentType = function(componentTypeName) {
        var that = this;
        for (index in that.COMPONENTTYPES) {
            if (arrayHasOwnIndex(that.COMPONENTTYPES, index)) {
                //hard coded = bad
                if (componentTypeName === that.COMPONENTTYPES["name"]) {
                    return that[that.COMPONENTTYPES["datatable"]];
                }
            }
        }
        return "";
    };
}
