
// adds movement and turning

var MovementManager = function (params) {

    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = params.entityTableColumns;
    this.eventHandler = params.eventHandler;

    MovementManager.prototype.updateListener = function (event) {
        var that = this;
        switch (event.eventType) {
            case EventType.ENTITY:
                switch (event.eventName) {
                    case "setRT":
                        that.setRT(event.entityData);
                        that.eventHandler.enqueue(new UpdateEntityEvent({
                            updateData: event.entityData
                        }));
                        break;
                    case "addLocalRT":
                        var updateStash = that.addRT(event.entityData, true);
                        that.eventHandler.enqueue(new UpdateEntityEvent({
                            updateData: updateStash
                        }));
                        break;
                    case "addWorldRT":
                        var updateStash = that.addRT(event.entityData, false);
                        that.eventHandler.enqueue(new UpdateEntityEvent({
                            updateData: updateStash
                        }));
                        break;
                }
                break;
        }
    };
    

    MovementManager.prototype.update = function () {
        var that = this;
        //for each movement component
        for (entityIndex in that.entityStash.COMPONENT_MOVEMENT) {
            if (arrayHasOwnIndex(that.entityStash.COMPONENT_MOVEMENT, entityIndex)) {

                var accelerationIndex = that.entityTableColumns.COMPONENT_MOVEMENT["acceleration"];
                var velocityIndex = that.entityTableColumns.COMPONENT_MOVEMENT["velocity"];
                var positionIndex = that.entityTableColumns.COMPONENT_SPATIAL["position"];

                //add movement acceleration to movement velocity
                for (i in that.entityStash.COMPONENT_MOVEMENT[entityIndex][accelerationIndex]) {
                    if (arrayHasOwnIndex(that.entityStash.COMPONENT_MOVEMENT[entityIndex][accelerationIndex], i)) {
                        that.entityStash.COMPONENT_MOVEMENT[entityIndex][velocityIndex][i] += that.entityStash.COMPONENT_MOVEMENT[entityIndex][accelerationIndex][i];
                    }
                }
                //add movement velocity to spatial position if spatial exists
                if (isValid(that.entityStash.COMPONENT_SPATIAL[entityIndex])) {
                    for (i in that.entityStash.COMPONENT_MOVEMENT[entityIndex][velocityIndex]) {
                        if (arrayHasOwnIndex(that.entityStash.COMPONENT_MOVEMENT[entityIndex][velocityIndex], i)) {
                            that.entityStash.COMPONENT_SPATIAL[entityIndex][positionIndex][i] += that.entityStash.COMPONENT_MOVEMENT[entityIndex][velocityIndex][i];
                        }
                    }
                }

            }
        }
        for (entityIndex in that.entityStash.COMPONENT_SPIN) {
            if (arrayHasOwnIndex(that.entityStash.COMPONENT_SPIN, entityIndex)) {

                var accelerationIndex = that.entityTableColumns.COMPONENT_SPIN["acceleration"];
                var velocityIndex = that.entityTableColumns.COMPONENT_SPIN["velocity"];
                var orientationIndex = that.entityTableColumns.COMPONENT_SPATIAL["orientation"];

                //add spin acceleration to spin velocity
                if (that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][0] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][1] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][2] != 0) {

                    var newVelocity = T.mathDevice.quatMul(
                        MathDeviceConvert.arrayToQuat(T.mathDevice, that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex]), 
                        MathDeviceConvert.arrayToQuat(T.mathDevice, that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex]));
                    that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex] = MathDeviceConvert.quatToArray(newVelocity);
                }

                //add spin velocity to spatial orientation if spatial exists
                if (isValid(that.entityStash.COMPONENT_SPATIAL[entityIndex])
                     && (that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][0] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][1] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][2] != 0)) {

                    var newAcceleration = T.mathDevice.quatMul(
                        MathDeviceConvert.arrayToQuat(T.mathDevice, that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex]),
                        MathDeviceConvert.arrayToQuat(T.mathDevice, that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex]));
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex] = MathDeviceConvert.quatToArray(newAcceleration);
                }
            }
        }

    }; // update

    MovementManager.prototype.setRT = function (entityData) {
        var that = this;
        if (entityData["spatial"]) {
            if (entityData["spatial"]["position"]) {
                that.entityStash[table][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["position"]] = entityData["spatial"]["position"];
            }
            if (entityData["spatial"]["orientation"]) {
                that.entityStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["orientation"]] = entityData["spatial"]["orientation"];
            }
        }
        if (entityData["movement"]) {
            if (entityData["movement"]["velocity"]) {
                that.entityStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["velocity"]] = entityData["movement"]["velocity"];
            }
            if (entityData["movement"]["acceleration"]) {
                that.entityStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["acceleration"]] = entityData["movement"]["acceleration"];
            }
        }
        if (entityData["spin"]) {
            if (entityData["spin"]["velocity"]) {
                that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["velocity"]] = entityData["spin"]["velocity"];
            }
            if (entityData["spin"]["acceleration"]) {
                that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["acceleration"]] = entityData["spin"]["acceleration"];
            }
        }
        return updateStash;

    };


    MovementManager.prototype.addRT = function (entityData, isLocal) {
        var that = this;
        var updateStash = new EntityStash();
        if (entityData["spatial"]) {
            updateStash["COMPONENT_SPATIAL"][entityData.entityId] = [];
            //position
            var dataPosition = entityData["spatial"]["position"];
            if (dataPosition) {
                var stashPosition = that.entityStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["position"]];
                stashPosition[0] += dataPosition[0]; stashPosition[1] += dataPosition[1]; stashPosition[2] += dataPosition[2];
                updateStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["position"]] = stashPosition.slice();
            }
            //orientation
            var dataOrientation = entityData["spatial"]["orientation"];
            if (dataOrientation) {
                var stashOrientation = that.entityStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["orientation"]];
                var orientation = MathDeviceConvert.arrayToQuat(T.mathDevice, stashOrientation);
                var orientationDelta = MathDeviceConvert.arrayToQuat(T.mathDevice, dataOrientation);
                var newOrientation = (isLocal ? T.mathDevice.quatMul(orientationDelta, orientation) : T.mathDevice.quatMul(orientation, orientationDelta));
                stashOrientation = MathDeviceConvert.quatToArray(newOrientation);
                that.entityStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["orientation"]] = stashOrientation;
                updateStash["COMPONENT_SPATIAL"][entityData.entityId][that.entityTableColumns["COMPONENT_SPATIAL"]["orientation"]] = stashOrientation.slice();
            }
        }
        if (entityData["movement"]) {
            updateStash["COMPONENT_MOVEMENT"][entityData.entityId] = [];
            //velocity
            var dataVelocity = entityData["movement"]["velocity"];
            if (dataVelocity) {
                var stashVelocity = that.entityStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["velocity"]];
                stashVelocity[0] += dataVelocity[0]; stashVelocity[1] += dataVelocity[1]; stashVelocity[2] += dataVelocity[2];
                updateStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["velocity"]] = stashVelocity.slice();
            }
            //acceleration
            var dataAcceleration = entityData["movement"]["acceleration"];
            if (dataAcceleration) {
                var stashAcceleration = that.entityStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["acceleration"]];
                stashAcceleration[0] += dataAcceleration[0]; stashAcceleration[1] += dataAcceleration[1]; stashAcceleration[2] += dataAcceleration[2];
                updateStash["COMPONENT_MOVEMENT"][entityData.entityId][that.entityTableColumns["COMPONENT_MOVEMENT"]["acceleration"]] = stashAcceleration.slice();
            }
        }
        if (entityData["spin"]) {
            updateStash["COMPONENT_SPIN"][entityData.entityId] = [];
            //velocity
            var dataVelocity = entityData["spin"]["velocity"];
            if (dataVelocity) {
                var stashVelocity = that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["velocity"]];
                var velocity = MathDeviceConvert.arrayToQuat(T.mathDevice, stashVelocity);
                var velocityDelta = MathDeviceConvert.arrayToQuat(T.mathDevice, dataVelocity);
                var newVelocity = (isLocal ? T.mathDevice.quatMul(velocityDelta, velocity) : T.mathDevice.quatMul(velocity, velocityDelta));
                stashVelocity = MathDeviceConvert.quatToArray(newVelocity);
                that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["velocity"]] = stashVelocity;
                updateStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["velocity"]] = stashVelocity.slice();
            }
            //acceleration
            var dataAcceleration = entityData["spin"]["acceleration"];
            if (dataAcceleration) {
                var stashAcceleration = that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["acceleration"]];
                var acceleration = MathDeviceConvert.arrayToQuat(T.mathDevice, stashAcceleration);
                var accelerationDelta = MathDeviceConvert.arrayToQuat(T.mathDevice, dataAcceleration);
                var newAcceleration = T.mathDevice.quatMul(acceleration, accelerationDelta);
                var newAcceleration = (isLocal ? T.mathDevice.quatMul(accelerationDelta, acceleration) : T.mathDevice.quatMul(acceleration, accelerationDelta));
                stashAcceleration = MathDeviceConvert.quatToArray(newAcceleration);
                that.entityStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["acceleration"]] = stashAcceleration;
                updateStash["COMPONENT_SPIN"][entityData.entityId][that.entityTableColumns["COMPONENT_SPIN"]["acceleration"]] = stashAcceleration.slice();
            }
        }
        return updateStash;
    };


}