


//int newTank()
//{
//    int new_id = createNewEntity();

//    // Attach components to the entity; they will have DEFAULT values

//    createComponentAndAddTo( TRACKED_COMPONENT, new_id );
//    createComponentAndAddTo( RENDERABLE_COMPONENT, new_id );
//    createComponentAndAddTo( PHYSICS_COMPONENT, new_id );
//    createComponentAndAddTo( GUN_COMPONENT, new_id );

//    // Setup code that EDITS the data in each component, e.g:
//    float[] gunData = getComponentDataForEntity( GUN_COMPONENT, new_id );
//    gunData[ GUN_SIZE ] = 500;
//    gunData[ GUN_DAMAGE ] = 10000;
//    gunData[ GUN_FIRE_RATE ] = 0.001;
//    setComponentDataForEntity( GUN_COMPONENT, new_id, gunData );

//    return new_id;
//}


//createNewEntity
//getComponentDataForEntity




//ComponentType = {
//    NONE: 0,
//    SPATIAL: 1,
//    MOVEMENT: 2,
//    RENDER: 3
//};
//
//var Component = Backbone.Model.extend({
//    defaults: {
//        componentType: ComponentType.NONE
//    }
//});
//
//
//var spatial = {
//    entityId: null,
//    componentType: ComponentType.SPATIAL,
//    position: null,
//    orientation: null
//};
//ComponentType.spatial = spatial;
//
//
//var SpatialComponent = Component.extend({
//    defaults: {
//        entityId: null,
//        componentType: ComponentType.SPATIAL,
//        position: null,
//        orientation: null
//    },
//    initialize: function (params) {
//        this.entityId = params.entityId;
//        this.position = params.position || T.mathDevice.v3Build(0.0, 0.0, 0.0);
//        this.orientation = params.orientation || T.mathDevice.quatBuild(0.0, 0.0, 0.0, 1.0);
//    }
//});
//
//
//var MovementComponent = Component.extend({
//    defaults: {
//        entityId: null,
//        componentType: ComponentType.MOVEMENT,
//        velocity: null,
//        acceleration: null
//    },
//    initialize: function (params) {
//        this.entityId = params.entityId;
//        this.velocity = params.velocity || T.mathDevice.v3Build(0.0, 0.0, 0.0);
//        this.acceleration = params.acceleration || T.mathDevice.v3Build(0.0, 0.0, 0.0);
//    }
//});
//
//var RenderComponent = Component.extend({
//    defaults: {
//        entityId: null,
//        componentType: ComponentType.RENDER,
//        assetPath: null,
//        position: null,
//        orientation: null,
//        scale: null
//    },
//    initialize: function (params) {
//        this.entityId = params.entityId;
//        this.assetPath = params.assetPath || null;
//        this.position = params.position || T.mathDevice.v3Build(0.0, 0.0, 0.0);
//        this.scale = params.scale || T.mathDevice.v3Build(1.0, 1.0, 1.0);
//        this.orientation = params.orientation || T.mathDevice.quatBuild(0.0, 0.0, 0.0, 1.0);
//    }
//});
//
//var RenderNodeName = {
//    "models/duck.dae": "LOD3sp"
//};
