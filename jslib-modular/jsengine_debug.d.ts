class DrawPrimitives {
    static version: number;
    private shaderName;
    private techniqueName;
    private isTechnique2D;
    private isTextured;
    private device;
    private technique;
    private techniqueParameters;
    private rectPositionsParameters;
    private rectSemanticsParameters;
    private rectNumVertices;
    private rectPrimitive;
    private rectPositions;
    private rectSemantics;
    private rectTexPositionsParameters;
    private rectTexSemanticsParameters;
    private rectTexNumVertices;
    private rectTexPrimitive;
    private rectTexPositions;
    private rectTexSemantics;
    private boxPositionsParameters;
    private boxSemanticsParameters;
    private boxNumVertices;
    private boxPrimitive;
    private boxPositions;
    private boxSemantics;
    public initalize(gd, shaderPath): void;
    public setTechnique(technique, isTechnique2D): void;
    public updateParameters(params): void;
    public update2DTex(posa, posb): void;
    public update2D(posa, posb): void;
    public update(posa, posb): void;
    public dispatch(camera): void;
    static create(gd, shaderPath, shaderName, techniqueName): DrawPrimitives;
}
var DebuggingTools;
class NetworkLatencyBehaviour {
    public latency: number;
    public delayPeriod: number;
    public delayDuration: number;
    public startDelayTime: number;
    public endDelayTime: number;
    public nextMessageDelay(): number;
    public scheduleNextDelay(baseTime): void;
    static create(config): NetworkLatencyBehaviour;
}
class NetworkLatencySimulator {
    public queueMap: {
        send: any[];
        receive: any[];
    };
    public behaviour: NetworkLatencyBehaviour;
    public queueMessage(messageFunction, queueName): void;
    public processMessage(queue): void;
    public flushQueues(): void;
    public addMultiplayerSession(multiplayerSession): void;
    static create(behaviour): NetworkLatencySimulator;
}
interface SceneDebuggingMetrics {
    numPortals: number;
    numPortalsPlanes: number;
    numLights: number;
    numRenderables: number;
    numShadowMaps: number;
    numOccluders: number;
}
var dumpIndexBuffer: (indexbuffer: any, log: any) => void;
var dumpShader: (shader: any, log: any) => void;
var dumpTexture: (texture: any, log: any) => void;
var dumpVertexBuffer: (vertexbuffer: any, log: any) => void;
