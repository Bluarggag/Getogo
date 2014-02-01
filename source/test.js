


var testLoop = function () {
}

var testInit = function () {

    var camLook = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI / 4); //+45 pitch (nach oben)
    //create camera
    enqueueEvent(new CreateEntityEvent({
        entityData: {
            entityType: "DummyCamera",
            spatial: {
                position: [0, 15, 10]
                , orientation: camLook
            },
            movement: {
                velocity: [0, 0, 0]
            }
        },
    }));



    //var camera = Camera.create(T.mathDevice);
    //var position = T.mathDevice.v3Build(0, 15, 10);
    //var orientation = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI / 4); //+45 pitch (nach oben)
    //camera.matrix = T.mathDevice.m43FromRT(orientation, position);
    //console.log(camera.matrix);

    //camera.updateViewMatrix();
    //camera.updateViewProjectionMatrix();

    //G.client.cameraManager.activeCamera = camera;

    // input
    dump(T.inputDevice.keyCodes, "KEY CODES");
    // Cache keyCodes
    var inputDevice = T.inputDevice;
    var keyCodes = inputDevice.keyCodes;

    var onKeyDown = function onKeyDownFn(keycode) {

        //drive camera
        if (keycode === keyCodes.UP) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [0, 0, -0.01]
                        }
                    }
                })
                );
            }
        }
        if (keycode === keyCodes.DOWN) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [0, 0, 0.01]
                        }
                    }
                })
                );
            }
        }
        if (keycode === keyCodes.LEFT) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [-0.01, 0, 0]
                        }
                    }
                })
                );
            }
        }
        if (keycode === keyCodes.RIGHT) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [0.01, 0, 0]
                        }
                    }
                })
                );
            }
        }
        if (keycode === keyCodes.N) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [0, 0.01, 0]
                        }
                    }
                })
                );
            }
        }
        if (keycode === keyCodes.M) {
            if (G.client.cameraManager.activeCameraIndex > 0) {
                enqueueEvent(new EntityAddDataEvent({
                    entityData: {
                        entityId: G.client.cameraManager.activeCameraIndex,
                        movement: {
                            velocity: [0, -0.01, 0]
                        }
                    }
                })
                );
            }
        }
        ////

        // new Event Type MovementLocalEvent: takes orientation into account (calculated on server)

        
        //entityId: entityId,
        //position: [, , 2],
        //rotationXYZ: [, 90, ],
        //velocity: [, , 0.01],
        //acceleration: [,,],
        //spinVelocityXYZ: [, 5,],
        //spinAccelerationXYZ: [, 0.1, ]


        var move = function () {

            enqueueEvent(new EntityAddLocalRTEvent({
                entityData: {
                }
            }));
        }

        var turn = function (node, axis, degrees) {
            var radians = degrees * Math.PI / 180;
            var orientationDelta = T.mathDevice.quatFromAxisRotation(T.mathDevice.m43Up(node.getLocalTransform()), radians);
            node.orientation = T.mathDevice.quatMul(node.orientation, orientationDelta);
            node.setLocalTransform(T.mathDevice.m43FromRT(node.orientation, node.position));
        };

        var moveXZ = function (node, x, y, z) {
            var move = T.mathDevice.v3Build(x, y, z);
            var positionDelta = T.mathDevice.quatTransformVector(node.orientation, move);
            node.position = T.mathDevice.v3Add(node.position, positionDelta);
            node.setLocalTransform(T.mathDevice.m43FromRT(node.orientation, node.position));
            log(node.getLocalTransform());
        };


        var entityId = 2;
        var duckSpatial = T.scene.findNode(entityId+"_spatialNode");
        if (duckSpatial) {

            if (keycode === keyCodes.NUMBER_1) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildXAxis(), Math.PI * 0.1)
                            },
                        }
                    }));
                }
            }
            if (keycode === keyCodes.NUMBER_2) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildXAxis(), Math.PI * -0.1)
                            },
                        }
                    }));
                }
            }
            if (keycode === keyCodes.NUMBER_3) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * 0.1)
                            },
                        }
                    }));
                }
            }
            if (keycode === keyCodes.NUMBER_4) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * -0.1)
                            },
                        }
                    }));
                }
            }
            if (keycode === keyCodes.NUMBER_5) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildZAxis(), Math.PI * 0.1)
                            },
                        }
                    }));
                }
            }
            if (keycode === keyCodes.NUMBER_6) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    enqueueEvent(new EntityAddLocalRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {
                                orientation: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildZAxis(), Math.PI * -0.1)
                            },
                        }
                    }));
                }
            }

            //eigentlich velocity setzen, und bei keyup wieder runternehmen
            if (keycode === keyCodes.W) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    var roll = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * 0.1);
                    enqueueEvent(new EntityAddWorldRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: {position: [0, 0, -1]}
                        }
                    }));
                }
            }
            if (keycode === keyCodes.A) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    var roll = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * 0.1);
                    enqueueEvent(new EntityAddWorldRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: { position: [-1, 0, 0] }
                        }
                    }));
                }
            }
            if (keycode === keyCodes.S) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    var roll = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * 0.1);
                    enqueueEvent(new EntityAddWorldRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: { position: [0, 0, 1] }
                        }
                    }));
                }
            }
            if (keycode === keyCodes.D) {
                if (G.client.cameraManager.activeCameraIndex > 0) {
                    var roll = T.mathDevice.quatFromAxisRotation(T.mathDevice.v3BuildYAxis(), Math.PI * 0.1);
                    enqueueEvent(new EntityAddWorldRTEvent({
                        entityData: {
                            entityId: entityId,
                            spatial: { position: [1, 0, 0] }
                        }
                    }));
                }
            }


        }


        //console.log("Key pressed: " + getKeyByValue(keyCodes, keycode) + " <=> " + keycode);

        if (keycode === keyCodes.Q) {
            dump(T.scene, "SCENE");
            dump(G.client.entityStash, "ENTITY STASH Client");
            dump(G.client.privateEntityStash, "LOCAL STASH Client");
            if (G.server) {
                dump(G.server.entityStash, "ENTITY STASH Server");
            }
        }
        if (keycode === keyCodes.E) {
            log("camera pow");
            enqueueEvent(new CreateEntityEvent({
                entityData: {entityType: "DummyCamera"}
            }));
        }

        //dummy look at origin
        if (keycode === keyCodes.K) {
            enqueueEvent(new SpatialComponentLookAtEvent({
                entityId: dummy.entityId, targetPoint: Constants.v3.origin
            }));
        }
        //cam look at dummy
        if (keycode === keyCodes.L) {
            enqueueEvent(new SpatialComponentLookAtEvent({
                entityId: dummyCam.entityId, targetEntityId: dummy.entityId
            }));
        }

        //dummy set xyz orientation
        if (keycode === keyCodes.X) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummy.entityId, rotationX: 0.0
            }));
        }
        if (keycode === keyCodes.Y) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummy.entityId, rotationY: 0.0
            }));
        }
        if (keycode === keyCodes.Z) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummy.entityId, rotationZ: 0.0
            }));
        }



        //dummy camera set xyz orientation
        if (keycode === keyCodes.I) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummyCam.entityId, rotationX: 0.0
            }));
        }
        if (keycode === keyCodes.O) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummyCam.entityId, rotationY: 0.0
            }));
        }
        if (keycode === keyCodes.P) {
            enqueueEvent(new SpatialComponentSetTranslationEvent({
                entityId: dummyCam.entityId, rotationZ: 0.0
            }));
        }

        enqueueEvent(new KeyboardEvent({ keyCode: keycode }));

    };
    inputDevice.addEventListener('keydown', onKeyDown);

}