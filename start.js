
/* Turbulenz files*/
//protolib
/*{{ javascript('jslib/aabbtree.js') }}*/
/*{{ javascript('jslib/assettracker.js') }}*/
/*{{ javascript('jslib/camera.js') }}*/
/*{{ javascript('jslib/draw2d.js') }}*/
/*{{ javascript('jslib/effectmanager.js') }}*/
/*{{ javascript('jslib/fontmanager.js') }}*/
/*{{ javascript('jslib/forwardrendering.js') }}*/
/*{{ javascript('jslib/geometry.js') }}*/
/*{{ javascript('jslib/indexbuffermanager.js') }}*/
/*{{ javascript('jslib/light.js') }}*/
/*{{ javascript('jslib/loadingscreen.js') }}*/
/*{{ javascript('jslib/material.js') }}*/
/*{{ javascript('jslib/observer.js') }}*/
/*{{ javascript('jslib/requesthandler.js') }}*/
/*{{ javascript('jslib/renderingcommon.js') }}*/
/*{{ javascript("jslib/defaultrendering.js") }}*/
/*{{ javascript('jslib/resourceloader.js') }}*/
/*{{ javascript('jslib/scene.js') }}*/
/*{{ javascript('jslib/scenenode.js') }}*/
/*{{ javascript('jslib/shadermanager.js') }}*/
/*{{ javascript('jslib/shadowmapping.js') }}*/
/*{{ javascript('jslib/soundmanager.js') }}*/
/*{{ javascript('jslib/texturemanager.js') }}*/
/*{{ javascript("jslib/physicsmanager.js") }}*/
/*{{ javascript('jslib/utilities.js') }}*/
/*{{ javascript('jslib/vertexbuffermanager.js') }}*/
/*{{ javascript('jslib/vmath.js') }}*/
/*{{ javascript("jslib/physics2ddevice.js") }}*/
/*{{ javascript("jslib/boxtree.js") }}*/

/*{{ javascript("jslib/floor.js") }}*/

//protolib
/*{{ javascript('jslib/services/turbulenzbridge.js') }}*/
/*{{ javascript('jslib/services/turbulenzservices.js') }}*/
/*{{ javascript('jslib/services/gamesession.js') }}*/
/*{{ javascript('jslib/services/mappingtable.js') }}*/

/*{{ javascript("jslib/services/multiplayersession.js") }}*/
/*{{ javascript("jslib/services/multiplayersessionmanager.js") }}*/

//protolib
/*{{ javascript('protolib/debugdraw.js') }}*/
/*{{ javascript('protolib/duimanager.js') }}*/
/*{{ javascript('protolib/jqueryextend.js') }}*/
/*{{ javascript('protolib/protolib.js') }}*/
/*{{ javascript('protolib/sceneloader.js') }}*/
/*{{ javascript('protolib/simplefonts.js') }}*/
/*{{ javascript('protolib/simplesceneloader.js') }}*/
/*{{ javascript('protolib/simplesprite.js') }}*/
/*{{ javascript('protolib/soundsourcemanager.js') }}*/

/* utility */

/*{{ javascript("source/util/globalfunctions.js") }}*/
/*{{ javascript("source/util/helper.js") }}*/
/*{{ javascript("source/util/custommath.js") }}*/


/* custom */

/*{{ javascript("source/entities/EntityStash.js") }}*/
/*{{ javascript("source/entities/EntityManager.js") }}*/
/*{{ javascript("source/client/SceneManager.js") }}*/
/*{{ javascript("source/client/systems/SpatialManager.js") }}*/
/*{{ javascript("source/client/systems/CameraManager.js") }}*/
/*{{ javascript("source/client/systems/RenderManager.js") }}*/
/*{{ javascript("source/client/systems/MovementPredictionManager.js") }}*/

/*{{ javascript("source/client/Client.js") }}*/
/*{{ javascript("source/client/ClientMessageHandler.js") }}*/
/*{{ javascript("source/client/ClientEventHandler.js") }}*/
/*{{ javascript("source/client/InputHandler.js") }}*/

/*{{ javascript("source/server/Server.js") }}*/
/*{{ javascript("source/server/ServerUtility.js") }}*/
/*{{ javascript("source/server/ServerMessageHandler.js") }}*/
/*{{ javascript("source/server/ServerEventHandler.js") }}*/
/*{{ javascript("source/server/systems/MovementManager.js") }}*/

/*{{ javascript("source/Events.js") }}*/

/*{{ javascript("source/test.js") }}*/
/*{{ javascript("source/main.js") }}*/







TurbulenzEngine.onload = function (){

    startApplication();
};

TurbulenzEngine.onunload = function (){

    destroyApplication();

};

TurbulenzEngine.onerror = function gameErrorFn(msg) {
    window.alert(msg);
};
