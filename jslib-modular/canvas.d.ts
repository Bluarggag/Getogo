interface CanvasPluginArray {
    toBase64(): string;
}
interface CanvasImageData {
    width: number;
    height: number;
    data: any;
}
interface CanvasLinearGradient {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    width: number;
    height: number;
    stops: any[][];
    matrix: any;
    numTextureStops: number;
    texture: Texture;
    opaque: bool;
}
interface CanvasRadialGradient {
    x0: number;
    y0: number;
    r0: number;
    x1: number;
    y1: number;
    r1: number;
    minX: number;
    minY: number;
    stops: any[][];
    width: number;
    height: number;
    matrix: any;
    numTextureStops: number;
    texture: Texture;
    opaque: bool;
}
var namedCSSColor: {
    aliceblue: string;
    antiquewhite: string;
    aqua: string;
    aquamarine: string;
    azure: string;
    beige: string;
    bisque: string;
    black: string;
    blanchedalmond: string;
    blue: string;
    blueviolet: string;
    brown: string;
    burlywood: string;
    cadetblue: string;
    chartreuse: string;
    chocolate: string;
    coral: string;
    cornflowerblue: string;
    cornsilk: string;
    crimson: string;
    cyan: string;
    darkblue: string;
    darkcyan: string;
    darkgoldenrod: string;
    darkgray: string;
    darkgrey: string;
    darkgreen: string;
    darkkhaki: string;
    darkmagenta: string;
    darkolivegreen: string;
    darkorange: string;
    darkorchid: string;
    darkred: string;
    darksalmon: string;
    darkseagreen: string;
    darkslateblue: string;
    darkslategray: string;
    darkslategrey: string;
    darkturquoise: string;
    darkviolet: string;
    deeppink: string;
    deepskyblue: string;
    dimgray: string;
    dimgrey: string;
    dodgerblue: string;
    firebrick: string;
    floralwhite: string;
    forestgreen: string;
    fuchsia: string;
    gainsboro: string;
    ghostwhite: string;
    gold: string;
    goldenrod: string;
    gray: string;
    grey: string;
    green: string;
    greenyellow: string;
    honeydew: string;
    hotpink: string;
    indianred: string;
    indigo: string;
    ivory: string;
    khaki: string;
    lavender: string;
    lavenderblush: string;
    lawngreen: string;
    lemonchiffon: string;
    lightblue: string;
    lightcoral: string;
    lightcyan: string;
    lightgoldenrodyellow: string;
    lightgray: string;
    lightgrey: string;
    lightgreen: string;
    lightpink: string;
    lightsalmon: string;
    lightseagreen: string;
    lightskyblue: string;
    lightslategray: string;
    lightslategrey: string;
    lightsteelblue: string;
    lightyellow: string;
    lime: string;
    limegreen: string;
    linen: string;
    magenta: string;
    maroon: string;
    mediumaquamarine: string;
    mediumblue: string;
    mediumorchid: string;
    mediumpurple: string;
    mediumseagreen: string;
    mediumslateblue: string;
    mediumspringgreen: string;
    mediumturquoise: string;
    mediumvioletred: string;
    midnightblue: string;
    mintcream: string;
    mistyrose: string;
    moccasin: string;
    navajowhite: string;
    navy: string;
    oldlace: string;
    olive: string;
    olivedrab: string;
    orange: string;
    orangered: string;
    orchid: string;
    palegoldenrod: string;
    palegreen: string;
    paleturquoise: string;
    palevioletred: string;
    papayawhip: string;
    peachpuff: string;
    peru: string;
    pink: string;
    plum: string;
    powderblue: string;
    purple: string;
    red: string;
    rosybrown: string;
    royalblue: string;
    saddlebrown: string;
    salmon: string;
    sandybrown: string;
    seagreen: string;
    seashell: string;
    sienna: string;
    silver: string;
    skyblue: string;
    slateblue: string;
    slategray: string;
    slategrey: string;
    snow: string;
    springgreen: string;
    steelblue: string;
    tan: string;
    teal: string;
    thistle: string;
    tomato: string;
    turquoise: string;
    violet: string;
    wheat: string;
    white: string;
    whitesmoke: string;
    yellow: string;
    yellowgreen: string;
};
var parseCSSColor: (text: any, color: any) => number[];
function CanvasLinearGradient();
function CanvasRadialGradient();
class CanvasContext {
    static version: number;
    public canvas: any;
    public globalAlpha: number;
    public globalCompositeOperation: string;
    public strokeStyle: string;
    public fillStyle: string;
    public lineWidth: number;
    public lineCap: string;
    public lineJoin: string;
    public miterLimit: number;
    public shadowOffsetX: number;
    public shadowOffsetY: number;
    public shadowBlur: number;
    public shadowColor: string;
    public font: string;
    public textAlign: string;
    public textBaseline: string;
    public imageColor: string;
    public gd: GraphicsDevice;
    public md: MathDevice;
    public fm: FontManager;
    public target: Texture;
    public viewport: number[];
    public pixelRatio: number;
    public width: number;
    public height: number;
    public screen: any;
    public statesStack: any[];
    public numStatesInStack: number;
    public subPaths: any[];
    public currentSubPath: any[];
    public needToSimplifyPath: bool[];
    public activeVertexBuffer: VertexBuffer;
    public activeTechnique: Technique;
    public activeScreen: any;
    public activeColor: any;
    public shader: Shader;
    public triangleStripPrimitive: number;
    public triangleFanPrimitive: number;
    public trianglePrimitive: number;
    public lineStripPrimitive: number;
    public linePrimitive: number;
    public textureVertexFormats: number[];
    public textureSemantics: Semantics;
    public textureVertexBuffer: VertexBuffer;
    public textureTechniques: {
        [name: string]: Technique;
    };
    public flatVertexFormats: number[];
    public flatSemantics: Semantics;
    public flatVertexBuffer: VertexBuffer;
    public flatOffset: number;
    public flatTechniques: {
        [name: string]: Technique;
    };
    public bufferData: any;
    public subBufferDataCache: {};
    public tempRect: any;
    public tempVertices: number[];
    public tempStack: number[];
    public v4Zero: any;
    public v4One: any;
    public cachedColors: any;
    public numCachedColors: number;
    public uvtransform: any;
    public tempColor: any;
    public tempScreen: any;
    public tempImage: Texture;
    public imageTechnique: Technique;
    public patternTechniques: {
        [name: string]: Technique;
    };
    public gradientTechniques: {
        [name: string]: Technique;
    };
    public textureShadowTechnique: Technique;
    public patternShadowTechnique: Technique;
    public gradientShadowTechnique: Technique;
    public matrix: any;
    public clipExtents: any;
    public defaultStates: any;
    public cachedTriangulation: {};
    public tempAngles: number[];
    public cachedPaths: {};
    public numCachedPaths: number;
    public floatArrayConstructor: any;
    public byteArrayConstructor: any;
    public shortArrayConstructor: any;
    private compositeOperations;
    public capStyles: {
        butt: number;
        round: number;
        square: number;
    };
    public joinStyles: {
        bevel: number;
        round: number;
        miter: number;
    };
    public save(): void;
    public restore(): void;
    public scale(x, y): void;
    public rotate(angle): void;
    public translate(x, y): void;
    public transform(a, b, c, d, e, f): void;
    public setTransform(a, b, c, d, e, f): void;
    public createLinearGradient(x0, y0, x1, y1): CanvasLinearGradient;
    public createRadialGradient(x0, y0, r0, x1, y1, r1): CanvasRadialGradient;
    public createPattern(image): CanvasRadialGradient;
    public clearRect(x, y, w, h): void;
    public fillRect(x, y, w, h): void;
    public strokeRect(x, y, w, h): void;
    public beginPath(): void;
    public closePath(): void;
    public moveTo(x, y): void;
    public lineTo(x, y): void;
    public quadraticCurveTo(cpx, cpy, x, y): void;
    public bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y): void;
    public arcTo(x1, y1, x2, y2, radius): void;
    public arc(x, y, radius, startAngle, endAngle, anticlockwise): void;
    public ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise): void;
    public rect(x, y, w, h): void;
    private _parsePath(path);
    public addPoints(points: number[], offset: number, numPoints: number): number;
    public path(path: string): void;
    public fill(): void;
    public stroke(): void;
    public drawSystemFocusRing(): void;
    public drawCustomFocusRing(): bool;
    public scrollPathIntoView(): void;
    public clip(): void;
    public isPointInPath(x, y): bool;
    public fillText(text: string, x: number, y: number, maxWidth?): void;
    public strokeText(): void;
    public measureText(text): {
        width: number;
    };
    public drawImage(image, _x?, _y?, _width?, _height?): void;
    public createImageData(): CanvasImageData;
    public getImageData(sx, sy, sw, sh): CanvasImageData;
    public putImageData(imagedata, dx, dy): void;
    public beginFrame(target, viewportRect): bool;
    public endFrame(): void;
    public setWidth(width): void;
    public setHeight(height): void;
    public createStatesObject(): any;
    public setStates(dest, src): CanvasRadialGradient;
    public resetState(): void;
    public updateScreenScale(): void;
    public updateScissor(): void;
    public setFontManager(fm): void;
    public buildFontName();
    public calculateFontScale(font): number;
    public transformPoint(x, y): any[];
    public transformRect(x, y, w, h, rect);
    public transformPointTranslate(x: number, y: number): any[];
    public transformRectTranslate(x: number, y: number, w: number, h: number, rect: any[]): any[];
    public transformPointIdentity(x: number, y: number): any[];
    public transformRectIdentity(x: number, y: number, w: number, h: number, rect: any[]): any[];
    public untransformPoint(p);
    public calculateGradientUVtransform(gradientMatrix);
    public calculatePatternUVtransform(imageWidth, imageHeight);
    public setShadowStyle(style, onlyTexture?): bool;
    public setStyle(style): void;
    public setStream(vertexBuffer: VertexBuffer, semantics: Semantics): void;
    public setTechniqueWithAlpha(technique: Technique, screen: any, alpha: number): void;
    public setTechniqueWithColor(technique: Technique, screen: any, color: any): void;
    public parseColor(colorText);
    public interpolateArc(x, y, radius, startAngle, endAngle, anticlockwise?: bool): void;
    public getFlatBuffer(numVertices);
    public fillFlatBuffer(bufferData, numVertices): void;
    public getTextureBuffer(numVertices);
    public fillTextureBuffer(bufferData, numVertices): void;
    public fillFatStrip(points, numPoints, lineWidth): number;
    public autoClose(points, numPoints);
    public isClosed(firstPoint, lastPoint): bool;
    public canTriangulateAsFan(points, numSegments): bool;
    public simplifyShape(points: any[]): number;
    public calculateArea(points, numPoints): number;
    public triangulateAsFan(points, numSegments, vertices, numVertices);
    public getAngles(points: any[], numSegments: number, angles: any[]): number;
    public lowerBound(bin: any[], data: number[], length: number): number;
    public triangulateConcaveCached(points, numSegments, vertices, numVertices);
    public expandIndices(points: any[], vertices: any[], numVertices: number, indices: any[]): number;
    public triangulateConcave(points: any[], numSegments: number, vertices: any[], numVertices: number, ownPoints: bool, totalArea: number);
    public fillFlatVertices(vertices, numVertices): void;
    public isPointInPolygon(tx, ty, points, numPoints): bool;
    public isPointInSubPath(tx, ty, points): bool;
    public shaderDefinition: {
        version: number;
        name: string;
        samplers: {
            texture: {
                MinFilter: number;
                MagFilter: number;
                WrapS: number;
                WrapT: number;
            };
            pattern: {
                MinFilter: number;
                MagFilter: number;
                WrapS: number;
                WrapT: number;
            };
            gradient: {
                MinFilter: number;
                MagFilter: number;
                WrapS: number;
                WrapT: number;
            };
            image: {
                MinFilter: number;
                MagFilter: number;
                WrapS: number;
                WrapT: number;
            };
        };
        parameters: {
            screen: {
                type: string;
                columns: number;
            };
            uvtransform: {
                type: string;
                rows: number;
                columns: number;
            };
            color: {
                type: string;
                columns: number;
            };
            alpha: {
                type: string;
            };
            texture: {
                type: string;
            };
            pattern: {
                type: string;
            };
            gradient: {
                type: string;
            };
            image: {
                type: string;
            };
        };
        techniques: {
            flat_source_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_source_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_source_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_source_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_destination_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_destination_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_destination_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_destination_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_lighter: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            flat_copy: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                };
                programs: string[];
            }[];
            flat_xor: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_source_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_source_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_source_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_source_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_destination_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_destination_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_destination_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_destination_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_lighter: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_copy: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                };
                programs: string[];
            }[];
            texture_xor: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_source_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_source_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_source_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_source_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_destination_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_destination_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_destination_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_destination_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_lighter: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_copy: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                };
                programs: string[];
            }[];
            pattern_xor: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_source_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_source_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_source_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_source_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_destination_atop: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_destination_in: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_destination_out: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_destination_over: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_lighter: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_copy: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                };
                programs: string[];
            }[];
            gradient_xor: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            texture_shadow: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            pattern_shadow: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            gradient_shadow: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                    BlendFunc: number[];
                };
                programs: string[];
            }[];
            image: {
                parameters: string[];
                semantics: string[];
                states: {
                    DepthTestEnable: bool;
                    DepthMask: bool;
                    CullFaceEnable: bool;
                    BlendEnable: bool;
                };
                programs: string[];
            }[];
        };
        programs: {
            fp_image: {
                type: string;
                code: string;
            };
            vp_image: {
                type: string;
                code: string;
            };
            fp_gradient_shadow: {
                type: string;
                code: string;
            };
            vp_texture_uvtransform: {
                type: string;
                code: string;
            };
            fp_pattern_shadow: {
                type: string;
                code: string;
            };
            fp_texture_shadow: {
                type: string;
                code: string;
            };
            vp_texture: {
                type: string;
                code: string;
            };
            fp_gradient: {
                type: string;
                code: string;
            };
            fp_pattern: {
                type: string;
                code: string;
            };
            fp_texture: {
                type: string;
                code: string;
            };
            fp_flat: {
                type: string;
                code: string;
            };
            vp_flat: {
                type: string;
                code: string;
            };
        };
    };
    static create(canvas, gd, md, width, height): CanvasContext;
}
class Canvas {
    static version: number;
    public context: CanvasContext;
    public width: number;
    public height: number;
    public clientWidth: number;
    public clientHeight: number;
    public getContext(contextId): CanvasContext;
    public toDataURL(): string;
    public toBlob(fileCallback): void;
    public setAttribute(attr, value): void;
    public setFontManager(fm): void;
    static create(gd, md): Canvas;
}
