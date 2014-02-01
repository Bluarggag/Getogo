var CaptureGraphicsCommand: {
    setTechniqueParameters: number;
    drawIndexed: number;
    draw: number;
    setIndexBuffer: number;
    setStream: number;
    setTechnique: number;
    setData: number;
    setAllData: number;
    beginRenderTarget: number;
    clear: number;
    endRenderTarget: number;
    beginEndDraw: number;
    setScissor: number;
    setViewport: number;
    beginOcclusionQuery: number;
    endOcclusionQuery: number;
};
class CaptureGraphicsDevice {
    static version: number;
    public precision: number;
    public gd: any;
    public current: number[];
    public frames: any[];
    public commands: any[];
    public numCommands: number;
    public lastId: number;
    public recycledIds: number[];
    public destroyedIds: number[];
    public integerData: {};
    public floatData: {};
    public objects: {};
    public objectArray: any[];
    public names: {};
    public numNames: number;
    public vertexBuffers: {};
    public indexBuffers: {};
    public techniqueParameterBuffers: {};
    public semantics: {};
    public semanticsMap: {};
    public formats: {};
    public formatsMap: {};
    public textures: {};
    public shaders: {};
    public techniques: {};
    public videos: {};
    public renderBuffers: {};
    public renderTargets: {};
    public occlusionQueries: {};
    public reverseSemantic: string[];
    constructor(gd);
    private _getCommandId();
    private _getIntegerId();
    private _getStringId();
    private _addData(data, length, integers);
    private _addCommand(method, arg1?, arg2?, arg3?, arg4?, arg5?);
    private _objectToArray(object);
    private _patchObjectArray(objectArray);
    private _sortObjectArray(data, length);
    private _addName(name);
    private _addObject(object);
    private _cloneObject(object, raw);
    private _clone(object);
    private _cloneVertexFormats(formats);
    private _cloneSemantics(semantics);
    private _checkProperties(pass);
    private _lowerBoundGeneric(bin, data, length, offset);
    private _lowerBoundSimpleCommand(bin, data);
    private _lowerBoundFloat(bin, data, length);
    private _equalFloatArrays(a, b, length);
    private _equalIntegerArrays(a, b, length);
    private _setFilteredTechniqueParameters(techniqueParameters, validParameters, currentParameters);
    public drawIndexed(primitive, numIndices, first): void;
    public draw(primitive, numVertices, first): void;
    public setTechniqueParameters(unused?): void;
    public setTechnique(technique): void;
    public setStream(vertexBuffer, semantics, offset): void;
    public setIndexBuffer(indexBuffer): void;
    public drawArray(drawParametersArray, globalTechniqueParametersArray, sortMode): void;
    public beginDraw(primitive, numVertices, formats, semantics);
    public endDraw(writer): void;
    public setViewport(x, y, w, h): void;
    public setScissor(x, y, w, h): void;
    public clear(color, depth, stencil): void;
    public beginFrame();
    public beginRenderTarget(renderTarget);
    public endRenderTarget(): void;
    public beginOcclusionQuery(query);
    public endOcclusionQuery(query): void;
    public endFrame(): void;
    public createTechniqueParameters(params);
    public createSemantics(attributes);
    public createVertexBuffer(params);
    public createIndexBuffer(params);
    public createTexture(params);
    public createVideo(params);
    public createShader(params);
    public createTechniqueParameterBuffer(params);
    public createRenderBuffer(params);
    public createRenderTarget(params);
    public createOcclusionQuery(params);
    public createDrawParameters(params);
    public isSupported(name);
    public maxSupported(name);
    public loadTexturesArchive(params);
    public getScreenshot(compress, x?, y?, width?, height?);
    public flush(): void;
    public finish(): void;
    public getFramesString(): string;
    private _getDataBinSize(dataBins, integers);
    private _getDataBinBuffer(ints, offset, dataBins, integers);
    public getDataBuffer(): Uint8Array;
    public getResourcesString(): string;
    private _recycleDataBinIds(dataBins);
    public reset(): void;
    public destroy(): void;
    static create(gd): CaptureGraphicsDevice;
}
class PlaybackGraphicsDevice {
    static version: number;
    public black: number[];
    public gd: any;
    public srcWidth: number;
    public srcHeight: number;
    public frames: any[];
    public writerData: any[];
    public entities: any[];
    public numPendingResources: number;
    public onerror: any;
    constructor(gd);
    private _storeEntity(id, value);
    private _resolveEntity(id);
    public addResources(resourcesObject, baseURL): void;
    public addData(dataBuffer): void;
    public addFrames(framesObject, reset?): void;
    private _beginEndDraw(primitive, numVertices, formats, semantics, data);
    public play(frameIndex): bool;
    public destroy(): void;
    static create(gd): PlaybackGraphicsDevice;
}
