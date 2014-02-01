
var SceneManager = function(params) {
    
    this.isInitialized = false;
    this.light = null;
    this.floor = null;
    this.floorCollision = null;
    
    this.cameraManager = params.cameraManager;
    this.renderManager = params.renderManager;
    this.inputHandler = params.inputHandler;
    

    var that = this;

    log("SceneManager: INITIALIZE start.");
    T.scene = Scene.create(T.mathDevice);

    var mappingTableReceived = function mappingTableReceivedFn(mappingTable) {

        T.mappingTable = mappingTable;
        T.textureManager.setPathRemapping(T.mappingTable.urlMapping, T.mappingTable.assetPrefix);
        T.shaderManager.setPathRemapping(T.mappingTable.urlMapping, T.mappingTable.assetPrefix);
        T.soundManager.setPathRemapping(T.mappingTable.urlMapping, T.mappingTable.assetPrefix);

        log("SceneManager: mapping table received.");
        that.setupScene();
    };

    var defaultMappingSettings = {
        assetPrefix: "staticmax/",
        mappingTablePrefix: "",
        mappingTableURL: "mapping_table.json"
    };

    log("SceneManager: loading mapping table...");

    // use game session of client
    TurbulenzServices.createMappingTable(
	    T.requestHandler, T.gameSession, mappingTableReceived, defaultMappingSettings);
    
    SceneManager.prototype.handleInputEvent = function (inputEvent) {
        var passOn = true;
        if (inputEvent.inputEventType === InputEventType.MOUSEDOWN) {
            switch (inputEvent.mouseCode) {
                case T.inputDevice.mouseCodes.BUTTON_0: // left click (select dummy)
                    var camera = G.client.cameraManager.activeCamera;
                    if (camera) {
                        var rayHit = that.generateCursorRay(G.client.cameraManager.activeCamera);
                        if (rayHit) {
                            if (rayHit.body) {
                                console.log(rayHit.body);
                            }
                            if (rayHit.collisionObject) {
                                console.log(rayHit.collisionObject);
                            }
                        }
                    }
                    break;
                case T.inputDevice.mouseCodes.BUTTON_1: // right click (create dummy)
                    var camera = G.client.cameraManager.activeCamera;
                    if (camera) {
                        var rayHit = that.generateCursorRay(G.client.cameraManager.activeCamera);
                        if (rayHit) {
                            log("creating dummy at " + rayHit.hitPoint);
                            enqueueEvent(new CreateEntityEvent({
                                entityData: {
                                    entityType: "Dummy",
                                    spatial: {
                                        position: [rayHit.hitPoint[0], rayHit.hitPoint[1], rayHit.hitPoint[2]]
                                    }
                                }
                            }));
                        }
                    }
                    break;
            }
        }
        return passOn;
    };

    SceneManager.prototype.generateCursorRay = function (camera) {
        var that = this;
        var cameraTransform = camera.matrix;
        var viewWindowX = 1.0 / camera.recipViewWindowX;
        var viewWindowY = 1.0 / camera.recipViewWindowY;
        var aspectRatio = camera.aspectRatio;
        var farPlane = camera.farPlane;
        var md = T.mathDevice;
        var cam_right = md.m43Right(cameraTransform);
        var cam_up = md.m43Up(cameraTransform);
        var cam_at = md.v3Build(-cameraTransform[6], -cameraTransform[7], -cameraTransform[8]);
        var cam_pos = md.m43Pos(cameraTransform);
        var x = (2.0 * (that.inputHandler.mouseX / T.graphicsDevice.width) - 1.0) * viewWindowX;
        var y = (2.0 * (that.inputHandler.mouseY / T.graphicsDevice.height) - 1.0) * viewWindowY / aspectRatio;
        var pickRayFrom = cam_pos;
        var direction = md.v3Normalize(md.v3Sub(md.v3Add(cam_at, md.v3ScalarMul(cam_right, x)), md.v3ScalarMul(cam_up, y)));
        var pickRayTo = md.v3Add(cam_pos, md.v3ScalarMul(direction, farPlane));
        var rayHit = T.dynamicsWorld.rayTest({
            from: pickRayFrom,
            to: pickRayTo,
            mask: T.physicsDevice.FILTER_ALL
        });
        return rayHit;
    };

    SceneManager.prototype.createFloor = function () {

        that.floor = Floor.create(T.graphicsDevice, T.mathDevice);

        //var floorShape = T.physicsDevice.createPlaneShape({
        //    normal: T.mathDevice.v3Build(0, 1, 0),
        //    distance: 0,
        //    margin: 0.001
        //});
        //var floorObject = T.physicsDevice.createCollisionObject({
        //    shape: floorShape,
        //    transform: T.mathDevice.m43BuildIdentity(),
        //    friction: 0.8,
        //    restitution: 0.1,
        //    group: T.physicsDevice.FILTER_STATIC,
        //    mask: T.physicsDevice.FILTER_ALL,
        //    onProcessedContacts: function (objectA, objectB, pairContacts) {
        //        console.log("+++++++++++++++++");
        //        console.log(objectA);
        //        console.log(objectB);
        //        console.log("+++++++++++++++++");
        //    }
        //    //,onPreSolveContact : addContact,
        //    //,onAddedContacts : addContacts
        //});
        ////onRemovedContacts : addContacts
        //// Adds the floor collision object to the world
        //T.dynamicsWorld.addCollisionObject(floorObject);


        var plane = T.physicsDevice.createPlaneShape({
            normal: T.mathDevice.v3Build(0, 1, 0),
            distance: 0,
            margin: 0.001
        });

        var box = T.physicsDevice.createBoxShape({
            halfExtents: [0.5, 0.5, 0.5],
            margin: 0.001
        });

        //A CollisionObject object represents an static or kinematic body against which rigid bodies can collide.
        that.floorCollision = T.physicsDevice.createCollisionObject({
            shape: plane,
            transform: T.mathDevice.m43BuildIdentity(),
            friction: 0.8,
            restitution: 0.1,
            kinematic: false,
            group: T.physicsDevice.FILTER_STATIC,
            mask: T.physicsDevice.FILTER_ALL
        });
        T.dynamicsWorld.addCollisionObject(that.floorCollision);
        //

        var rigidBody = T.physicsDevice.createRigidBody({
            shape: box,
            mass: 10.0,
            inertia: T.mathDevice.v3ScalarMul(box.inertia, 10.0),
            transform: T.mathDevice.m43BuildTranslation(0, 1, 0),
            friction: 0.7,
            restitution: 0.2,
            angularDamping: 0.4
        });

        var physicsNode = SceneNode.create({
            name: "floorPhysicsNode",
            dynamic: true,
            disabled: false
        });
        var dynamicPhysicsNode = {
            body: rigidBody,
            target: physicsNode,
            dynamic: true
        };

        // connect scene node (physicsNode) to simulation node
        T.scene.addRootNode(physicsNode);
        //physicsNode.addChild(duckGeom);
        physicsNode.physicsNodes = [dynamicPhysicsNode];
        physicsNode.setDynamic();

        T.physicsManager.physicsNodes.push(physicsNode);
        //T.physicsManager.dynamicPhysicsNodes.push(dynamicPhysicsNode);
        T.physicsManager.enableHierarchy(physicsNode, true);


    };
	
    SceneManager.prototype.setupScene = function() {

        var that = this;
        log("SceneManager: loading Scene...");

        that.light = Light.create({
            name: "protoAmbientLight",
            ambient: true,
            color: T.mathDevice.v3Build(0.2, 0.2, 0.2)
        });
        T.scene.addLight(that.light);

        //setup renderer
        T.renderer = DefaultRendering.create(T.graphicsDevice, T.mathDevice, T.shaderManager, T.effectManager);
        T.renderer.setGlobalLightPosition(T.mathDevice.v3Build(0.5, 100.0, 0.5));
        T.renderer.setAmbientColor(T.mathDevice.v3Build(0.3, 0.3, 0.4));

        //Shader objects can contain multiple rendering techniques which can be queried per name. 
        //In order to render anything, one Technique must be set on the GraphicsDevice. 
        //Shader parameters can either be set from a TechniqueParameters or changed directly on the technique after setting it on the device. 
        //The former is recommended for updating multiple values at the same time. 
        //When the technique parameter is an array with many values a TechniqueParameterBuffer object can be used to set the whole array at once, 
        //it can be updated in a similar way vertex and index buffers can be updated.

        // dont know if this works yet (duck is there)
        var shaderLoaded = function shaderLoadedFn(shaderDefinitionString) {
            if (shaderDefinitionString) {
                var shaderDefinition = JSON.parse(shaderDefinitionString);
                //setup shader and technique
                T.shader = T.graphicsDevice.createShader(shaderDefinition);
                T.technique = T.shader.getTechnique("textured3D");

                log(T.shaderManager);
                T.renderer.updateShader(T.shaderManager);
                log("SceneManager: Renderer initialized.");
            }
        };
        //TurbulenzEngine.request("assets/shaders/generic3D.cgfx.json", shaderLoaded);


        that.createFloor();

        that.inputHandler.registerListener(this, 2);


        log("SceneManager: INITIALIZE complete.");
        that.isInitialized = true;

    };

    this.previousFrameTime = TurbulenzEngine.time;
    SceneManager.prototype.update = function() {

        var that = this;

	    var currentTime = TurbulenzEngine.time;
	    var deltaTime = (currentTime - that.previousFrameTime);
	    if (deltaTime > 0.1) {deltaTime = 0.1;}

	    var deviceWidth = T.graphicsDevice.width;
	    var deviceHeight = T.graphicsDevice.height;
	    var aspectRatio = (deviceWidth / deviceHeight);
	    //if (aspectRatio !== that.camera.aspectRatio) {
	    //    that.camera.aspectRatio = aspectRatio;
	    //    that.camera.updateProjectionMatrix();
	    //}

	    T.dynamicsWorld.update();
	    T.physicsManager.update();
	    T.scene.update();

	    if (that.cameraManager.activeCamera) {
	        T.renderer.update(T.graphicsDevice, that.cameraManager.activeCamera, T.scene, currentTime);
	    }

	    if (T.graphicsDevice.beginFrame())
	    {
	        T.graphicsDevice.clear([1.0, 1.0, 0.5, 1.0], 1.0, 0.0);

            // shader and technique are set
	        if (T.shader && T.technique) {
	            T.graphicsDevice.setTechnique(T.technique);
	        }

	        if (T.renderer.updateBuffers(T.graphicsDevice, deviceWidth, deviceHeight)) {
		        T.renderer.draw(T.graphicsDevice);
	        }

	        if (that.cameraManager.activeCamera) {
	            if (that.floor) {
	                that.floor.render(T.graphicsDevice, that.cameraManager.activeCamera);
	            }
	        }
	
	        T.graphicsDevice.endFrame();
	    }
    };

    SceneManager.prototype.destroy = function() {
        var that = this;

        that.isInitialized = false;
        that.floor = null;
        that.light = null;
    };

};

