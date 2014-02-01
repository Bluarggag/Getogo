var ModelRootNodes = {
    "models/duck.dae": "LOD3sp"
}

var RenderManager = function (params) {

    this.spatialManager = params.spatialManager;
    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = params.entityTableColumns;
    
    this.renderNodes = new Array();
    
    RenderManager.prototype.update = function () {
    }
    
    RenderManager.prototype.updateListener = function (event) {
        var that = this;
        
        switch (event.eventType) {
            case EventType.UPDATE:
                
                //check for all render entities if there is a node
                for (index in that.entityStash.COMPONENT_RENDER) {
                    if (arrayHasOwnIndex(that.entityStash.COMPONENT_RENDER, index)) {
                        var data = that.entityStash.COMPONENT_RENDER[index];
                        var renderNode = that.renderNodes[index]; //T.scene.findNode(index + "_renderNode"); 
                        if (!renderNode) { //find only searches 1 deep...
                            that.loadModel({
                                entityId: index,
                                position: data[that.entityTableColumns.COMPONENT_RENDER["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_RENDER["orientation"]],
                                scale: data[that.entityTableColumns.COMPONENT_RENDER["scale"]],
                                assetPath: data[that.entityTableColumns.COMPONENT_RENDER["asset"]]
                            })
                        }
                        else {
                            that.updateRenderNode(renderNode, {
                                position: data[that.entityTableColumns.COMPONENT_RENDER["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_RENDER["orientation"]],
                                scale: data[that.entityTableColumns.COMPONENT_RENDER["scale"]]
                            });
                        }
                    }
                }
                break;
        }
    }
    
    RenderManager.prototype.updateRenderNode = function (node, params) {
        
        var matrix = node.getLocalTransform();
        
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.m43Pos(matrix);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatFromM43(matrix);
        var scale = params.scale || T.mathDevice.v3Build(1.0, 1.0, 1.0); //TODO
        
        var m43 = T.mathDevice.m43FromRTS(orientation, position, scale);
        node.setLocalTransform(m43);
    }

    //var duckGeom = duckMesh.clone(name + "Geom");
    
    RenderManager.prototype.loadModel = function (params) {
        var that = this;
        var loadingScene = Scene.create(T.mathDevice);
        
        var entityId = params.entityId;
        var assetPath = params.assetPath;
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.v3Build(0,0,0);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatBuild(0,0,0,0);
        var scale = params.scale || T.mathDevice.v3Build(1.0, 1.0, 1.0);

        var spatialNode = that.spatialManager.spatialNodes[entityId]; //scene.findNode(entityId + "_spatialNode");
        var renderNodeName = ModelRootNodes[assetPath];

        // create model loader
        var nodesPrefix = entityId + "_renderNode";
        var modelLoader = SceneLoader.create();
        modelLoader.setPathRemapping(T.mappingTable.urlMapping, T.mappingTable.assetPrefix);

        // callback for model loader
        var postModelLoad = function () {
            
            renderNode = loadingScene.findNode(renderNodeName);
            if (renderNode) {
                renderNode.name = nodesPrefix;
                loadingScene.removeRootNode(renderNode);
                //attach to active scene
                var m43 = T.mathDevice.m43FromRTS(orientation, position, scale);
                renderNode.setLocalTransform(m43);
                that.renderNodes[entityId] = renderNode;
                if (spatialNode) {
                    spatialNode.addChild(renderNode);
                    log("RenderManager: model loaded for id " + entityId);
                } else {
                    log("RenderManager: no spatial node for id " + entityId);
                }
            }
            else {
                log("RenderManager: model root node not found for id " + entityId, LogType.FAILED);
            }
        }

        // load model into loading scene
        modelLoader.load({
            append: false,
            dynamic: true, // maybe give spatialComponent dynamic property? (depends on MovementEntity?)
            scene: loadingScene,
            assetPath: assetPath,
            nodesNamePrefix: nodesPrefix,
            shapesNamePrefix: nodesPrefix,
            graphicsDevice: T.graphicsDevice,
            mathDevice: T.mathDevice,
            textureManager: T.textureManager,
            effectManager: T.effectManager,
            shaderManager: T.shaderManager,
            requestHandler: T.requestHandler,
            postSceneLoadFn: postModelLoad
        });
    };
}