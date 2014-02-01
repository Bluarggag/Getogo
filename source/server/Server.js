
var Server = function(params){

    this.isInitialized = false;
    this.hasFailed = false;

    this.serverMessageHandler = null;
    this.serverEventHandler = null;

    this.entityStash = null;
    this.entityTypeStash = null;
    this.entityTableColumns = null;
    this.entityManager = null;
    
    this.movementManager = null;

    this.serverUtility = null;

    var that = this;

    Server.prototype.initialize = function () {
        var that = this;

        that.serverUtility = new ServerUtility();

        that.entityStash = new EntityStash();
        that.entityTypeStash = new EntityTypeStash();
        that.entityTableColumns = new EntityTableColumns();

        // EventHandler //
        that.serverEventHandler = new ServerEventHandler({});

        // MessageHandler //
        that.serverMessageHandler = new ServerMessageHandler({
            multiplayerSession: T.multiplayerSession,
            serverEventHandler: that.serverEventHandler,
            entityStash: that.entityStash,
            serverId: T.multiplayerSession.playerId
        });
        that.serverEventHandler.serverMessageHandler = that.serverMessageHandler;

        that.entityManager = new EntityManager({
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns,
            eventHandler: that.serverEventHandler
        });
        that.serverEventHandler.registerListenerToType(that.entityManager, EventType.ENTITY);

        that.movementManager = new MovementManager({
            entityStash: that.entityStash,
            entityTypeStash: that.entityTypeStash,
            entityTableColumns: that.entityTableColumns,
            eventHandler: that.serverEventHandler
        });
        that.serverEventHandler.registerListenerToType(that.movementManager, EventType.ENTITY);

        that.isInitialized = true;
        log("Server: INITIALIZE complete.", LogType.IMPORTANT);
    }

    // MP Session (by hosting) //
    var maxPlayers = 10;
    T.multiplayerSessionManager.createSession(
        maxPlayers,
        function multiplayerSessionCreatedFn(mpSession) {
            T.multiplayerSession = mpSession;
            mpSession.makePublic();
            that.initialize();

            // create Client here; for now  (Server was created because Client failed)
            if ( null === G.client || G.client.hasFailed )
                G.client = new Client({});
        },
        function multiplayerSessionErrorFn() {
            that.hasFailed = true;
            that.destroy();
            log("Server: multiplayerSession creation failed.", LogType.FAILED);
        }
    );

    ///////////////////////////////////////////////////////////////////////////////

    Server.prototype.update = function () {
        // server system update

        if (this.serverEventHandler)
            this.serverEventHandler.update();

        if (this.movementManager)
            this.movementManager.update();

        //EntitySystem.update();
        //AISystem.update();
        //MovementSystem.update();
    };

    Server.prototype.destroy = function () {
        var that = this;

        if (that.multiplayerSession) {
            that.multiPlayerSession.destroy();
            that.multiPlayerSession = null;
        }
    };

};
