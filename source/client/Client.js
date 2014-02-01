
//TODO, parallel initialization, subsequent, and waiting for callback.

var Client = function(params){

    this.isInitialized = false;
    this.hasFailed = false;
    this.initializationRequirements = {
        "requestHandler": [],
        "gameSession": ["requestHandler"],
        "multiplayerSessionManager": ["gameSession"],
        "multiplayerSession": ["gameSession", "multiplayerSessionManager"],
        "clientEventHandler": [],
        "clientMessageHandler": ["multiplayerSession", "clientEventHandler"],
        "entityManager": ["clientEventHandler"],
        "spatialManager": null,
        "renderManager": ["spatialManager"],
        "cameraManager": ["spatialManager"],
        "sceneManager": null
    };

    this.clientMessageHandler = null;
    this.clientEventHandler = null;

    this.entityStash = null;
    this.entityTypeStash = null;
    this.entityTableColumns = null;
    this.entityManager = null;
    
    this.spatialManager = null; //Spatial Components
    this.renderManager = null; //Render Components
    this.cameraManager = null; //Camera Components
    this.movementPredictionManager = null;

    this.inputHandler = null;

    this.sceneManager = null;
    
    this.privateEntityStash = null;
    this.privateEntityManager = null;

    var that = this;
    

    Client.prototype.initialize = function() {
        var that = this;

        // Game Data //
        that.entityStash = new EntityStash();
        that.privateEntityStash = new EntityStash();
        that.entityTypeStash = new EntityTypeStash();
        that.entityTableColumns = new EntityTableColumns();

        // EventHandler //
        that.clientEventHandler = new ClientEventHandler({});

        // MessageHandler //
        that.clientMessageHandler = new ClientMessageHandler({
            multiplayerSession: T.multiplayerSession,
            clientEventHandler: that.clientEventHandler,
            clientId: T.multiplayerSession.playerId
        });
        that.clientEventHandler.clientMessageHandler = that.clientMessageHandler;

        that.entityManager = new EntityManager({
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns,
            eventHandler: that.clientEventHandler
        });
        that.clientEventHandler.registerListenerToType(that.entityManager, EventType.UPDATE);

        that.privateEntityManager = new EntityManager({
            entityStash: that.privateEntityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns,
            eventHandler: that.clientEventHandler
        });
        that.clientEventHandler.registerListenerToType(that.privateEntityManager, EventType.LOCALENTITY);

        that.spatialManager = new SpatialManager({
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns
        });
        that.clientEventHandler.registerListenerToType(that.spatialManager, EventType.UPDATE);

        that.renderManager = new RenderManager({
            spatialManager: that.spatialManager,
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns
        });
        that.clientEventHandler.registerListenerToType(that.renderManager, EventType.UPDATE);

        that.cameraManager = new CameraManager({
            spatialManager: that.spatialManager,
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns
        });
        that.clientEventHandler.registerListenerToType(that.cameraManager, EventType.UPDATE);

        that.movementPredictionManager = new MovementPredictionManager({
            spatialManager: that.spatialManager,
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns
        });

        that.inputHandler = new InputHandler();

        that.sceneManager = new SceneManager({
            inputHandler: that.inputHandler,
            renderManager: that.renderManager,
            cameraManager: that.cameraManager
        });

        that.isInitialized = true;
        log("Client: INITIALIZE complete.", LogType.IMPORTANT);
    };
    
    if (T.multiplayerSession) {
        that.initialize();
    } else {
        // MP Session (by joining) //
        var mpSession = T.multiplayerSessionManager.joinAnySession(
            function multiplayerSessionCreatedFn(mpSession) {
                T.multiplayerSession = mpSession;
                T.multiplayerSession.onclose = function () {
                    alert("Server Lost.", LogType.IMPORTANT);
                }
                that.initialize();
            },
            function multiplayerSessionFailedFn() {
                log("Client: multiplayer session creation failed.", LogType.IMPORTANT);
                that.hasFailed = true;
                that.destroy();
                log("Client: INITIALIZE failed.", LogType.IMPORTANT);
            },
            function multiplayerSessionErrorFn() {
                log("Client: multiplayer session creation error.", LogType.ERROR);
                that.hasFailed = true;
                that.destroy();
                log("Client: INITIALIZE failed.", LogType.IMPORTANT);
                alert("Client: INITIALIZE failed.");
            }
        );
    }

    Client.prototype.onConnectedInitialize = function () {
        testInit();
    };

    ///////////////////////////////////////////////////////////////////////////////

    Client.prototype.update = function () {
        //local systems update

        if (this.clientEventHandler) this.clientEventHandler.update();

        if (this.movementPredictionManager) this.movementPredictionManager.update();
        if (this.spatialManager) this.spatialManager.update();
        if (this.renderManager) this.renderManager.update();
        if (this.cameraManager) this.cameraManager.update();
        
        if (this.sceneManager && this.sceneManager.isInitialized) {
            this.sceneManager.update();
        }
        
        testLoop();

    };

    Client.prototype.destroy = function () {
        var that = this;

        if (that.multiplayerSession) {
            that.multiPlayerSession.destroy();
            that.multiPlayerSession = null;
        }
    };
};