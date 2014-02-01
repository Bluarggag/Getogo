
var CameraManager = function (params) {

    this.spatialManager = params.spatialManager;
    this.entityStash = params.entityStash;
    this.entityTypeStash = params.entityTypeStash;
    this.entityTableColumns = params.entityTableColumns;
    
    this.cameras = new Array();
    this.cameraNodes = new Array();
    this.activeCameraIndex = -1;
    this.activeCamera = null;

    //default camera
    //this.activeCamera = Camera.create(T.mathDevice);
    //this.activeCamera.updateViewMatrix();
    //this.activeCamera.updateViewProjectionMatrix();

    CameraManager.prototype.update = function () {
        this.updateActiveCamera();
        //if (this.activeCamera)
        //    this.activeCamera.lookAt(T.mathDevice.v3BuildZero(), T.mathDevice.v3BuildYAxis(), this.activeCamera.matrix.slice(9, 12));
    };
    
    CameraManager.prototype.updateListener = function (event) {
        var that = this;
        
        switch (event.eventType) {
            case EventType.UPDATE:
                //check for all camera entities if there is a node
                for (index in that.entityStash.COMPONENT_CAMERA) {
                    if (arrayHasOwnIndex(that.entityStash.COMPONENT_CAMERA, index)) {
                        var data = that.entityStash.COMPONENT_CAMERA[index];
                        var cameraNode = that.cameraNodes[index];
                        if (!cameraNode) {
                            that.createCamera({
                                entityId: index,
                                position: data[that.entityTableColumns.COMPONENT_CAMERA["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_CAMERA["orientation"]]
                            })
                        }
                        else {
                            that.updateCameraNode(cameraNode, {
                                position: data[that.entityTableColumns.COMPONENT_CAMERA["position"]],
                                orientation: data[that.entityTableColumns.COMPONENT_CAMERA["orientation"]]
                            });
                        }
                    }
                }
                break;
        }
    };
    
    CameraManager.prototype.updateActiveCamera = function () {
        var that = this;
        if (that.activeCameraIndex >= 0) {
            var activeCameraNode = that.cameraNodes[that.activeCameraIndex];
            if (JSON.stringify(that.activeCamera.matrix) !== JSON.stringify(activeCameraNode.getWorldTransform())) {
                that.activeCamera.matrix = activeCameraNode.getWorldTransform().slice(); //copy
                that.activeCamera.updateViewMatrix();
                that.activeCamera.updateViewProjectionMatrix();
                
            }
        }
        if (that.activeCamera) {
            that.activeCamera.updateViewMatrix();
            that.activeCamera.updateViewProjectionMatrix();
        }
    };

    
    CameraManager.prototype.createCamera = function (params) {
        var that = this;
        
        var camera = Camera.create(T.mathDevice);
        //camera.nearPlane = -1.0;
        //camera.farPlane = -1000.0;
        that.cameras[params.entityId] = camera;
        
        var cameraNode = SceneNode.create({
            name: params.entityId + "_cameraNode"
        });
        //cameraNode.setLocalTransform(camera.matrix.slice());
        //T.mathDevice.m43SetRight(camera.matrix, T.mathDevice.v3Build(-1, 0, 0));
        that.cameraNodes[params.entityId] = cameraNode;

        if (!that.activeCamera) {
            that.activeCamera = camera;
            that.activeCameraIndex = params.entityId;
        }

        var matrix = cameraNode.getLocalTransform();
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.m43Pos(matrix);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatFromM43(matrix);
        
        var m43 = T.mathDevice.m43FromRT(orientation, position);
        cameraNode.setLocalTransform(m43);
        
        var spatialNode = that.spatialManager.spatialNodes[params.entityId];
        if (spatialNode)
            spatialNode.addChild(cameraNode);
        else
            scene.addRootNode(cameraNode);
    };
    
    CameraManager.prototype.updateCameraNode = function (cameraNode, params) {
        
        var matrix = cameraNode.getLocalTransform();
        
        var position = (params.position) ? custommath.a3tov3(params.position) : T.mathDevice.m43Pos(matrix);
        var orientation = (params.orientation) ? custommath.a4toQuat(params.orientation) : T.mathDevice.quatFromM43(matrix);
        var m43 = T.mathDevice.m43FromRT(orientation, position);
        
        cameraNode.setLocalTransform(m43);
    };
    
    
}