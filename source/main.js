


//Turbulenz stuff
var T = {
    isInitialized: false,

    graphicsDevice: null,
    mathDevice: null,
    physicsDevice: null,
    inputDevice: null,
    soundDevice: null,
    requestHandler: null,

    renderer: null,
    textureManager: null,
    shaderManager: null,
    fontManager: null,
    effectManager: null,
    soundManager: null,
    soundSourceManager: null,

    gameSession: null,
    multiplayerSessionManager: null,
    multiplayerSession: null,

    mappingTable: null,

    world: null,
    physicsManager: null,

    dynamicUI: null,
    draw2D: null,

    scene: null,
    shader: null,
    technique: null,
    
    callbacks: {
        log: null,
        warn: null,
        error: null
    },

    initialize: function () {

        T.callbacks.log = function (msg) { log("Log-Callback: " + msg); };
        T.callbacks.warn = function (msg) { log("Warning-Callback: " + msg); };
        T.callbacks.error = function (msg) { log("Error-Callback: " + msg); };

        T.graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
        T.mathDevice = TurbulenzEngine.createMathDevice({});
        T.physicsDevice = TurbulenzEngine.createPhysicsDevice({});
        T.inputDevice = TurbulenzEngine.createInputDevice({});
        T.soundDevice = TurbulenzEngine.createSoundDevice({});
        T.requestHandler = RequestHandler.create({});

        //that.requestHandler = RequestHandler.create({
        //    initialretrytime: 500,
        //    notifytime: 4000,
        //    maxretrytime: 8000,
        //    onReconnected: function onReconnectedFn(reason, requestCallContext) { log('Client: Reconnected'); },
        //    onRequestTimeout: function onRequestTimeoutFn(reason, requestCallContext) { log('Client: Connection lost', LogType.FAILED); }
        //});

        T.textureManager = TextureManager.create(T.graphicsDevice, T.requestHandler, null, T.callbacks.error);
        T.shaderManager = ShaderManager.create(T.graphicsDevice, T.requestHandler, null, T.callbacks.error);
        T.fontManager = FontManager.create(T.graphicsDevice, T.requestHandler);
        T.effectManager = EffectManager.create();
        T.soundManager = SoundManager.create(T.soundDevice, T.requestHandler, null, T.callbacks.error);
        T.soundSourceManager = SoundSourceManager.create(T.soundDevice, Constants.MAX_SOUND_SOURCES);

        var dynamicsWorldParameters = {
            maxSubSteps: 10,
            fixedTimeStep: (1.0 / 60.0),
            gravity: [0, 0, 0]
        };
        T.dynamicsWorld = T.physicsDevice.createDynamicsWorld(dynamicsWorldParameters);
        T.physicsManager = PhysicsManager.create(T.mathDevice, T.physicsDevice, T.dynamicsWorld);

        T.dynamicUI = DynamicUIManager.create();
        T.draw2D = Draw2D.create({ graphicsDevice: T.graphicsDevice });

        var gS = TurbulenzServices.createGameSession(
            T.requestHandler,
            function (gameSession) {
                T.gameSession = gameSession;
                T.multiplayerSessionManager = TurbulenzServices.createMultiplayerSessionManager(T.requestHandler, T.gameSession);
                T.isInitialized = true;
            },
            function (gSession) { alert("T: game session creation failed.") }
        );
    }
};

//must not be changed
Constants = {
    MAX_SOUND_SOURCES: 50,
    USE_SHADOWS: true,
    v3: {
        origin: null,
        unitX: null,
        unitY: null,
        unitZ: null
    },
    initialize: function () {
        Constants.int = {
            number_of_horns_on_a_unicorn: 1 //just a reminder
        };

        Constants.v3 = {
            origin: T.mathDevice.v3Build(0, 0, 0),
            unitX: T.mathDevice.v3Build(1, 0, 0),
            unitY: T.mathDevice.v3Build(0, 1, 0),
            unitZ: T.mathDevice.v3Build(0, 0, 1),

            pitch: T.mathDevice.v3Build(1, 0, 0),
            yaw: T.mathDevice.v3Build(0, 1, 0),
            roll: T.mathDevice.v3Build(0, 0, 1),

            red: T.mathDevice.v3Build(1, 0, 0),
            green: T.mathDevice.v3Build(0, 1, 0),
            blue: T.mathDevice.v3Build(0, 0, 1),
            black: T.mathDevice.v3Build(0, 0, 0),
            white: T.mathDevice.v3Build(1, 1, 1)
        };

        Constants.quat = {
            origin: T.mathDevice.quatBuild(0, 0, 0, 1),
            //+ = oben (nach oben drehend; von links schauend im uhrzeigersinn)
            pitch45:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 0.25),
            pitch90:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 0.5),
            pitch135: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 0.75),
            pitch180: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 1.0),
            pitch225: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 1.25),
            pitch270: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 1.5),
            pitch315: T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(1, 0, 0), Math.PI * 1.75),
            //+ = rechts (nach rechts drehend; von oben schauend im uhrzeigersinn)
            yaw45:    T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 0.25),
            yaw90:    T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 0.5),
            yaw135:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 0.75),
            yaw180:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 1.0),
            yaw225:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 1.25),
            yaw270:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 1.5),
            yaw315:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 1, 0), Math.PI * 1.75),
            //+ = rechts (nach rechts rollend; von hinten schauend im uhrzeigersinn)
            roll45:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 0.25),
            roll90:   T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 0.5),
            roll135:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 0.75),
            roll180:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 1.0),
            roll225:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 1.25),
            roll270:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 1.5),
            roll315:  T.mathDevice.quatFromAxisRotation(T.mathDevice.v3Build(0, 0, 1), Math.PI * 1.75),
        };

        Constants.m43 = {
            origin: T.mathDevice.m43Build(
                1, 0, 0,
                0, 1, 0,
                0, 0, 1,
                0, 0, 0
            )           
        };
    }
};



// Eigene Globals
var G = {

    server: null,
    client: null,
}


var loopId;

//entering point
var startApplication = function () {

    var loopIdinitTurbulenz = TurbulenzEngine.setInterval(function () {
        if (T.isInitialized) {
            TurbulenzEngine.clearInterval(loopIdinitTurbulenz);

            // Utility
            custommath.initialize({ mathDevice: T.mathDevice });

            // Constants
            Constants.initialize();

            //Client
            G.client = new Client({});

            dump(T, "TURBULENZ");
            dump(G, "GLOBALS");

            //start main loop
            loopId = TurbulenzEngine.setInterval(mainLoop, 1000 / 60);
        }
    }, 1000 / 60);
    ///////////////
    T.initialize();
    ///////////////

};


var mainLoop = function ()
{
    // create Server if client has failed.
    if ( G.client && true === G.client.hasFailed ) {
        G.client = null;
        G.server = new Server({});
    }

    // update Server
    if ( G.server && G.server.isInitialized )
        G.server.update();

    // update Client
    if ( G.client && G.client.isInitialized )
        G.client.update();
};



var destroyApplication = function () { //noooooooooo

    if (loopId) {
        TurbulenzEngine.clearInterval(loopId);
    }

    if (G.client) G.client.destroy();
    if (G.server) G.server.destroy();

    for (var attribute in T) {
        if (T.hasOwnProperty(attribute)) {
            if (typeof attribute.destroy === "function") {
                attribute.destroy();
                attribute = null;
            }
        }
    }
    T = null;

    Constants = null;
};

