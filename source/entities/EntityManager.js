
// System for whole Entities (add, remove..)

//var EntityManagerType = {
//    LOCAL: 1,
//    CLIENT: 2,
//    SERVER: 3
//}

var EntityManager = function (params) {

    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = new EntityTableColumns();

    this.eventHandler = params.eventHandler;

    EntityManager.prototype.updateListener = function (event) {
        var that = this;

        switch (event.eventType) {
            case EventType.UPDATE:
                //Event comes from Server: Update DATA
                switch (event.eventName) {
                    case "updateEntity":
                        var updateStash = event.updateData;
                        that.updateStashFromStash(that.entityStash, updateStash);
                        //console.log("CLIENT STASH updated");
                        //dump(that.entityStash, "CLIENT STASH");
                        //dump(that.entityTypeStash, "CLIENT TYPE STASH");
                        break;
                    case "updateComponent":
                        log("EntityManager: UPDATE event: updateComponent not yet implemented.", LogType.FAILED);
                        break;
                    default:
                        log("EntityManager: UPDATE event: unknown event name.", LogType.FAILED);
                        break;
                };
                break;
            case EventType.LOCALENTITY:
                //Event is local: modifiy state
                switch (event.eventName) {
                    case "createEntity":
                        var updateData = that.addEntityToStash(event.entityData, that.entityStash, that.entityTypeStash);
                        log(updateData, "PRIVATE STASH new entity");
                        break;
                    case "removeEntity":
                        log("EntityManager: local event: removeEntity not yet implemented.", LogType.FAILED);
                        break;
                    default:
                        log("EntityManager: local event: unknown event name.", LogType.FAILED);
                        break;
                };
                break;
            case EventType.ENTITY:
                //Event comes from Client: modify state and update all clients
                switch (event.eventName) {
                    case "createEntity":
                        var entityData = event.entityData;
                        var updateStash = that.addEntityToStash(entityData, that.entityStash, that.entityTypeStash);
                        log("SERVER STASH new entity");
                        //dump(that.entityStash, "SERVER STASH");
                        //dump(that.entityTypeStash, "SERVER TYPE STASH");
                        that.eventHandler.enqueue(new UpdateEntityEvent({ //EventType.UPDATE
                            updateData: updateStash
                        }));
                        break;
                    case "removeEntity": //todo
                        log("EntityManager: server event: removeEntity not yet implemented.", LogType.FAILED);
                        break;
                    case "addData":
                        var sourceStash = that.entityDataToEntityStash(event.entityData);
                        //dump(sourceStash, "UPDATE STASH SERVER");
                        var updateStash = that.updateStashFromStash(that.entityStash, sourceStash, "add");
                        //dump(updateStash, "UPDATED STASH SERVER");
                        that.eventHandler.enqueue(new UpdateEntityEvent({
                            updateData: updateStash
                        }));
                        break;
                    case "setData":
                        var sourceStash = that.entityDataToEntityStash(event.entityData);
                        that.updateStashFromStash(that.entityStash, sourceStash);
                        that.eventHandler.enqueue(new UpdateEntityEvent({
                            updateData: sourceStash //can be same as the sourceStash
                        }));
                        break;
                    default:
                        //log("EntityManager: server event: unknown event name.", LogType.FAILED);
                        break;
                };
                break;
            default:
                log("EntityManager: unknown event type.", LogType.FAILED);
                break;
        };
    };
    
    EntityManager.prototype.updateStashFromStash = function (targetStash, sourceStash, addUp) {
        var updateStash = new EntityStash();
        //writes content at indices of source
        for (var table in sourceStash) {
            if (sourceStash.hasOwnProperty(table)) {
                //console.log(table);
                for (var entityIndex in sourceStash[table]) {
                    if (sourceStash[table].hasOwnProperty(entityIndex) && isValid(sourceStash[table][entityIndex])) {
                        //console.log(entityIndex);
                        if (!isValid(targetStash[table][entityIndex])) targetStash[table][entityIndex] = [];
                        for (columnIndex in sourceStash[table][entityIndex]) {
                            if (arrayHasOwnIndex(sourceStash[table][entityIndex], columnIndex)  && isValid(sourceStash[table][entityIndex][columnIndex])) { //y?
                                //console.log(columnIndex);
                                if (isArray(sourceStash[table][entityIndex][columnIndex])) {
                                    //copy data (array)
                                    if (!isValid(targetStash[table][entityIndex][columnIndex]))
                                        targetStash[table][entityIndex][columnIndex] = [];
                                    for (i in sourceStash[table][entityIndex][columnIndex]) {
                                        if (arrayHasOwnIndex(sourceStash[table][entityIndex][columnIndex], i)) {
                                            if (addUp && isNumber(i)) {
                                                targetStash[table][entityIndex][columnIndex][i] += sourceStash[table][entityIndex][columnIndex][i];
                                            } else {
                                                targetStash[table][entityIndex][columnIndex][i] = sourceStash[table][entityIndex][columnIndex][i];
                                            }
                                        }
                                    }
                                } else {
                                    // copy data (no array)
                                    if (addUp && isNumber(sourceStash[table][entityIndex][columnIndex])) {
                                        targetStash[table][entityIndex][columnIndex] += sourceStash[table][entityIndex][columnIndex];
                                    } else {
                                        targetStash[table][entityIndex][columnIndex] = sourceStash[table][entityIndex][columnIndex];
                                    }
                                }
                                updateStash[table][entityIndex] = targetStash[table][entityIndex].slice();
                            }
                        }
                    }
                }
            }
        }
        return updateStash;
    };
    
    //converts event content to stash format
    EntityManager.prototype.entityDataToEntityStash = function (entityData) {
        var that = this;
        var entity_id = entityData.entityId;
        var entityStash = new EntityStash();
        
        for (var component in entityData) { //"spatial", "movement" etc
            if (entityData.hasOwnProperty(component)) {
                var component_table = "COMPONENT_"+component.toUpperCase();
                if (isValid(that.entityTableColumns[component_table])) {
                    var componentdata = [];
                    for (var column in entityData[component]) { //"position", "orientation" etc
                        if (entityData[component].hasOwnProperty(column)) {
                            if (isValid(that.entityTableColumns[component_table][column])) {
                                var column_index = that.entityTableColumns[component_table][column];
                                componentdata[column_index] = entityData[component][column];
                            }
                        }
                    }
                    entityStash[component_table][entity_id] = componentdata;
                }
            }
        }
        return entityStash;
    };
    
    EntityManager.prototype.addEntityToStash = function (entityData, entityStash, entityTypeStash) {
        var that = this;
        var entitytype_name = entityData.entityType; //(!)
        var entity_id = that.getNewId();
        // update data (changed data) will be basically the same as incoming, but including the default values
        var updateStash = new EntityStash();

        // get type id by parameter name
        var entitytype_id = 0;
        for (var i in entityTypeStash.ENTITYTYPES) {
            if (arrayHasOwnIndex(entityTypeStash.ENTITYTYPES, i)) {
                if (entityTypeStash.ENTITYTYPES[i][that.entityTableColumns.ENTITYTYPES["name"]] === entitytype_name){
                    entitytype_id = parseInt(i, 10);
                    break;
                }
            };
        };
        
        // foreach in COMPONENTTYPES
        for (var k in entityTypeStash.COMPONENTTYPES) {
            if (arrayHasOwnIndex(entityTypeStash.COMPONENTTYPES, k)) {
                var datatable_name = entityTypeStash.COMPONENTTYPES[k][that.entityTableColumns.COMPONENTTYPES["datatable"]];
                if (entityTypeStash[datatable_name][entitytype_id] !== undefined
                    && entityTypeStash[datatable_name][entitytype_id].length > 0) {
                    
                    //get default data
                    var componentdata = entityTypeStash[datatable_name][entitytype_id].slice(); //copy array
                    
                    //overwrite with parameter data if exists
                    var componenttype_name = entityTypeStash.COMPONENTTYPES[k][that.entityTableColumns.COMPONENTTYPES["name"]];
                    var entitycomponent_params = entityData[componenttype_name];
                    for (var property in entitycomponent_params) { //is object (!)
                        if (entitycomponent_params.hasOwnProperty(property)) {
                            var column_index = that.entityTableColumns[datatable_name][property];
                            componentdata[column_index] = entitycomponent_params[property];
                        }
                    }
                    entityStash[datatable_name][entity_id] = componentdata;
                    updateStash[datatable_name][entity_id] = componentdata;
                }
            }
        }
        // add ENTITY ["entitytype_id"]
        entityStash.ENTITIES[entity_id] = [entitytype_id];
        updateStash.ENTITIES[entity_id] = [entitytype_id];
        return updateStash;
    }

    EntityManager.prototype.removeEntityFromContainer = function (entityData, container) {
        var updateStash = {};
        return updateStash;
    }

    this.index = 0;
    EntityManager.prototype.getNewId = function () {
        this.index += 1;
        return this.index;
    };

}

