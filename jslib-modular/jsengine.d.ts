interface Bounds {
    center: any;
    halfExtent: any;
}
interface Hierarchy {
    numNodes: number;
    names: string[];
    parents: number[];
}
interface Skeleton extends Hierarchy {
    invBoneLTMs: any[];
}
interface ControllerBaseClass {
    mathDevice: MathDevice;
    bounds: Bounds;
    output: any[];
    outputChannels: any;
    dirty: bool;
    dirtyBounds: bool;
    hierarchy: Hierarchy;
    onUpdateCallback: (controller: ControllerBaseClass) => void;
    onLoopCallback: (controller: ControllerBaseClass) => bool;
    onFinishedCallback: (controller: ControllerBaseClass) => bool;
    getHierarchy(): Hierarchy;
    addTime(delta: number): void;
    setTime(time: number): void;
    setRate(rate: number): void;
    update(): void;
    updateBounds(): void;
    getJointTransform(jointId: number): any;
    getJointWorldTransform(jointId: number, asMatrix?: bool): any;
}
interface Animation {
    length: number;
    nodeData: any;
    channels: any;
    bounds: any;
}
var AnimationMath: {
    quatPosscalefromm43: (matrix: any, mathDevice: any) => {
        rotation: any;
        translation: any;
        scale: any;
    };
};
var AnimationChannels: {
    copy: (channels: any) => {};
    union: (channelsA: any, channelsB: any) => {};
    add: (channels: any, newChannels: any) => void;
};
var Animation: {
    minKeyframeDelta: number;
    standardGetJointWorldTransform: (controller: ControllerBaseClass, jointId: number, mathDevice: MathDevice, asMatrix?: bool) => any;
};
class InterpolatorController implements ControllerBaseClass {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public rate: number;
    public currentTime: number;
    public looping: bool;
    public currentAnim: Animation;
    public translationEndFrames: Uint32Array;
    public rotationEndFrames: Uint32Array;
    public scaleEndFrames: Uint32Array;
    public scratchV3: any;
    public scratchPad: {
        v1: any;
        v2: any;
        q1: any;
        q2: any;
    };
    public addTime(delta): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId: number);
    public getJointWorldTransform(jointId: number, asMatrix?: bool): any;
    public setAnimation(animation: Animation, looping): void;
    public setTime(time): void;
    public setRate(rate): void;
    public getHierarchy(): Hierarchy;
    static create(hierarchy): InterpolatorController;
}
class OverloadedNodeController {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public baseController: ControllerBaseClass;
    public nodeOverloads: any[];
    public addTime(delta): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId);
    public getJointWorldTransform(jointId: number, asMatrix?: bool);
    public getHierarchy(): Hierarchy;
    public addOverload(sourceController, sourceIndex, overloadIndex): void;
    static create(baseController: ControllerBaseClass): OverloadedNodeController;
}
class ReferenceController {
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public referenceSource: ControllerBaseClass;
    public setReferenceController: (controller: ControllerBaseClass) => void;
    static create(baseController): ReferenceController;
}
class TransitionController implements ControllerBaseClass {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public rate: number;
    public startController: ControllerBaseClass;
    public endController: ControllerBaseClass;
    public transitionTime: number;
    public transitionLength: number;
    public onFinishedTransitionCallback: (controller: ControllerBaseClass) => bool;
    public addTime(delta): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId);
    public getJointWorldTransform(jointId: number, asMatrix?: bool);
    public setStartController(controller): void;
    public setEndController(controller): void;
    public setTransitionLength(length): void;
    public setTime(time): void;
    public setRate(rate): void;
    public getHierarchy(): Hierarchy;
    static create(startController: ControllerBaseClass, endController: ControllerBaseClass, length: number): TransitionController;
}
class BlendController implements ControllerBaseClass {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public controllers: ControllerBaseClass[];
    public blendDelta: number;
    public addTime(delta): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId);
    public getJointWorldTransform(jointId: number, asMatrix?: bool);
    public setBlendDelta(delta): void;
    public setTime(time): void;
    public setRate(rate): void;
    public getHierarchy(): Hierarchy;
    static create(controllers: ControllerBaseClass[]): BlendController;
}
class MaskController implements ControllerBaseClass {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public controllers: ControllerBaseClass[];
    public masks: {
        [idx: number]: bool;
    }[];
    public addTime(delta): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId);
    public getJointWorldTransform(jointId: number, asMatrix?: bool);
    public setTime(time): void;
    public setRate(rate): void;
    public setMask(controllerIndex, maskJoints, maskArray): void;
    public getHierarchy(): Hierarchy;
    static create(controllers: ControllerBaseClass[]): MaskController;
}
class PoseController implements ControllerBaseClass {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public addTime(): void;
    public update(): void;
    public updateBounds(): void;
    public getJointTransform(jointId);
    public getJointWorldTransform(jointId: number, asMatrix?: bool);
    public setTime(): void;
    public setRate(): void;
    public setOutputChannels(channels): void;
    public setJointPose(jointIndex, rotation, translation, scale): void;
    public getHierarchy(): Hierarchy;
    static create(hierarchy: Hierarchy): PoseController;
}
class NodeTransformController {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public ltms: any[];
    public nodesMap: any[];
    public scene: Scene;
    public inputController: ControllerBaseClass;
    public addTime(delta): void;
    public setInputController(input): void;
    public setHierarchy(hierarchy, fromNode?): void;
    public setScene(scene): void;
    public update(): void;
    static create(hierarchy: Hierarchy, scene: Scene): NodeTransformController;
}
interface SkinControllerBase {
    dirty: bool;
    skeleton: Skeleton;
    inputController: ControllerBaseClass;
    setInputController(input);
    setSkeleton(skeleton);
    update();
}
class SkinController implements SkinControllerBase {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: any[];
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public skeleton: Skeleton;
    public inputController: ControllerBaseClass;
    public md: MathDevice;
    public ltms: any[];
    public setInputController(input): void;
    public setSkeleton(skeleton): void;
    public update(): void;
    static create(md: MathDevice): SkinController;
}
class GPUSkinController implements SkinControllerBase {
    static version: number;
    public mathDevice: MathDevice;
    public bounds: Bounds;
    public output: TechniqueParameterBuffer;
    public outputChannels: any;
    public dirty: bool;
    public dirtyBounds: bool;
    public hierarchy: Hierarchy;
    public onUpdateCallback: (controller: ControllerBaseClass) => void;
    public onLoopCallback: (controller: ControllerBaseClass) => bool;
    public onFinishedCallback: (controller: ControllerBaseClass) => bool;
    public skeleton: Skeleton;
    public inputController: ControllerBaseClass;
    public md: MathDevice;
    public gd: GraphicsDevice;
    public ltms: any[];
    public outputMat: any;
    public convertedquatPos: any;
    public bufferSize: number;
    public setInputController(input): void;
    public setSkeleton(skeleton): void;
    public update(): void;
    public defaultBufferSize: number;
    static setDefaultBufferSize(size: number): void;
    static create(gd: GraphicsDevice, md: MathDevice, bufferSize?: number): GPUSkinController;
}
class SkinnedNode {
    static version: number;
    public md: MathDevice;
    public input: ControllerBaseClass;
    public skinController: SkinControllerBase;
    public node: SceneNode;
    public scratchM43: any;
    public scratchExtents: any;
    public addTime(delta): void;
    public update(updateSkinController): void;
    public getJointIndex(jointName): number;
    public getJointLTM(jointIndex, dst);
    public setInputController(controller): void;
    public getSkeleton(): Skeleton;
    static create(gd: GraphicsDevice, md: MathDevice, node: SceneNode, skeleton: Skeleton, inputController?: ControllerBaseClass, bufferSize?: number): SkinnedNode;
}
interface AnimationList {
    [name: string]: Animation;
}
class AnimationManager {
    static version: number;
    public mathDevice: MathDevice;
    public loadFile(path: string, callback: any): void;
    public loadData(data: any, prefix?: string): void;
    public get(name: string): Animation;
    public remove(name: string): void;
    public nodeHasSkeleton(node: Node): Skeleton;
    public getAll(): AnimationList;
    public setPathRemapping(prm: any, assetUrl: string): void;
    static create(errorCallback?: (msg: string) => void, log?: HTMLElement): AnimationManager;
}
interface DefaultRenderingPassIndex {
    opaque: number;
    decal: number;
    transparent: number;
}
interface DefaultRenderingRendererInfo {
    id: number;
    frameVisible: number;
    worldUpdate: number;
    worldViewProjection: any;
    worldInverse: any;
    eyePosition: any;
    lightPosition: any;
    worldUpdateEnv?: number;
    worldInverseTranspose?: any;
}
class DefaultRendering {
    static version: number;
    static numPasses: number;
    static passIndex: DefaultRenderingPassIndex;
    static nextRenderinfoID: number;
    static nextSkinID: number;
    static identityUVTransform: Float32Array;
    public md: MathDevice;
    public sm: ShaderManager;
    public lightPositionUpdated: bool;
    public lightPosition: any;
    public eyePositionUpdated: bool;
    public eyePosition: any;
    public globalTechniqueParameters: TechniqueParameters;
    public globalTechniqueParametersArray: TechniqueParameters[];
    public passes: any[];
    public defaultSkinBufferSize: number;
    public camera: Camera;
    public scene: Scene;
    public wireframeInfo: any;
    public wireframe: bool;
    public defaultPrepareFn: (geometryInstance: Geometry) => void;
    public defaultUpdateFn: (camera: Camera) => void;
    public updateShader(): void;
    public sortRenderablesAndLights(camera, scene): void;
    public update(gd, camera, scene, currentTime): void;
    public updateBuffers(): bool;
    public draw(gd, clearColor, drawDecalsFn, drawTransparentFn, drawDebugFn): void;
    public setGlobalLightPosition(pos): void;
    public setGlobalLightColor(color): void;
    public setAmbientColor(color): void;
    public setDefaultTexture(tex): void;
    public setWireframe(wireframeEnabled, wireframeInfo): void;
    public getDefaultSkinBufferSize(): number;
    public destroy(): void;
    static defaultPrepareFn(geometryInstance): void;
    static create(gd: GraphicsDevice, md: MathDevice, shaderManager: ShaderManager, effectsManager: EffectManager): DefaultRendering;
}
class LoadingScreen {
    static version: number;
    public gd: GraphicsDevice;
    public clipSpace: any;
    public textureWidthHalf: number;
    public textureHeightHalf: number;
    public textureTechnique: Technique;
    public textureMaterial: TechniqueParameters;
    public textureVertexFormats: any[];
    public textureSemantics: Semantics;
    public backgroundColor: any;
    public backgroundTechnique: Technique;
    public backgroundMaterial: TechniqueParameters;
    public posVertexFormats: any[];
    public posSemantics: Semantics;
    public barBackgroundColor: any;
    public barColor: any;
    public barCenter: {
        x: number;
        y: number;
    };
    public barBorderSize: number;
    public barBackgroundWidth: number;
    public barBackgroundHeight: number;
    public assetTracker: AssetTracker;
    public setTexture(texture): void;
    public loadAndSetTexture(graphicsDevice, requestHandler, mappingTable, name): void;
    public render(backgroundAlpha, textureAlpha): void;
    static create(gd: GraphicsDevice, md: MathDevice, parameters: any): LoadingScreen;
}
interface EffectPrepareObject {
    prepare(renderable: Renderable);
    shaderName: string;
    techniqueName: string;
    update(camera: Camera);
    loadTechniques(shaderManager: ShaderManager);
}
class Effect {
    static version: number;
    public name: string;
    public geometryType: {
        [type: string]: EffectPrepareObject;
    };
    public numMaterials: number;
    public materialsMap: {
        [hash: string]: number;
    };
    static create(name: string): Effect;
    public hashMaterial(material: Material);
    public prepareMaterial(material: Material): void;
    public add(geometryType: string, prepareObject): void;
    public remove(geometryType: string): void;
    public get(geometryType: string): EffectPrepareObject;
    public prepare(renderable: Renderable): void;
}
class EffectManager {
    static version: number;
    public effects: any;
    static create(): EffectManager;
    public add(effect: Effect): void;
    public remove(name: string): void;
    public map(destination: string, source: string): void;
    public get(name: string): Effect;
}
class Material {
    static version: number;
    public name: string;
    public reference: Reference;
    public techniqueParameters: TechniqueParameters;
    public meta: any;
    public effect: Effect;
    public effectName: string;
    public texturesNames: {
        [name: string]: string;
    };
    public textureInstances: {
        [name: string]: TextureInstance;
    };
    public onTextureChanged: (textureInstance: TextureInstance) => void;
    static create(graphicsDevice: GraphicsDevice): Material;
    public getName(): string;
    public setName(name): void;
    public loadTextures(textureManager): void;
    public setTextureInstance(propertryName, textureInstance): void;
    public destroy(): void;
}
class Floor {
    static version: number;
    public render: (gd: GraphicsDevice, camera: Camera) => void;
    public color: any;
    public fadeToColor: any;
    public numLines: number;
    static create(gd: any, md: any): Floor;
}
interface Surface {
    first: number;
    numVertices: number;
    primitive: number;
    numIndices?: number;
    vertexData?: any;
    indexData?: any;
    indexBuffer?: IndexBuffer;
}
class Geometry {
    static version: number;
    public name: string;
    public type: string;
    public center: any;
    public halfExtents: any;
    public reference: Reference;
    public primitive: number;
    public semantics: Semantics;
    public vertexBuffer: VertexBuffer;
    public baseIndex: number;
    public indexBuffer: IndexBuffer;
    public numIndices: number;
    public skeleton: Skeleton;
    public surfaces: any;
    public vertexData: any;
    public indexData: any;
    public first: number;
    public vertexBufferAllocation: any;
    public vertexBufferManager: VertexBufferManager;
    public indexBufferAllocation: any;
    public indexBufferManager: IndexBufferManager;
    public destroy(): void;
    static create(): Geometry;
}
class GeometryInstance implements Renderable {
    static version: number;
    public maxUpdateValue: number;
    public geometry: Geometry;
    public geometryType: string;
    public node: SceneNode;
    public renderUpdate: any;
    public rendererInfo: any;
    public distance: number;
    public drawParameters: DrawParameters[];
    public surface: Surface;
    public halfExtents: any;
    public center: any;
    public worldExtents: any;
    public semantics: Semantics;
    public techniqueParameters: TechniqueParameters;
    public sharedMaterial: Material;
    public worldExtentsUpdate: number;
    public worldUpdate: number;
    public disabled: bool;
    public sorting: number;
    public arrayConstructor: any;
    public clone(): GeometryInstance;
    public isSkinned(): bool;
    public setNode(node): void;
    public getNode(): SceneNode;
    public setMaterial(material): void;
    public getMaterial(): Material;
    public getWorldExtents();
    public addCustomWorldExtents(customWorldExtents): void;
    public removeCustomWorldExtents(): void;
    public getCustomWorldExtents();
    public hasCustomWorldExtents(): bool;
    public destroy(): void;
    public prepareDrawParameters(drawParameters): void;
    static create(geometry: Geometry, surface: Surface, sharedMaterial: Material): GeometryInstance;
}
class Light {
    static version: number;
    public name: string;
    public color: any;
    public directional: bool;
    public spot: bool;
    public ambient: bool;
    public point: bool;
    public origin: any;
    public radius: number;
    public direction: any;
    public frustum: any;
    public frustumNear: number;
    public center: any;
    public halfExtents: any;
    public shadows: bool;
    public dynamicshadows: bool;
    public disabled: bool;
    public dynamic: bool;
    public material: Material;
    public techniqueParameters: TechniqueParameters;
    public sharedMaterial: Material;
    public fog: bool;
    public global: bool;
    public target: any;
    public clone(): Light;
    public isGlobal(): bool;
    static create(params): Light;
}
class LightInstance {
    static version: number;
    public node: SceneNode;
    public light: Light;
    public worldExtents: any;
    public worldExtentsUpdate: number;
    public arrayConstructor: any;
    public disabled: bool;
    public setMaterial(material): void;
    public setNode(node): void;
    public getNode(): SceneNode;
    public getWorldExtents();
    public clone(): LightInstance;
    static create(light: Light): LightInstance;
}
class MouseForces {
    static version: number;
    public md: MathDevice;
    public pd: PhysicsDevice;
    public pickFilter: number;
    public pickRayFrom: number[];
    public pickRayTo: number[];
    public clamp: number;
    public pickConstraint: PhysicsPoint2PointConstraint;
    public pickedBody: PhysicsRigidBody;
    public oldPickingDist: number;
    public dragExtentsMin: any;
    public dragExtentsMax: any;
    public mouseX: number;
    public mouseY: number;
    public mouseZ: number;
    public X: number;
    public Y: number;
    public Z: number;
    public grabBody: bool;
    public onmousewheel: (delta: number) => bool;
    public onmousemove: (deltaX: number, deltaY: number) => bool;
    public onmousedown: () => bool;
    public onmouseup: () => bool;
    public generatePickRay(cameraTransform, viewWindowX, viewWindowY, aspectRatio, farPlane): void;
    public update(dynamicsWorld: PhysicsWorld, camera: Camera, force): void;
    static create(gd: GraphicsDevice, id: InputDevice, md: MathDevice, pd: PhysicsDevice, dragExtentsMin?, dragExtentsMax?): MouseForces;
}
interface PhysicsNode {
    target: SceneNode;
    body: PhysicsCollisionObject;
    origin?: any;
    triangleArray?: any;
    dynamic?: bool;
    kinematic?: bool;
    worldUpdate?: any;
}
class PhysicsManager {
    static version: number;
    public arrayConstructor: any;
    public mathsDevice: MathDevice;
    public physicsDevice: PhysicsDevice;
    public dynamicsWorld: PhysicsWorld;
    public physicsNodes: PhysicsNode[];
    public dynamicPhysicsNodes: PhysicsNode[];
    public kinematicPhysicsNodes: PhysicsNode[];
    public tempMatrix: any;
    public sceneNodeCloned: (data: any) => void;
    public sceneNodeDestroyed: (data: any) => void;
    public update(): void;
    public enableNode(sceneNode, enabled): void;
    public enableHierarchy(sceneNode, enabled): void;
    public deletePhysicsNode(physicsNode): void;
    public deleteNode(sceneNode): void;
    public deleteHierarchy(sceneNode): void;
    public calculateHierarchyExtents(sceneNode);
    public calculateExtents(sceneNode);
    public clear(): void;
    public loadNodes(loadParams, scene): void;
    public unsubscribeSceneNode(sceneNode): void;
    public subscribeSceneNode(sceneNode): void;
    public cloneSceneNode(oldSceneNode, newSceneNode): void;
    public createSnapshot(): {};
    public restoreSnapshot(snapshot): void;
    static create(mathsDevice: MathDevice, physicsDevice: PhysicsDevice, dynamicsWorld: PhysicsWorld): PhysicsManager;
}
interface PostEffectsEntry {
    technique: Technique;
    techniqueParameters: TechniqueParameters;
}
interface ShaderManager {
    load(a, b?, c?): Shader;
}
class PostEffects {
    static version: number;
    public shader: Shader;
    public bicolor: PostEffectsEntry;
    public copy: PostEffectsEntry;
    public fadein: PostEffectsEntry;
    public modulate: PostEffectsEntry;
    public blend: PostEffectsEntry;
    public updateShader(sm): void;
    public getEffectSetupCB(name): (gd: GraphicsDevice, colTex: Texture) => void;
    public destroy(): void;
    static create(gd: GraphicsDevice, sm: ShaderManager): PostEffects;
}
var renderingCommonGetTechniqueIndexFn: (techniqueName: any) => number;
function renderingCommonSortKeyFn(techniqueIndex, materialIndex, nodeIndex?): number;
function renderingCommonCreateRendererInfoFn(renderable): {
    far: any;
};
var renderingCommonAddDrawParameterFastestFn: (drawParameters: any) => void;
interface LoadParameters {
    nodesNamePrefix?: string;
    shapesNamePrefix?: string;
    request?: any;
    nodes: SceneNodeParameters[];
    parentNode: any;
    requestHandler?: RequestHandler;
    isReference: bool;
    data: any;
}
interface SceneParameters extends LoadParameters {
    append: bool;
    skin: any;
}
interface GeometryInstanceParameters {
    geometry: string;
}
interface SceneNodeParameters {
    reference?: string;
    geometryinstances?: {
        [name: string]: GeometryInstanceParameters;
    };
    inplace: bool;
    skin: any;
    nodes: {
        [name: string]: SceneNodeParameters;
    };
    matrix: number[];
}
class ResourceLoader {
    static version: number;
    public nodesMap: {
        [name: string]: SceneNodeParameters;
    };
    public referencesPending: {
        [name: string]: any[];
    };
    public numReferencesPending: number;
    public animationsPending: {
        [name: string]: bool;
    };
    public skeletonNames: {
        [name: string]: string;
    };
    public data: any;
    public clear(): void;
    public endLoading(onload): void;
    public resolveShapes(loadParams): void;
    public resolveSkeletons(loadParams): void;
    public resolveAnimations(loadParams): void;
    public resolveNodes(loadParams: LoadParameters): void;
    public resolvePhysicsNodes(loadParams): void;
    public resolveAreas(loadParams): void;
    public resolve(loadParams): void;
    public load(assetPath, loadParams): void;
    static create(): ResourceLoader;
}
interface ScenePortal {
    disabled: bool;
    area: SceneArea;
    extents: any;
    plane: any;
}
interface SceneArea {
    portals: ScenePortal[];
    extents: any;
    target?: SceneNode;
    queryCounter?: number;
    externalNodes?: SceneNode[];
}
interface SceneBSPNode {
    plane: any;
    pos: any;
    neg: any;
}
class Scene {
    static version: number;
    public md: MathDevice;
    public onGeometryDestroyed: (geometry: Geometry) => void;
    public onMaterialDestroyed: (material: Material) => void;
    public effects: Effect[];
    public effectsMap: {
        [name: string]: Effect;
    };
    public semantics: Semantics;
    public lights: {
        [name: string]: Light;
    };
    public globalLights: Light[];
    public rootNodes: SceneNode[];
    public rootNodesMap: {
        [name: string]: SceneNode;
    };
    public dirtyRoots: {
        [name: string]: SceneNode;
    };
    public nodesToUpdate: SceneNode[];
    public queryVisibleNodes: SceneNode[];
    public materials: {
        [name: string]: Material;
    };
    public shapes: any;
    public staticSpatialMap: AABBTree;
    public dynamicSpatialMap: AABBTree;
    public frustumPlanes: any[];
    public animations: any;
    public skeletons: any;
    public extents: any;
    public visibleNodes: SceneNode[];
    public visibleRenderables: Renderable[];
    public visibleLights: LightInstance[];
    public cameraAreaIndex: number;
    public cameraExtents: any;
    public visiblePortals: any[];
    public frameIndex: number;
    public queryCounter: number;
    public staticNodesChangeCounter: number;
    public testExtents: any;
    public externalNodesStack: SceneNode[];
    public vertexBufferManager: VertexBufferManager;
    public indexBufferManager: IndexBufferManager;
    public areas: SceneArea[];
    public areaInitalizeStaticNodesChangeCounter: number;
    public nearPlane: any;
    public maxDistance: number;
    public bspNodes: SceneBSPNode[];
    public float32ArrayConstructor: any;
    public uint16ArrayConstructor: any;
    public uint32ArrayConstructor: any;
    public getMaterialName: (node: any) => string;
    public findLightName: (light: any) => string;
    public writeBox: (writer: any, extents: any, r: any, g: any, b: any) => void;
    public writeRotatedBox: (writer: any, transform: any, halfExtents: any, r: any, g: any, b: any) => void;
    public drawLights: (gd: any, sm: any, camera: any) => void;
    public drawLightsExtents: (gd: any, sm: any, camera: any) => void;
    public drawLightsScreenExtents: (gd: any, sm: any) => void;
    public drawAreas: (gd: any, sm: any, camera: any) => void;
    public drawPortals: (gd: any, sm: any, camera: any) => void;
    public drawTransforms: (gd: any, sm: any, camera: any, scale: any) => void;
    public drawAnimationHierarchy: (gd: any, sm: any, camera: any, hierarchy: any, numJoints: any, controller: any, matrix: any, boneColor: any, boundsColor: any) => void;
    public getDebugSemanticsPos: () => Semantics;
    public getDebugSemanticsPosCol: () => Semantics;
    public getVisibilityMetrics: () => any;
    public drawWireframe: (gd: any, sm: any, camera: any, wireframeInfo: any) => void;
    public attributeComponents: (attribute: any) => number;
    public updateNormals: (gd: any, scale: any, drawNormals: any, normalMaterial: any, drawTangents: any, tangentMaterial: any, drawBinormals: any, binormalMaterial: any) => void;
    public drawNodesTree: (tree: any, gd: any, sm: any, camera: any, drawLevel: any) => void;
    public drawDynamicNodesTree: (gd: any, sm: any, camera: any, drawLevel: any) => void;
    public drawStaticNodesTree: (gd: any, sm: any, camera: any, drawLevel: any) => void;
    public drawTransparentNodesExtents: (gd: any, sm: any, camera: any) => void;
    public drawDecalNodesExtents: (gd: any, sm: any, camera: any) => void;
    public drawOpaqueNodesExtents: (gd: any, sm: any, camera: any) => void;
    public drawVisibleRenderablesExtents: (gd: any, sm: any, camera: any, drawDecals: any, drawTransparents: any) => void;
    public drawPhysicsGeometry: (gd: any, sm: any, camera: any, physicsManager: any) => void;
    public drawPhysicsNodes: (gd: any, sm: any, camera: any, physicsManager: any) => void;
    public createConvexHull: (dw: any, body: any, numRays: any) => {
        indices: any;
        vertices: any;
    };
    public createBox: (halfExtents: any) => {
        indices: any;
        vertices: any;
        minExtent: number[];
        maxExtent: number[];
    };
    public createRoundedPrimitive: (mSizeX: any, mSizeY: any, mSizeZ: any, radius: any, mChamferNumSeg: any) => {
        indices: any;
        vertices: any;
        minExtent: number[];
        maxExtent: number[];
    };
    public createCylinder: (radius1: any, radius2: any, len: any, capEnds: any, tesselation: any) => {
        indices: any;
        vertices: any;
        minExtent: number[];
        maxExtent: number[];
    };
    public createGeoSphere: (radius: any, recursionLevel: any) => {
        indices: any;
        vertices: any;
        minExtent: number[];
        maxExtent: number[];
    };
    public drawSceneNodeHierarchy: (gd: any, sm: any, camera: any) => void;
    public findNode(nodePath): SceneNode;
    public addRootNode(rootNode): void;
    public removeRootNode(rootNode): void;
    public addLight(light): void;
    public removeLight(light): void;
    public getLight(name): Light;
    public getGlobalLights(): Light[];
    public calculateNumNodes(nodes);
    public buildPortalPlanes(points, planes, cX, cY, cZ, frustumPlanes): bool;
    public findAreaIndex(bspNodes, cX, cY, cZ): number;
    public findAreaIndicesAABB(bspNodes, n0, n1, n2, p0, p1, p2): number[];
    public findVisiblePortals(areaIndex, cX, cY, cZ): void;
    public findVisibleNodes(camera, visibleNodes): void;
    public findVisibleNodesTree(tree, camera, visibleNodes): void;
    public buildPortalPlanesNoFrustum(points, cX, cY, cZ): any[];
    public findOverlappingPortals(areaIndex, cX, cY, cZ, extents, overlappingPortals): void;
    public findOverlappingNodes(tree, origin, extents, overlappingNodes): void;
    public findStaticOverlappingNodes(origin, extents, overlappingNodes): void;
    public findDynamicOverlappingNodes(origin, extents, overlappingNodes): void;
    public findOverlappingRenderables(tree, origin, extents, overlappingRenderables): void;
    public findStaticOverlappingRenderables(origin, extents, overlappingRenderables): void;
    public findDynamicOverlappingRenderables(origin, extents, overlappingRenderables): void;
    public cloneRootNode(rootNode, newInstanceName);
    public updateVisibleNodes(camera): void;
    public getCurrentVisibleNodes(): SceneNode[];
    public getCurrentVisibleRenderables(): Renderable[];
    public getCurrentVisibleLights(): LightInstance[];
    public updateNodes(): void;
    public update(): void;
    public updateExtents(): void;
    public getExtents();
    public loadMaterial(graphicsDevice, textureManager, effectManager, materialName, material): bool;
    public hasMaterial(materialName): bool;
    public getMaterial(materialName): Material;
    public drawNodesArray(nodes, gd, globalMaterial, technique, renderUpdate): void;
    public drawVisibleNodes(gd, globalTechniqueParameters, technique, renderUpdate): void;
    public clearMaterials(): void;
    public clearShapes(): void;
    public clearShapesVertexData(): void;
    public clearRootNodes(): void;
    public clear(): void;
    public endLoading(onload): void;
    public initializeNodes(): void;
    public addAreaStaticNodes(): void;
    public findOverlappingAreas(startAreaIndex: number, extents: any, avoidDisabled?: bool): any[];
    public checkAreaDynamicNodes(): void;
    public initializeAreas(): void;
    public createMaterial(materialName, fileMaterial, effectName, fileEffects, fileImages, graphicsDevice): Material;
    public loadMaterials(loadParams): void;
    public loadSkeletons(loadParams): void;
    public loadShape(shapeName, fileShapeName, loadParams);
    public streamShapes(loadParams, postLoadFn): void;
    public loadLights(loadParams): void;
    public loadNodes(loadParams): void;
    public loadAreas(loadParams): void;
    public load(loadParams): void;
    public planeNormalize(a, b, c, d, output?);
    public isInsidePlanesAABB(extents, planes): bool;
    public isFullyInsidePlanesAABB(extents, planes): bool;
    public extractFrustumPlanes(camera): any[];
    public calculateHullScreenExtents(polygons, screenExtents);
    public calculateLightsScreenExtents(camera): void;
    public destroy(): void;
    public getQueryCounter(): number;
    static create(mathDevice: MathDevice): Scene;
}
interface Renderable {
    geometry: Geometry;
    geometryType: string;
    node: SceneNode;
    renderUpdate: any;
    rendererInfo: any;
    distance: number;
    drawParameters: DrawParameters[];
    skinController?: ControllerBaseClass;
    center: any;
    halfExtents: any;
    clone(): Renderable;
    isSkinned(): bool;
    hasCustomWorldExtents(): bool;
    addCustomWorldExtents(extents: any);
    setNode(node: SceneNode);
    destroy();
}
class SceneNode {
    static version: number;
    public name: string;
    public mathDevice: MathDevice;
    public dynamic: bool;
    public disabled: bool;
    public dirtyWorld: bool;
    public dirtyWorldExtents: bool;
    public dirtyLocalExtents: bool;
    public worldUpdate: number;
    public rendererInfo: any;
    public local: any;
    public world: any;
    public localExtents: any;
    public localExtentsCenter: any;
    public localHalfExtents: any;
    public customLocalExtents: any;
    public worldExtents: any;
    public worldExtentsUpdate: bool;
    public customWorldExtents: any;
    public numCustomRenderableWorldExtents: number;
    public aabbTreeIndex: number;
    public camera: Camera;
    public parent: SceneNode;
    public notifiedParent: bool;
    public scene: Scene;
    public children: SceneNode[];
    public childNeedsUpdateCount: number;
    public clonedObserver: Observer;
    public destroyedObserver: Observer;
    public lights: Light[];
    public lightInstances: LightInstance[];
    public skin: any;
    public physicsNodes: PhysicsNode[];
    public kinematic: bool;
    public geometryinstances: {
        [name: string]: GeometryInstance;
    };
    public arrayConstructor: any;
    static makePath(parentPath, childName): string;
    static invalidSetLocalTransform(): void;
    public renderables: Renderable[];
    public getName(): string;
    public getPath(): string;
    public getParent(): SceneNode;
    public setParentHelper(parent): void;
    public addChild(child): void;
    public removeChild(child): void;
    public findChild(name): SceneNode;
    public clone(newNodeName?: string): SceneNode;
    public getRoot(): SceneNode;
    public isInScene(): bool;
    private removedFromScene(scene);
    public setLocalTransform(matrix): void;
    public getLocalTransform();
    private setDirtyWorldTransform();
    public getWorldTransform();
    public setDynamic(): void;
    public setStatic(): void;
    public setDisabled(disabled): void;
    public getDisabled(): bool;
    public enableHierarchy(enabled): void;
    private childUpdated();
    private childNeedsUpdate();
    private updateRequired();
    private checkUpdateRequired();
    public update(scene): void;
    public updateHelper(mathDevice, scene, nodes): void;
    public updateLocalExtents(): void;
    public getLocalExtents();
    public updateWorldExtents(): void;
    public getWorldExtents();
    public addCustomLocalExtents(localExtents): void;
    public removeCustomLocalExtents(): void;
    public getCustomLocalExtents();
    public addCustomWorldExtents(worldExtents): void;
    public removeCustomWorldExtents(): void;
    public getCustomWorldExtents();
    public renderableWorldExtentsUpdated(wasAlreadyCustom): void;
    public renderableWorldExtentsRemoved(): void;
    public calculateHierarchyWorldExtents();
    public addRenderable(renderable: Renderable): void;
    public addRenderableArray(additionalRenderables): void;
    public removeRenderable(renderable): void;
    public hasRenderables(): bool;
    public addLightInstance(lightInstance): void;
    public addLightInstanceArray(additionalLightInstances): void;
    public removeLightInstance(lightInstance): void;
    public hasLightInstances(): bool;
    public destroy(): void;
    public subscribeCloned(observerFunction): void;
    public unsubscribeCloned(observerFunction): void;
    public subscribeDestroyed(observerFunction): void;
    public unsubscribeDestroyed(observerFunction): void;
    static create(params): SceneNode;
}
interface ShadowMap {
    shadowMapTexture: Texture;
    shadowMapRenderTarget: RenderTarget;
    lightInstance: LightInstance;
    texture?: Texture;
}
class ShadowMapping {
    static version: number;
    public defaultSizeLow: number;
    public defaultSizeHigh: number;
    public gd: GraphicsDevice;
    public md: MathDevice;
    public clearColor: any;
    public tempMatrix43: any;
    public tempV3Up: any;
    public tempV3At: any;
    public tempV3Pos: any;
    public tempV3AxisX: any;
    public tempV3AxisY: any;
    public tempV3AxisZ: any;
    public quadPrimitive: number;
    public quadSemantics: Semantics;
    public quadVertexBuffer: VertexBuffer;
    public node: SceneNode;
    public bufferWidth: number;
    public bufferHeight: number;
    public techniqueParameters: TechniqueParameters;
    public shader: Shader;
    public shadowMapsLow: ShadowMap[];
    public shadowMapsHigh: ShadowMap[];
    public sizeLow: number;
    public sizeHigh: number;
    public lowIndex: number;
    public highIndex: number;
    public blurTextureHigh: Texture;
    public blurTextureLow: Texture;
    public depthBufferLow: RenderBuffer;
    public depthBufferHigh: RenderBuffer;
    public blurRenderTargetHigh: RenderTarget;
    public blurRenderTargetLow: RenderTarget;
    public drawQueue: DrawParameters[];
    public shadowMappingShader: Shader;
    public rigidTechnique: Technique;
    public skinnedTechnique: Technique;
    public blurTechnique: Technique;
    public shadowTechniqueParameters: TechniqueParameters;
    public skinController: SkinController;
    public updateShader(sm): void;
    public update(): void;
    public skinnedUpdate(): void;
    public destroyBuffers(): void;
    public updateBuffers(sizeLow, sizeHigh): bool;
    public findVisibleRenderables(lightInstance): void;
    public drawShadowMap(cameraMatrix, minExtentsHigh, lightInstance): void;
    public cullShadowRenderables(lightInstance, viewMatrix, shadowRenderables): number;
    public blurShadowMaps(): void;
    public lookAt(camera, lookAt, up, eyePosition): void;
    public destroy(): void;
    static create(gd, md, shaderManager, effectsManager, sizeLow, sizeHigh): ShadowMapping;
}
interface TextureEffect {
    technique: Technique;
    params: TechniqueParameters;
    destination: RenderTarget;
}
class TextureEffects {
    static version: number;
    public graphicsDevice: GraphicsDevice;
    public mathDevice: MathDevice;
    public staticVertexBufferParams: VertexBufferParameters;
    public staticVertexBuffer: VertexBuffer;
    public effectParams: TextureEffect;
    public quadSemantics: Semantics;
    public quadPrimitive: number;
    public distortParameters: TechniqueParameters;
    public distortTechnique: Technique;
    public colorMatrixParameters: TechniqueParameters;
    public colorMatrixTechnique: Technique;
    public bloomThresholdParameters: TechniqueParameters;
    public bloomThresholdTechnique: Technique;
    public bloomMergeParameters: TechniqueParameters;
    public bloomMergeTechnique: Technique;
    public gaussianBlurParameters: TechniqueParameters;
    public gaussianBlurTechnique: Technique;
    public grayScaleMatrix(dst);
    public sepiaMatrix(dst);
    public negativeMatrix(dst);
    public saturationMatrix(saturationScale, dst);
    public hueMatrix(angle, dst);
    public brightnessMatrix(brightnessOffset, dst);
    public contrastMatrix(contrastScale, dst);
    public applyBloom(params): bool;
    public applyGaussianBlur(params): bool;
    public applyColorMatrix(params): bool;
    public applyDistort(params): bool;
    public applyEffect(effect): void;
    public destroy(): void;
    static create(params): TextureEffects;
}
