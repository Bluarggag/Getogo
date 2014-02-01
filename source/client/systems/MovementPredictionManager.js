
// simulates movement and turning on the client
// notifies spatialManager that its data has been changed so the node can be updated

// prediction to precalculation?
// prediction by also executing certain events on the server too (e.g. for input which should give feedback immediately)
//   would need to pre-create entities etc on the client and later confirm that they are the same (client-id + owner)
var MovementPredictionManager = function (params) {

    this.spatialManager = params.spatialManager;
    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = params.entityTableColumns;
    
    MovementPredictionManager.prototype.update = function () {
        var that = this;
        //for each movement component
        for (entityIndex in that.entityStash.COMPONENT_MOVEMENT) {
            if (arrayHasOwnIndex(that.entityStash.COMPONENT_MOVEMENT, entityIndex)) {
                //console.log(entityIndex);

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
                    this.spatialManager.dataChanged[entityIndex] = true;
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
                        T.mathDevice.quatBuild(
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][0],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][1],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][2],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][3]
                        ),
                        T.mathDevice.quatBuild(
                            that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][0],
                            that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][1],
                            that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][2],
                            that.entityStash.COMPONENT_SPIN[entityIndex][accelerationIndex][3]
                        ));
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][0] = newVelocity[0];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][1] = newVelocity[1];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][2] = newVelocity[2];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][3] = newVelocity[3];
                }

                //add spin velocity to spatial orientation if spatial exists
                if (isValid(that.entityStash.COMPONENT_SPATIAL[entityIndex])
                     &&   (that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][0] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][1] != 0
                        || that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][2] != 0)) {
                    var newAcceleration = T.mathDevice.quatMul(
                        T.mathDevice.quatBuild(
                            that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][0],
                            that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][1],
                            that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][2],
                            that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][3]
                        ),
                        T.mathDevice.quatBuild(
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][0],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][1],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][2],
                            that.entityStash.COMPONENT_SPIN[entityIndex][velocityIndex][3]
                        ));
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][0] = newAcceleration[0];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][1] = newAcceleration[1];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][2] = newAcceleration[2];
                    that.entityStash.COMPONENT_SPATIAL[entityIndex][orientationIndex][3] = newAcceleration[3];
                    //
                    this.spatialManager.dataChanged[entityIndex] = true;
                    //console.log(that.entityStash.COMPONENT_SPATIAL[entityIndex][positionIndex]);
                }
            }
        }

    }; //update
}