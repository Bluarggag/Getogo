interface AABBTreeRayTestResult {
    factor: number;
}
interface AABBTreeRay {
    origin: any;
    direction: any;
    maxFactor: number;
}
class AABBTreeNode {
    static version: number;
    public escapeNodeOffset: number;
    public externalNode: AABBTreeNode;
    public extents: any;
    constructor(extents: any, escapeNodeOffset: number, externalNode?: AABBTreeNode);
    public isLeaf(): bool;
    public reset(minX, minY, minZ, maxX, maxY, maxZ, escapeNodeOffset, externalNode): void;
    public clear(): void;
    static create(extents: any, escapeNodeOffset: number, externalNode?: AABBTreeNode): AABBTreeNode;
}
class AABBTree {
    static version: number;
    public numNodesLeaf: number;
    public nodes: AABBTreeNode[];
    public endNode: number;
    public needsRebuild: bool;
    public needsRebound: bool;
    public numAdds: number;
    public numUpdates: number;
    public numExternalNodes: number;
    public startUpdate: number;
    public endUpdate: number;
    public highQuality: bool;
    public ignoreY: bool;
    public nodesStack: number[];
    public arrayConstructor: any;
    constructor(highQuality: bool);
    public add: (externalNode: any, extents: any) => void;
    public remove: (externalNode: any) => void;
    public findParent: (nodeIndex: any) => void;
    public update: (externalNode: any, extents: any) => void;
    public needsFinalize: () => void;
    public finalize: () => void;
    public rebound: () => void;
    public rebuild: () => void;
    public sortNodes: (nodes: any) => void;
    public sortNodesNoY: (nodes: any) => void;
    public sortNodesHighQuality: (nodes: any) => void;
    public calculateSAH: (buildNodes: any, startIndex: any, endIndex: any) => void;
    public nthElement: (nodes: any, first: any, nth: any, last: any, getkey: any) => void;
    public recursiveBuild: (buildNodes: any, startIndex: any, endIndex: any, lastNodeIndex: any) => void;
    public getVisibleNodes: (planes: any, visibleNodes: any) => void;
    public getOverlappingNodes: (queryExtents: any, overlappingNodes: any, startIndex?: any) => void;
    public getSphereOverlappingNodes: (center: any, radius: any, overlappingNodes: any) => void;
    public getOverlappingPairs: (overlappingPairs: any, startIndex: any) => void;
    public getRootNode: () => AABBTreeNode;
    public getNodes: () => void;
    public getEndNodeIndex: () => void;
    public clear: () => void;
    static rayTest: (trees: any, ray: AABBTreeRay, callback: any) => AABBTreeRayTestResult;
    static create: (highQuality?: bool) => AABBTree;
}
