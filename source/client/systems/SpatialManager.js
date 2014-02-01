
var SpatialManager = function (params) {

    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = params.entityTableColumns;

    this.dataChanged = new Array();
    this.spatialNodes = new Array();
    
    SpatialManager.prototype.update = function () {
        var that = this;
        for (entityIndex in that.entityStash.COMPONENT_SPATIAL) {
            if (arrayHasOwnIndex(that.entityStash.COMPONENT_SPATIAL, entityIndex)) {
                if (that.dataChanged[entityIndex]) {
                    var data = that.entityStash.COMPONENT_SPATIAL[entityIndex];
                    that.updateSpatialNode(that.spatialNodes[entityIndex], {
                        position: data[that.entityTableColumns.COMPONENT_SPATIAL["position"]],
                        orientation: data[that.entityTableColumns.COMPONENT_SPATIAL["orientation"]]
                    });
                    that.dataChanged[entityIndex] = false;
                }
            }
        }

    };
    
    SpatialManager.prototype.updateListener = function (event) {
        var that = this;
        
        switch (event.eventType) {
            case EventType.UPDATE:
                //check for all spatial entities if there is a node
                for (index in that.entityStash.COMPONENT_SPATIAL) {
                    if (arrayHasOwnIndex(that.entityStash.COMPONENT_SPATIAL, index)) {
                        var data = that.entityStash.COMPONENT_SPATIAL[index];
                        var spatialNode = that.spatialNodes[index];
                        if (!spatialNode) {
                            that.createSpatialNode({
                                entityId: index,
                                position: data[that.entityTableColumns.COMPONENT_SPATIAL["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_SPATIAL["orientation"]]
                            })
                        }
                        else {
                            that.updateSpatialNode(spatialNode, {
                                position: data[that.entityTableColumns.COMPONENT_SPATIAL["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_SPATIAL["orientation"]]
                            });
                        }
                    }
                }
                break;
        }
    };
    
    SpatialManager.prototype.createSpatialNode = function (params) {
        var that = this;
        
        var spatialNode = SceneNode.create({
            name: params.entityId + "_spatialNode"
        });
        T.scene.addRootNode(spatialNode);
        that.spatialNodes[params.entityId] = spatialNode;
        
        var matrix = spatialNode.getLocalTransform();
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.m43Pos(matrix);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatFromM43(matrix);
       
        var m43 = T.mathDevice.m43FromRT(orientation, position);
        spatialNode.setLocalTransform(m43);
    };
    
    SpatialManager.prototype.updateSpatialNode = function (spatialNode, params) {
        
        var matrix = spatialNode.getLocalTransform();
        
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.m43Pos(matrix);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatFromM43(matrix);
        var m43 = T.mathDevice.m43FromRT(orientation, position);
        
        spatialNode.setLocalTransform(m43);
    };
    
}