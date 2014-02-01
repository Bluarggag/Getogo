/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/ddsloader.ts */

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global Uint16Array*/
/*global window*/
"use strict";

//
// DDSLoader
//
function DDSLoader() {
    return this;
}
DDSLoader.prototype = {
    version: 1,
    DDSF_CAPS: // surface description flags
    0x00000001,
    DDSF_HEIGHT: 0x00000002,
    DDSF_WIDTH: 0x00000004,
    DDSF_PITCH: 0x00000008,
    DDSF_PIXELFORMAT: 0x00001000,
    DDSF_MIPMAPCOUNT: 0x00020000,
    DDSF_LINEARSIZE: 0x00080000,
    DDSF_DEPTH: 0x00800000,
    DDSF_ALPHAPIXELS: // pixel format flags
    0x00000001,
    DDSF_FOURCC: 0x00000004,
    DDSF_RGB: 0x00000040,
    DDSF_RGBA: 0x00000041,
    DDSF_COMPLEX: // dwCaps1 flags
    0x00000008,
    DDSF_TEXTURE: 0x00001000,
    DDSF_MIPMAP: 0x00400000,
    DDSF_CUBEMAP: // dwCaps2 flags
    0x00000200,
    DDSF_CUBEMAP_POSITIVEX: 0x00000400,
    DDSF_CUBEMAP_NEGATIVEX: 0x00000800,
    DDSF_CUBEMAP_POSITIVEY: 0x00001000,
    DDSF_CUBEMAP_NEGATIVEY: 0x00002000,
    DDSF_CUBEMAP_POSITIVEZ: 0x00004000,
    DDSF_CUBEMAP_NEGATIVEZ: 0x00008000,
    DDSF_CUBEMAP_ALL_FACES: 0x0000FC00,
    DDSF_VOLUME: 0x00200000,
    FOURCC_UNKNOWN: // compressed texture types
    0,
    FOURCC_R8G8B8: 20,
    FOURCC_A8R8G8B8: 21,
    FOURCC_X8R8G8B8: 22,
    FOURCC_R5G6B5: 23,
    FOURCC_X1R5G5B5: 24,
    FOURCC_A1R5G5B5: 25,
    FOURCC_A4R4G4B4: 26,
    FOURCC_R3G3B2: 27,
    FOURCC_A8: 28,
    FOURCC_A8R3G3B2: 29,
    FOURCC_X4R4G4B4: 30,
    FOURCC_A2B10G10R10: 31,
    FOURCC_A8B8G8R8: 32,
    FOURCC_X8B8G8R8: 33,
    FOURCC_G16R16: 34,
    FOURCC_A2R10G10B10: 35,
    FOURCC_A16B16G16R16: 36,
    FOURCC_L8: 50,
    FOURCC_A8L8: 51,
    FOURCC_A4L4: 52,
    FOURCC_DXT1: 0x31545844,
    FOURCC_DXT2: //(MAKEFOURCC('D','X','T','1'))
    0x32545844,
    FOURCC_DXT3: //(MAKEFOURCC('D','X','T','1'))
    0x33545844,
    FOURCC_DXT4: //(MAKEFOURCC('D','X','T','3'))
    0x34545844,
    FOURCC_DXT5: //(MAKEFOURCC('D','X','T','3'))
    0x35545844,
    FOURCC_D16_LOCKABLE: //(MAKEFOURCC('D','X','T','5'))
    70,
    FOURCC_D32: 71,
    FOURCC_D24X8: 77,
    FOURCC_D16: 80,
    FOURCC_D32F_LOCKABLE: 82,
    FOURCC_L16: 81,
    FOURCC_R16F: // Floating point surface formats
    // s10e5 formats (16-bits per channel)
    111,
    FOURCC_G16R16F: 112,
    FOURCC_A16B16G16R16F: 113,
    FOURCC_R32F: // IEEE s23e8 formats (32-bits per channel)
    114,
    FOURCC_G32R32F: 115,
    FOURCC_A32B32G32R32F: 116,
    BGRPIXELFORMAT_B5G6R5: 1,
    BGRPIXELFORMAT_B8G8R8A8: 2,
    BGRPIXELFORMAT_B8G8R8: 3,
    processBytes: function processBytesFn(bytes) {
        if(!this.isValidHeader(bytes)) {
            return;
        }
        // Skip signature
        var offset = 4;
        var header = this.parseHeader(bytes, offset);
        offset += 31 * 4;
        this.width = header.dwWidth;
        this.height = header.dwHeight;
        /*jshint bitwise: false*/
        if((header.dwCaps2 & this.DDSF_VOLUME) && (header.dwDepth > 0)) {
            this.depth = header.dwDepth;
        } else {
            this.depth = 1;
        }
        if(header.dwFlags & this.DDSF_MIPMAPCOUNT) {
            this.numLevels = header.dwMipMapCount;
        } else {
            this.numLevels = 1;
        }
        if(header.dwCaps2 & this.DDSF_CUBEMAP) {
            var numFaces = 0;
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEX) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEX) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEY) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEY) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEZ) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEZ) ? 1 : 0);
            if(numFaces !== 6 || this.width !== this.height) {
                return;
            }
            this.numFaces = numFaces;
        } else {
            this.numFaces = 1;
        }
        var compressed = false;
        var bpe = 0;
        // figure out what the image format is
        var gd = this.gd;
        if(header.ddspf.dwFlags & this.DDSF_FOURCC) {
            switch(header.ddspf.dwFourCC) {
                case this.FOURCC_DXT1:
                    this.format = gd.PIXELFORMAT_DXT1;
                    bpe = 8;
                    compressed = true;
                    break;
                case this.FOURCC_DXT2:
                case this.FOURCC_DXT3:
                    this.format = gd.PIXELFORMAT_DXT3;
                    bpe = 16;
                    compressed = true;
                    break;
                case this.FOURCC_DXT4:
                case this.FOURCC_DXT5:
                case this.FOURCC_RXGB:
                    this.format = gd.PIXELFORMAT_DXT5;
                    bpe = 16;
                    compressed = true;
                    break;
                case this.FOURCC_R8G8B8:
                    this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8;
                    bpe = 3;
                    break;
                case this.FOURCC_A8R8G8B8:
                    this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
                    bpe = 4;
                    break;
                case this.FOURCC_R5G6B5:
                    this.bgrFormat = this.BGRPIXELFORMAT_B5G6R5;
                    bpe = 2;
                    break;
                case this.FOURCC_A8:
                    this.format = gd.PIXELFORMAT_A8;
                    bpe = 1;
                    break;
                case this.FOURCC_A8B8G8R8:
                    this.format = gd.PIXELFORMAT_R8G8B8A8;
                    bpe = 4;
                    break;
                case this.FOURCC_L8:
                    this.format = gd.PIXELFORMAT_L8;
                    bpe = 1;
                    break;
                case this.FOURCC_A8L8:
                    this.format = gd.PIXELFORMAT_L8A8;
                    bpe = 2;
                    break;
                    //these are unsupported for now
                                    case this.FOURCC_UNKNOWN:
                case this.FOURCC_ATI1:
                case this.FOURCC_ATI2:
                case this.FOURCC_X8R8G8B8:
                case this.FOURCC_X8B8G8R8:
                case this.FOURCC_A2B10G10R10:
                case this.FOURCC_A2R10G10B10:
                case this.FOURCC_A16B16G16R16:
                case this.FOURCC_R16F:
                case this.FOURCC_A16B16G16R16F:
                case this.FOURCC_R32F:
                case this.FOURCC_A32B32G32R32F:
                case this.FOURCC_L16:
                case this.FOURCC_X1R5G5B5:
                case this.FOURCC_A1R5G5B5:
                case this.FOURCC_A4R4G4B4:
                case this.FOURCC_R3G3B2:
                case this.FOURCC_A8R3G3B2:
                case this.FOURCC_X4R4G4B4:
                case this.FOURCC_A4L4:
                case this.FOURCC_D16_LOCKABLE:
                case this.FOURCC_D32:
                case this.FOURCC_D24X8:
                case this.FOURCC_D16:
                case this.FOURCC_D32F_LOCKABLE:
                case this.FOURCC_G16R16:
                case this.FOURCC_G16R16F:
                case this.FOURCC_G32R32F:
                    break;
                default:
                    return;
            }
        } else if(header.ddspf.dwFlags === this.DDSF_RGBA && header.ddspf.dwRGBBitCount === 32) {
            if(header.ddspf.dwRBitMask === 0x000000FF && header.ddspf.dwGBitMask === 0x0000FF00 && header.ddspf.dwBBitMask === 0x00FF0000 && header.ddspf.dwABitMask === 0xFF000000) {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            } else {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
            }
            bpe = 4;
        } else if(header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 32) {
            if(header.ddspf.dwRBitMask === 0x000000FF && header.ddspf.dwGBitMask === 0x0000FF00 && header.ddspf.dwBBitMask === 0x00FF0000) {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            } else {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
            }
            bpe = 4;
        } else if(header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 24) {
            if(header.ddspf.dwRBitMask === 0x000000FF && header.ddspf.dwGBitMask === 0x0000FF00 && header.ddspf.dwBBitMask === 0x00FF0000) {
                this.format = gd.PIXELFORMAT_R8G8B8;
            } else {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8;
            }
            bpe = 3;
        } else if(header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 16) {
            if(header.ddspf.dwRBitMask === 0x0000F800 && header.ddspf.dwGBitMask === 0x000007E0 && header.ddspf.dwBBitMask === 0x0000001F) {
                this.format = gd.PIXELFORMAT_R5G6B5;
            } else {
                this.bgrFormat = this.BGRPIXELFORMAT_B5G6R5;
            }
            bpe = 2;
        } else if(header.ddspf.dwRGBBitCount === 8) {
            this.format = gd.PIXELFORMAT_L8;
            bpe = 1;
        } else {
            return;
        }
        var size = 0;
        for(var face = 0; face < this.numFaces; face += 1) {
            var w = this.width, h = this.height, d = this.depth;
            for(var level = 0; level < this.numLevels; level += 1) {
                var ew = (compressed ? Math.floor((w + 3) / 4) : w);
                var eh = (compressed ? Math.floor((h + 3) / 4) : h);
                size += (ew * eh * d * bpe);
                w = (w > 1 ? (w >> 1) : 1);
                h = (h > 1 ? (h >> 1) : 1);
                d = (d > 1 ? (d >> 1) : 1);
            }
        }
        /*jshint bitwise: true*/
        if(bytes.length < (offset + size)) {
            return;
        }
        this.bytesPerPixel = bpe;
        var data = bytes.subarray(offset);
        bytes = null;
        var swapBytes = false;
        switch(this.bgrFormat) {
            case this.BGRPIXELFORMAT_B8G8R8:
                this.format = gd.PIXELFORMAT_R8G8B8;
                swapBytes = true;
                break;
            case this.BGRPIXELFORMAT_B8G8R8A8:
                this.format = gd.PIXELFORMAT_R8G8B8A8;
                swapBytes = true;
                break;
            case this.BGRPIXELFORMAT_B5G6R5:
                this.format = gd.PIXELFORMAT_R5G6B5;
                swapBytes = true;
                break;
            default:
                break;
        }
        if(swapBytes) {
            data = this.convertBGR2RGB(data);
        }
        if(this.format === gd.PIXELFORMAT_DXT1) {
            if(!gd.isSupported('TEXTURE_DXT1')) {
                data = this.convertDXT1ToRGBA(data);
            }
        } else if(this.format === gd.PIXELFORMAT_DXT3) {
            if(!gd.isSupported('TEXTURE_DXT3')) {
                data = this.convertDXT3ToRGBA(data);
            }
        } else if(this.format === gd.PIXELFORMAT_DXT5) {
            if(!gd.isSupported('TEXTURE_DXT5')) {
                data = this.convertDXT5ToRGBA(data);
            }
        }
        this.data = data;
    },
    parseHeader: function parseHeaderFn(bytes, offset) {
        function readUInt32() {
            var value = ((bytes[offset]) + (bytes[offset + 1] * 256) + (bytes[offset + 2] * 65536) + (bytes[offset + 3] * 16777216));
            offset += 4;
            return value;
        }
        function parsePixelFormatHeader() {
            return {
                dwSize: readUInt32(),
                dwFlags: readUInt32(),
                dwFourCC: readUInt32(),
                dwRGBBitCount: readUInt32(),
                dwRBitMask: readUInt32(),
                dwGBitMask: readUInt32(),
                dwBBitMask: readUInt32(),
                dwABitMask: readUInt32()
            };
        }
        var header = {
            dwSize: readUInt32(),
            dwFlags: readUInt32(),
            dwHeight: readUInt32(),
            dwWidth: readUInt32(),
            dwPitchOrLinearSize: readUInt32(),
            dwDepth: readUInt32(),
            dwMipMapCount: readUInt32(),
            dwReserved1: [
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32(), 
                readUInt32()
            ],
            ddspf: parsePixelFormatHeader(),
            dwCaps1: readUInt32(),
            dwCaps2: readUInt32(),
            dwReserved2: [
                readUInt32(), 
                readUInt32(), 
                readUInt32()
            ]
        };
        return header;
    },
    isValidHeader: function isValidHeaderFn(bytes) {
        return (68 === bytes[0] && 68 === bytes[1] && 83 === bytes[2] && 32 === bytes[3]);
    },
    convertBGR2RGB: function convertBGR2RGBFn(data) {
        // Rearrange the colors from BGR to RGB
        var bytesPerPixel = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var numLevels = this.numLevels;
        var numFaces = this.numFaces;
        var numPixels = 0;
        for(var level = 0; level < numLevels; level += 1) {
            numPixels += (width * height);
            width = (width > 1 ? Math.floor(width / 2) : 1);
            height = (height > 1 ? Math.floor(height / 2) : 1);
        }
        var size = (numPixels * bytesPerPixel * numFaces);
        var offset = 0;
        if(bytesPerPixel === 3 || bytesPerPixel === 4) {
            do {
                var tmp = data[offset];
                data[offset] = data[offset + 2];
                data[offset + 2] = tmp;
                offset += bytesPerPixel;
            }while(offset < size);
        } else if(bytesPerPixel === 2) {
            var dst = new Uint16Array(numPixels * numFaces);
            var src = 0, dest = 0;
            var r, g, b;
            /*jshint bitwise: false*/
            var mask5bit = ((1 << 5) - 1);
            var midMask6bit = (((1 << 6) - 1) << 5);
            do {
                var value = ((data[src + 1] << 8) | data[src]);
                src += 2;
                r = (value & mask5bit) << 11;
                g = (value & midMask6bit);
                b = ((value >> 11) & mask5bit);
                dst[dest] = r | g | b;
                dest += 1;
            }while(offset < size);
            /*jshint bitwise: true*/
            return dst;
        }
        return data;
    },
    decode565: function decode565Fn(value, color) {
        /*jshint bitwise: false*/
        var r = ((value >> 11) & 31);
        var g = ((value >> 5) & 63);
        var b = ((value) & 31);
        color[0] = ((r << 3) | (r >> 2));
        color[1] = ((g << 2) | (g >> 4));
        color[2] = ((b << 3) | (b >> 2));
        color[3] = 255;
        /*jshint bitwise: true*/
        return color;
    },
    decodeColor: function decodeColorFn(data, src, isDXT1, out, scratchpad) {
        /*jshint bitwise: false*/
        var cache = scratchpad.cache;
        var decode565 = DDSLoader.prototype.decode565;
        var col0 = ((data[src + 1] << 8) | data[src]);
        src += 2;
        var col1 = ((data[src + 1] << 8) | data[src]);
        src += 2;
        var c0, c1, c2, c3, i;
        if(col0 !== col1) {
            c0 = decode565(col0, cache[0]);
            c1 = decode565(col1, cache[1]);
            c2 = cache[2];
            c3 = cache[3];
            if(col0 > col1) {
                for(i = 0; i < 3; i += 1) {
                    var c0i = c0[i];
                    var c1i = c1[i];
                    c2[i] = ((((c0i * 2) + c1i) / 3) | 0);
                    c3[i] = (((c0i + (c1i * 2)) / 3) | 0);
                }
                c2[3] = 255;
                c3[3] = 255;
            } else {
                for(i = 0; i < 3; i += 1) {
                    c2[i] = ((c0[i] + c1[i]) >> 1);
                    c3[i] = 0;
                }
                c2[3] = 255;
                c3[3] = 0;
            }
        } else {
            c0 = decode565(col0, cache[0]);
            c1 = c0;
            c2 = c0;
            c3 = cache[1];
            for(i = 0; i < 4; i += 1) {
                c3[i] = 0;
            }
        }
        var c = scratchpad.colorArray;
        c[0] = c0;
        c[1] = c1;
        c[2] = c2;
        c[3] = c3;
        // ((1 << 2) - 1) === 3;
                var row, dest, color;
        if(isDXT1) {
            for(i = 0; i < 4; i += 1) {
                row = data[src + i];
                dest = out[i];
                dest[0] = c[(row) & 3];
                dest[1] = c[(row >> 2) & 3];
                dest[2] = c[(row >> 4) & 3];
                dest[3] = c[(row >> 6) & 3];
            }
        } else {
            for(i = 0; i < 4; i += 1) {
                row = data[src + i];
                dest = out[i];
                color = c[(row) & 3];
                dest[0][0] = color[0];
                dest[0][1] = color[1];
                dest[0][2] = color[2];
                dest[0][3] = color[3];
                color = c[(row >> 2) & 3];
                dest[1][0] = color[0];
                dest[1][1] = color[1];
                dest[1][2] = color[2];
                dest[1][3] = color[3];
                color = c[(row >> 4) & 3];
                dest[2][0] = color[0];
                dest[2][1] = color[1];
                dest[2][2] = color[2];
                dest[2][3] = color[3];
                color = c[(row >> 6) & 3];
                dest[3][0] = color[0];
                dest[3][1] = color[1];
                dest[3][2] = color[2];
                dest[3][3] = color[3];
            }
        }
        /*jshint bitwise: true*/
            },
    decodeDXT3Alpha: function decodeDXT3AlphaFn(data, src, out) {
        /*jshint bitwise: false*/
        // ((1 << 4) - 1) === 15;
        for(var i = 0; i < 4; i += 1) {
            var row = ((data[src + 1] << 8) | data[src]);
            src += 2;
            var dest = out[i];
            if(row) {
                dest[0][3] = ((row) & 15) * (255 / 15);
                dest[1][3] = ((row >> 4) & 15) * (255 / 15);
                dest[2][3] = ((row >> 8) & 15) * (255 / 15);
                dest[3][3] = ((row >> 12) & 15) * (255 / 15);
            } else {
                dest[0][3] = 0;
                dest[1][3] = 0;
                dest[2][3] = 0;
                dest[3][3] = 0;
            }
        }
        /*jshint bitwise: true*/
            },
    decodeDXT5Alpha: function decodeDXT5AlphaFn(data, src, out, scratchpad) {
        var a0 = data[src];
        src += 1;
        var a1 = data[src];
        src += 1;
        /*jshint bitwise: false*/
        var a = scratchpad.alphaArray;
        a[0] = a0;
        a[1] = a1;
        if(a0 > a1) {
            a[2] = ((((a0 * 6) + (a1 * 1)) / 7) | 0);
            a[3] = ((((a0 * 5) + (a1 * 2)) / 7) | 0);
            a[4] = ((((a0 * 4) + (a1 * 3)) / 7) | 0);
            a[5] = ((((a0 * 3) + (a1 * 4)) / 7) | 0);
            a[6] = ((((a0 * 2) + (a1 * 5)) / 7) | 0);
            a[7] = ((((a0 * 1) + (a1 * 6)) / 7) | 0);
        } else if(a0 < a1) {
            a[2] = ((((a0 * 4) + (a1 * 1)) / 5) | 0);
            a[3] = ((((a0 * 3) + (a1 * 2)) / 5) | 0);
            a[4] = ((((a0 * 2) + (a1 * 3)) / 5) | 0);
            a[5] = ((((a0 * 1) + (a1 * 4)) / 5) | 0);
            a[6] = 0;
            a[7] = 255;
        } else//if (a0 === a1)
         {
            a[2] = a0;
            a[3] = a0;
            a[4] = a0;
            a[5] = a0;
            a[6] = 0;
            a[7] = 255;
        }
        // ((1 << 3) - 1) === 7
        var dest;
        for(var i = 0; i < 2; i += 1) {
            var value = (data[src] | (data[src + 1] << 8) | (data[src + 2] << 16));
            src += 3;
            dest = out[(i * 2)];
            dest[0][3] = a[(value) & 7];
            dest[1][3] = a[(value >> 3) & 7];
            dest[2][3] = a[(value >> 6) & 7];
            dest[3][3] = a[(value >> 9) & 7];
            dest = out[(i * 2) + 1];
            dest[0][3] = a[(value >> 12) & 7];
            dest[1][3] = a[(value >> 15) & 7];
            dest[2][3] = a[(value >> 18) & 7];
            dest[3][3] = a[(value >> 21) & 7];
        }
        /*jshint bitwise: true*/
            },
    convertDXT1ToRGBA: function convertDXT1ToRGBAFn(data) {
        var decodeColor = this.decodeColor;
        var scratchpad = {
            cache: [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ],
            colorArray: new Array(4)
        };
        var encode;
        if(this.hasDXT1Alpha(data)) {
            this.format = this.gd.PIXELFORMAT_R5G5B5A1;
            encode = this.encodeR5G5B5A1;
        } else {
            this.format = this.gd.PIXELFORMAT_R5G6B5;
            encode = this.encodeR5G6B5;
        }
        data = this.convertToRGBA16(data, function decodeDXT1(data, src, out) {
            decodeColor(data, src, true, out, scratchpad);
        }, encode, 8);
        return data;
    },
    convertDXT3ToRGBA: function convertDXT3ToRGBAFn(data) {
        var decodeColor = this.decodeColor;
        var decodeDXT3Alpha = this.decodeDXT3Alpha;
        var scratchpad = {
            cache: [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ],
            colorArray: new Array(4)
        };
        data = this.convertToRGBA16(data, function decodeDXT3(data, src, out) {
            decodeColor(data, (src + 8), false, out, scratchpad);
            decodeDXT3Alpha(data, src, out);
        }, this.encodeR4G4B4A4, 16);
        this.format = this.gd.PIXELFORMAT_R4G4B4A4;
        return data;
    },
    convertDXT5ToRGBA: function convertDXT5ToRGBAFn(data) {
        var decodeColor = this.decodeColor;
        var decodeDXT5Alpha = this.decodeDXT5Alpha;
        var scratchpad = {
            cache: [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ],
            colorArray: new Array(4),
            alphaArray: new Uint8Array(8)
        };
        data = this.convertToRGBA16(data, function decodeDXT5(data, src, out) {
            decodeColor(data, (src + 8), false, out, scratchpad);
            decodeDXT5Alpha(data, src, out, scratchpad);
        }, this.encodeR4G4B4A4, 16);
        this.format = this.gd.PIXELFORMAT_R4G4B4A4;
        return data;
    },
    convertToRGBA32: function convertToRGBA32Fn(data, decode, srcStride) {
        //var bpp = 4;
        var level;
        var width = this.width;
        var height = this.height;
        var numLevels = this.numLevels;
        var numFaces = this.numFaces;
        /*jshint bitwise: false*/
        var numPixels = 0;
        for(level = 0; level < numLevels; level += 1) {
            numPixels += (width * height);
            width = (width > 1 ? (width >> 1) : 1);
            height = (height > 1 ? (height >> 1) : 1);
        }
        var dst = new Uint8Array(numPixels * 4 * numFaces);
        var src = 0, dest = 0;
        var color = [
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ]
        ];
        for(var face = 0; face < numFaces; face += 1) {
            width = this.width;
            height = this.height;
            for(var n = 0; n < numLevels; n += 1) {
                var numColumns = (width > 4 ? 4 : width);
                var numLines = (height > 4 ? 4 : height);
                var heightInBlocks = ((height + 3) >> 2);
                var widthInBlocks = ((width + 3) >> 2);
                var desinationStride = (width * 4);
                var desinationLineStride = (numColumns * 4);
                var desinationBlockStride = (desinationStride * (numLines - 1));
                for(var y = 0; y < heightInBlocks; y += 1) {
                    for(var x = 0; x < widthInBlocks; x += 1) {
                        decode(data, src, color);
                        var destLine = dest;
                        for(var line = 0; line < numLines; line += 1) {
                            var colorLine = color[line];
                            var destRGBA = destLine;
                            for(var i = 0; i < numColumns; i += 1) {
                                var rgba = colorLine[i];
                                dst[destRGBA] = rgba[0];
                                dst[destRGBA + 1] = rgba[1];
                                dst[destRGBA + 2] = rgba[2];
                                dst[destRGBA + 3] = rgba[3];
                                destRGBA += 4;
                            }
                            destLine += desinationStride;
                        }
                        src += srcStride;
                        dest += desinationLineStride;
                    }
                    dest += desinationBlockStride;
                }
                width = (width > 1 ? (width >> 1) : 1);
                height = (height > 1 ? (height >> 1) : 1);
            }
        }
        /*jshint bitwise: true*/
        return dst;
    },
    hasDXT1Alpha: function hasDXT1AlphaFn(data) {
        var length = data.length;
        var n, i, row;
        for(n = 0; n < length; n += 8) {
            var col0 = ((data[n + 1] << 8) | data[n]);
            var col1 = ((data[n + 3] << 8) | data[n + 2]);
            if(col0 <= col1) {
                for(i = 0; i < 4; i += 1) {
                    row = data[n + 4 + i];
                    if(row === 0) {
                        continue;
                    }
                    if(((row) & 3) === 3 || ((row >> 2) & 3) === 3 || ((row >> 4) & 3) === 3 || ((row >> 6) & 3) === 3) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    encodeR5G6B5: function encodeR5G6B5Fn(rgba) {
        return (((rgba[2] & 0xf8) >>> 3) | ((rgba[1] & 0xfc) << 3) | ((rgba[0] & 0xf8) << 8));
    },
    encodeR5G5B5A1: function encodeR5G5B5A1Fn(rgba) {
        return ((rgba[3] >>> 7) | ((rgba[2] & 0xf8) >>> 2) | ((rgba[1] & 0xf8) << 3) | ((rgba[0] & 0xf8) << 8));
    },
    encodeR4G4B4A4: function encodeR4G4B4A4Fn(rgba) {
        return ((rgba[3] >>> 4) | (rgba[2] & 0xf0) | ((rgba[1] & 0xf0) << 4) | ((rgba[0] & 0xf0) << 8));
    },
    convertToRGBA16: function convertToRGBA16Fn(data, decode, encode, srcStride) {
        //var bpp = 2;
        var level;
        var width = this.width;
        var height = this.height;
        var numLevels = this.numLevels;
        var numFaces = this.numFaces;
        /*jshint bitwise: false*/
        var numPixels = 0;
        for(level = 0; level < numLevels; level += 1) {
            numPixels += (width * height);
            width = (width > 1 ? (width >> 1) : 1);
            height = (height > 1 ? (height >> 1) : 1);
        }
        var dst = new Uint16Array(numPixels * 1 * numFaces);
        var src = 0, dest = 0;
        var color = [
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ], 
            [
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4), 
                new Uint8Array(4)
            ]
        ];
        for(var face = 0; face < numFaces; face += 1) {
            width = this.width;
            height = this.height;
            for(var n = 0; n < numLevels; n += 1) {
                var numColumns = (width > 4 ? 4 : width);
                var numLines = (height > 4 ? 4 : height);
                var heightInBlocks = ((height + 3) >> 2);
                var widthInBlocks = ((width + 3) >> 2);
                var desinationStride = (width * 1);
                var desinationLineStride = (numColumns * 1);
                var desinationBlockStride = (desinationStride * (numLines - 1));
                for(var y = 0; y < heightInBlocks; y += 1) {
                    for(var x = 0; x < widthInBlocks; x += 1) {
                        decode(data, src, color);
                        var destLine = dest;
                        for(var line = 0; line < numLines; line += 1) {
                            var colorLine = color[line];
                            var destRGBA = destLine;
                            for(var i = 0; i < numColumns; i += 1) {
                                var rgba = colorLine[i];
                                dst[destRGBA] = encode(rgba);
                                destRGBA += 1;
                            }
                            destLine += desinationStride;
                        }
                        src += srcStride;
                        dest += desinationLineStride;
                    }
                    dest += desinationBlockStride;
                }
                width = (width > 1 ? (width >> 1) : 1);
                height = (height > 1 ? (height >> 1) : 1);
            }
        }
        /*jshint bitwise: true*/
        return dst;
    }
};
// Constructor function
DDSLoader.create = function ddsLoaderFn(params) {
    var loader = new DDSLoader();
    loader.gd = params.gd;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    /*jshint bitwise: false*/
    function MAKEFOURCC(c0, c1, c2, c3) {
        return (c0.charCodeAt(0) + (c1.charCodeAt(0) * 256) + (c2.charCodeAt(0) * 65536) + (c3.charCodeAt(0) * 16777216));
    }
    /*jshint bitwise: true*/
    loader.FOURCC_ATI1 = MAKEFOURCC('A', 'T', 'I', '1');
    loader.FOURCC_ATI2 = MAKEFOURCC('A', 'T', 'I', '2');
    loader.FOURCC_RXGB = MAKEFOURCC('R', 'X', 'G', 'B');
    var src = params.src;
    if(src) {
        loader.src = src;
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            if(params.onerror) {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';
                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if(xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK') {
                        loader.onload('', 0);
                        return;
                    }
                    if(xhrStatus === 200 || xhrStatus === 0) {
                        var buffer;
                        if(xhr.responseType === "arraybuffer") {
                            buffer = xhr.response;
                        } else if(xhr.mozResponseArrayBuffer) {
                            buffer = xhr.mozResponseArrayBuffer;
                        } else//if (xhr.responseText !== null)
                         {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for(var i = 0; i < numChars; i += 1) {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                                                    }
                        // Fix for loading from file
                        if(xhrStatus === 0 && window.location.protocol === "file:") {
                            xhrStatus = 200;
                        }
                        loader.processBytes(new Uint8Array(buffer));
                        if(loader.data) {
                            if(loader.onload) {
                                loader.onload(loader.data, loader.width, loader.height, loader.format, loader.numLevels, (loader.numFaces > 1), loader.depth, xhrStatus);
                            }
                        } else {
                            if(loader.onerror) {
                                loader.onerror();
                            }
                        }
                    } else {
                        if(loader.onerror) {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if(xhr.hasOwnProperty && xhr.hasOwnProperty("responseType")) {
            xhr.responseType = "arraybuffer";
        } else if(xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        } else {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    } else {
        loader.processBytes((params.data));
        if(loader.data) {
            if(loader.onload) {
                loader.onload(loader.data, loader.width, loader.height, loader.format, loader.numLevels, (loader.numFaces > 1), loader.depth);
            }
        } else {
            if(loader.onerror) {
                loader.onerror();
            }
        }
    }
    return loader;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/graphicsdevice.ts */

// Copyright (c) 2011-2013 Turbulenz Limited
/*global TurbulenzEngine*/
/*global TGALoader*/
/*global DDSLoader*/
/*global TARLoader*/
/*global Int8Array*/
/*global Int16Array*/
/*global Int32Array*/
/*global Uint8Array*/
/*global Uint8ClampedArray*/
/*global Uint16Array*/
/*global Uint32Array*/
/*global Float32Array*/
/*global ArrayBuffer*/
/*global DataView*/
/*global window*/
/*global debug*/
"use strict";



// -----------------------------------------------------------------------------
function TZWebGLTexture() {
    return this;
}
TZWebGLTexture.prototype = {
    version: 1,
    setData: function textureSetDataFn(data) {
        var gd = this.gd;
        var target = this.target;
        gd.bindTexture(target, this.glTexture);
        this.updateData(data);
        gd.bindTexture(target, null);
    },
    createGLTexture: // Internal
    function createGLTextureFn(data) {
        var gd = this.gd;
        var gl = gd.gl;
        var target;
        if(this.cubemap) {
            target = gl.TEXTURE_CUBE_MAP;
        } else if(this.depth > 1) {
            //target = gl.TEXTURE_3D;
            // 3D textures are not supported yet
            return false;
        } else {
            target = gl.TEXTURE_2D;
        }
        this.target = target;
        var gltex = gl.createTexture();
        this.glTexture = gltex;
        gd.bindTexture(target, gltex);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        if(this.mipmaps || 1 < this.numDataLevels) {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        } else {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.updateData(data);
        gd.bindTexture(target, null);
        return true;
    },
    updateData: function updateDataFn(data) {
        var gd = this.gd;
        var gl = gd.gl;
        function log2(a) {
            return Math.floor(Math.log(a) / Math.LN2);
        }
        var generateMipMaps = this.mipmaps && (this.numDataLevels !== (1 + Math.max(log2(this.width), log2(this.height))));
        var format = this.format;
        var internalFormat, gltype, srcStep, bufferData = null;
        var compressedTexturesExtension;
        if(format === gd.PIXELFORMAT_A8) {
            internalFormat = gl.ALPHA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 1;
            if(data && !data.src) {
                if(data instanceof Uint8Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint8Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_L8) {
            internalFormat = gl.LUMINANCE;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 1;
            if(data && !data.src) {
                if(data instanceof Uint8Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint8Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_L8A8) {
            internalFormat = gl.LUMINANCE_ALPHA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 2;
            if(data && !data.src) {
                if(data instanceof Uint8Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint8Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_R5G5B5A1) {
            internalFormat = gl.RGBA;
            gltype = gl.UNSIGNED_SHORT_5_5_5_1;
            srcStep = 1;
            if(data && !data.src) {
                if(data instanceof Uint16Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint16Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_R5G6B5) {
            internalFormat = gl.RGB;
            gltype = gl.UNSIGNED_SHORT_5_6_5;
            srcStep = 1;
            if(data && !data.src) {
                if(data instanceof Uint16Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint16Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_R4G4B4A4) {
            internalFormat = gl.RGBA;
            gltype = gl.UNSIGNED_SHORT_4_4_4_4;
            srcStep = 1;
            if(data && !data.src) {
                if(data instanceof Uint16Array) {
                    bufferData = data;
                } else {
                    bufferData = new Uint16Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_R8G8B8A8) {
            internalFormat = gl.RGBA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 4;
            if(data && !data.src) {
                if(data instanceof Uint8Array) {
                    // Some browsers consider Uint8ClampedArray to be
                    // an instance of Uint8Array (which is correct as
                    // per the spec), yet won't accept a
                    // Uint8ClampedArray as pixel data for a
                    // gl.UNSIGNED_BYTE Texture.  If we have a
                    // Uint8ClampedArray then we can just reuse the
                    // underlying data.
                    if(typeof Uint8ClampedArray !== "undefined" && data instanceof Uint8ClampedArray) {
                        bufferData = new Uint8Array(data.buffer);
                    } else {
                        bufferData = data;
                    }
                } else {
                    bufferData = new Uint8Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_R8G8B8) {
            internalFormat = gl.RGB;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 3;
            if(data && !data.src) {
                if(data instanceof Uint8Array) {
                    // See comment above about Uint8ClampedArray
                    if(typeof Uint8ClampedArray !== "undefined" && data instanceof Uint8ClampedArray) {
                        bufferData = new Uint8Array(data.buffer);
                    } else {
                        bufferData = data;
                    }
                } else {
                    bufferData = new Uint8Array(data);
                }
            }
        } else if(format === gd.PIXELFORMAT_D24S8) {
            //internalFormat = gl.DEPTH24_STENCIL8_EXT;
            //gltype = gl.UNSIGNED_INT_24_8_EXT;
            //internalFormat = gl.DEPTH_COMPONENT;
            internalFormat = gl.DEPTH_STENCIL;
            gltype = gl.UNSIGNED_INT;
            srcStep = 1;
            if(data && !data.src) {
                bufferData = new Uint32Array(data);
            }
        } else if(format === gd.PIXELFORMAT_DXT1 || format === gd.PIXELFORMAT_DXT3 || format === gd.PIXELFORMAT_DXT5) {
            compressedTexturesExtension = gd.compressedTexturesExtension;
            if(compressedTexturesExtension) {
                if(format === gd.PIXELFORMAT_DXT1) {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    srcStep = 8;
                } else if(format === gd.PIXELFORMAT_DXT3) {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    srcStep = 16;
                } else//if (format === gd.PIXELFORMAT_DXT5)
                 {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    srcStep = 16;
                }
                if(internalFormat === undefined) {
                    return;// Unsupported format
                    
                }
                if(data && !data.src) {
                    if(data instanceof Uint8Array) {
                        bufferData = data;
                    } else {
                        bufferData = new Uint8Array(data);
                    }
                }
            } else {
                return;// Unsupported format
                
            }
        } else {
            return;//unknown/unsupported format
            
        }
        var numLevels = (data && 0 < this.numDataLevels ? this.numDataLevels : 1);
        var w = this.width, h = this.height, offset = 0, target, n, levelSize, levelData;
        if(this.cubemap) {
            if(data && data instanceof WebGLVideo) {
                return;//unknown/unsupported format
                
            }
            target = gl.TEXTURE_CUBE_MAP;
            for(var f = 0; f < 6; f += 1) {
                var faceTarget = (gl.TEXTURE_CUBE_MAP_POSITIVE_X + f);
                for(n = 0; n < numLevels; n += 1) {
                    if(compressedTexturesExtension) {
                        levelSize = (Math.floor((w + 3) / 4) * Math.floor((h + 3) / 4) * srcStep);
                        if(bufferData) {
                            if(numLevels === 1) {
                                levelData = bufferData;
                            } else {
                                levelData = bufferData.subarray(offset, (offset + levelSize));
                            }
                        } else {
                            levelData = new Uint8Array(levelSize);
                        }
                        if(gd.WEBGL_compressed_texture_s3tc) {
                            gl.compressedTexImage2D(faceTarget, n, internalFormat, w, h, 0, levelData);
                        } else {
                            compressedTexturesExtension.compressedTexImage2D(faceTarget, n, internalFormat, w, h, 0, levelData);
                        }
                    } else {
                        levelSize = (w * h * srcStep);
                        if(bufferData) {
                            if(numLevels === 1) {
                                levelData = bufferData;
                            } else {
                                levelData = bufferData.subarray(offset, (offset + levelSize));
                            }
                            gl.texImage2D(faceTarget, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                        } else if(data) {
                            gl.texImage2D(faceTarget, n, internalFormat, internalFormat, gltype, data);
                        } else {
                            if(gltype === gl.UNSIGNED_SHORT_5_6_5 || gltype === gl.UNSIGNED_SHORT_5_5_5_1 || gltype === gl.UNSIGNED_SHORT_4_4_4_4) {
                                levelData = new Uint16Array(levelSize);
                            } else {
                                levelData = new Uint8Array(levelSize);
                            }
                            gl.texImage2D(faceTarget, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                        }
                    }
                    offset += levelSize;
                    w = (w > 1 ? Math.floor(w / 2) : 1);
                    h = (h > 1 ? Math.floor(h / 2) : 1);
                }
                w = this.width;
                h = this.height;
            }
        } else if(data && data instanceof WebGLVideo) {
            target = gl.TEXTURE_2D;
            gl.texImage2D(target, 0, internalFormat, internalFormat, gltype, data.video);
        } else {
            target = gl.TEXTURE_2D;
            for(n = 0; n < numLevels; n += 1) {
                if(compressedTexturesExtension) {
                    levelSize = (Math.floor((w + 3) / 4) * Math.floor((h + 3) / 4) * srcStep);
                    if(bufferData) {
                        if(numLevels === 1) {
                            levelData = bufferData;
                        } else {
                            levelData = bufferData.subarray(offset, (offset + levelSize));
                        }
                    } else {
                        levelData = new Uint8Array(levelSize);
                    }
                    if(gd.WEBGL_compressed_texture_s3tc) {
                        gl.compressedTexImage2D(target, n, internalFormat, w, h, 0, levelData);
                    } else {
                        compressedTexturesExtension.compressedTexImage2D(target, n, internalFormat, w, h, 0, levelData);
                    }
                } else {
                    levelSize = (w * h * srcStep);
                    if(bufferData) {
                        if(numLevels === 1) {
                            levelData = bufferData;
                        } else {
                            levelData = bufferData.subarray(offset, (offset + levelSize));
                        }
                        gl.texImage2D(target, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                    } else if(data) {
                        gl.texImage2D(target, n, internalFormat, internalFormat, gltype, data);
                    } else {
                        if(gltype === gl.UNSIGNED_SHORT_5_6_5 || gltype === gl.UNSIGNED_SHORT_5_5_5_1 || gltype === gl.UNSIGNED_SHORT_4_4_4_4) {
                            levelData = new Uint16Array(levelSize);
                        } else {
                            levelData = new Uint8Array(levelSize);
                        }
                        gl.texImage2D(target, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                    }
                }
                offset += levelSize;
                w = (w > 1 ? Math.floor(w / 2) : 1);
                h = (h > 1 ? Math.floor(h / 2) : 1);
            }
        }
        if(generateMipMaps) {
            gl.generateMipmap(target);
        }
    },
    updateMipmaps: function updateMipmapsFn(face) {
        if(this.mipmaps) {
            if(this.depth > 1) {
                (TurbulenzEngine).callOnError("3D texture mipmap generation unsupported");
                return;
            }
            if(this.cubemap && face !== 5) {
                return;
            }
            var gd = this.gd;
            var gl = gd.gl;
            var target = this.target;
            gd.bindTexture(target, this.glTexture);
            gl.generateMipmap(target);
            gd.bindTexture(target, null);
        }
    },
    destroy: function textureDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var glTexture = this.glTexture;
            if(glTexture) {
                var gl = gd.gl;
                if(gl) {
                    gd.unbindTexture(glTexture);
                    gl.deleteTexture(glTexture);
                }
                delete this.glTexture;
            }
            delete this.sampler;
            delete this.gd;
        }
    },
    typedArrayIsValid: function textureTypedArrayIsValidFn(typedArray) {
        var gd = this.gd;
        var format = this.format;
        if(gd) {
            if((format === gd.PIXELFORMAT_A8) || (format === gd.PIXELFORMAT_L8) || (format === gd.PIXELFORMAT_S8)) {
                return ((typedArray instanceof Uint8Array) || (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray)) && (typedArray.length === this.width * this.height * this.depth);
            }
            if(format === gd.PIXELFORMAT_L8A8) {
                return ((typedArray instanceof Uint8Array) || (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray)) && (typedArray.length === 2 * this.width * this.height * this.depth);
            }
            if(format === gd.PIXELFORMAT_R8G8B8) {
                return ((typedArray instanceof Uint8Array) || (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray)) && (typedArray.length === 3 * this.width * this.height * this.depth);
            }
            if(format === gd.PIXELFORMAT_R8G8B8A8) {
                return ((typedArray instanceof Uint8Array) || (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray)) && (typedArray.length === 4 * this.width * this.height * this.depth);
            }
            if((format === gd.PIXELFORMAT_R5G5B5A1) || (format === gd.PIXELFORMAT_R5G6B5) || (format === gd.PIXELFORMAT_R4G4B4A4)) {
                return (typedArray instanceof Uint16Array) && (typedArray.length === this.width * this.height * this.depth);
            }
        }
        return false;
    }
};
// Constructor function
TZWebGLTexture.create = function webGLTextureCreateFn(gd, params) {
    var tex = new TZWebGLTexture();
    tex.gd = gd;
    tex.mipmaps = params.mipmaps;
    tex.dynamic = params.dynamic;
    tex.renderable = params.renderable;
    tex.numDataLevels = 0;
    var src = params.src;
    if(src) {
        tex.name = params.name || src;
        var extension;
        var data = params.data;
        if(data) {
            // do not trust file extensions if we got data...
            if(data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71) {
                extension = '.png';
            } else if(data[0] === 255 && data[1] === 216 && data[2] === 255 && (data[3] === 224 || data[3] === 225)) {
                extension = '.jpg';
            } else if(data[0] === 68 && data[1] === 68 && data[2] === 83 && data[3] === 32) {
                extension = '.dds';
            } else {
                extension = src.slice(-4);
            }
        } else {
            extension = src.slice(-4);
        }
        // DDS and TGA textures require out own image loaders
        if(extension === '.dds' || extension === '.tga') {
            if(extension === '.tga' && typeof TGALoader !== 'undefined') {
                var tgaParams = {
                    gd: gd,
                    onload: function tgaLoadedFn(data, width, height, format, status) {
                        tex.width = width;
                        tex.height = height;
                        tex.depth = 1;
                        tex.format = format;
                        tex.cubemap = false;
                        var result = tex.createGLTexture(data);
                        if(params.onload) {
                            params.onload(result ? tex : null, status);
                        }
                    },
                    onerror: function tgaFailedFn() {
                        tex.failed = true;
                        if(params.onload) {
                            params.onload(null);
                        }
                    },
                    data: undefined,
                    src: undefined
                };
                if(data) {
                    tgaParams.data = data;
                } else {
                    tgaParams.src = src;
                }
                TGALoader.create(tgaParams);
                return tex;
            } else if(extension === '.dds' && typeof DDSLoader !== 'undefined') {
                var ddsParams = {
                    gd: gd,
                    onload: function ddsLoadedFn(data, width, height, format, numLevels, cubemap, depth, status) {
                        tex.width = width;
                        tex.height = height;
                        tex.format = format;
                        tex.cubemap = cubemap;
                        tex.depth = depth;
                        tex.numDataLevels = numLevels;
                        var result = tex.createGLTexture(data);
                        if(params.onload) {
                            params.onload(result ? tex : null, status);
                        }
                    },
                    onerror: function ddsFailedFn() {
                        tex.failed = true;
                        if(params.onload) {
                            params.onload(null);
                        }
                    },
                    data: undefined,
                    src: undefined
                };
                if(data) {
                    ddsParams.data = data;
                } else {
                    ddsParams.src = src;
                }
                DDSLoader.create(ddsParams);
                return tex;
            } else {
                (TurbulenzEngine).callOnError('Missing image loader required for ' + src);
                tex = TZWebGLTexture.create(gd, {
                    name: (params.name || src),
                    width: 2,
                    height: 2,
                    depth: 1,
                    format: 'R8G8B8A8',
                    cubemap: false,
                    mipmaps: params.mipmaps,
                    dynamic: params.dynamic,
                    renderable: params.renderable,
                    data: [
                        255, 
                        20, 
                        147, 
                        255, 
                        255, 
                        0, 
                        0, 
                        255, 
                        255, 
                        255, 
                        255, 
                        255, 
                        255, 
                        20, 
                        147, 
                        255
                    ]
                });
                if(params.onload) {
                    if(TurbulenzEngine) {
                        TurbulenzEngine.setTimeout(function () {
                            params.onload(tex, 200);
                        }, 0);
                    } else {
                        window.setTimeout(function () {
                            params.onload(tex, 200);
                        }, 0);
                    }
                }
                return tex;
            }
        }
        var img = new Image();
        img.onload = function imageLoadedFn() {
            tex.width = img.width;
            tex.height = img.height;
            tex.depth = 1;
            tex.format = gd.PIXELFORMAT_R8G8B8A8;
            tex.cubemap = false;
            var result = tex.createGLTexture(img);
            if(params.onload) {
                params.onload(result ? tex : null, 200);
            }
        };
        img.onerror = function imageFailedFn() {
            tex.failed = true;
            if(params.onload) {
                params.onload(null);
            }
        };
        if(data) {
            if(extension === '.jpg' || extension === '.jpeg') {
                src = 'data:image/jpeg;base64,' + (TurbulenzEngine).base64Encode(data);
            } else if(extension === '.png') {
                src = 'data:image/png;base64,' + (TurbulenzEngine).base64Encode(data);
            }
        } else {
            img.crossOrigin = 'anonymous';
        }
        img.src = src;
    } else {
        // Invalid src values like "" fall through to here
        if("" === src && params.onload) {
            // Assume the caller intended to pass in a valid url.
            return null;
        }
        var format = params.format;
        if(typeof format === 'string') {
            format = gd['PIXELFORMAT_' + format];
        }
        tex.width = params.width;
        tex.height = params.height;
        tex.depth = params.depth;
        tex.format = format;
        tex.cubemap = params.cubemap;
        tex.name = params.name;
        var result = tex.createGLTexture(params.data);
        if(!result) {
            tex = null;
        }
        // If this is a depth-texture, note the attachment type
        // required, based on the format.
        if(params.renderable) {
            if(gd.PIXELFORMAT_D16 === format) {
                tex.glDepthAttachment = gd.gl.DEPTH_ATTACHMENT;
            } else if(gd.PIXELFORMAT_D24S8 === format) {
                tex.glDepthAttachment = gd.gl.DEPTH_STENCIL_ATTACHMENT;
            }
        }
        if(params.onload) {
            params.onload(tex, 200);
        }
    }
    return tex;
};
//
// WebGLVideo
//
function WebGLVideo() {
    return this;
}
WebGLVideo.prototype = {
    version: 1,
    play: // Public API
    function videoPlayFn(seek) {
        var video = this.video;
        if(!this.playing) {
            this.playing = true;
            this.paused = false;
        }
        if(seek === undefined) {
            seek = 0;
        }
        if(0.01 < Math.abs(video.currentTime - seek)) {
            try  {
                video.currentTime = seek;
            } catch (e) {
                // There does not seem to be any reliable way of seeking
                            }
        }
        video.play();
        return true;
    },
    stop: function videoStopFn() {
        var playing = this.playing;
        if(playing) {
            this.playing = false;
            this.paused = false;
            var video = this.video;
            video.pause();
            video.currentTime = 0;
        }
        return playing;
    },
    pause: function videoPauseFn() {
        if(this.playing) {
            if(!this.paused) {
                this.paused = true;
                this.video.pause();
            }
            return true;
        }
        return false;
    },
    resume: function videoResumeFn(seek) {
        if(this.paused) {
            this.paused = false;
            var video = this.video;
            if(seek !== undefined) {
                if(0.01 < Math.abs(video.currentTime - seek)) {
                    try  {
                        video.currentTime = seek;
                    } catch (e) {
                        // There does not seem to be any reliable way of seeking
                                            }
                }
            }
            video.play();
            return true;
        }
        return false;
    },
    rewind: function videoRewindFn() {
        if(this.playing) {
            this.video.currentTime = 0;
            return true;
        }
        return false;
    },
    destroy: function videoDestroyFn() {
        this.stop();
        if(this.video) {
            if(this.elementAdded) {
                this.elementAdded = false;
                TurbulenzEngine.canvas.parentElement.removeChild(this.video);
            }
            this.video = null;
        }
    }
};
WebGLVideo.create = function webGLSoundSourceCreateFn(params) {
    var v = new WebGLVideo();
    var onload = params.onload;
    var looping = params.looping;
    var src = params.src;
    var userAgent = navigator.userAgent.toLowerCase();
    var video = (document.createElement('video'));
    video.preload = 'auto';
    video.autobuffer = true;
    video.muted = true;
    if(looping) {
        if(video.loop !== undefined && !userAgent.match(/firefox/)) {
            video.loop = true;
        } else {
            video.onended = function () {
                video.src = src;
                video.play();
            };
        }
    } else {
        video.onended = function () {
            v.playing = false;
        };
    }
    v.video = video;
    v.src = src;
    v.playing = false;
    v.paused = false;
    // Safari does not play the video unless is on the page...
    if(userAgent.match(/safari/) && !userAgent.match(/chrome/)) {
        //video.setAttribute("style", "display: none;");
        video.setAttribute("style", "visibility: hidden;");
        TurbulenzEngine.canvas.parentElement.appendChild(video);
        v.elementAdded = true;
    }
    if(video.webkitDecodedFrameCount !== undefined) {
        var lastFrameCount = -1, tell = 0;
        Object.defineProperty(v, "tell", {
            get: function tellFn() {
                if(lastFrameCount !== this.video.webkitDecodedFrameCount) {
                    lastFrameCount = this.video.webkitDecodedFrameCount;
                    tell = this.video.currentTime;
                }
                return tell;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        Object.defineProperty(v, "tell", {
            get: function tellFn() {
                return this.video.currentTime;
            },
            enumerable: true,
            configurable: false
        });
    }
    Object.defineProperty(v, "looping", {
        get: function loopingFn() {
            return looping;
        },
        enumerable: true,
        configurable: false
    });
    var loadingVideoFailed = function loadingVideoFailedFn() {
        /* e */ if(onload) {
            onload(null);
            onload = null;
        }
        video.removeEventListener("error", loadingVideoFailed);
        video = null;
        v.video = null;
        v.playing = false;
    };
    video.addEventListener("error", loadingVideoFailed, false);
    var videoCanPlay = function videoCanPlayFn() {
        v.length = video.duration;
        v.width = video.videoWidth;
        v.height = video.videoHeight;
        if(onload) {
            onload(v, 200);
            onload = null;
        }
        video.removeEventListener("progress", checkProgress);
        video.removeEventListener("canplaythrough", videoCanPlay);
    };
    var checkProgress = function checkProgressFn() {
        if(0 < video.buffered.length && video.buffered.end(0) >= video.duration) {
            videoCanPlay();
        }
    };
    video.addEventListener("progress", checkProgress, false);
    video.addEventListener("canplaythrough", videoCanPlay, false);
    video.crossorigin = 'anonymous';
    video.src = src;
    return v;
};

function WebGLRenderBuffer() {
    return this;
}
WebGLRenderBuffer.prototype = {
    version: 1,
    destroy: function renderBufferDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var glBuffer = this.glBuffer;
            if(glBuffer) {
                var gl = gd.gl;
                if(gl) {
                    gl.deleteRenderbuffer(glBuffer);
                }
                delete this.glBuffer;
            }
            delete this.gd;
        }
    }
};
// Constructor function
WebGLRenderBuffer.create = function webGLRenderBufferFn(gd, params) {
    var renderBuffer = new WebGLRenderBuffer();
    var width = params.width;
    var height = params.height;
    var format = params.format;
    if(typeof format === 'string') {
        format = gd['PIXELFORMAT_' + format];
    }
    if(format !== gd.PIXELFORMAT_D24S8 && format !== gd.PIXELFORMAT_D16) {
        return null;
    }
    var gl = gd.gl;
    var glBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, glBuffer);
    var internalFormat;
    var attachment;
    if(gd.PIXELFORMAT_D16 === format) {
        internalFormat = gl.DEPTH_COMPONENT16;
        attachment = gl.DEPTH_ATTACHMENT;
    } else//if (gd.PIXELFORMAT_D24S8 === format)
     {
        internalFormat = gl.DEPTH_STENCIL;
        attachment = gl.DEPTH_STENCIL_ATTACHMENT;
    }
    // else if (gd.PIXELFORMAT_S8 === format)
    // {
    //     internalFormat = gl.STENCIL_INDEX8;
    // }
    gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
    renderBuffer.width = gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_WIDTH);
    renderBuffer.height = gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_HEIGHT);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    if(renderBuffer.width < width || renderBuffer.height < height) {
        gl.deleteRenderbuffer(glBuffer);
        return null;
    }
    renderBuffer.gd = gd;
    renderBuffer.format = format;
    renderBuffer.glDepthAttachment = attachment;
    renderBuffer.glBuffer = glBuffer;
    return renderBuffer;
};

function WebGLRenderTarget() {
    return this;
}
WebGLRenderTarget.prototype = {
    version: 1,
    oldViewportBox: // Shared because there can only be one active at a time
    [],
    oldScissorBox: [],
    copyBox: function copyBoxFn(dst, src) {
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
    },
    bind: function bindFn() {
        var gd = this.gd;
        var gl = gd.gl;
        gd.unbindTexture(this.colorTexture0.glTexture);
        if(this.depthTexture) {
            gd.unbindTexture(this.depthTexture.glTexture);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glObject);
        var state = gd.state;
        this.copyBox(this.oldViewportBox, state.viewportBox);
        this.copyBox(this.oldScissorBox, state.scissorBox);
        gd.setViewport(0, 0, this.width, this.height);
        gd.setScissor(0, 0, this.width, this.height);
        return true;
    },
    unbind: function unbindFn() {
        var gd = this.gd;
        var gl = gd.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gd.setViewport.apply(gd, this.oldViewportBox);
        gd.setScissor.apply(gd, this.oldScissorBox);
        this.colorTexture0.updateMipmaps(this.face);
        if(this.depthTexture) {
            this.depthTexture.updateMipmaps(this.face);
        }
    },
    destroy: function renderTargetDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var glObject = this.glObject;
            if(glObject) {
                var gl = gd.gl;
                if(gl) {
                    gl.deleteFramebuffer(glObject);
                }
                delete this.glObject;
            }
            delete this.colorTexture0;
            delete this.colorTexture1;
            delete this.colorTexture2;
            delete this.colorTexture3;
            delete this.depthBuffer;
            delete this.depthTexture;
            delete this.gd;
        }
    }
};
// Constructor function
WebGLRenderTarget.create = function webGLRenderTargetFn(gd, params) {
    var renderTarget = new WebGLRenderTarget();
    var colorTexture0 = params.colorTexture0;
    var colorTexture1 = (colorTexture0 ? (params.colorTexture1 || null) : null);
    var colorTexture2 = (colorTexture1 ? (params.colorTexture2 || null) : null);
    var colorTexture3 = (colorTexture2 ? (params.colorTexture3 || null) : null);
    var depthBuffer = params.depthBuffer || null;
    var depthTexture = params.depthTexture || null;
    var face = params.face;
    var maxSupported = gd.maxSupported("RENDERTARGET_COLOR_TEXTURES");
    if(colorTexture1 && maxSupported < 2) {
        return null;
    }
    if(colorTexture2 && maxSupported < 3) {
        return null;
    }
    if(colorTexture3 && maxSupported < 4) {
        return null;
    }
    var gl = gd.gl;
    var glObject = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, glObject);
    var width, height;
    if(colorTexture0) {
        width = colorTexture0.width;
        height = colorTexture0.height;
        var glTexture = colorTexture0.glTexture;
        if(glTexture === undefined) {
            (TurbulenzEngine).callOnError("Color texture is not a Texture");
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(glObject);
            return null;
        }
        var colorAttachment0 = gl.COLOR_ATTACHMENT0;
        if(colorTexture0.cubemap) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment0, (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
        } else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment0, gl.TEXTURE_2D, glTexture, 0);
        }
        if(colorTexture1) {
            glTexture = colorTexture1.glTexture;
            if(colorTexture1.cubemap) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 1), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
            } else {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 1), gl.TEXTURE_2D, glTexture, 0);
            }
            if(colorTexture2) {
                glTexture = colorTexture2.glTexture;
                if(colorTexture1.cubemap) {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 2), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
                } else {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 2), gl.TEXTURE_2D, glTexture, 0);
                }
                if(colorTexture3) {
                    glTexture = colorTexture3.glTexture;
                    if(colorTexture1.cubemap) {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 3), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
                    } else {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 3), gl.TEXTURE_2D, glTexture, 0);
                    }
                }
            }
        }
    } else if(depthTexture) {
        width = depthTexture.width;
        height = depthTexture.height;
    } else if(depthBuffer) {
        width = depthBuffer.width;
        height = depthBuffer.height;
    } else {
        (TurbulenzEngine).callOnError("No RenderBuffers or Textures specified for this RenderTarget");
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.deleteFramebuffer(glObject);
        return null;
    }
    if(depthTexture) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, depthTexture.glDepthAttachment, gl.TEXTURE_2D, depthTexture.glTexture, 0);
    } else if(depthBuffer) {
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBuffer.glDepthAttachment, gl.RENDERBUFFER, depthBuffer.glBuffer);
    }
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if(status !== gl.FRAMEBUFFER_COMPLETE) {
        gl.deleteFramebuffer(glObject);
        return null;
    }
    renderTarget.gd = gd;
    renderTarget.glObject = glObject;
    renderTarget.colorTexture0 = colorTexture0;
    renderTarget.colorTexture1 = colorTexture1;
    renderTarget.colorTexture2 = colorTexture2;
    renderTarget.colorTexture3 = colorTexture3;
    renderTarget.depthBuffer = depthBuffer;
    renderTarget.depthTexture = depthTexture;
    renderTarget.width = width;
    renderTarget.height = height;
    renderTarget.face = face;
    return renderTarget;
};


function WebGLIndexBuffer() {
    return this;
}
WebGLIndexBuffer.prototype = {
    version: 1,
    map: function indexBufferMapFn(offset, numIndices) {
        if(offset === undefined) {
            offset = 0;
        }
        if(numIndices === undefined) {
            numIndices = this.numIndices;
        }
        var gd = this.gd;
        var gl = gd.gl;
        var format = this.format;
        var data;
        if(format === gl.UNSIGNED_BYTE) {
            data = new Uint8Array(numIndices);
        } else if(format === gl.UNSIGNED_SHORT) {
            data = new Uint16Array(numIndices);
        } else//if (format === gl.UNSIGNED_INT)
         {
            data = new Uint32Array(numIndices);
        }
        var numValues = 0;
        var writer = function indexBufferWriterFn() {
            var numArguments = arguments.length;
            for(var n = 0; n < numArguments; n += 1) {
                data[numValues] = arguments[n];
                numValues += 1;
            }
        };
        writer.write = writer;
        writer.data = data;
        writer.offset = offset;
        writer.getNumWrittenIndices = function getNumWrittenIndicesFn() {
            return numValues;
        };
        writer.write = writer;
        return writer;
    },
    unmap: function indexBufferUnmapFn(writer) {
        if(writer) {
            var gd = this.gd;
            var gl = gd.gl;
            var data = writer.data;
            delete writer.data;
            var offset = writer.offset;
            delete writer.write;
            var numIndices = writer.getNumWrittenIndices();
            if(!numIndices) {
                return;
            }
            if(numIndices < data.length) {
                data = data.subarray(0, numIndices);
            }
            gd.setIndexBuffer(this);
            if(numIndices < this.numIndices) {
                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
            } else {
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, this.usage);
            }
        }
    },
    setData: function indexBufferSetDataFn(data, offset, numIndices) {
        if(offset === undefined) {
            offset = 0;
        }
        if(numIndices === undefined) {
            numIndices = this.numIndices;
        }
        var gd = this.gd;
        var gl = gd.gl;
        var bufferData;
        var format = this.format;
        if(format === gl.UNSIGNED_BYTE) {
            if(data instanceof Uint8Array) {
                bufferData = data;
            } else {
                bufferData = new Uint8Array(data);
            }
        } else if(format === gl.UNSIGNED_SHORT) {
            if(data instanceof Uint16Array) {
                bufferData = data;
            } else {
                bufferData = new Uint16Array(data);
            }
            offset *= 2;
        } else if(format === gl.UNSIGNED_INT) {
            if(data instanceof Uint32Array) {
                bufferData = data;
            } else {
                bufferData = new Uint32Array(data);
            }
            offset *= 4;
        }
        data = undefined;
        if(numIndices < bufferData.length) {
            bufferData = bufferData.subarray(0, numIndices);
        }
        gd.setIndexBuffer(this);
        if(numIndices < this.numIndices) {
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, bufferData);
        } else {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferData, this.usage);
        }
    },
    destroy: function indexBufferDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var glBuffer = this.glBuffer;
            if(glBuffer) {
                var gl = gd.gl;
                if(gl) {
                    gd.unsetIndexBuffer(this);
                    gl.deleteBuffer(glBuffer);
                }
                delete this.glBuffer;
            }
            delete this.gd;
        }
    }
};
// Constructor function
WebGLIndexBuffer.create = function webGLIndexBufferCreateFn(gd, params) {
    var gl = gd.gl;
    var ib = new WebGLIndexBuffer();
    ib.gd = gd;
    var numIndices = params.numIndices;
    ib.numIndices = numIndices;
    var format = params.format;
    if(typeof format === "string") {
        format = gd['INDEXFORMAT_' + format];
    }
    ib.format = format;
    var stride;
    if(format === gl.UNSIGNED_BYTE) {
        stride = 1;
    } else if(format === gl.UNSIGNED_SHORT) {
        stride = 2;
    } else//if (format === gl.UNSIGNED_INT)
     {
        stride = 4;
    }
    ib.stride = stride;
    /*jshint sub: true*/
    // Avoid dot notation lookup to prevent Google Closure complaining about transient being a keyword
    ib['transient'] = (params['transient'] || false);
    ib.dynamic = (params.dynamic || ib['transient']);
    ib.usage = (ib['transient'] ? gl.STREAM_DRAW : (ib.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW));
    /*jshint sub: false*/
    ib.glBuffer = gl.createBuffer();
    if(params.data) {
        ib.setData(params.data, 0, numIndices);
    } else {
        gd.setIndexBuffer(ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, (numIndices * stride), ib.usage);
    }
    return ib;
};

// TODO:
function WebGLSemantics() {
    return this;
}
WebGLSemantics.prototype = {
    version: 1
};
// Constructor function
WebGLSemantics.create = function webGLSemanticsCreateFn(gd, attributes) {
    var semantics = new WebGLSemantics();
    var numAttributes = attributes.length;
    semantics.length = numAttributes;
    for(var i = 0; i < numAttributes; i += 1) {
        var attribute = attributes[i];
        if(typeof attribute === "string") {
            semantics[i] = gd['SEMANTIC_' + attribute];
        } else {
            semantics[i] = attribute;
        }
    }
    return semantics;
};

function WebGLVertexBuffer() {
    return this;
}
WebGLVertexBuffer.prototype = {
    version: 1,
    map: function vertexBufferMapFn(offset, numVertices) {
        if(offset === undefined) {
            offset = 0;
        }
        if(numVertices === undefined) {
            numVertices = this.numVertices;
        }
        var gd = this.gd;
        var gl = gd.gl;
        var numValuesPerVertex = this.stride;
        var attributes = this.attributes;
        var numAttributes = attributes.length;
        var data, writer;
        var numValues = 0;
        if(this.hasSingleFormat) {
            var maxNumValues = (numVertices * numValuesPerVertex);
            var format = attributes[0].format;
            if(format === gl.BYTE) {
                data = new Int8Array(maxNumValues);
            } else if(format === gl.UNSIGNED_BYTE) {
                data = new Uint8Array(maxNumValues);
            } else if(format === gl.SHORT) {
                data = new Int16Array(maxNumValues);
            } else if(format === gl.UNSIGNED_SHORT) {
                data = new Uint16Array(maxNumValues);
            } else if(format === gl.INT) {
                data = new Int32Array(maxNumValues);
            } else if(format === gl.UNSIGNED_INT) {
                data = new Uint32Array(maxNumValues);
            } else if(format === gl.FLOAT) {
                data = new Float32Array(maxNumValues);
            }
            writer = function vertexBufferWriterSingleFn() {
                var numArguments = arguments.length;
                var currentArgument = 0;
                for(var a = 0; a < numAttributes; a += 1) {
                    var attribute = attributes[a];
                    var numComponents = attribute.numComponents;
                    var currentComponent = 0, j;
                    do {
                        if(currentArgument < numArguments) {
                            var value = arguments[currentArgument];
                            currentArgument += 1;
                            if(typeof value === "number") {
                                if(attribute.normalized) {
                                    value *= attribute.normalizationScale;
                                }
                                data[numValues] = value;
                                numValues += 1;
                                currentComponent += 1;
                            } else if(currentComponent === 0) {
                                var numSubArguments = value.length;
                                if(numSubArguments > numComponents) {
                                    numSubArguments = numComponents;
                                }
                                if(attribute.normalized) {
                                    var scale = attribute.normalizationScale;
                                    for(j = 0; j < numSubArguments; j += 1) {
                                        data[numValues] = (value[j] * scale);
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                } else {
                                    for(j = 0; j < numSubArguments; j += 1) {
                                        data[numValues] = value[j];
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                }
                                while(currentComponent < numComponents) {
                                    // No need to clear to zeros
                                    numValues += 1;
                                    currentComponent += 1;
                                }
                                break;
                            } else {
                                (TurbulenzEngine).callOnError('Missing values for attribute ' + a);
                                return null;
                            }
                        } else {
                            // No need to clear to zeros
                            numValues += 1;
                            currentComponent += 1;
                        }
                    }while(currentComponent < numComponents);
                }
            };
        } else {
            var destOffset = 0;
            var bufferSize = (numVertices * this.strideInBytes);
            data = new ArrayBuffer(bufferSize);
            if(typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype) {
                var dataView = new DataView(data);
                writer = function vertexBufferWriterDataViewFn() {
                    var numArguments = arguments.length;
                    var currentArgument = 0;
                    for(var a = 0; a < numAttributes; a += 1) {
                        var attribute = attributes[a];
                        var numComponents = attribute.numComponents;
                        var setter = attribute.typedSetter;
                        var componentStride = attribute.componentStride;
                        var currentComponent = 0, j;
                        do {
                            if(currentArgument < numArguments) {
                                var value = arguments[currentArgument];
                                currentArgument += 1;
                                if(typeof value === "number") {
                                    if(attribute.normalized) {
                                        value *= attribute.normalizationScale;
                                    }
                                    setter.call(dataView, destOffset, value, true);
                                    destOffset += componentStride;
                                    currentComponent += 1;
                                    numValues += 1;
                                } else if(currentComponent === 0) {
                                    var numSubArguments = value.length;
                                    if(numSubArguments > numComponents) {
                                        numSubArguments = numComponents;
                                    }
                                    if(attribute.normalized) {
                                        var scale = attribute.normalizationScale;
                                        for(j = 0; j < numSubArguments; j += 1) {
                                            setter.call(dataView, destOffset, (value[j] * scale), true);
                                            destOffset += componentStride;
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    } else {
                                        for(j = 0; j < numSubArguments; j += 1) {
                                            setter.call(dataView, destOffset, value[j], true);
                                            destOffset += componentStride;
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    while(currentComponent < numComponents) {
                                        // No need to clear to zeros
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                    break;
                                } else {
                                    (TurbulenzEngine).callOnError('Missing values for attribute ' + a);
                                    return null;
                                }
                            } else {
                                // No need to clear to zeros
                                numValues += 1;
                                currentComponent += 1;
                            }
                        }while(currentComponent < numComponents);
                    }
                };
            } else {
                writer = function vertexBufferWriterMultiFn() {
                    var numArguments = arguments.length;
                    var currentArgument = 0;
                    var dest;
                    for(var a = 0; a < numAttributes; a += 1) {
                        var attribute = attributes[a];
                        var numComponents = attribute.numComponents;
                        dest = new attribute.typedArray(data, destOffset, numComponents);
                        destOffset += attribute.stride;
                        var currentComponent = 0, j;
                        do {
                            if(currentArgument < numArguments) {
                                var value = arguments[currentArgument];
                                currentArgument += 1;
                                if(typeof value === "number") {
                                    if(attribute.normalized) {
                                        value *= attribute.normalizationScale;
                                    }
                                    dest[currentComponent] = value;
                                    currentComponent += 1;
                                    numValues += 1;
                                } else if(currentComponent === 0) {
                                    var numSubArguments = value.length;
                                    if(numSubArguments > numComponents) {
                                        numSubArguments = numComponents;
                                    }
                                    if(attribute.normalized) {
                                        var scale = attribute.normalizationScale;
                                        for(j = 0; j < numSubArguments; j += 1) {
                                            dest[currentComponent] = (value[j] * scale);
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    } else {
                                        for(j = 0; j < numSubArguments; j += 1) {
                                            dest[currentComponent] = value[j];
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    while(currentComponent < numComponents) {
                                        // No need to clear to zeros
                                        currentComponent += 1;
                                        numValues += 1;
                                    }
                                    break;
                                } else {
                                    (TurbulenzEngine).callOnError('Missing values for attribute ' + a);
                                    return null;
                                }
                            } else {
                                // No need to clear to zeros
                                currentComponent += 1;
                                numValues += 1;
                            }
                        }while(currentComponent < numComponents);
                    }
                };
            }
        }
        writer.data = data;
        writer.offset = offset;
        writer.getNumWrittenVertices = function getNumWrittenVerticesFn() {
            return Math.floor(numValues / numValuesPerVertex);
        };
        writer.getNumWrittenValues = function getNumWrittenValuesFn() {
            return numValues;
        };
        writer.write = writer;
        return writer;
    },
    unmap: function vertexBufferUnmapFn(writer) {
        if(writer) {
            var data = writer.data;
            delete writer.data;
            delete writer.write;
            var numVertices = writer.getNumWrittenVertices();
            if(!numVertices) {
                return;
            }
            var offset = writer.offset;
            var stride = this.strideInBytes;
            if(this.hasSingleFormat) {
                var numValues = writer.getNumWrittenValues();
                if(numValues < data.length) {
                    data = data.subarray(0, numValues);
                }
            } else {
                var numBytes = (numVertices * stride);
                if(numBytes < data.byteLength) {
                    data = data.slice(0, numBytes);
                }
            }
            var gd = this.gd;
            var gl = gd.gl;
            gd.bindVertexBuffer(this.glBuffer);
            if(numVertices < this.numVertices) {
                gl.bufferSubData(gl.ARRAY_BUFFER, (offset * stride), data);
            } else {
                gl.bufferData(gl.ARRAY_BUFFER, data, this.usage);
            }
        }
    },
    setData: function vertexBufferSetDataFn(data, offset, numVertices) {
        if(offset === undefined) {
            offset = 0;
        }
        if(numVertices === undefined) {
            numVertices = this.numVertices;
        }
        var gd = this.gd;
        var gl = gd.gl;
        var strideInBytes = this.strideInBytes;
        // Fast path for ArrayBuffer data
        if(data.constructor === ArrayBuffer) {
            gd.bindVertexBuffer(this.glBuffer);
            if(numVertices < this.numVertices) {
                gl.bufferSubData(gl.ARRAY_BUFFER, (offset * strideInBytes), data);
            } else {
                gl.bufferData(gl.ARRAY_BUFFER, data, this.usage);
            }
            return;
        }
        var attributes = this.attributes;
        var numAttributes = this.numAttributes;
        var attribute, format, bufferData, TypedArrayConstructor;
        if(this.hasSingleFormat) {
            attribute = attributes[0];
            format = attribute.format;
            if(format === gl.BYTE) {
                if(!(data instanceof Int8Array)) {
                    TypedArrayConstructor = Int8Array;
                }
            } else if(format === gl.UNSIGNED_BYTE) {
                if(!(data instanceof Uint8Array)) {
                    TypedArrayConstructor = Uint8Array;
                }
            } else if(format === gl.SHORT) {
                if(!(data instanceof Int16Array)) {
                    TypedArrayConstructor = Int16Array;
                }
            } else if(format === gl.UNSIGNED_SHORT) {
                if(!(data instanceof Uint16Array)) {
                    TypedArrayConstructor = Uint16Array;
                }
            } else if(format === gl.INT) {
                if(!(data instanceof Int32Array)) {
                    TypedArrayConstructor = Int32Array;
                }
            } else if(format === gl.UNSIGNED_INT) {
                if(!(data instanceof Uint32Array)) {
                    TypedArrayConstructor = Uint32Array;
                }
            } else if(format === gl.FLOAT) {
                if(!(data instanceof Float32Array)) {
                    TypedArrayConstructor = Float32Array;
                }
            }
            var numValuesPerVertex = this.stride;
            var numValues = (numVertices * numValuesPerVertex);
            if(TypedArrayConstructor) {
                // Data has to be put into a Typed Array and
                // potentially normalized.
                if(attribute.normalized) {
                    data = this.scaleValues(data, attribute.normalizationScale, numValues);
                }
                bufferData = new TypedArrayConstructor(data);
                if(numValues < bufferData.length) {
                    bufferData = bufferData.subarray(0, numValues);
                }
            } else {
                bufferData = data;
            }
            if(numValues < data.length) {
                bufferData = bufferData.subarray(0, numValues);
            }
        } else {
            var bufferSize = (numVertices * strideInBytes);
            bufferData = new ArrayBuffer(bufferSize);
            var srcOffset = 0, destOffset = 0, v, c, a, numComponents, componentStride, scale;
            if(typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype) {
                var dataView = new DataView(bufferData);
                for(v = 0; v < numVertices; v += 1) {
                    for(a = 0; a < numAttributes; a += 1) {
                        attribute = attributes[a];
                        numComponents = attribute.numComponents;
                        componentStride = attribute.componentStride;
                        var setter = attribute.typedSetter;
                        if(attribute.normalized) {
                            scale = attribute.normalizationScale;
                            for(c = 0; c < numComponents; c += 1) {
                                setter.call(dataView, destOffset, (data[srcOffset] * scale), true);
                                destOffset += componentStride;
                                srcOffset += 1;
                            }
                        } else {
                            for(c = 0; c < numComponents; c += 1) {
                                setter.call(dataView, destOffset, data[srcOffset], true);
                                destOffset += componentStride;
                                srcOffset += 1;
                            }
                        }
                    }
                }
            } else {
                for(v = 0; v < numVertices; v += 1) {
                    for(a = 0; a < numAttributes; a += 1) {
                        attribute = attributes[a];
                        numComponents = attribute.numComponents;
                        var dest = new attribute.typedArray(bufferData, destOffset, numComponents);
                        destOffset += attribute.stride;
                        if(attribute.normalized) {
                            scale = attribute.normalizationScale;
                            for(c = 0; c < numComponents; c += 1) {
                                dest[c] = (data[srcOffset] * scale);
                                srcOffset += 1;
                            }
                        } else {
                            for(c = 0; c < numComponents; c += 1) {
                                dest[c] = data[srcOffset];
                                srcOffset += 1;
                            }
                        }
                    }
                }
            }
        }
        data = undefined;
        gd.bindVertexBuffer(this.glBuffer);
        if(numVertices < this.numVertices) {
            gl.bufferSubData(gl.ARRAY_BUFFER, (offset * strideInBytes), bufferData);
        } else {
            gl.bufferData(gl.ARRAY_BUFFER, bufferData, this.usage);
        }
    },
    scaleValues: // Internal
    function scaleValuesFn(values, scale, numValues) {
        if(numValues === undefined) {
            numValues = values.length;
        }
        var scaledValues = new values.constructor(numValues);
        for(var n = 0; n < numValues; n += 1) {
            scaledValues[n] = (values[n] * scale);
        }
        return scaledValues;
    },
    bindAttributes: function bindAttributesFn(numAttributes, attributes, offset) {
        var gd = this.gd;
        var gl = gd.gl;
        var vertexAttributes = this.attributes;
        var stride = this.strideInBytes;
        var attributeMask = 0;
        /*jshint bitwise: false*/
        for(var n = 0; n < numAttributes; n += 1) {
            var vertexAttribute = vertexAttributes[n];
            var attribute = attributes[n];
            attributeMask |= (1 << attribute);
            gl.vertexAttribPointer(attribute, vertexAttribute.numComponents, vertexAttribute.format, vertexAttribute.normalized, stride, offset);
            offset += vertexAttribute.stride;
        }
        /*jshint bitwise: true*/
        return attributeMask;
    },
    setAttributes: function setAttributesFn(attributes) {
        var gd = this.gd;
        var numAttributes = attributes.length;
        this.numAttributes = numAttributes;
        this.attributes = [];
        var stride = 0, numValuesPerVertex = 0, hasSingleFormat = true;
        for(var i = 0; i < numAttributes; i += 1) {
            var format = attributes[i];
            if(typeof format === "string") {
                format = gd['VERTEXFORMAT_' + format];
            }
            this.attributes[i] = format;
            stride += format.stride;
            numValuesPerVertex += format.numComponents;
            if(hasSingleFormat && i) {
                if(format.format !== this.attributes[i - 1].format) {
                    hasSingleFormat = false;
                }
            }
        }
        this.strideInBytes = stride;
        this.stride = numValuesPerVertex;
        this.hasSingleFormat = hasSingleFormat;
        return stride;
    },
    resize: function resizeFn(size) {
        if(size !== (this.strideInBytes * this.numVertices)) {
            var gd = this.gd;
            var gl = gd.gl;
            gd.bindVertexBuffer(this.glBuffer);
            var bufferType = gl.ARRAY_BUFFER;
            gl.bufferData(bufferType, size, this.usage);
            var bufferSize = gl.getBufferParameter(bufferType, gl.BUFFER_SIZE);
            this.numVertices = Math.floor(bufferSize / this.strideInBytes);
        }
    },
    destroy: function vertexBufferDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var glBuffer = this.glBuffer;
            if(glBuffer) {
                var gl = gd.gl;
                if(gl) {
                    gd.unbindVertexBuffer(glBuffer);
                    gl.deleteBuffer(glBuffer);
                }
                delete this.glBuffer;
            }
            delete this.gd;
        }
    }
};
// Constructor function
WebGLVertexBuffer.create = function webGLVertexBufferCreateFn(gd, params) {
    var gl = gd.gl;
    var vb = new WebGLVertexBuffer();
    vb.gd = gd;
    var numVertices = params.numVertices;
    vb.numVertices = numVertices;
    var strideInBytes = vb.setAttributes(params.attributes);
    /*jshint sub: true*/
    // Avoid dot notation lookup to prevent Google Closure complaining
    // about transient being a keyword
    vb['transient'] = (params['transient'] || false);
    vb.dynamic = (params.dynamic || vb['transient']);
    vb.usage = (vb['transient'] ? gl.STREAM_DRAW : (vb.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW));
    /*jshint sub: false*/
    vb.glBuffer = gl.createBuffer();
    var bufferSize = (numVertices * strideInBytes);
    if(params.data) {
        vb.setData(params.data, 0, numVertices);
    } else {
        gd.bindVertexBuffer(vb.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, bufferSize, vb.usage);
    }
    return vb;
};





function WebGLPass() {
    return this;
}
WebGLPass.prototype = {
    version: 1,
    updateParametersData: function updateParametersDataFn(gd) {
        var gl = gd.gl;
        this.dirty = false;
        // Set parameters
        var parameters = this.parameters;
        for(var p in parameters) {
            if(parameters.hasOwnProperty(p)) {
                var parameter = parameters[p];
                if(parameter.dirty) {
                    parameter.dirty = 0;
                    var paramInfo = parameter.info;
                    var location = parameter.location;
                    if(paramInfo && null !== location) {
                        var parameterValues = paramInfo.values;
                        var numColumns;
                        if(paramInfo.type === 'float') {
                            numColumns = paramInfo.columns;
                            if(4 === numColumns) {
                                gl.uniform4fv(location, parameterValues);
                            } else if(3 === numColumns) {
                                gl.uniform3fv(location, parameterValues);
                            } else if(2 === numColumns) {
                                gl.uniform2fv(location, parameterValues);
                            } else if(1 === paramInfo.rows) {
                                gl.uniform1f(location, parameterValues[0]);
                            } else//if (1 === numColumns)
                             {
                                gl.uniform1fv(location, parameterValues);
                            }
                        } else if(paramInfo.sampler !== undefined) {
                            gd.setTexture(parameter.textureUnit, parameterValues, paramInfo.sampler);
                        } else {
                            numColumns = paramInfo.columns;
                            if(4 === numColumns) {
                                gl.uniform4iv(location, parameterValues);
                            } else if(3 === numColumns) {
                                gl.uniform3iv(location, parameterValues);
                            } else if(2 === numColumns) {
                                gl.uniform2iv(location, parameterValues);
                            } else if(1 === paramInfo.rows) {
                                gl.uniform1i(location, parameterValues[0]);
                            } else//if (1 === numColumns)
                             {
                                gl.uniform1iv(location, parameterValues);
                            }
                        }
                    }
                }
            }
        }
    },
    initializeParameters: function passInitializeParametersFn(gd) {
        var gl = gd.gl;
        var glProgram = this.glProgram;
        gd.setProgram(glProgram);
        var passParameters = this.parameters;
        for(var p in passParameters) {
            if(passParameters.hasOwnProperty(p)) {
                var parameter = passParameters[p];
                var paramInfo = parameter.info;
                if(paramInfo) {
                    var location = gl.getUniformLocation(glProgram, p);
                    if(null !== location) {
                        parameter.location = location;
                        if(paramInfo.sampler) {
                            gl.uniform1i(location, parameter.textureUnit);
                        } else {
                            var parameterValues = paramInfo.values;
                            var numColumns;
                            if(paramInfo.type === 'float') {
                                numColumns = paramInfo.columns;
                                if(4 === numColumns) {
                                    gl.uniform4fv(location, parameterValues);
                                } else if(3 === numColumns) {
                                    gl.uniform3fv(location, parameterValues);
                                } else if(2 === numColumns) {
                                    gl.uniform2fv(location, parameterValues);
                                } else if(1 === paramInfo.rows) {
                                    gl.uniform1f(location, parameterValues[0]);
                                } else//if (1 === numColumns)
                                 {
                                    gl.uniform1fv(location, parameterValues);
                                }
                            } else {
                                numColumns = paramInfo.columns;
                                if(4 === numColumns) {
                                    gl.uniform4iv(location, parameterValues);
                                } else if(3 === numColumns) {
                                    gl.uniform3iv(location, parameterValues);
                                } else if(2 === numColumns) {
                                    gl.uniform2iv(location, parameterValues);
                                } else if(1 === paramInfo.rows) {
                                    gl.uniform1i(location, parameterValues[0]);
                                } else//if (1 === numColumns)
                                 {
                                    gl.uniform1iv(location, parameterValues);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    destroy: function passDestroyFn() {
        delete this.glProgram;
        delete this.semanticsMask;
        delete this.parameters;
        var states = this.states;
        if(states) {
            states.length = 0;
            delete this.states;
        }
    }
};
// Constructor function
WebGLPass.create = function webGLPassCreateFn(gd, shader, params) {
    var gl = gd.gl;
    var pass = new WebGLPass();
    pass.name = (params.name || null);
    var programs = shader.programs;
    var parameters = shader.parameters;
    var parameterNames = params.parameters;
    var programNames = params.programs;
    var semanticNames = params.semantics;
    var states = params.states;
    var compoundProgramName = programNames.join(':');
    var linkedProgram = shader.linkedPrograms[compoundProgramName];
    var glProgram, semanticsMask, p, s;
    if(linkedProgram === undefined) {
        // Create GL program
        glProgram = gl.createProgram();
        var numPrograms = programNames.length;
        for(p = 0; p < numPrograms; p += 1) {
            var glShader = programs[programNames[p]];
            if(glShader) {
                gl.attachShader(glProgram, glShader);
            }
        }
        /*jshint bitwise: false*/
        var numSemantics = semanticNames.length;
        semanticsMask = 0;
        for(s = 0; s < numSemantics; s += 1) {
            var semanticName = semanticNames[s];
            var attribute = gd['SEMANTIC_' + semanticName];
            if(attribute !== undefined) {
                semanticsMask |= (1 << attribute);
                gl.bindAttribLocation(glProgram, attribute, ("ATTR" + attribute));
            }
        }
        /*jshint bitwise: true*/
        gl.linkProgram(glProgram);
        shader.linkedPrograms[compoundProgramName] = {
            glProgram: glProgram,
            semanticsMask: semanticsMask
        };
    } else {
        //console.log('Reused program ' + compoundProgramName);
        glProgram = linkedProgram.glProgram;
        semanticsMask = linkedProgram.semanticsMask;
    }
    pass.glProgram = glProgram;
    pass.semanticsMask = semanticsMask;
    // Set parameters
    var numTextureUnits = 0;
    var passParameters = {
    };
    pass.parameters = passParameters;
    var numParameters = parameterNames ? parameterNames.length : 0;
    for(p = 0; p < numParameters; p += 1) {
        var parameterName = parameterNames[p];
        var parameter = {
        };
        passParameters[parameterName] = parameter;
        var paramInfo = parameters[parameterName];
        parameter.info = paramInfo;
        if(paramInfo) {
            parameter.location = null;
            if(paramInfo.sampler) {
                parameter.textureUnit = numTextureUnits;
                numTextureUnits += 1;
            } else {
                parameter.textureUnit = undefined;
            }
        }
    }
    pass.numTextureUnits = numTextureUnits;
    pass.numParameters = numParameters;
    function equalRenderStates(defaultValues, values) {
        var numDefaultValues = defaultValues.length;
        var n;
        for(n = 0; n < numDefaultValues; n += 1) {
            if(defaultValues[n] !== values[n]) {
                return false;
            }
        }
        return true;
    }
    var stateHandlers = gd.stateHandlers;
    var passStates = [];
    var passStatesSet = {
    };
    pass.states = passStates;
    pass.statesSet = passStatesSet;
    for(s in states) {
        if(states.hasOwnProperty(s)) {
            var stateHandler = stateHandlers[s];
            if(stateHandler) {
                var values = stateHandler.parse(states[s]);
                if(values !== null) {
                    if(equalRenderStates(stateHandler.defaultValues, values)) {
                        continue;
                    }
                    passStates.push({
                        name: s,
                        set: stateHandler.set,
                        reset: stateHandler.reset,
                        values: values
                    });
                    passStatesSet[s] = true;
                } else {
                    (TurbulenzEngine).callOnError('Unknown value for state ' + s + ': ' + states[s]);
                }
            }
        }
    }
    return pass;
};
//
// Technique
//
function Technique() {
    return this;
}
Technique.prototype = {
    version: 1,
    getPass: function getPassFn(id) {
        var passes = this.passes;
        var numPasses = passes.length;
        if(typeof id === "string") {
            for(var n = 0; n < numPasses; n += 1) {
                var pass = passes[n];
                if(pass.name === id) {
                    return pass;
                }
            }
        } else {
            /*jshint bitwise: false*/
            id = (id | 0);
            /*jshint bitwise: true*/
            if(id < numPasses) {
                return passes[id];
            }
        }
        return null;
    },
    activate: function activateFn(gd) {
        this.device = gd;
        if(!this.initialized) {
            this.shader.initialize(gd);
            this.initialize(gd);
        }
        if(debug) {
            gd.metrics.techniqueChanges += 1;
        }
    },
    deactivate: function deactivateFn() {
        this.device = null;
    },
    checkProperties: function checkPropertiesFn(gd) {
        // Check for parameters set directly into the technique...
                var fakeTechniqueParameters = {
        }, p;
        for(p in this) {
            if(p !== 'version' && p !== 'name' && p !== 'passes' && p !== 'numPasses' && p !== 'device' && p !== 'numParameters') {
                fakeTechniqueParameters[p] = this[p];
            }
        }
        if(fakeTechniqueParameters) {
            var passes = this.passes;
            if(passes.length === 1) {
                gd.setParametersImmediate(gd, passes, fakeTechniqueParameters);
            } else {
                gd.setParametersDeferred(gd, passes, fakeTechniqueParameters);
            }
            for(p in fakeTechniqueParameters) {
                if(fakeTechniqueParameters.hasOwnProperty(p)) {
                    delete this[p];
                }
            }
        }
    },
    initialize: function techniqueInitializeFn(gd) {
        if(this.initialized) {
            return;
        }
        var passes = this.passes;
        if(passes) {
            var numPasses = passes.length;
            var n;
            for(n = 0; n < numPasses; n += 1) {
                passes[n].initializeParameters(gd);
            }
        }
        if(Object.defineProperty) {
            this.initializeParametersSetters(gd);
        }
        this.initialized = true;
    },
    initializeParametersSetters: function initializeParametersSettersFn(gd) {
        var gl = gd.gl;
        function make_sampler_setter(pass, parameter) {
            return function (parameterValues) {
                if(this.device) {
                    gd.setTexture(parameter.textureUnit, parameterValues, parameter.info.sampler);
                } else {
                    pass.dirty = true;
                    parameter.dirty = 1;
                    parameter.info.values = parameterValues;
                }
            };
        }
        function make_float_uniform_setter(pass, parameter) {
            var paramInfo = parameter.info;
            var location = parameter.location;
            function setDeferredParameter(parameterValues) {
                if(typeof parameterValues !== 'number') {
                    var values = paramInfo.values;
                    var numValues = Math.min(paramInfo.numValues, parameterValues.length);
                    for(var v = 0; v < numValues; v += 1) {
                        values[v] = parameterValues[v];
                    }
                    parameter.dirty = Math.max(numValues, (parameter.dirty || 0));
                } else {
                    paramInfo.values[0] = parameterValues;
                    parameter.dirty = (parameter.dirty || 1);
                }
                pass.dirty = true;
            }
            switch(paramInfo.columns) {
                case 1:
                    if(1 === paramInfo.numValues) {
                        return function (parameterValues) {
                            if(this.device) {
                                gl.uniform1f(location, parameterValues);
                            } else {
                                setDeferredParameter(parameterValues);
                            }
                        };
                    }
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform1fv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 2:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform2fv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 3:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform3fv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 4:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform4fv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                default:
                    return null;
            }
        }
        function make_int_uniform_setter(pass, parameter) {
            var paramInfo = parameter.info;
            var location = parameter.location;
            function setDeferredParameter(parameterValues) {
                if(typeof parameterValues !== 'number') {
                    var values = paramInfo.values;
                    var numValues = Math.min(paramInfo.numValues, parameterValues.length);
                    for(var v = 0; v < numValues; v += 1) {
                        values[v] = parameterValues[v];
                    }
                    parameter.dirty = Math.max(numValues, (parameter.dirty || 0));
                } else {
                    paramInfo.values[0] = parameterValues;
                    parameter.dirty = (parameter.dirty || 1);
                }
                pass.dirty = true;
            }
            switch(paramInfo.columns) {
                case 1:
                    if(1 === paramInfo.numValues) {
                        return function (parameterValues) {
                            if(this.device) {
                                gl.uniform1i(location, parameterValues);
                            } else {
                                setDeferredParameter(parameterValues);
                            }
                        };
                    }
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform1iv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 2:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform2iv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 3:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform3iv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                case 4:
                    return function (parameterValues) {
                        if(this.device) {
                            gl.uniform4iv(location, parameterValues);
                        } else {
                            setDeferredParameter(parameterValues);
                        }
                    };
                default:
                    return null;
            }
        }
        var passes = this.passes;
        var numPasses = passes.length;
        var pass, parameters, p, parameter, paramInfo, setter;
        if(numPasses === 1) {
            pass = passes[0];
            parameters = pass.parameters;
            for(p in parameters) {
                if(parameters.hasOwnProperty(p)) {
                    parameter = parameters[p];
                    paramInfo = parameter.info;
                    if(paramInfo) {
                        if(undefined !== parameter.location) {
                            if(paramInfo.sampler) {
                                setter = make_sampler_setter(pass, parameter);
                            } else {
                                if(paramInfo.type === 'float') {
                                    setter = make_float_uniform_setter(pass, parameter);
                                } else {
                                    setter = make_int_uniform_setter(pass, parameter);
                                }
                            }
                            Object.defineProperty(this, p, {
                                set: setter,
                                enumerable: false,
                                configurable: false
                            });
                        }
                    }
                }
            }
            this.checkProperties = null;
        } else {
            Object.defineProperty(this, 'device', {
                writable: true,
                enumerable: false,
                configurable: false
            });
            Object.defineProperty(this, 'version', {
                writable: false,
                enumerable: false,
                configurable: false
            });
            Object.defineProperty(this, 'name', {
                writable: false,
                enumerable: false,
                configurable: false
            });
            Object.defineProperty(this, 'passes', {
                writable: false,
                enumerable: false,
                configurable: false
            });
            Object.defineProperty(this, 'numParameters', {
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    },
    destroy: function techniqueDestroyFn() {
        var passes = this.passes;
        if(passes) {
            var numPasses = passes.length;
            var n;
            for(n = 0; n < numPasses; n += 1) {
                passes[n].destroy();
            }
            passes.length = 0;
            delete this.passes;
        }
        delete this.device;
    }
};
// Constructor function
Technique.create = function webGLTechniqueCreateFn(gd, shader, name, passes) {
    var technique = new Technique();
    technique.initialized = false;
    technique.shader = shader;
    technique.name = name;
    var numPasses = passes.length, n;
    var numParameters = 0;
    technique.passes = [];
    technique.numPasses = numPasses;
    for(n = 0; n < numPasses; n += 1) {
        var passParams = passes[n];
        if(passParams.parameters) {
            numParameters += passParams.parameters.length;
        }
        technique.passes[n] = WebGLPass.create(gd, shader, passParams);
    }
    technique.numParameters = numParameters;
    technique.device = null;
    return technique;
};
//
// Shader
//
function Shader() {
    return this;
}
Shader.prototype = {
    version: 1,
    getTechnique: function getTechniqueFn(name) {
        if(typeof name === "string") {
            return this.techniques[name];
        } else {
            var techniques = this.techniques;
            for(var t in techniques) {
                if(techniques.hasOwnProperty(t)) {
                    if(name === 0) {
                        return techniques[t];
                    } else {
                        name -= 1;
                    }
                }
            }
            return null;
        }
    },
    getParameter: function getParameterFn(name) {
        if(typeof name === "string") {
            return this.parameters[name];
        } else {
            /*jshint bitwise: false*/
            name = (name | 0);
            /*jshint bitwise: true*/
            var parameters = this.parameters;
            for(var p in parameters) {
                if(parameters.hasOwnProperty(p)) {
                    if(name === 0) {
                        return parameters[p];
                    } else {
                        name -= 1;
                    }
                }
            }
            return null;
        }
    },
    initialize: function shaderInitializeFn(gd) {
        if(this.initialized) {
            return;
        }
        var gl = gd.gl;
        var p;
        // Check copmpiled programs as late as possible
        var shaderPrograms = this.programs;
        for(p in shaderPrograms) {
            if(shaderPrograms.hasOwnProperty(p)) {
                var compiledProgram = shaderPrograms[p];
                var compiled = gl.getShaderParameter(compiledProgram, gl.COMPILE_STATUS);
                if(!compiled) {
                    var compilerInfo = gl.getShaderInfoLog(compiledProgram);
                    (TurbulenzEngine).callOnError('Program "' + p + '" failed to compile: ' + compilerInfo);
                }
            }
        }
        // Check linked programs as late as possible
        var linkedPrograms = this.linkedPrograms;
        for(p in linkedPrograms) {
            if(linkedPrograms.hasOwnProperty(p)) {
                var linkedProgram = linkedPrograms[p];
                var glProgram = linkedProgram.glProgram;
                if(glProgram) {
                    var linked = gl.getProgramParameter(glProgram, gl.LINK_STATUS);
                    if(!linked) {
                        var linkerInfo = gl.getProgramInfoLog(glProgram);
                        (TurbulenzEngine).callOnError('Program "' + p + '" failed to link: ' + linkerInfo);
                    }
                }
            }
        }
        this.initialized = true;
    },
    destroy: function shaderDestroyFn() {
        var gd = this.gd;
        if(gd) {
            var gl = gd.gl;
            var p;
            var techniques = this.techniques;
            if(techniques) {
                for(p in techniques) {
                    if(techniques.hasOwnProperty(p)) {
                        techniques[p].destroy();
                    }
                }
                delete this.techniques;
            }
            var linkedPrograms = this.linkedPrograms;
            if(linkedPrograms) {
                if(gl) {
                    for(p in linkedPrograms) {
                        if(linkedPrograms.hasOwnProperty(p)) {
                            var linkedProgram = linkedPrograms[p];
                            var glProgram = linkedProgram.glProgram;
                            if(glProgram) {
                                gl.deleteProgram(glProgram);
                                delete linkedProgram.glProgram;
                            }
                        }
                    }
                }
                delete this.linkedPrograms;
            }
            var programs = this.programs;
            if(programs) {
                if(gl) {
                    for(p in programs) {
                        if(programs.hasOwnProperty(p)) {
                            gl.deleteShader(programs[p]);
                        }
                    }
                }
                delete this.programs;
            }
            delete this.samplers;
            delete this.parameters;
            delete this.gd;
        }
    }
};
// Constructor function
Shader.create = function webGLShaderCreateFn(gd, params) {
    var gl = gd.gl;
    var shader = new Shader();
    shader.initialized = false;
    var techniques = params.techniques;
    var parameters = params.parameters;
    var programs = params.programs;
    var samplers = params.samplers;
    var p;
    shader.gd = gd;
    shader.name = params.name;
    // Compile programs as early as possible
    var shaderPrograms = {
    };
    shader.programs = shaderPrograms;
    for(p in programs) {
        if(programs.hasOwnProperty(p)) {
            var program = programs[p];
            var glShaderType;
            if(program.type === 'fragment') {
                glShaderType = gl.FRAGMENT_SHADER;
            } else if(program.type === 'vertex') {
                glShaderType = gl.VERTEX_SHADER;
            }
            var glShader = gl.createShader(glShaderType);
            gl.shaderSource(glShader, program.code);
            gl.compileShader(glShader);
            shaderPrograms[p] = glShader;
        }
    }
    var linkedPrograms = {
    };
    shader.linkedPrograms = linkedPrograms;
    // Samplers
    var defaultSampler = gd.DEFAULT_SAMPLER;
    var maxAnisotropy = gd.maxAnisotropy;
    shader.samplers = {
    };
    var sampler;
    for(p in samplers) {
        if(samplers.hasOwnProperty(p)) {
            sampler = samplers[p];
            var samplerMaxAnisotropy = sampler.MaxAnisotropy;
            if(samplerMaxAnisotropy) {
                if(samplerMaxAnisotropy > maxAnisotropy) {
                    samplerMaxAnisotropy = maxAnisotropy;
                }
            } else {
                samplerMaxAnisotropy = defaultSampler.maxAnisotropy;
            }
            sampler = {
                minFilter: (sampler.MinFilter || defaultSampler.minFilter),
                magFilter: (sampler.MagFilter || defaultSampler.magFilter),
                wrapS: (sampler.WrapS || defaultSampler.wrapS),
                wrapT: (sampler.WrapT || defaultSampler.wrapT),
                wrapR: (sampler.WrapR || defaultSampler.wrapR),
                maxAnisotropy: samplerMaxAnisotropy
            };
            if(sampler.wrapS === 0x2900) {
                sampler.wrapS = gl.CLAMP_TO_EDGE;
            }
            if(sampler.wrapT === 0x2900) {
                sampler.wrapT = gl.CLAMP_TO_EDGE;
            }
            if(sampler.wrapR === 0x2900) {
                sampler.wrapR = gl.CLAMP_TO_EDGE;
            }
            shader.samplers[p] = gd.createSampler(sampler);
        }
    }
    // Parameters
    var numParameters = 0;
    shader.parameters = {
    };
    for(p in parameters) {
        if(parameters.hasOwnProperty(p)) {
            var parameter = parameters[p];
            if(!parameter.columns) {
                parameter.columns = 1;
            }
            if(!parameter.rows) {
                parameter.rows = 1;
            }
            parameter.numValues = (parameter.columns * parameter.rows);
            var parameterType = parameter.type;
            if(parameterType === "float" || parameterType === "int" || parameterType === "bool") {
                var parameterValues = parameter.values;
                if(parameterValues) {
                    if(parameterType === "float") {
                        parameter.values = new Float32Array(parameterValues);
                    } else {
                        parameter.values = new Int32Array(parameterValues);
                    }
                } else {
                    if(parameterType === "float") {
                        parameter.values = new Float32Array(parameter.numValues);
                    } else {
                        parameter.values = new Int32Array(parameter.numValues);
                    }
                }
                parameter.sampler = undefined;
            } else// Sampler
             {
                sampler = shader.samplers[p];
                if(!sampler) {
                    sampler = defaultSampler;
                    shader.samplers[p] = defaultSampler;
                }
                parameter.sampler = sampler;
                parameter.values = null;
            }
            parameter.name = p;
            shader.parameters[p] = parameter;
            numParameters += 1;
        }
    }
    shader.numParameters = numParameters;
    // Techniques and passes
    var shaderTechniques = {
    };
    var numTechniques = 0;
    shader.techniques = shaderTechniques;
    for(p in techniques) {
        if(techniques.hasOwnProperty(p)) {
            shaderTechniques[p] = Technique.create(gd, shader, p, techniques[p]);
            numTechniques += 1;
        }
    }
    shader.numTechniques = numTechniques;
    return shader;
};

function TechniqueParameters() {
    return this;
}
// Constructor function
TechniqueParameters.create = function TechniqueParametersFn(params) {
    var techniqueParameters = new TechniqueParameters();
    if(params) {
        for(var p in params) {
            if(params.hasOwnProperty(p)) {
                techniqueParameters[p] = params[p];
            }
        }
    }
    return techniqueParameters;
};
//
// TechniqueParameterBuffer
//
var techniqueParameterBufferCreate = function techniqueParameterBufferCreateFn(params) {
    if(Float32Array.prototype.map === undefined) {
        Float32Array.prototype.map = function techniqueParameterBufferMap(offset, numFloats) {
            if(offset === undefined) {
                offset = 0;
            }
            var buffer = this;
            if(numFloats === undefined) {
                numFloats = this.length;
            }
            function techniqueParameterBufferWriter() {
                var numArguments = arguments.length;
                for(var a = 0; a < numArguments; a += 1) {
                    var value = arguments[a];
                    if(typeof value === 'number') {
                        buffer[offset] = value;
                        offset += 1;
                    } else {
                        buffer.setData(value, offset, value.length);
                        offset += value.length;
                    }
                }
            }
            return techniqueParameterBufferWriter;
        };
        Float32Array.prototype.unmap = function techniqueParameterBufferUnmap() {
            /* writer */         };
        Float32Array.prototype.setData = function techniqueParameterBufferSetData(data, offset, numValues) {
            if(offset === undefined) {
                offset = 0;
            }
            if(numValues === undefined) {
                numValues = this.length;
            }
            for(var n = 0; n < numValues; n += 1 , offset += 1) {
                this[offset] = data[n];
            }
        };
    }
    return new Float32Array(params.numFloats);
};

function DrawParameters() {
    // Streams, TechniqueParameters and Instances are stored as indexed properties
    this.endStreams = 0;
    this.endTechniqueParameters = (16 * 3);
    this.endInstances = ((16 * 3) + 8);
    this.firstIndex = 0;
    this.count = 0;
    this.sortKey = 0;
    this.technique = null;
    this.indexBuffer = null;
    this.primitive = -1;
    this.userData = null;
    // Initialize for 1 Stream, 2 TechniqueParameters and 8 Instances
    this[0] = undefined;
    this[1] = undefined;
    this[2] = undefined;
    this[(16 * 3) + 0] = undefined;
    this[(16 * 3) + 1] = undefined;
    this[((16 * 3) + 8) + 0] = undefined;
    this[((16 * 3) + 8) + 1] = undefined;
    this[((16 * 3) + 8) + 2] = undefined;
    this[((16 * 3) + 8) + 3] = undefined;
    this[((16 * 3) + 8) + 4] = undefined;
    this[((16 * 3) + 8) + 5] = undefined;
    this[((16 * 3) + 8) + 6] = undefined;
    this[((16 * 3) + 8) + 7] = undefined;
    return this;
}
DrawParameters.prototype = {
    version: 1,
    setTechniqueParameters: function setTechniqueParametersFn(indx, techniqueParameters) {
        if(indx < 8) {
            indx += (16 * 3);
            this[indx] = techniqueParameters;
            var endTechniqueParameters = this.endTechniqueParameters;
            if(techniqueParameters) {
                if(endTechniqueParameters <= indx) {
                    this.endTechniqueParameters = (indx + 1);
                }
            } else {
                while((16 * 3) < endTechniqueParameters && !this[endTechniqueParameters - 1]) {
                    endTechniqueParameters -= 1;
                }
                this.endTechniqueParameters = endTechniqueParameters;
            }
        }
    },
    setVertexBuffer: function setVertexBufferFn(indx, vertexBuffer) {
        if(indx < 16) {
            indx *= 3;
            this[indx] = vertexBuffer;
            var endStreams = this.endStreams;
            if(vertexBuffer) {
                if(endStreams <= indx) {
                    this.endStreams = (indx + 3);
                }
            } else {
                while(0 < endStreams && !this[endStreams - 3]) {
                    endStreams -= 3;
                }
                this.endStreams = endStreams;
            }
        }
    },
    setSemantics: function setSemanticsFn(indx, semantics) {
        if(indx < 16) {
            this[(indx * 3) + 1] = semantics;
        }
    },
    setOffset: function setOffsetFn(indx, offset) {
        if(indx < 16) {
            this[(indx * 3) + 2] = offset;
        }
    },
    getTechniqueParameters: function getTechniqueParametersFn(indx) {
        if(indx < 8) {
            return this[indx + (16 * 3)];
        } else {
            return undefined;
        }
    },
    getVertexBuffer: function getVertexBufferFn(indx) {
        if(indx < 16) {
            return this[(indx * 3) + 0];
        } else {
            return undefined;
        }
    },
    getSemantics: function getSemanticsFn(indx) {
        if(indx < 16) {
            return this[(indx * 3) + 1];
        } else {
            return undefined;
        }
    },
    getOffset: function getOffsetFn(indx) {
        if(indx < 16) {
            return this[(indx * 3) + 2];
        } else {
            return undefined;
        }
    },
    addInstance: function drawParametersAddInstanceFn(instanceParameters) {
        if(instanceParameters) {
            var endInstances = this.endInstances;
            this.endInstances = (endInstances + 1);
            this[endInstances] = instanceParameters;
        }
    },
    removeInstances: function drawParametersRemoveInstancesFn() {
        this.endInstances = ((16 * 3) + 8);
    },
    getNumInstances: function drawParametersGetNumInstancesFn() {
        return (this.endInstances - ((16 * 3) + 8));
    }
};
// Constructor function
DrawParameters.create = function webGLDrawParametersFn() {
    /* params */ return new DrawParameters();
};




function WebGLGraphicsDevice() {
    return this;
}
WebGLGraphicsDevice.prototype = {
    version: 1,
    SEMANTIC_POSITION: 0,
    SEMANTIC_POSITION0: 0,
    SEMANTIC_BLENDWEIGHT: 1,
    SEMANTIC_BLENDWEIGHT0: 1,
    SEMANTIC_NORMAL: 2,
    SEMANTIC_NORMAL0: 2,
    SEMANTIC_COLOR: 3,
    SEMANTIC_COLOR0: 3,
    SEMANTIC_COLOR1: 4,
    SEMANTIC_SPECULAR: 4,
    SEMANTIC_FOGCOORD: 5,
    SEMANTIC_TESSFACTOR: 5,
    SEMANTIC_PSIZE0: 6,
    SEMANTIC_BLENDINDICES: 7,
    SEMANTIC_BLENDINDICES0: 7,
    SEMANTIC_TEXCOORD: 8,
    SEMANTIC_TEXCOORD0: 8,
    SEMANTIC_TEXCOORD1: 9,
    SEMANTIC_TEXCOORD2: 10,
    SEMANTIC_TEXCOORD3: 11,
    SEMANTIC_TEXCOORD4: 12,
    SEMANTIC_TEXCOORD5: 13,
    SEMANTIC_TEXCOORD6: 14,
    SEMANTIC_TEXCOORD7: 15,
    SEMANTIC_TANGENT: 14,
    SEMANTIC_TANGENT0: 14,
    SEMANTIC_BINORMAL0: 15,
    SEMANTIC_BINORMAL: 15,
    SEMANTIC_PSIZE: 6,
    SEMANTIC_ATTR0: 0,
    SEMANTIC_ATTR1: 1,
    SEMANTIC_ATTR2: 2,
    SEMANTIC_ATTR3: 3,
    SEMANTIC_ATTR4: 4,
    SEMANTIC_ATTR5: 5,
    SEMANTIC_ATTR6: 6,
    SEMANTIC_ATTR7: 7,
    SEMANTIC_ATTR8: 8,
    SEMANTIC_ATTR9: 9,
    SEMANTIC_ATTR10: 10,
    SEMANTIC_ATTR11: 11,
    SEMANTIC_ATTR12: 12,
    SEMANTIC_ATTR13: 13,
    SEMANTIC_ATTR14: 14,
    SEMANTIC_ATTR15: 15,
    PIXELFORMAT_A8: 0,
    PIXELFORMAT_L8: 1,
    PIXELFORMAT_L8A8: 2,
    PIXELFORMAT_R5G5B5A1: 3,
    PIXELFORMAT_R5G6B5: 4,
    PIXELFORMAT_R4G4B4A4: 5,
    PIXELFORMAT_R8G8B8A8: 6,
    PIXELFORMAT_R8G8B8: 7,
    PIXELFORMAT_D24S8: 8,
    PIXELFORMAT_D16: 9,
    PIXELFORMAT_DXT1: 10,
    PIXELFORMAT_DXT3: 11,
    PIXELFORMAT_DXT5: 12,
    drawIndexed: function drawIndexedFn(primitive, numIndices, first) {
        var gl = this.gl;
        var indexBuffer = this.activeIndexBuffer;
        var offset;
        if(first) {
            offset = (first * indexBuffer.stride);
        } else {
            offset = 0;
        }
        var format = indexBuffer.format;
        var attributeMask = this.attributeMask;
        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var numPasses = passes.length;
        var mask;
        if(activeTechnique.checkProperties) {
            activeTechnique.checkProperties(this);
        }
        /*jshint bitwise: false*/
        if(1 === numPasses) {
            mask = (passes[0].semanticsMask & attributeMask);
            if(mask !== this.clientStateMask) {
                this.enableClientState(mask);
            }
            gl.drawElements(primitive, numIndices, format, offset);
            if(debug) {
                this.metrics.addPrimitives(primitive, numIndices);
            }
        } else {
            for(var p = 0; p < numPasses; p += 1) {
                var pass = passes[p];
                mask = (pass.semanticsMask & attributeMask);
                if(mask !== this.clientStateMask) {
                    this.enableClientState(mask);
                }
                this.setPass(pass);
                gl.drawElements(primitive, numIndices, format, offset);
                if(debug) {
                    this.metrics.addPrimitives(primitive, numIndices);
                }
            }
        }
        /*jshint bitwise: true*/
            },
    draw: function drawFn(primitive, numVertices, first) {
        var gl = this.gl;
        var attributeMask = this.attributeMask;
        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var numPasses = passes.length;
        var mask;
        if(activeTechnique.checkProperties) {
            activeTechnique.checkProperties(this);
        }
        /*jshint bitwise: false*/
        if(1 === numPasses) {
            mask = (passes[0].semanticsMask & attributeMask);
            if(mask !== this.clientStateMask) {
                this.enableClientState(mask);
            }
            gl.drawArrays(primitive, first, numVertices);
            if(debug) {
                this.metrics.addPrimitives(primitive, numVertices);
            }
        } else {
            for(var p = 0; p < numPasses; p += 1) {
                var pass = passes[p];
                mask = (pass.semanticsMask & attributeMask);
                if(mask !== this.clientStateMask) {
                    this.enableClientState(mask);
                }
                this.setPass(pass);
                gl.drawArrays(primitive, first, numVertices);
                if(debug) {
                    this.metrics.addPrimitives(primitive, numVertices);
                }
            }
        }
        /*jshint bitwise: true*/
            },
    setTechniqueParameters: function setTechniqueParametersFn() {
        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var setParameters = (1 === passes.length ? this.setParametersImmediate : this.setParametersDeferred);
        var numTechniqueParameters = arguments.length;
        for(var t = 0; t < numTechniqueParameters; t += 1) {
            setParameters(this, passes, arguments[t]);
        }
    },
    setParametersImmediate: //Internal
    function setParametersImmediateFn(gd, passes, techniqueParameters) {
        var gl = gd.gl;
        var parameters = passes[0].parameters;
        /*jshint forin: true*/
        for(var p in techniqueParameters) {
            var parameter = parameters[p];
            if(parameter !== undefined) {
                var parameterValues = techniqueParameters[p];
                if(parameterValues !== undefined) {
                    var paramInfo = parameter.info;
                    var numColumns, location;
                    if(paramInfo.type === 'float') {
                        numColumns = paramInfo.columns;
                        location = parameter.location;
                        if(4 === numColumns) {
                            gl.uniform4fv(location, parameterValues);
                        } else if(3 === numColumns) {
                            gl.uniform3fv(location, parameterValues);
                        } else if(2 === numColumns) {
                            gl.uniform2fv(location, parameterValues);
                        } else if(1 === paramInfo.rows) {
                            gl.uniform1f(location, parameterValues);
                        } else//if (1 === numColumns)
                         {
                            gl.uniform1fv(location, parameterValues);
                        }
                    } else if(paramInfo.sampler !== undefined) {
                        gd.setTexture(parameter.textureUnit, parameterValues, paramInfo.sampler);
                    } else {
                        numColumns = paramInfo.columns;
                        location = parameter.location;
                        if(4 === numColumns) {
                            gl.uniform4iv(location, parameterValues);
                        } else if(3 === numColumns) {
                            gl.uniform3iv(location, parameterValues);
                        } else if(2 === numColumns) {
                            gl.uniform2iv(location, parameterValues);
                        } else if(1 === paramInfo.rows) {
                            gl.uniform1i(location, parameterValues);
                        } else//if (1 === numColumns)
                         {
                            gl.uniform1iv(location, parameterValues);
                        }
                    }
                } else {
                    delete techniqueParameters[p];
                }
            }
        }
        /*jshint forin: false*/
            },
    setParametersCaching: // ONLY USE FOR SINGLE PASS TECHNIQUES ON DRAWARRAY
    function setParametersCachingFn(gd, passes, techniqueParameters) {
        var gl = gd.gl;
        var parameters = passes[0].parameters;
        /*jshint forin: true*/
        for(var p in techniqueParameters) {
            var parameter = parameters[p];
            if(parameter !== undefined) {
                var parameterValues = techniqueParameters[p];
                if(parameter.value !== parameterValues) {
                    if(parameterValues !== undefined) {
                        parameter.value = parameterValues;
                        var paramInfo = parameter.info;
                        var numColumns, location;
                        if(paramInfo.type === 'float') {
                            numColumns = paramInfo.columns;
                            location = parameter.location;
                            if(4 === numColumns) {
                                gl.uniform4fv(location, parameterValues);
                            } else if(3 === numColumns) {
                                gl.uniform3fv(location, parameterValues);
                            } else if(2 === numColumns) {
                                gl.uniform2fv(location, parameterValues);
                            } else if(1 === paramInfo.rows) {
                                gl.uniform1f(location, parameterValues);
                            } else//if (1 === numColumns)
                             {
                                gl.uniform1fv(location, parameterValues);
                            }
                        } else if(paramInfo.sampler !== undefined) {
                            gd.setTexture(parameter.textureUnit, parameterValues, paramInfo.sampler);
                        } else {
                            numColumns = paramInfo.columns;
                            location = parameter.location;
                            if(4 === numColumns) {
                                gl.uniform4iv(location, parameterValues);
                            } else if(3 === numColumns) {
                                gl.uniform3iv(location, parameterValues);
                            } else if(2 === numColumns) {
                                gl.uniform2iv(location, parameterValues);
                            } else if(1 === paramInfo.rows) {
                                gl.uniform1i(location, parameterValues);
                            } else//if (1 === numColumns)
                             {
                                gl.uniform1iv(location, parameterValues);
                            }
                        }
                    } else {
                        delete techniqueParameters[p];
                    }
                }
            }
        }
        /*jshint forin: false*/
            },
    setParametersDeferred: function setParametersDeferredFn(gd, passes, techniqueParameters) {
        var numPasses = passes.length;
        var min = Math.min;
        var max = Math.max;
        for(var n = 0; n < numPasses; n += 1) {
            var pass = passes[n];
            var parameters = pass.parameters;
            pass.dirty = true;
            /*jshint forin: true*/
            for(var p in techniqueParameters) {
                var parameter = parameters[p];
                if(parameter) {
                    var parameterValues = techniqueParameters[p];
                    if(parameterValues !== undefined) {
                        var paramInfo = parameter.info;
                        if(paramInfo.sampler) {
                            paramInfo.values = parameterValues;
                            parameter.dirty = 1;
                        } else if(typeof parameterValues !== 'number') {
                            var values = paramInfo.values;
                            var numValues = min(paramInfo.numValues, parameterValues.length);
                            for(var v = 0; v < numValues; v += 1) {
                                values[v] = parameterValues[v];
                            }
                            parameter.dirty = max(numValues, (parameter.dirty || 0));
                        } else {
                            paramInfo.values[0] = parameterValues;
                            parameter.dirty = (parameter.dirty || 1);
                        }
                    } else {
                        delete techniqueParameters[p];
                    }
                }
            }
            /*jshint forin: false*/
                    }
    },
    setTechnique: function setTechniqueFn(technique) {
        var activeTechnique = this.activeTechnique;
        if(activeTechnique !== technique) {
            if(activeTechnique) {
                activeTechnique.deactivate();
            }
            this.activeTechnique = technique;
            technique.activate(this);
            var passes = technique.passes;
            if(1 === passes.length) {
                this.setPass(passes[0]);
            }
        }
    },
    setTechniqueCaching: // ONLY USE FOR SINGLE PASS TECHNIQUES ON DRAWARRAY
    function setTechniqueCachingFn(technique) {
        var pass = technique.passes[0];
        var activeTechnique = this.activeTechnique;
        if(activeTechnique !== technique) {
            if(activeTechnique) {
                activeTechnique.deactivate();
            }
            this.activeTechnique = technique;
            technique.activate(this);
            this.setPass(pass);
        }
        var parameters = pass.parameters;
        for(var p in parameters) {
            if(parameters.hasOwnProperty(p)) {
                parameters[p].value = null;
            }
        }
    },
    setStream: function setStreamFn(vertexBuffer, semantics, offset) {
        debug.assert(vertexBuffer instanceof WebGLVertexBuffer);
        debug.assert(semantics instanceof WebGLSemantics);
        if(offset) {
            offset *= vertexBuffer.strideInBytes;
        } else {
            offset = 0;
        }
        this.bindVertexBuffer(vertexBuffer.glBuffer);
        var attributes = semantics;
        var numAttributes = attributes.length;
        if(numAttributes > vertexBuffer.numAttributes) {
            numAttributes = vertexBuffer.numAttributes;
        }
        /*jshint bitwise: false*/
        this.attributeMask |= vertexBuffer.bindAttributes(numAttributes, attributes, offset);
        /*jshint bitwise: true*/
            },
    setIndexBuffer: function setIndexBufferFn(indexBuffer) {
        if(this.activeIndexBuffer !== indexBuffer) {
            this.activeIndexBuffer = indexBuffer;
            var glBuffer;
            if(indexBuffer) {
                glBuffer = indexBuffer.glBuffer;
            } else {
                glBuffer = null;
            }
            var gl = this.gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBuffer);
            if(debug) {
                this.metrics.indexBufferChanges += 1;
            }
        }
    },
    drawArray: function drawArrayFn(drawParametersArray, globalTechniqueParametersArray, sortMode) {
        var gl = this.gl;
        var ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER;
        var setParametersCaching = this.setParametersCaching;
        var setParametersDeferred = this.setParametersDeferred;
        var numGlobalTechniqueParameters = globalTechniqueParametersArray.length;
        var numDrawParameters = drawParametersArray.length;
        if(numDrawParameters > 1 && sortMode) {
            if(sortMode > 0) {
                drawParametersArray.sort(function drawArraySortPositive(a, b) {
                    return (b.sortKey - a.sortKey);
                });
            } else//if (sortMode < 0)
             {
                drawParametersArray.sort(function drawArraySortNegative(a, b) {
                    return (a.sortKey - b.sortKey);
                });
            }
        }
        var activeIndexBuffer = this.activeIndexBuffer;
        var attributeMask = this.attributeMask;
        var setParameters = null;
        var lastTechnique = null;
        var lastEndStreams = -1;
        var lastDrawParameters = null;
        var techniqueParameters = null;
        var v = 0;
        var streamsMatch = false;
        var vertexBuffer = null;
        var passes = null;
        var p = null;
        var pass = null;
        var indexFormat = 0;
        var indexStride = 0;
        var numPasses = 0;
        var mask = 0;
        var t = 0;
        if(activeIndexBuffer) {
            indexFormat = activeIndexBuffer.format;
            indexStride = activeIndexBuffer.stride;
        }
        for(var n = 0; n < numDrawParameters; n += 1) {
            var drawParameters = drawParametersArray[n];
            var technique = drawParameters.technique;
            var endTechniqueParameters = drawParameters.endTechniqueParameters;
            var endStreams = drawParameters.endStreams;
            var endInstances = drawParameters.endInstances;
            var indexBuffer = drawParameters.indexBuffer;
            var primitive = drawParameters.primitive;
            var count = drawParameters.count;
            var firstIndex = drawParameters.firstIndex;
            if(lastTechnique !== technique) {
                lastTechnique = technique;
                passes = technique.passes;
                numPasses = passes.length;
                if(1 === numPasses) {
                    this.setTechniqueCaching(technique);
                    setParameters = setParametersCaching;
                    mask = (passes[0].semanticsMask & attributeMask);
                    if(mask !== this.clientStateMask) {
                        this.enableClientState(mask);
                    }
                } else {
                    this.setTechnique(technique);
                    setParameters = setParametersDeferred;
                }
                if(technique.checkProperties) {
                    technique.checkProperties(this);
                }
                for(t = 0; t < numGlobalTechniqueParameters; t += 1) {
                    setParameters(this, passes, globalTechniqueParametersArray[t]);
                }
            }
            for(t = (16 * 3); t < endTechniqueParameters; t += 1) {
                techniqueParameters = drawParameters[t];
                if(techniqueParameters) {
                    setParameters(this, passes, techniqueParameters);
                }
            }
            streamsMatch = (lastEndStreams === endStreams);
            for(v = 0; streamsMatch && v < endStreams; v += 3) {
                streamsMatch = (lastDrawParameters[v] === drawParameters[v] && lastDrawParameters[v + 1] === drawParameters[v + 1] && lastDrawParameters[v + 2] === drawParameters[v + 2]);
            }
            if(!streamsMatch) {
                lastEndStreams = endStreams;
                lastDrawParameters = drawParameters;
                for(v = 0; v < endStreams; v += 3) {
                    vertexBuffer = drawParameters[v];
                    if(vertexBuffer) {
                        this.setStream(vertexBuffer, drawParameters[v + 1], drawParameters[v + 2]);
                    }
                }
                attributeMask = this.attributeMask;
                if(1 === numPasses) {
                    mask = (passes[0].semanticsMask & attributeMask);
                    if(mask !== this.clientStateMask) {
                        this.enableClientState(mask);
                    }
                }
            }
            /*jshint bitwise: false*/
            if(indexBuffer) {
                if(activeIndexBuffer !== indexBuffer) {
                    activeIndexBuffer = indexBuffer;
                    gl.bindBuffer(ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
                    indexFormat = indexBuffer.format;
                    indexStride = indexBuffer.stride;
                    if(debug) {
                        this.metrics.indexBufferChanges += 1;
                    }
                }
                firstIndex *= indexStride;
                if(1 === numPasses) {
                    t = ((16 * 3) + 8);
                    if(t < endInstances) {
                        do {
                            setParameters(this, passes, drawParameters[t]);
                            gl.drawElements(primitive, count, indexFormat, firstIndex);
                            if(debug) {
                                this.metrics.addPrimitives(primitive, count);
                            }
                            t += 1;
                        }while(t < endInstances);
                    } else {
                        gl.drawElements(primitive, count, indexFormat, firstIndex);
                        if(debug) {
                            this.metrics.addPrimitives(primitive, count);
                        }
                    }
                } else {
                    t = ((16 * 3) + 8);
                    if(t < endInstances) {
                        do {
                            setParameters(this, passes, drawParameters[t]);
                            for(p = 0; p < numPasses; p += 1) {
                                pass = passes[p];
                                mask = (pass.semanticsMask & attributeMask);
                                if(mask !== this.clientStateMask) {
                                    this.enableClientState(mask);
                                }
                                this.setPass(pass);
                                gl.drawElements(primitive, count, indexFormat, firstIndex);
                                if(debug) {
                                    this.metrics.addPrimitives(primitive, count);
                                }
                            }
                            t += 1;
                        }while(t < endInstances);
                    } else {
                        for(p = 0; p < numPasses; p += 1) {
                            pass = passes[p];
                            mask = (pass.semanticsMask & attributeMask);
                            if(mask !== this.clientStateMask) {
                                this.enableClientState(mask);
                            }
                            this.setPass(pass);
                            gl.drawElements(primitive, count, indexFormat, firstIndex);
                            if(debug) {
                                this.metrics.addPrimitives(primitive, count);
                            }
                        }
                    }
                }
            } else {
                if(1 === numPasses) {
                    t = ((16 * 3) + 8);
                    if(t < endInstances) {
                        do {
                            setParameters(this, passes, drawParameters[t]);
                            gl.drawArrays(primitive, firstIndex, count);
                            if(debug) {
                                this.metrics.addPrimitives(primitive, count);
                            }
                            t += 1;
                        }while(t < endInstances);
                    } else {
                        gl.drawArrays(primitive, firstIndex, count);
                        if(debug) {
                            this.metrics.addPrimitives(primitive, count);
                        }
                    }
                } else {
                    t = ((16 * 3) + 8);
                    if(t < endInstances) {
                        do {
                            setParameters(this, passes, drawParameters[t]);
                            for(p = 0; p < numPasses; p += 1) {
                                pass = passes[p];
                                mask = (pass.semanticsMask & attributeMask);
                                if(mask !== this.clientStateMask) {
                                    this.enableClientState(mask);
                                }
                                this.setPass(pass);
                                gl.drawArrays(primitive, firstIndex, count);
                            }
                            if(debug) {
                                this.metrics.addPrimitives(primitive, count);
                            }
                            t += 1;
                        }while(t < endInstances);
                    } else {
                        for(p = 0; p < numPasses; p += 1) {
                            pass = passes[p];
                            mask = (pass.semanticsMask & attributeMask);
                            if(mask !== this.clientStateMask) {
                                this.enableClientState(mask);
                            }
                            this.setPass(pass);
                            gl.drawArrays(primitive, firstIndex, count);
                            if(debug) {
                                this.metrics.addPrimitives(primitive, count);
                            }
                        }
                    }
                }
            }
            /*jshint bitwise: true*/
                    }
        this.activeIndexBuffer = activeIndexBuffer;
    },
    beginDraw: function beginDrawFn(primitive, numVertices, formats, semantics) {
        this.immediatePrimitive = primitive;
        if(numVertices) {
            var n;
            var immediateSemantics = this.immediateSemantics;
            var attributes = semantics;
            var numAttributes = attributes.length;
            immediateSemantics.length = numAttributes;
            for(n = 0; n < numAttributes; n += 1) {
                var attribute = attributes[n];
                if(typeof attribute === "string") {
                    attribute = this['SEMANTIC_' + attribute];
                }
                immediateSemantics[n] = attribute;
            }
            var immediateVertexBuffer = this.immediateVertexBuffer;
            var oldStride = immediateVertexBuffer.strideInBytes;
            var oldSize = (oldStride * immediateVertexBuffer.numVertices);
            var stride = immediateVertexBuffer.setAttributes(formats);
            if(stride !== oldStride) {
                immediateVertexBuffer.numVertices = Math.floor(oldSize / stride);
            }
            var size = (stride * numVertices);
            if(size > oldSize) {
                immediateVertexBuffer.resize(size);
            }
            return immediateVertexBuffer.map(0, numVertices);
        }
        return null;
    },
    endDraw: function endDrawFn(writer) {
        var immediateVertexBuffer = this.immediateVertexBuffer;
        var numVerticesWritten = writer.getNumWrittenVertices();
        immediateVertexBuffer.unmap(writer);
        if(numVerticesWritten) {
            var gl = this.gl;
            var stride = immediateVertexBuffer.strideInBytes;
            var offset = 0;
            /*jshint bitwise: false*/
            var vertexAttributes = immediateVertexBuffer.attributes;
            var semantics = this.immediateSemantics;
            var numSemantics = semantics.length;
            var deltaAttributeMask = 0;
            for(var n = 0; n < numSemantics; n += 1) {
                var vertexAttribute = vertexAttributes[n];
                var attribute = semantics[n];
                deltaAttributeMask |= (1 << attribute);
                gl.vertexAttribPointer(attribute, vertexAttribute.numComponents, vertexAttribute.format, vertexAttribute.normalized, stride, offset);
                offset += vertexAttribute.stride;
            }
            this.attributeMask |= deltaAttributeMask;
            /*jshint bitwise: true*/
            this.draw(this.immediatePrimitive, numVerticesWritten, 0);
        }
    },
    setViewport: function setViewportFn(x, y, w, h) {
        var currentBox = this.state.viewportBox;
        if(currentBox[0] !== x || currentBox[1] !== y || currentBox[2] !== w || currentBox[3] !== h) {
            currentBox[0] = x;
            currentBox[1] = y;
            currentBox[2] = w;
            currentBox[3] = h;
            this.gl.viewport(x, y, w, h);
        }
    },
    setScissor: function setScissorFn(x, y, w, h) {
        var currentBox = this.state.scissorBox;
        if(currentBox[0] !== x || currentBox[1] !== y || currentBox[2] !== w || currentBox[3] !== h) {
            currentBox[0] = x;
            currentBox[1] = y;
            currentBox[2] = w;
            currentBox[3] = h;
            this.gl.scissor(x, y, w, h);
        }
    },
    clear: function clearFn(color, depth, stencil) {
        var gl = this.gl;
        var state = this.state;
        var clearMask = 0;
        if(color) {
            clearMask += gl.COLOR_BUFFER_BIT;
            var currentColor = state.clearColor;
            var color0 = color[0];
            var color1 = color[1];
            var color2 = color[2];
            var color3 = color[3];
            if(currentColor[0] !== color0 || currentColor[1] !== color1 || currentColor[2] !== color2 || currentColor[3] !== color3) {
                currentColor[0] = color0;
                currentColor[1] = color1;
                currentColor[2] = color2;
                currentColor[3] = color3;
                gl.clearColor(color0, color1, color2, color3);
            }
        }
        if(typeof depth === 'number') {
            clearMask += gl.DEPTH_BUFFER_BIT;
            if(state.clearDepth !== depth) {
                state.clearDepth = depth;
                gl.clearDepth(depth);
            }
            if(typeof stencil === 'number') {
                clearMask += gl.STENCIL_BUFFER_BIT;
                if(state.clearStencil !== stencil) {
                    state.clearStencil = stencil;
                    gl.clearStencil(stencil);
                }
            }
        }
        if(clearMask) {
            var colorMask = state.colorMask;
            var colorMaskEnabled = (colorMask[0] || colorMask[1] || colorMask[2] || colorMask[3]);
            var depthMask = state.depthMask;
            var program = state.program;
            if(color) {
                if(!colorMaskEnabled) {
                    // This is posibly a mistake, enable it for this call
                    gl.colorMask(true, true, true, true);
                }
            }
            if(depth !== undefined) {
                if(!depthMask) {
                    // This is posibly a mistake, enable it for this call
                    gl.depthMask(true);
                }
            }
            if(program) {
                gl.useProgram(null)// Work around for Mac crash bug.
                ;
            }
            gl.clear(clearMask);
            if(color) {
                if(!colorMaskEnabled) {
                    gl.colorMask(false, false, false, false);
                }
            }
            if(depth !== undefined) {
                if(!depthMask) {
                    gl.depthMask(false);
                }
            }
            if(program) {
                gl.useProgram(program);
            }
        }
    },
    beginFrame: function beginFrameFn() {
        var gl = this.gl;
        this.attributeMask = 0;
        /*jshint bitwise: false*/
        var clientStateMask = this.clientStateMask;
        var n;
        if(clientStateMask) {
            for(n = 0; n < 16; n += 1) {
                if(clientStateMask & (1 << n)) {
                    gl.disableVertexAttribArray(n);
                }
            }
            this.clientStateMask = 0;
        }
        /*jshint bitwise: true*/
        this.resetStates();
        this.setScissor(0, 0, this.width, this.height);
        this.setViewport(0, 0, this.width, this.height);
        if(debug) {
            this.metrics.renderTargetChanges = 0;
            this.metrics.textureChanges = 0;
            this.metrics.renderStateChanges = 0;
            this.metrics.vertexBufferChanges = 0;
            this.metrics.indexBufferChanges = 0;
            this.metrics.techniqueChanges = 0;
            this.metrics.drawCalls = 0;
            this.metrics.primitives = 0;
        }
        return !(document.hidden || document['webkitHidden']);
    },
    beginRenderTarget: function beginRenderTargetFn(renderTarget) {
        this.activeRenderTarget = renderTarget;
        if(debug) {
            this.metrics.renderTargetChanges += 1;
        }
        return renderTarget.bind();
    },
    endRenderTarget: function endRenderTargetFn() {
        this.activeRenderTarget.unbind();
        this.activeRenderTarget = null;
    },
    beginOcclusionQuery: function beginOcclusionQueryFn() {
        return false;
    },
    endOcclusionQuery: function endOcclusionQueryFn() {
    },
    endFrame: function endFrameFn() {
        var gl = this.gl;
        //gl.flush();
        if(this.activeTechnique) {
            this.activeTechnique.deactivate();
            this.activeTechnique = null;
        }
        if(this.activeIndexBuffer) {
            this.setIndexBuffer(null);
        }
        var state = this.state;
        if(state.program) {
            state.program = null;
            gl.useProgram(null);
        }
        this.numFrames += 1;
        var currentFrameTime = TurbulenzEngine.getTime();
        var diffTime = (currentFrameTime - this.previousFrameTime);
        if(diffTime >= 1000.0) {
            this.fps = (this.numFrames / (diffTime * 0.001));
            this.numFrames = 0;
            this.previousFrameTime = currentFrameTime;
        }
        var canvas = gl.canvas;
        var width = (gl.drawingBufferWidth || canvas.width);
        var height = (gl.drawingBufferHeight || canvas.height);
        if(this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.setViewport(0, 0, width, height);
            this.setScissor(0, 0, width, height);
        }
        this.checkFullScreen();
    },
    createTechniqueParameters: function createTechniqueParametersFn(params) {
        return TechniqueParameters.create(params);
    },
    createSemantics: function createSemanticsFn(attributes) {
        return WebGLSemantics.create(this, attributes);
    },
    createVertexBuffer: function createVertexBufferFn(params) {
        return WebGLVertexBuffer.create(this, params);
    },
    createIndexBuffer: function createIndexBufferFn(params) {
        return WebGLIndexBuffer.create(this, params);
    },
    createTexture: function createTextureFn(params) {
        return TZWebGLTexture.create(this, params);
    },
    createVideo: function createVideoFn(params) {
        return WebGLVideo.create(params);
    },
    createShader: function createShaderFn(params) {
        return Shader.create(this, params);
    },
    createTechniqueParameterBuffer: function createTechniqueParameterBufferFn(params) {
        return techniqueParameterBufferCreate(params);
    },
    createRenderBuffer: function createRenderBufferFn(params) {
        return WebGLRenderBuffer.create(this, params);
    },
    createRenderTarget: function createRenderTargetFn(params) {
        return WebGLRenderTarget.create(this, params);
    },
    createOcclusionQuery: function createOcclusionQueryFn() {
        /* params */ return null;
    },
    createDrawParameters: function createDrawParametersFn(params) {
        return DrawParameters.create(params);
    },
    isSupported: function isSupportedFn(name) {
        var gl = this.gl;
        if("OCCLUSION_QUERIES" === name) {
            return false;
        } else if("NPOT_MIPMAPPED_TEXTURES" === name) {
            return false;
        } else if("TEXTURE_DXT1" === name || "TEXTURE_DXT3" === name || "TEXTURE_DXT5" === name) {
            var compressedTexturesExtension = this.compressedTexturesExtension;
            if(compressedTexturesExtension) {
                var compressedFormats = gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS);
                if(compressedFormats) {
                    var requestedFormat;
                    if("TEXTURE_DXT1" === name) {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    } else if("TEXTURE_DXT3" === name) {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    } else//if ("TEXTURE_DXT5" === name)
                     {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    }
                    var numCompressedFormats = compressedFormats.length;
                    for(var n = 0; n < numCompressedFormats; n += 1) {
                        if(compressedFormats[n] === requestedFormat) {
                            return true;
                        }
                    }
                }
            }
            return false;
        } else if("TEXTURE_ETC1" === name) {
            return false;
        } else if("INDEXFORMAT_UINT" === name) {
            if(gl.getExtension('OES_element_index_uint')) {
                return true;
            }
            return false;
        } else if("FILEFORMAT_WEBM" === name) {
            return ("webm" in this.supportedVideoExtensions);
        } else if("FILEFORMAT_MP4" === name) {
            return ("mp4" in this.supportedVideoExtensions);
        } else if("FILEFORMAT_JPG" === name) {
            return true;
        } else if("FILEFORMAT_PNG" === name) {
            return true;
        } else if("FILEFORMAT_DDS" === name) {
            return typeof DDSLoader !== 'undefined';
        } else if("FILEFORMAT_TGA" === name) {
            return typeof TGALoader !== 'undefined';
        }
        return undefined;
    },
    maxSupported: function maxSupportedFn(name) {
        var gl = this.gl;
        if("ANISOTROPY" === name) {
            return this.maxAnisotropy;
        } else if("TEXTURE_SIZE" === name) {
            return gl.getParameter(gl.MAX_TEXTURE_SIZE);
        } else if("CUBEMAP_TEXTURE_SIZE" === name) {
            return gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        } else if("3D_TEXTURE_SIZE" === name) {
            return 0;
        } else if("RENDERTARGET_COLOR_TEXTURES" === name) {
            return 1;
        } else if("RENDERBUFFER_SIZE" === name) {
            return gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
        }
        return 0;
    },
    loadTexturesArchive: function loadTexturesArchiveFn(params) {
        var src = params.src;
        if(typeof TARLoader !== 'undefined') {
            TARLoader.create({
                gd: this,
                src: src,
                mipmaps: params.mipmaps,
                ontextureload: function tarTextureLoadedFn(texture) {
                    params.ontextureload(texture);
                },
                onload: function tarLoadedFn(success, status) {
                    if(params.onload) {
                        params.onload(true, status);
                    }
                },
                onerror: function tarFailedFn() {
                    if(params.onload) {
                        params.onload(false, status);
                    }
                }
            });
            return true;
        } else {
            (TurbulenzEngine).callOnError('Missing archive loader required for ' + src);
            return false;
        }
    },
    getScreenshot: function getScreenshotFn(compress, x, y, width, height) {
        var gl = this.gl;
        var canvas = gl.canvas;
        if(compress) {
            return canvas.toDataURL('image/jpeg');
        } else {
            if(x === undefined) {
                x = 0;
            }
            if(y === undefined) {
                y = 0;
            }
            var target = this.activeRenderTarget;
            if(!target) {
                target = canvas;
            }
            if(width === undefined) {
                width = target.width;
            }
            if(height === undefined) {
                height = target.height;
            }
            var pixels = new Uint8Array(4 * width * height);
            gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return pixels;
        }
    },
    flush: function flush() {
        this.gl.flush();
    },
    finish: function finish() {
        this.gl.finish();
    },
    checkFullScreen: // private
    function checkFullScreenFn() {
        var fullscreen = this.fullscreen;
        if(this.oldFullscreen !== fullscreen) {
            this.oldFullscreen = fullscreen;
            this.requestFullScreen(fullscreen);
        }
    },
    requestFullScreen: function requestFullScreenFn(fullscreen) {
        if(fullscreen) {
            var canvas = this.gl.canvas;
            if(canvas.webkitRequestFullScreenWithKeys) {
                canvas.webkitRequestFullScreenWithKeys();
            } else if(canvas.requestFullScreenWithKeys) {
                canvas.requestFullScreenWithKeys();
            } else if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen(canvas.ALLOW_KEYBOARD_INPUT);
            } else if(canvas.mozRequestFullScreen) {
                canvas.mozRequestFullScreen();
            } else if(canvas.requestFullScreen) {
                canvas.requestFullScreen();
            } else if(canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        } else {
            if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if(document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if(document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    },
    createSampler: function createSamplerFn(sampler) {
        var samplerKey = sampler.minFilter.toString() + ':' + sampler.magFilter.toString() + ':' + sampler.wrapS.toString() + ':' + sampler.wrapT.toString() + ':' + sampler.wrapR.toString() + ':' + sampler.maxAnisotropy.toString();
        var cachedSamplers = this.cachedSamplers;
        var cachedSampler = cachedSamplers[samplerKey];
        if(!cachedSampler) {
            cachedSamplers[samplerKey] = sampler;
            return sampler;
        }
        return cachedSampler;
    },
    unsetIndexBuffer: function unsetIndexBufferFn(indexBuffer) {
        if(this.activeIndexBuffer === indexBuffer) {
            this.activeIndexBuffer = null;
            var gl = this.gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
    },
    bindVertexBuffer: function bindVertexBufferFn(buffer) {
        if(this.bindedVertexBuffer !== buffer) {
            this.bindedVertexBuffer = buffer;
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            if(debug) {
                this.metrics.vertexBufferChanges += 1;
            }
        }
    },
    unbindVertexBuffer: function unbindVertexBufferFn(buffer) {
        if(this.bindedVertexBuffer === buffer) {
            this.bindedVertexBuffer = null;
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    },
    bindTextureUnit: function bindTextureUnitFn(unit, target, texture) {
        var state = this.state;
        var gl = this.gl;
        if(state.activeTextureUnit !== unit) {
            state.activeTextureUnit = unit;
            gl.activeTexture(gl.TEXTURE0 + unit);
        }
        gl.bindTexture(target, texture);
    },
    bindTexture: function bindTextureFn(target, texture) {
        var state = this.state;
        var gl = this.gl;
        var dummyUnit = (state.maxTextureUnit - 1);
        if(state.activeTextureUnit !== dummyUnit) {
            state.activeTextureUnit = dummyUnit;
            gl.activeTexture(gl.TEXTURE0 + dummyUnit);
        }
        gl.bindTexture(target, texture);
    },
    unbindTexture: function unbindTextureFn(texture) {
        var state = this.state;
        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        for(var u = 0; u < lastMaxTextureUnit; u += 1) {
            var textureUnit = textureUnits[u];
            if(textureUnit.texture === texture) {
                textureUnit.texture = null;
                this.bindTextureUnit(u, textureUnit.target, null);
            }
        }
    },
    setSampler: function setSamplerFn(sampler, target) {
        if(sampler) {
            var gl = this.gl;
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, sampler.minFilter);
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, sampler.magFilter);
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, sampler.wrapS);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, sampler.wrapT);
            /*
            if (sSupports3DTextures)
            {
            gl.texParameteri(target, gl.TEXTURE_WRAP_R, sampler.wrapR);
            }
            */
            if(this.TEXTURE_MAX_ANISOTROPY_EXT) {
                gl.texParameteri(target, this.TEXTURE_MAX_ANISOTROPY_EXT, sampler.maxAnisotropy);
            }
        }
    },
    setPass: function setPassFn(pass) {
        var gl = this.gl;
        var state = this.state;
        // Set renderstates
        var renderStatesSet = pass.statesSet;
        var renderStates = pass.states;
        var numRenderStates = renderStates.length;
        var r, renderState;
        for(r = 0; r < numRenderStates; r += 1) {
            renderState = renderStates[r];
            renderState.set.apply(renderState, renderState.values);
        }
        // Reset previous renderstates
        var renderStatesToReset = state.renderStatesToReset;
        var numRenderStatesToReset = renderStatesToReset.length;
        for(r = 0; r < numRenderStatesToReset; r += 1) {
            renderState = renderStatesToReset[r];
            if(!(renderState.name in renderStatesSet)) {
                renderState.reset();
            }
        }
        // Copy set renderstates to be reset later
        renderStatesToReset.length = numRenderStates;
        for(r = 0; r < numRenderStates; r += 1) {
            renderStatesToReset[r] = renderStates[r];
        }
        // Reset texture units
        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        var currentMaxTextureUnit = pass.numTextureUnits;
        if(currentMaxTextureUnit < lastMaxTextureUnit) {
            var u = currentMaxTextureUnit;
            do {
                var textureUnit = textureUnits[u];
                if(textureUnit.texture) {
                    textureUnit.texture = null;
                    this.bindTextureUnit(u, textureUnit.target, null);
                }
                u += 1;
            }while(u < lastMaxTextureUnit);
        }
        state.lastMaxTextureUnit = currentMaxTextureUnit;
        var program = pass.glProgram;
        if(state.program !== program) {
            state.program = program;
            gl.useProgram(program);
        }
        if(pass.dirty) {
            pass.updateParametersData(this);
        }
    },
    enableClientState: function enableClientStateFn(mask) {
        var gl = this.gl;
        var oldMask = this.clientStateMask;
        this.clientStateMask = mask;
        /*jshint bitwise: false*/
        var disableMask = (oldMask & (~mask));
        var enableMask = ((~oldMask) & mask);
        var n;
        if(disableMask) {
            if((disableMask & 0xff) === 0) {
                disableMask >>= 8;
                n = 8;
            } else {
                n = 0;
            }
            do {
                if(0 !== (0x01 & disableMask)) {
                    gl.disableVertexAttribArray(n);
                }
                n += 1;
                disableMask >>= 1;
            }while(disableMask);
        }
        if(enableMask) {
            if((enableMask & 0xff) === 0) {
                enableMask >>= 8;
                n = 8;
            } else {
                n = 0;
            }
            do {
                if(0 !== (0x01 & enableMask)) {
                    gl.enableVertexAttribArray(n);
                }
                n += 1;
                enableMask >>= 1;
            }while(enableMask);
        }
        /*jshint bitwise: true*/
            },
    setTexture: function setTextureFn(textureUnitIndex, texture, sampler) {
        var state = this.state;
        var gl = this.gl;
        var textureUnit = state.textureUnits[textureUnitIndex];
        var oldgltarget = textureUnit.target;
        var oldglobject = textureUnit.texture;
        if(texture) {
            var gltarget = texture.target;
            var globject = texture.glTexture;
            if(oldglobject !== globject || oldgltarget !== gltarget) {
                textureUnit.target = gltarget;
                textureUnit.texture = globject;
                if(state.activeTextureUnit !== textureUnitIndex) {
                    state.activeTextureUnit = textureUnitIndex;
                    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
                }
                if(oldgltarget !== gltarget && oldglobject) {
                    gl.bindTexture(oldgltarget, null);
                }
                gl.bindTexture(gltarget, globject);
                if(texture.sampler !== sampler) {
                    texture.sampler = sampler;
                    this.setSampler(sampler, gltarget);
                }
                if(debug) {
                    this.metrics.textureChanges += 1;
                }
            }
        } else {
            if(oldgltarget && oldglobject) {
                textureUnit.target = 0;
                textureUnit.texture = null;
                if(state.activeTextureUnit !== textureUnitIndex) {
                    state.activeTextureUnit = textureUnitIndex;
                    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
                }
                gl.bindTexture(oldgltarget, null);
            }
        }
    },
    setProgram: function setProgramFn(program) {
        var state = this.state;
        if(state.program !== program) {
            state.program = program;
            this.gl.useProgram(program);
        }
    },
    syncState: function syncStateFn() {
        var state = this.state;
        var gl = this.gl;
        if(state.depthTestEnable) {
            gl.enable(gl.DEPTH_TEST);
        } else {
            gl.disable(gl.DEPTH_TEST);
        }
        gl.depthFunc(state.depthFunc);
        gl.depthMask(state.depthMask);
        if(state.blendEnable) {
            gl.enable(gl.BLEND);
        } else {
            gl.disable(gl.BLEND);
        }
        gl.blendFunc(state.blendSrc, state.blendDst);
        if(state.cullFaceEnable) {
            gl.enable(gl.CULL_FACE);
        } else {
            gl.disable(gl.CULL_FACE);
        }
        gl.cullFace(state.cullFace);
        gl.frontFace(state.frontFace);
        var colorMask = state.colorMask;
        gl.colorMask(colorMask[0], colorMask[1], colorMask[2], colorMask[3]);
        if(state.stencilTestEnable) {
            gl.enable(gl.STENCIL_TEST);
        } else {
            gl.disable(gl.STENCIL_TEST);
        }
        gl.stencilFunc(state.stencilFunc, state.stencilRef, state.stencilMask);
        gl.stencilOp(state.stencilFail, state.stencilZFail, state.stencilZPass);
        if(state.polygonOffsetFillEnable) {
            gl.enable(gl.POLYGON_OFFSET_FILL);
        } else {
            gl.disable(gl.POLYGON_OFFSET_FILL);
        }
        gl.polygonOffset(state.polygonOffsetFactor, state.polygonOffsetUnits);
        gl.lineWidth(state.lineWidth);
        gl.activeTexture(gl.TEXTURE0 + state.activeTextureUnit);
        var currentBox = this.state.viewportBox;
        gl.viewport(currentBox[0], currentBox[1], currentBox[2], currentBox[3]);
        currentBox = this.state.scissorBox;
        gl.scissor(currentBox[0], currentBox[1], currentBox[2], currentBox[3]);
        var currentColor = state.clearColor;
        gl.clearColor(currentColor[0], currentColor[1], currentColor[2], currentColor[3]);
        gl.clearDepth(state.clearDepth);
        gl.clearStencil(state.clearStencil);
    },
    resetStates: function resetStatesFn() {
        var state = this.state;
        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        for(var u = 0; u < lastMaxTextureUnit; u += 1) {
            var textureUnit = textureUnits[u];
            if(textureUnit.texture) {
                this.bindTextureUnit(u, textureUnit.target, null);
                textureUnit.texture = null;
                textureUnit.target = 0;
            }
        }
    },
    destroy: function graphicsDeviceDestroyFn() {
        delete this.activeTechnique;
        delete this.activeIndexBuffer;
        delete this.bindedVertexBuffer;
        if(this.immediateVertexBuffer) {
            this.immediateVertexBuffer.destroy();
            delete this.immediateVertexBuffer;
        }
        delete this.gl;
    }
};
// Constructor function
WebGLGraphicsDevice.create = function webGLGraphicsDeviceCreateFn(canvas, params) {
    var getAvailableContext = function getAvailableContextFn(canvas, params, contextList) {
        if(canvas.getContext) {
            var canvasParams = {
                alpha: false,
                stencil: true,
                antialias: false
            };
            var multisample = params.multisample;
            if(multisample !== undefined && 1 < multisample) {
                canvasParams.antialias = true;
            }
            var numContexts = contextList.length, i;
            for(i = 0; i < numContexts; i += 1) {
                try  {
                    var context = canvas.getContext(contextList[i], canvasParams);
                    if(context) {
                        return context;
                    }
                } catch (ex) {
                }
            }
        }
        return null;
    };
    // TODO: Test if we can also use "webkit-3d" and "moz-webgl"
    var gl = getAvailableContext(canvas, params, [
        'webgl', 
        'experimental-webgl'
    ]);
    if(!gl) {
        return null;
    }
    var width = (gl.drawingBufferWidth || canvas.width);
    var height = (gl.drawingBufferHeight || canvas.height);
    gl.enable(gl.SCISSOR_TEST);
    gl.depthRange(0.0, 1.0);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    //gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
    var gd = new WebGLGraphicsDevice();
    gd.gl = gl;
    gd.width = width;
    gd.height = height;
    var extensions = gl.getSupportedExtensions();
    if(extensions) {
        extensions = extensions.join(' ');
    } else {
        extensions = '';
    }
    gd.extensions = extensions;
    gd.shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
    gd.rendererVersion = gl.getParameter(gl.VERSION);
    gd.renderer = gl.getParameter(gl.RENDERER);
    gd.vendor = gl.getParameter(gl.VENDOR);
    if(extensions.indexOf('WEBGL_compressed_texture_s3tc') !== -1) {
        gd.WEBGL_compressed_texture_s3tc = true;
        if(extensions.indexOf('WEBKIT_WEBGL_compressed_texture_s3tc') !== -1) {
            gd.compressedTexturesExtension = gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        } else if(extensions.indexOf('MOZ_WEBGL_compressed_texture_s3tc') !== -1) {
            gd.compressedTexturesExtension = gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc');
        } else {
            gd.compressedTexturesExtension = gl.getExtension('WEBGL_compressed_texture_s3tc');
        }
    } else if(extensions.indexOf('WEBKIT_WEBGL_compressed_textures') !== -1) {
        gd.compressedTexturesExtension = gl.getExtension('WEBKIT_WEBGL_compressed_textures');
    }
    var anisotropyExtension;
    if(extensions.indexOf('EXT_texture_filter_anisotropic') !== -1) {
        if(extensions.indexOf('MOZ_EXT_texture_filter_anisotropic') !== -1) {
            anisotropyExtension = gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
        } else if(extensions.indexOf('WEBKIT_EXT_texture_filter_anisotropic') !== -1) {
            anisotropyExtension = gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        } else {
            anisotropyExtension = gl.getExtension('EXT_texture_filter_anisotropic');
        }
    }
    if(anisotropyExtension) {
        gd.TEXTURE_MAX_ANISOTROPY_EXT = anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT;
        gd.maxAnisotropy = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else {
        gd.maxAnisotropy = 1;
    }
    // Enable OES_element_index_uint extension
    gl.getExtension('OES_element_index_uint');
    gd.PRIMITIVE_POINTS = gl.POINTS;
    gd.PRIMITIVE_LINES = gl.LINES;
    gd.PRIMITIVE_LINE_LOOP = gl.LINE_LOOP;
    gd.PRIMITIVE_LINE_STRIP = gl.LINE_STRIP;
    gd.PRIMITIVE_TRIANGLES = gl.TRIANGLES;
    gd.PRIMITIVE_TRIANGLE_STRIP = gl.TRIANGLE_STRIP;
    gd.PRIMITIVE_TRIANGLE_FAN = gl.TRIANGLE_FAN;
    gd.INDEXFORMAT_UBYTE = gl.UNSIGNED_BYTE;
    gd.INDEXFORMAT_USHORT = gl.UNSIGNED_SHORT;
    gd.INDEXFORMAT_UINT = gl.UNSIGNED_INT;
    var getNormalizationScale = function getNormalizationScaleFn(format) {
        if(format === gl.BYTE) {
            return 0x7f;
        } else if(format === gl.UNSIGNED_BYTE) {
            return 0xff;
        } else if(format === gl.SHORT) {
            return 0x7fff;
        } else if(format === gl.UNSIGNED_SHORT) {
            return 0xffff;
        } else if(format === gl.INT) {
            return 0x7fffffff;
        } else if(format === gl.UNSIGNED_INT) {
            return 0xffffffff;
        } else//if (format === gl.FLOAT)
         {
            return 1;
        }
    };
    var makeVertexformat = function makeVertexformatFn(n, c, s, f, name) {
        var attributeFormat = {
            numComponents: c,
            stride: s,
            componentStride: (s / c),
            format: f,
            name: name,
            normalized: undefined,
            normalizationScale: undefined,
            typedSetter: undefined,
            typedArray: undefined
        };
        if(n) {
            attributeFormat.normalized = true;
            attributeFormat.normalizationScale = getNormalizationScale(f);
        } else {
            attributeFormat.normalized = false;
            attributeFormat.normalizationScale = 1;
        }
        if(typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype) {
            if(f === gl.BYTE) {
                attributeFormat.typedSetter = DataView.prototype.setInt8;
            } else if(f === gl.UNSIGNED_BYTE) {
                attributeFormat.typedSetter = DataView.prototype.setUint8;
            } else if(f === gl.SHORT) {
                attributeFormat.typedSetter = DataView.prototype.setInt16;
            } else if(f === gl.UNSIGNED_SHORT) {
                attributeFormat.typedSetter = DataView.prototype.setUint16;
            } else if(f === gl.INT) {
                attributeFormat.typedSetter = DataView.prototype.setInt32;
            } else if(f === gl.UNSIGNED_INT) {
                attributeFormat.typedSetter = DataView.prototype.setUint32;
            } else//if (f === gl.FLOAT)
             {
                attributeFormat.typedSetter = DataView.prototype.setFloat32;
            }
        } else {
            if(f === gl.BYTE) {
                attributeFormat.typedArray = Int8Array;
            } else if(f === gl.UNSIGNED_BYTE) {
                attributeFormat.typedArray = Uint8Array;
            } else if(f === gl.SHORT) {
                attributeFormat.typedArray = Int16Array;
            } else if(f === gl.UNSIGNED_SHORT) {
                attributeFormat.typedArray = Uint16Array;
            } else if(f === gl.INT) {
                attributeFormat.typedArray = Int32Array;
            } else if(f === gl.UNSIGNED_INT) {
                attributeFormat.typedArray = Uint32Array;
            } else//if (f === gl.FLOAT)
             {
                attributeFormat.typedArray = Float32Array;
            }
        }
        return attributeFormat;
    };
    gd.VERTEXFORMAT_BYTE4 = makeVertexformat(0, 4, 4, gl.BYTE, 'BYTE4');
    gd.VERTEXFORMAT_BYTE4N = makeVertexformat(1, 4, 4, gl.BYTE, 'BYTE4N');
    gd.VERTEXFORMAT_UBYTE4 = makeVertexformat(0, 4, 4, gl.UNSIGNED_BYTE, 'UBYTE4');
    gd.VERTEXFORMAT_UBYTE4N = makeVertexformat(1, 4, 4, gl.UNSIGNED_BYTE, 'UBYTE4N');
    gd.VERTEXFORMAT_SHORT2 = makeVertexformat(0, 2, 4, gl.SHORT, 'SHORT2');
    gd.VERTEXFORMAT_SHORT2N = makeVertexformat(1, 2, 4, gl.SHORT, 'SHORT2N');
    gd.VERTEXFORMAT_SHORT4 = makeVertexformat(0, 4, 8, gl.SHORT, 'SHORT4');
    gd.VERTEXFORMAT_SHORT4N = makeVertexformat(1, 4, 8, gl.SHORT, 'SHORT4N');
    gd.VERTEXFORMAT_USHORT2 = makeVertexformat(0, 2, 4, gl.UNSIGNED_SHORT, 'USHORT2');
    gd.VERTEXFORMAT_USHORT2N = makeVertexformat(1, 2, 4, gl.UNSIGNED_SHORT, 'USHORT2N');
    gd.VERTEXFORMAT_USHORT4 = makeVertexformat(0, 4, 8, gl.UNSIGNED_SHORT, 'USHORT4');
    gd.VERTEXFORMAT_USHORT4N = makeVertexformat(1, 4, 8, gl.UNSIGNED_SHORT, 'USHORT4N');
    gd.VERTEXFORMAT_FLOAT1 = makeVertexformat(0, 1, 4, gl.FLOAT, 'FLOAT1');
    gd.VERTEXFORMAT_FLOAT2 = makeVertexformat(0, 2, 8, gl.FLOAT, 'FLOAT2');
    gd.VERTEXFORMAT_FLOAT3 = makeVertexformat(0, 3, 12, gl.FLOAT, 'FLOAT3');
    gd.VERTEXFORMAT_FLOAT4 = makeVertexformat(0, 4, 16, gl.FLOAT, 'FLOAT4');
    gd.DEFAULT_SAMPLER = {
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.REPEAT,
        wrapT: gl.REPEAT,
        wrapR: gl.REPEAT,
        maxAnisotropy: 1
    };
    gd.cachedSamplers = {
    };
    var maxTextureUnit = 1;
    var maxUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    if(maxTextureUnit < maxUnit) {
        maxTextureUnit = maxUnit;
    }
    maxUnit = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    if(maxTextureUnit < maxUnit) {
        maxTextureUnit = maxUnit;
    }
    var textureUnits = [];
    textureUnits.length = maxTextureUnit;
    for(var t = 0; t < maxTextureUnit; t += 1) {
        textureUnits[t] = {
            texture: null,
            target: 0
        };
    }
    var defaultDepthFunc = gl.LEQUAL;
    var defaultBlendFuncSrc = gl.SRC_ALPHA;
    var defaultBlendFuncDst = gl.ONE_MINUS_SRC_ALPHA;
    var defaultCullFace = gl.BACK;
    var defaultFrontFace = gl.CCW;
    var defaultStencilFunc = gl.ALWAYS;
    var defaultStencilOp = gl.KEEP;
    var currentState = {
        depthTestEnable: true,
        blendEnable: false,
        cullFaceEnable: true,
        stencilTestEnable: false,
        polygonOffsetFillEnable: false,
        depthMask: true,
        depthFunc: defaultDepthFunc,
        blendSrc: defaultBlendFuncSrc,
        blendDst: defaultBlendFuncDst,
        cullFace: defaultCullFace,
        frontFace: defaultFrontFace,
        colorMask: [
            true, 
            true, 
            true, 
            true
        ],
        stencilFunc: defaultStencilFunc,
        stencilRef: 0,
        stencilMask: 0xffffffff,
        stencilFail: defaultStencilOp,
        stencilZFail: defaultStencilOp,
        stencilZPass: defaultStencilOp,
        polygonOffsetFactor: 0,
        polygonOffsetUnits: 0,
        lineWidth: 1,
        renderStatesToReset: [],
        viewportBox: [
            0, 
            0, 
            width, 
            height
        ],
        scissorBox: [
            0, 
            0, 
            width, 
            height
        ],
        clearColor: [
            0, 
            0, 
            0, 
            1
        ],
        clearDepth: 1.0,
        clearStencil: 0,
        activeTextureUnit: 0,
        maxTextureUnit: maxTextureUnit,
        lastMaxTextureUnit: 0,
        textureUnits: textureUnits,
        program: null
    };
    gd.state = currentState;
    if(debug) {
        gd.metrics = {
            renderTargetChanges: 0,
            textureChanges: 0,
            renderStateChanges: 0,
            vertexBufferChanges: 0,
            indexBufferChanges: 0,
            techniqueChanges: 0,
            drawCalls: 0,
            primitives: 0,
            addPrimitives: function addPrimitivesFn(primitive, count) {
                this.drawCalls += 1;
                switch(primitive) {
                    case 0x0000:
                        //POINTS
                        this.primitives += count;
                        break;
                    case 0x0001:
                        //LINES
                        this.primitives += (count >> 1);
                        break;
                    case 0x0002:
                        //LINE_LOOP
                        this.primitives += count;
                        break;
                    case 0x0003:
                        //LINE_STRIP
                        this.primitives += count - 1;
                        break;
                    case 0x0004:
                        //TRIANGLES
                        this.primitives += (count / 3) | 0;
                        break;
                    case 0x0005:
                        //TRIANGLE_STRIP
                        this.primitives += count - 2;
                        break;
                    case 0x0006:
                        //TRIANGLE_FAN
                        this.primitives += count - 2;
                        break;
                }
            }
        };
    }
    // State handlers
    function setDepthTestEnable(enable) {
        if(currentState.depthTestEnable !== enable) {
            currentState.depthTestEnable = enable;
            if(enable) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setDepthFunc(func) {
        if(currentState.depthFunc !== func) {
            currentState.depthFunc = func;
            gl.depthFunc(func);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setDepthMask(enable) {
        if(currentState.depthMask !== enable) {
            currentState.depthMask = enable;
            gl.depthMask(enable);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setBlendEnable(enable) {
        if(currentState.blendEnable !== enable) {
            currentState.blendEnable = enable;
            if(enable) {
                gl.enable(gl.BLEND);
            } else {
                gl.disable(gl.BLEND);
            }
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setBlendFunc(src, dst) {
        if(currentState.blendSrc !== src || currentState.blendDst !== dst) {
            currentState.blendSrc = src;
            currentState.blendDst = dst;
            gl.blendFunc(src, dst);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setCullFaceEnable(enable) {
        if(currentState.cullFaceEnable !== enable) {
            currentState.cullFaceEnable = enable;
            if(enable) {
                gl.enable(gl.CULL_FACE);
            } else {
                gl.disable(gl.CULL_FACE);
            }
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setCullFace(face) {
        if(currentState.cullFace !== face) {
            currentState.cullFace = face;
            gl.cullFace(face);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setFrontFace(face) {
        if(currentState.frontFace !== face) {
            currentState.frontFace = face;
            gl.frontFace(face);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setColorMask(mask0, mask1, mask2, mask3) {
        var colorMask = currentState.colorMask;
        if(colorMask[0] !== mask0 || colorMask[1] !== mask1 || colorMask[2] !== mask2 || colorMask[3] !== mask3) {
            colorMask[0] = mask0;
            colorMask[1] = mask1;
            colorMask[2] = mask2;
            colorMask[3] = mask3;
            gl.colorMask(mask0, mask1, mask2, mask3);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setStencilTestEnable(enable) {
        if(currentState.stencilTestEnable !== enable) {
            currentState.stencilTestEnable = enable;
            if(enable) {
                gl.enable(gl.STENCIL_TEST);
            } else {
                gl.disable(gl.STENCIL_TEST);
            }
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setStencilFunc(stencilFunc, stencilRef, stencilMask) {
        if(currentState.stencilFunc !== stencilFunc || currentState.stencilRef !== stencilRef || currentState.stencilMask !== stencilMask) {
            currentState.stencilFunc = stencilFunc;
            currentState.stencilRef = stencilRef;
            currentState.stencilMask = stencilMask;
            gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setStencilOp(stencilFail, stencilZfail, stencilZpass) {
        if(currentState.stencilFail !== stencilFail || currentState.stencilZFail !== stencilZfail || currentState.stencilZPass !== stencilZpass) {
            currentState.stencilFail = stencilFail;
            currentState.stencilZFail = stencilZfail;
            currentState.stencilZPass = stencilZpass;
            gl.stencilOp(stencilFail, stencilZfail, stencilZpass);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setPolygonOffsetFillEnable(enable) {
        if(currentState.polygonOffsetFillEnable !== enable) {
            currentState.polygonOffsetFillEnable = enable;
            if(enable) {
                gl.enable(gl.POLYGON_OFFSET_FILL);
            } else {
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setPolygonOffset(factor, units) {
        if(currentState.polygonOffsetFactor !== factor || currentState.polygonOffsetUnits !== units) {
            currentState.polygonOffsetFactor = factor;
            currentState.polygonOffsetUnits = units;
            gl.polygonOffset(factor, units);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function setLineWidth(lineWidth) {
        if(currentState.lineWidth !== lineWidth) {
            currentState.lineWidth = lineWidth;
            gl.lineWidth(lineWidth);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetDepthTestEnable() {
        //setDepthTestEnable(true);
        if(!currentState.depthTestEnable) {
            currentState.depthTestEnable = true;
            gl.enable(gl.DEPTH_TEST);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetDepthFunc() {
        //setDepthFunc(defaultDepthFunc);
        var func = defaultDepthFunc;
        if(currentState.depthFunc !== func) {
            currentState.depthFunc = func;
            gl.depthFunc(func);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetDepthMask() {
        //setDepthMask(true);
        if(!currentState.depthMask) {
            currentState.depthMask = true;
            gl.depthMask(true);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetBlendEnable() {
        //setBlendEnable(false);
        if(currentState.blendEnable) {
            currentState.blendEnable = false;
            gl.disable(gl.BLEND);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetBlendFunc() {
        //setBlendFunc(defaultBlendFuncSrc, defaultBlendFuncDst);
        var src = defaultBlendFuncSrc;
        var dst = defaultBlendFuncDst;
        if(currentState.blendSrc !== src || currentState.blendDst !== dst) {
            currentState.blendSrc = src;
            currentState.blendDst = dst;
            gl.blendFunc(src, dst);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetCullFaceEnable() {
        //setCullFaceEnable(true);
        if(!currentState.cullFaceEnable) {
            currentState.cullFaceEnable = true;
            gl.enable(gl.CULL_FACE);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetCullFace() {
        //setCullFace(defaultCullFace);
        var face = defaultCullFace;
        if(currentState.cullFace !== face) {
            currentState.cullFace = face;
            gl.cullFace(face);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetFrontFace() {
        //setFrontFace(defaultFrontFace);
        var face = defaultFrontFace;
        if(currentState.frontFace !== face) {
            currentState.frontFace = face;
            gl.frontFace(face);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetColorMask() {
        //setColorMask(true, true, true, true);
        var colorMask = currentState.colorMask;
        if(colorMask[0] !== true || colorMask[1] !== true || colorMask[2] !== true || colorMask[3] !== true) {
            colorMask[0] = true;
            colorMask[1] = true;
            colorMask[2] = true;
            colorMask[3] = true;
            gl.colorMask(true, true, true, true);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetStencilTestEnable() {
        //setStencilTestEnable(false);
        if(currentState.stencilTestEnable) {
            currentState.stencilTestEnable = false;
            gl.disable(gl.STENCIL_TEST);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetStencilFunc() {
        //setStencilFunc(defaultStencilFunc, 0, 0xffffffff);
        var stencilFunc = defaultStencilFunc;
        if(currentState.stencilFunc !== stencilFunc || currentState.stencilRef !== 0 || currentState.stencilMask !== 0xffffffff) {
            currentState.stencilFunc = stencilFunc;
            currentState.stencilRef = 0;
            currentState.stencilMask = 0xffffffff;
            gl.stencilFunc(stencilFunc, 0, 0xffffffff);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetStencilOp() {
        //setStencilOp(defaultStencilOp, defaultStencilOp, defaultStencilOp);
        var stencilOp = defaultStencilOp;
        if(currentState.stencilFail !== stencilOp || currentState.stencilZFail !== stencilOp || currentState.stencilZPass !== stencilOp) {
            currentState.stencilFail = stencilOp;
            currentState.stencilZFail = stencilOp;
            currentState.stencilZPass = stencilOp;
            gl.stencilOp(stencilOp, stencilOp, stencilOp);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetPolygonOffsetFillEnable() {
        //setPolygonOffsetFillEnable(false);
        if(currentState.polygonOffsetFillEnable) {
            currentState.polygonOffsetFillEnable = false;
            gl.disable(gl.POLYGON_OFFSET_FILL);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetPolygonOffset() {
        //setPolygonOffset(0, 0);
        if(currentState.polygonOffsetFactor !== 0 || currentState.polygonOffsetUnits !== 0) {
            currentState.polygonOffsetFactor = 0;
            currentState.polygonOffsetUnits = 0;
            gl.polygonOffset(0, 0);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function resetLineWidth() {
        //setLineWidth(1);
        if(currentState.lineWidth !== 1) {
            currentState.lineWidth = 1;
            gl.lineWidth(1);
            if(debug) {
                gd.metrics.renderStateChanges += 1;
            }
        }
    }
    function parseBoolean(state) {
        if(typeof state !== 'boolean') {
            return [
                (state ? true : false)
            ];
        }
        return [
            state
        ];
    }
    function parseEnum(state) {
        if(typeof state !== 'number') {
            // TODO
            return null;
        }
        return [
            state
        ];
    }
    function parseEnum2(state) {
        if(typeof state === 'object') {
            var value0 = state[0], value1 = state[1];
            if(typeof value0 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value1 !== 'number') {
                // TODO
                return null;
            }
            return [
                value0, 
                value1
            ];
        }
        return null;
    }
    function parseEnum3(state) {
        if(typeof state === 'object') {
            var value0 = state[0], value1 = state[1], value2 = state[2];
            if(typeof value0 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value1 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value2 !== 'number') {
                // TODO
                return null;
            }
            return [
                value0, 
                value1, 
                value2
            ];
        }
        return null;
    }
    function parseFloat(state) {
        if(typeof state !== 'number') {
            // TODO
            return null;
        }
        return [
            state
        ];
    }
    function parseFloat2(state) {
        if(typeof state === 'object') {
            var value0 = state[0], value1 = state[1];
            if(typeof value0 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value1 !== 'number') {
                // TODO
                return null;
            }
            return [
                value0, 
                value1
            ];
        }
        return null;
    }
    function parseColorMask(state) {
        if(typeof state === 'object') {
            var value0 = state[0], value1 = state[1], value2 = state[2], value3 = state[3];
            if(typeof value0 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value1 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value2 !== 'number') {
                // TODO
                return null;
            }
            if(typeof value3 !== 'number') {
                // TODO
                return null;
            }
            return [
                value0, 
                value1, 
                value2, 
                value3
            ];
        }
        return null;
    }
    var stateHandlers = {
    };
    var addStateHandler = function addStateHandlerFn(name, sf, rf, pf, dv) {
        stateHandlers[name] = {
            set: sf,
            reset: rf,
            parse: pf,
            defaultValues: dv
        };
    };
    addStateHandler("DepthTestEnable", setDepthTestEnable, resetDepthTestEnable, parseBoolean, [
        true
    ]);
    addStateHandler("DepthFunc", setDepthFunc, resetDepthFunc, parseEnum, [
        defaultDepthFunc
    ]);
    addStateHandler("DepthMask", setDepthMask, resetDepthMask, parseBoolean, [
        true
    ]);
    addStateHandler("BlendEnable", setBlendEnable, resetBlendEnable, parseBoolean, [
        false
    ]);
    addStateHandler("BlendFunc", setBlendFunc, resetBlendFunc, parseEnum2, [
        defaultBlendFuncSrc, 
        defaultBlendFuncDst
    ]);
    addStateHandler("CullFaceEnable", setCullFaceEnable, resetCullFaceEnable, parseBoolean, [
        true
    ]);
    addStateHandler("CullFace", setCullFace, resetCullFace, parseEnum, [
        defaultCullFace
    ]);
    addStateHandler("FrontFace", setFrontFace, resetFrontFace, parseEnum, [
        defaultFrontFace
    ]);
    addStateHandler("ColorMask", setColorMask, resetColorMask, parseColorMask, [
        true, 
        true, 
        true, 
        true
    ]);
    addStateHandler("StencilTestEnable", setStencilTestEnable, resetStencilTestEnable, parseBoolean, [
        false
    ]);
    addStateHandler("StencilFunc", setStencilFunc, resetStencilFunc, parseEnum3, [
        defaultStencilFunc, 
        0, 
        0xffffffff
    ]);
    addStateHandler("StencilOp", setStencilOp, resetStencilOp, parseEnum3, [
        defaultStencilOp, 
        defaultStencilOp, 
        defaultStencilOp
    ]);
    addStateHandler("PolygonOffsetFillEnable", setPolygonOffsetFillEnable, resetPolygonOffsetFillEnable, parseBoolean, [
        false
    ]);
    addStateHandler("PolygonOffset", setPolygonOffset, resetPolygonOffset, parseFloat2, [
        0, 
        0
    ]);
    addStateHandler("LineWidth", setLineWidth, resetLineWidth, parseFloat, [
        1
    ]);
    gd.stateHandlers = stateHandlers;
    gd.syncState();
    gd.videoRam = 0;
    gd.desktopWidth = window.screen.width;
    gd.desktopHeight = window.screen.height;
    if(Object.defineProperty) {
        Object.defineProperty(gd, "fullscreen", {
            get: function getFullscreenFn() {
                return (document.fullscreenEnabled || document.mozFullScreen || document.webkitIsFullScreen || false);
            },
            set: function setFullscreenFn(newFullscreen) {
                gd.requestFullScreen(newFullscreen);
            },
            enumerable: true,
            configurable: false
        });
        gd.checkFullScreen = function dummyCheckFullScreenFn() {
        };
    } else {
        gd.fullscreen = false;
        gd.oldFullscreen = false;
    }
    gd.clientStateMask = 0;
    gd.attributeMask = 0;
    gd.activeTechnique = null;
    gd.activeIndexBuffer = null;
    gd.bindedVertexBuffer = null;
    gd.activeRenderTarget = null;
    gd.immediateVertexBuffer = gd.createVertexBuffer({
        numVertices: (256 * 1024 / 16),
        attributes: [
            'FLOAT4'
        ],
        dynamic: true,
        'transient': true
    });
    gd.immediatePrimitive = -1;
    gd.immediateSemantics = WebGLSemantics.create(this, []);
    gd.fps = 0;
    gd.numFrames = 0;
    gd.previousFrameTime = TurbulenzEngine.getTime();
    // Need a temporary elements to test capabilities
    var video = document.createElement('video');
    var supportedVideoExtensions = {
    };
    if(video.canPlayType('video/webm')) {
        supportedVideoExtensions.webm = true;
    }
    if(video.canPlayType('video/mp4')) {
        supportedVideoExtensions.mp4 = true;
    }
    gd.supportedVideoExtensions = supportedVideoExtensions;
    video = null;
    return gd;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/inputdevice.ts */


function WebGLInputDevice() {
    return this;
}
WebGLInputDevice.prototype = {
    version: 1,
    update: // Public API
    function inputDeviceUpdateFn() {
        if(!this.isWindowFocused) {
            return;
        }
        this.updateGamePad();
    },
    addEventListener: function addEventListenerFn(eventType, eventListener) {
        var i;
        var length;
        var eventHandlers;
        if(this.handlers.hasOwnProperty(eventType)) {
            eventHandlers = this.handlers[eventType];
            if(eventListener) {
                // Check handler is not already stored
                length = eventHandlers.length;
                for(i = 0; i < length; i += 1) {
                    if(eventHandlers[i] === eventListener) {
                        // Event handler has already been added
                        return;
                    }
                }
                eventHandlers.push(eventListener);
            }
        }
    },
    removeEventListener: function removeEventListenerFn(eventType, eventListener) {
        var i;
        var length;
        var eventHandlers;
        if(this.handlers.hasOwnProperty(eventType)) {
            eventHandlers = this.handlers[eventType];
            if(eventListener) {
                length = eventHandlers.length;
                for(i = 0; i < length; i += 1) {
                    if(eventHandlers[i] === eventListener) {
                        eventHandlers.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    lockMouse: function lockMouseFn() {
        if(this.isHovering && this.isWindowFocused) {
            this.isMouseLocked = true;
            this.hideMouse();
            this.requestBrowserLock();
            this.setEventHandlersLock();
            return true;
        } else {
            return false;
        }
    },
    unlockMouse: function unlockMouseFn() {
        if(this.isMouseLocked) {
            this.isMouseLocked = false;
            this.showMouse();
            this.requestBrowserUnlock();
            this.setEventHandlersUnlock();
            if(this.isOutsideEngine) {
                this.isOutsideEngine = false;
                this.isHovering = false;
                this.setEventHandlersMouseLeave();
                // Send mouseout event
                this.sendEventToHandlers(this.handlers.mouseleave);
            }
            // Send mouselocklost event
            this.sendEventToHandlers(this.handlers.mouselocklost);
            return true;
        } else {
            return false;
        }
    },
    isLocked: function isLockedFn() {
        return this.isMouseLocked;
    },
    hideMouse: function hideMouseFn() {
        if(this.isHovering) {
            if(!this.isCursorHidden) {
                this.isCursorHidden = true;
                this.previousCursor = document.body.style.cursor;
                document.body.style.cursor = 'none';
                if(this.webkit) {
                    this.ignoreNextMouseMoves = 2;
                }
            }
            return true;
        } else {
            return false;
        }
    },
    showMouse: function showMouseFn() {
        if(this.isCursorHidden && !this.isMouseLocked) {
            this.isCursorHidden = false;
            document.body.style.cursor = this.previousCursor;
            return true;
        } else {
            return false;
        }
    },
    isHidden: function isHiddenFn() {
        return this.isCursorHidden;
    },
    isFocused: function isFocused() {
        return this.isWindowFocused;
    },
    convertToUnicode: // Cannot convert keycodes to unicode in javascript so return empty strings
    function convertToUnicodeFn(keyCodeArray) {
        var keyCodeToUnicode = this.keyCodeToUnicode;
        var result = {
        };
        var length = keyCodeArray.length;
        var i;
        var keyCode;
        for(i = 0; i < length; i += 1) {
            keyCode = keyCodeArray[i];
            result[keyCode] = keyCodeToUnicode[keyCode] || "";
        }
        return result;
    },
    keyCodes: // KeyCodes: List of key codes and their values
    {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        NUMBER_0: 100,
        NUMBER_1: 101,
        NUMBER_2: 102,
        NUMBER_3: 103,
        NUMBER_4: 104,
        NUMBER_5: 105,
        NUMBER_6: 106,
        NUMBER_7: 107,
        NUMBER_8: 108,
        NUMBER_9: 109,
        LEFT: 200,
        RIGHT: 201,
        UP: 202,
        DOWN: 203,
        LEFT_SHIFT: 300,
        RIGHT_SHIFT: 301,
        LEFT_CONTROL: 302,
        RIGHT_CONTROL: 303,
        LEFT_ALT: 304,
        RIGHT_ALT: 305,
        ESCAPE: 400,
        TAB: 401,
        SPACE: 402,
        BACKSPACE: 403,
        RETURN: 404,
        GRAVE: 500,
        MINUS: 501,
        EQUALS: 502,
        LEFT_BRACKET: 503,
        RIGHT_BRACKET: 504,
        SEMI_COLON: 505,
        APOSTROPHE: 506,
        COMMA: 507,
        PERIOD: 508,
        SLASH: 509,
        BACKSLASH: 510,
        F1: 600,
        F2: 601,
        F3: 602,
        F4: 603,
        F5: 604,
        F6: 605,
        F7: 606,
        F8: 607,
        F9: 608,
        F10: 609,
        F11: 610,
        F12: 611,
        NUMPAD_0: 612,
        NUMPAD_1: 613,
        NUMPAD_2: 614,
        NUMPAD_3: 615,
        NUMPAD_4: 616,
        NUMPAD_5: 617,
        NUMPAD_6: 618,
        NUMPAD_7: 619,
        NUMPAD_8: 620,
        NUMPAD_9: 621,
        NUMPAD_ENTER: 622,
        NUMPAD_DIVIDE: 623,
        NUMPAD_MULTIPLY: 624,
        NUMPAD_ADD: 625,
        NUMPAD_SUBTRACT: 626,
        LEFT_WIN: 627,
        RIGHT_WIN: 628,
        LEFT_OPTION: 629,
        RIGHT_OPTION: 630,
        CAPS_LOCK: 631,
        INSERT: 632,
        DELETE: 633,
        HOME: 634,
        END: 635,
        PAGE_UP: 636,
        PAGE_DOWN: 637,
        BACK: 638
    },
    mouseCodes: {
        BUTTON_0: 0,
        BUTTON_1: 1,
        BUTTON_2: 2,
        DELTA_X: 100,
        DELTA_Y: 101,
        MOUSE_WHEEL: 102
    },
    padCodes: {
        UP: 0,
        LEFT: 1,
        DOWN: 2,
        RIGHT: 3,
        A: 4,
        B: 5,
        X: 6,
        Y: 7,
        LEFT_TRIGGER: 8,
        RIGHT_TRIGGER: 9,
        LEFT_SHOULDER: 10,
        RIGHT_SHOULDER: 11,
        LEFT_THUMB: 12,
        LEFT_THUMB_X: 13,
        LEFT_THUMB_Y: 14,
        RIGHT_THUMB: 15,
        RIGHT_THUMB_X: 16,
        RIGHT_THUMB_Y: 17,
        START: 18,
        BACK: 19
    },
    sendEventToHandlers: // Private API
    function sendEventToHandlersFn(eventHandlers, arg0, arg1, arg2, arg3, arg4, arg5) {
        var i;
        var length = eventHandlers.length;
        if(length) {
            for(i = 0; i < length; i += 1) {
                eventHandlers[i](arg0, arg1, arg2, arg3, arg4, arg5);
            }
        }
    },
    sendEventToHandlersASync: function sendEventToHandlersASyncFn(handlers, a0, a1, a2, a3, a4, a5) {
        var sendEvent = WebGLInputDevice.prototype.sendEventToHandlers;
        TurbulenzEngine.setTimeout(function callSendEventToHandlersFn() {
            sendEvent(handlers, a0, a1, a2, a3, a4, a5);
        }, 0);
    },
    updateGamePad: function updateGamePadFn() {
        var magnitude;
        var normalizedMagnitude;
        var gamepads = (navigator.gamepads || navigator.webkitGamepads || (navigator.webkitGetGamepads && navigator.webkitGetGamepads()));
        if(gamepads) {
            var deadZone = this.padAxisDeadZone;
            var maxAxisRange = this.maxAxisRange;
            var sendEvent = this.sendEventToHandlersASync;
            var handlers = this.handlers;
            var padButtons = this.padButtons;
            var padMap = this.padMap;
            var leftThumbX = 0;
            var leftThumbY = 0;
            var rightThumbX = 0;
            var rightThumbY = 0;
            var numGamePads = gamepads.length;
            for(var i = 0; i < numGamePads; i += 1) {
                var gamepad = gamepads[i];
                if(gamepad) {
                    // Update button states
                    var buttons = gamepad.buttons;
                    if(this.padTimestampUpdate < gamepad.timestamp) {
                        this.padTimestampUpdate = gamepad.timestamp;
                        var numButtons = buttons.length;
                        for(var n = 0; n < numButtons; n += 1) {
                            var value = buttons[n];
                            if(padButtons[n] !== value) {
                                padButtons[n] = value;
                                var padCode = padMap[n];
                                if(padCode !== undefined) {
                                    if(value) {
                                        sendEvent(handlers.paddown, padCode);
                                    } else {
                                        sendEvent(handlers.padup, padCode);
                                    }
                                }
                            }
                        }
                    }
                    // Update axes states
                    var axes = gamepad.axes;
                    if(axes.length <= 4) {
                        // Axis 1 & 2
                        var lX = axes[0];
                        var lY = -axes[1];
                        magnitude = ((lX * lX) + (lY * lY));
                        if(magnitude > (deadZone * deadZone)) {
                            magnitude = Math.sqrt(magnitude);
                            // Normalize lX and lY
                            lX = (lX / magnitude);
                            lY = (lY / magnitude);
                            // Clip the magnitude at its max possible value
                            if(magnitude > maxAxisRange) {
                                magnitude = maxAxisRange;
                            }
                            // Adjust magnitude relative to the end of the dead zone
                            magnitude -= deadZone;
                            // Normalize the magnitude
                            normalizedMagnitude = (magnitude / (maxAxisRange - deadZone));
                            leftThumbX = (lX * normalizedMagnitude);
                            leftThumbY = (lY * normalizedMagnitude);
                        }
                        // Axis 3 & 4
                        var rX = axes[2];
                        var rY = -axes[3];
                        magnitude = ((rX * rX) + (rY * rY));
                        if(magnitude > (deadZone * deadZone)) {
                            magnitude = Math.sqrt(magnitude);
                            // Normalize lX and lY
                            rX = (rX / magnitude);
                            rY = (rY / magnitude);
                            // Clip the magnitude at its max possible value
                            if(magnitude > maxAxisRange) {
                                magnitude = maxAxisRange;
                            }
                            // Adjust magnitude relative to the end of the dead zone
                            magnitude -= deadZone;
                            // Normalize the magnitude
                            normalizedMagnitude = (magnitude / (maxAxisRange - deadZone));
                            rightThumbX = (rX * normalizedMagnitude);
                            rightThumbY = (rY * normalizedMagnitude);
                        }
                        sendEvent(handlers.padmove, leftThumbX, leftThumbY, buttons[6], rightThumbX, rightThumbY, buttons[7]);
                    }
                    // Our API only supports one active pad...
                    break;
                }
            }
        }
    },
    getLocale: // Cannot detect locale in canvas mode
    function getLocaleFn() {
        return "";
    },
    getCanvasPosition: // Returns the local coordinates of the event (i.e. position in Canvas coords)
    function getCanvasPositionFn(event, position) {
        if(event.offsetX !== undefined) {
            position.x = event.offsetX;
            position.y = event.offsetY;
        } else if(event.layerX !== undefined) {
            position.x = event.layerX;
            position.y = event.layerY;
        }
    },
    resetKeyStates: // Called when blurring
    function resetKeyStatesFn() {
        var k;
        var pressedKeys = this.pressedKeys;
        var keyUpHandlers = this.handlers.keyup;
        for(k in pressedKeys) {
            if(pressedKeys.hasOwnProperty(k) && pressedKeys[k]) {
                k = parseInt(k, 10);
                pressedKeys[k] = false;
                this.sendEventToHandlers(keyUpHandlers, k);
            }
        }
    },
    onMouseOver: // Private mouse event methods
    function onMouseOverFn(event) {
        var position = {
        };
        var mouseOverHandlers = this.handlers.mouseover;
        event.stopPropagation();
        event.preventDefault();
        this.getCanvasPosition(event, position);
        this.lastX = event.screenX;
        this.lastY = event.screenY;
        this.sendEventToHandlers(mouseOverHandlers, position.x, position.y);
    },
    onMouseMove: function onMouseMoveFn(event) {
        var mouseMoveHandlers = this.handlers.mousemove;
        var deltaX, deltaY;
        event.stopPropagation();
        event.preventDefault();
        if(this.ignoreNextMouseMoves) {
            this.ignoreNextMouseMoves -= 1;
            return;
        }
        if(event.movementX !== undefined) {
            deltaX = event.movementX;
            deltaY = event.movementY;
        } else if(event.mozMovementX !== undefined) {
            deltaX = event.mozMovementX;
            deltaY = event.mozMovementY;
        } else if(event.webkitMovementX !== undefined) {
            deltaX = event.webkitMovementX;
            deltaY = event.webkitMovementY;
        } else {
            deltaX = (event.screenX - this.lastX);
            deltaY = (event.screenY - this.lastY);
            if(0 === deltaX && 0 === deltaY) {
                return;
            }
        }
        this.lastX = event.screenX;
        this.lastY = event.screenY;
        this.sendEventToHandlers(mouseMoveHandlers, deltaX, deltaY);
    },
    onWheel: function onWheelFn(event) {
        var mouseWheelHandlers = this.handlers.mousewheel;
        var scrollDelta;
        event.stopPropagation();
        event.preventDefault();
        if(event.wheelDelta) {
            if(window.opera) {
                scrollDelta = event.wheelDelta < 0 ? 1 : -1;
            } else {
                scrollDelta = event.wheelDelta > 0 ? 1 : -1;
            }
        } else {
            scrollDelta = event.detail < 0 ? 1 : -1;
        }
        this.sendEventToHandlers(mouseWheelHandlers, scrollDelta);
    },
    emptyEvent: function emptyEventFn(event) {
        event.stopPropagation();
        event.preventDefault();
    },
    onWindowFocus: function onWindowFocusFn() {
        if(this.isHovering && window.document.activeElement === this.canvas) {
            this.addInternalEventListener(window, 'mousedown', this.onMouseDown);
        }
    },
    onFocus: function onFocusFn() {
        var canvas = this.canvas;
        var handlers = this.handlers;
        var focusHandlers = handlers.focus;
        if(!this.isWindowFocused) {
            this.isWindowFocused = true;
            window.focus();
            canvas.focus();
            this.setEventHandlersFocus();
            canvas.oncontextmenu = function () {
                return false;
            };
            this.sendEventToHandlers(focusHandlers);
        }
    },
    onBlur: function onBlurFn() {
        var canvas = this.canvas;
        var handlers = this.handlers;
        var blurHandlers = handlers.blur;
        if(this.isMouseLocked) {
            this.unlockMouse();
        }
        if(this.isWindowFocused) {
            this.isWindowFocused = false;
            this.resetKeyStates();
            this.setEventHandlersBlur();
            canvas.oncontextmenu = null;
            this.sendEventToHandlers(blurHandlers);
        }
    },
    onMouseDown: function onMouseDownFn(event) {
        var handlers = this.handlers;
        if(this.isHovering) {
            var mouseDownHandlers = handlers.mousedown;
            var button = event.button;
            var position = {
            };
            this.onFocus();
            event.stopPropagation();
            event.preventDefault();
            if(button < 3) {
                button = this.mouseMap[button];
            }
            this.getCanvasPosition(event, position);
            this.sendEventToHandlers(mouseDownHandlers, button, position.x, position.y);
        } else {
            this.onBlur();
        }
    },
    onMouseUp: function onMouseUpFn(event) {
        var mouseUpHandlers = this.handlers.mouseup;
        if(this.isHovering) {
            var button = event.button;
            var position = {
            };
            event.stopPropagation();
            event.preventDefault();
            if(button < 3) {
                button = this.mouseMap[button];
            }
            this.getCanvasPosition(event, position);
            this.sendEventToHandlers(mouseUpHandlers, button, position.x, position.y);
        }
    },
    onKeyDown: // Private key event methods
    function onKeyDownFn(event) {
        var keyDownHandlers = this.handlers.keydown;
        var pressedKeys = this.pressedKeys;
        var keyCodes = this.keyCodes;
        event.stopPropagation();
        event.preventDefault();
        var keyCode = event.keyCode;
        keyCode = this.keyMap[keyCode];
        var keyLocation = event.keyLocation || event.location;
        if(undefined !== keyCode && (keyCodes.ESCAPE !== keyCode)) {
            // Handle left / right key locations
            //   DOM_KEY_LOCATION_STANDARD = 0x00;
            //   DOM_KEY_LOCATION_LEFT     = 0x01;
            //   DOM_KEY_LOCATION_RIGHT    = 0x02;
            //   DOM_KEY_LOCATION_NUMPAD   = 0x03;
            //   DOM_KEY_LOCATION_MOBILE   = 0x04;
            //   DOM_KEY_LOCATION_JOYSTICK = 0x05;
            if(2 === keyLocation) {
                // The Turbulenz KeyCodes are such that CTRL, SHIFT
                // and ALT have their RIGHT versions exactly one above
                // the LEFT versions.
                keyCode = keyCode + 1;
            }
            if(!pressedKeys[keyCode]) {
                pressedKeys[keyCode] = true;
                this.sendEventToHandlers(keyDownHandlers, keyCode);
            }
        }
    },
    onKeyUp: function onKeyUpFn(event) {
        var keyUpHandlers = this.handlers.keyup;
        var pressedKeys = this.pressedKeys;
        var keyCodes = this.keyCodes;
        event.stopPropagation();
        event.preventDefault();
        var keyCode = event.keyCode;
        keyCode = this.keyMap[keyCode];
        var keyLocation = event.keyLocation || event.location;
        if(keyCode === keyCodes.ESCAPE) {
            this.unlockMouse();
        } else if(undefined !== keyCode) {
            // Handle LEFT / RIGHT.  (See OnKeyDown)
            if(2 === keyLocation) {
                keyCode = keyCode + 1;
            }
            if(pressedKeys[keyCode]) {
                pressedKeys[keyCode] = false;
                this.sendEventToHandlers(keyUpHandlers, keyCode);
                // Nasty hack for mac to deal with the missing KeyUp
                // signals when CMD is released.  #1016.
                if((627 === keyCode || 628 === keyCode) && (this.macosx)) {
                    this.resetKeyStates();
                }
            }
        }
    },
    onTouchStart: // Private touch event methods
    function onTouchStartFn(event) {
        var eventHandlers = this.handlers.touchstart;
        event.preventDefault();
        // Store new touches
        this.addTouches(event.changedTouches);
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        this.sendEventToHandlers(eventHandlers, event);
    },
    onTouchEnd: function onTouchEndFn(event) {
        var eventHandlers = this.handlers.touchend;
        event.preventDefault();
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        // Remove ended touches
        this.removeTouches(event.changedTouches);
        this.sendEventToHandlers(eventHandlers, event);
    },
    onTouchMove: function onTouchMoveFn(event) {
        var eventHandlers = this.handlers.touchmove;
        event.preventDefault();
        this.addTouches(event.changedTouches);
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        this.sendEventToHandlers(eventHandlers, event);
    },
    onTouchEnter: function onTouchEnterFn(event) {
        var eventHandlers = this.handlers.touchenter;
        event.preventDefault();
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        this.sendEventToHandlers(eventHandlers, event);
    },
    onTouchLeave: function onTouchLeaveFn(event) {
        var eventHandlers = this.handlers.touchleave;
        event.preventDefault();
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        this.sendEventToHandlers(eventHandlers, event);
    },
    onTouchCancel: function onTouchCancelFn(event) {
        var eventHandlers = this.handlers.touchcancel;
        event.preventDefault();
        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);
        // Remove canceled touches
        this.removeTouches(event.changedTouches);
        this.sendEventToHandlers(eventHandlers, event);
    },
    convertW3TouchEventToTurbulenzTouchEvent: function convertW3TouchEventToTurbulenzTouchEventFn(w3TouchEvent) {
        // Initialize changedTouches
        var changedTouches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.changedTouches);
        // Initialize gameTouches
        var gameTouches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.targetTouches);
        // Initialize touches
        var touches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.touches);
        var touchEventParams = {
            changedTouches: changedTouches,
            gameTouches: gameTouches,
            touches: touches
        };
        return WebGLTouchEvent.create(touchEventParams);
    },
    convertW3TouchListToTurbulenzTouchList: function convertW3TouchListToTurbulenzTouchListFn(w3TouchList) {
        // Set changedTouches
        var w3TouchListLength = w3TouchList.length;
        var touchList = [];
        var touch;
        var touchIndex;
        touchList.length = w3TouchListLength;
        for(touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1) {
            touch = this.getTouchById(w3TouchList[touchIndex].identifier);
            touchList[touchIndex] = touch;
        }
        return touchList;
    },
    convertW3TouchToTurbulenzTouch: function convertW3TouchToTurbulenzTouchFn(w3Touch) {
        var canvasElement = this.canvas;
        var canvasRect = canvasElement.getBoundingClientRect();
        var touchParams = {
            force: (w3Touch.force || w3Touch.webkitForce || 0),
            identifier: w3Touch.identifier,
            isGameTouch: (w3Touch.target === canvasElement),
            positionX: (w3Touch.pageX - canvasRect.left),
            positionY: (w3Touch.pageY - canvasRect.top),
            radiusX: (w3Touch.radiusX || w3Touch.webkitRadiusX || 1),
            radiusY: (w3Touch.radiusY || w3Touch.webkitRadiusY || 1),
            rotationAngle: (w3Touch.rotationAngle || w3Touch.webkitRotationAngle || 0)
        };
        return Touch.create(touchParams);
    },
    addTouches: function addTouchesFn(w3TouchList) {
        var w3TouchListLength = w3TouchList.length;
        var touchIndex;
        var touch;
        for(touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1) {
            touch = this.convertW3TouchToTurbulenzTouch(w3TouchList[touchIndex]);
            this.addTouch(touch);
        }
    },
    removeTouches: function removeTouchesFn(w3TouchList) {
        var w3TouchListLength = w3TouchList.length;
        var touchIndex;
        var touchId;
        for(touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1) {
            touchId = w3TouchList[touchIndex].identifier;
            this.removeTouchById(touchId);
        }
    },
    addTouch: function addTouchFn(touch) {
        this.touches[touch.identifier] = touch;
    },
    getTouchById: function getTouchByIdFn(id) {
        return this.touches[id];
    },
    removeTouchById: function removeTouchByIdFn(id) {
        delete this.touches[id];
    },
    canvasOnMouseOver: // Canvas event handlers
    function canvasOnMouseOverFn(event) {
        var mouseEnterHandlers = this.handlers.mouseenter;
        if(!this.isMouseLocked) {
            this.isHovering = true;
            this.lastX = event.screenX;
            this.lastY = event.screenY;
            this.setEventHandlersMouseEnter();
            // Send mouseover event
            this.sendEventToHandlers(mouseEnterHandlers);
        } else {
            this.isOutsideEngine = false;
        }
    },
    canvasOnMouseOut: function canvasOnMouseOutFn() {
        /* event */ var mouseLeaveHandlers = this.handlers.mouseleave;
        if(!this.isMouseLocked) {
            this.isHovering = false;
            if(this.isCursorHidden) {
                this.showMouse();
            }
            this.setEventHandlersMouseLeave();
            // Send mouseout event
            this.sendEventToHandlers(mouseLeaveHandlers);
        } else {
            this.isOutsideEngine = true;
        }
    },
    canvasOnMouseDown: // This is required in order to detect hovering when we missed the initial mouseover event
    function canvasOnMouseDownFn(event) {
        var mouseEnterHandlers = this.handlers.mouseenter;
        this.canvas.onmousedown = null;
        if(!this.isHovering) {
            this.isHovering = true;
            this.lastX = event.screenX;
            this.lastY = event.screenY;
            this.setEventHandlersMouseEnter();
            this.sendEventToHandlers(mouseEnterHandlers);
            this.onMouseDown(event);
        }
        return false;
    },
    onFullscreenChanged: // Window event handlers
    function onFullscreenChangedFn() {
        /* event */ if(this.isMouseLocked) {
            if(document.fullscreenEnabled || document.mozFullScreen || document.webkitIsFullScreen) {
                this.ignoreNextMouseMoves = 2// Some browsers will send 2 mouse events with a massive delta
                ;
                this.requestBrowserLock();
            } else {
                // Browsers capture the escape key whilst in fullscreen
                this.unlockMouse();
            }
        }
    },
    setEventHandlersMouseEnter: // Set event handler methods
    function setEventHandlersMouseEnterFn() {
        // Add event listener to get focus event
        if(!this.isFocused()) {
            this.addInternalEventListener(window, 'mousedown', this.onMouseDown);
        }
        this.addInternalEventListener(window, 'mouseup', this.onMouseUp);
        this.addInternalEventListener(window, 'mousemove', this.onMouseOver);
        this.addInternalEventListener(window, 'DOMMouseScroll', this.onWheel);
        this.addInternalEventListener(window, 'mousewheel', this.onWheel);
        this.addInternalEventListener(window, 'click', this.emptyEvent);
    },
    setEventHandlersMouseLeave: function setEventHandlersMouseLeaveFn() {
        // We do not need a mousedown listener if not focused
        if(!this.isFocused()) {
            this.removeInternalEventListener(window, 'mousedown', this.onMouseDown);
        }
        // Remove mouse event listeners
        this.removeInternalEventListener(window, 'mouseup', this.onMouseUp);
        this.removeInternalEventListener(window, 'mousemove', this.onMouseOver);
        this.removeInternalEventListener(window, 'DOMMouseScroll', this.onWheel);
        this.removeInternalEventListener(window, 'mousewheel', this.onWheel);
        this.removeInternalEventListener(window, 'click', this.emptyEvent);
    },
    setEventHandlersFocus: function setEventHandlersFocusFn() {
        this.addInternalEventListener(window, 'keydown', this.onKeyDown);
        this.addInternalEventListener(window, 'keyup', this.onKeyUp);
    },
    setEventHandlersBlur: function setEventHandlersBlurFn() {
        this.removeInternalEventListener(window, 'keydown', this.onKeyDown);
        this.removeInternalEventListener(window, 'keyup', this.onKeyUp);
        this.removeInternalEventListener(window, 'mousedown', this.onMouseDown);
    },
    setEventHandlersLock: function setEventHandlersLockFn() {
        this.removeInternalEventListener(window, 'mousemove', this.onMouseOver);
        this.addInternalEventListener(window, 'mousemove', this.onMouseMove);
        this.addInternalEventListener(window, 'fullscreenchange', this.onFullscreenChanged);
        this.addInternalEventListener(window, 'mozfullscreenchange', this.onFullscreenChanged);
        this.addInternalEventListener(window, 'webkitfullscreenchange', this.onFullscreenChanged);
    },
    setEventHandlersUnlock: function setEventHandlersUnlockFn() {
        this.removeInternalEventListener(window, 'webkitfullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'mozfullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'fullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'mousemove', this.onMouseMove);
        this.addInternalEventListener(window, 'mousemove', this.onMouseOver);
    },
    setEventHandlersCanvas: function setEventHandlersCanvasFn() {
        var canvas = this.canvas;
        this.addInternalEventListener(canvas, 'mouseover', this.canvasOnMouseOver);
        this.addInternalEventListener(canvas, 'mouseout', this.canvasOnMouseOut);
        this.addInternalEventListener(canvas, 'mousedown', this.canvasOnMouseDown);
    },
    setEventHandlersWindow: function setEventHandlersWindowFn() {
        this.addInternalEventListener(window, 'blur', this.onBlur);
        this.addInternalEventListener(window, 'focus', this.onWindowFocus);
    },
    removeEventHandlersWindow: function removeEventHandlersWindowFn() {
        this.removeInternalEventListener(window, 'blur', this.onBlur);
        this.removeInternalEventListener(window, 'focus', this.onWindowFocus);
    },
    setEventHandlersTouch: function setEventHandlersTouchFn() {
        var canvas = this.canvas;
        this.addInternalEventListener(canvas, 'touchstart', this.onTouchStart);
        this.addInternalEventListener(canvas, 'touchend', this.onTouchEnd);
        this.addInternalEventListener(canvas, 'touchenter', this.onTouchEnter);
        this.addInternalEventListener(canvas, 'touchleave', this.onTouchLeave);
        this.addInternalEventListener(canvas, 'touchmove', this.onTouchMove);
        this.addInternalEventListener(canvas, 'touchcancel', this.onTouchCancel);
    },
    addInternalEventListener: // Helper methods
    function addInternalEventListenerFn(element, eventName, eventHandler) {
        var elementEventFlag = this.elementEventFlags[element];
        if(!elementEventFlag) {
            this.elementEventFlags[element] = elementEventFlag = {
            };
        }
        if(!elementEventFlag[eventName]) {
            elementEventFlag[eventName] = true;
            var boundEventHandler = this.boundFunctions[eventHandler];
            if(!boundEventHandler) {
                this.boundFunctions[eventHandler] = boundEventHandler = eventHandler.bind(this);
            }
            element.addEventListener(eventName, boundEventHandler, false);
        }
    },
    removeInternalEventListener: function removeInternalEventListenerFn(element, eventName, eventHandler) {
        var elementEventFlag = this.elementEventFlags[element];
        if(elementEventFlag) {
            if(elementEventFlag[eventName]) {
                elementEventFlag[eventName] = false;
                var boundEventHandler = this.boundFunctions[eventHandler];
                element.removeEventListener(eventName, boundEventHandler, false);
            }
        }
    },
    destroy: function destroyFn() {
        // Remove all event listeners
        if(this.isLocked()) {
            this.setEventHandlersUnlock();
        }
        if(this.isHovering) {
            this.setEventHandlersMouseLeave();
        }
        if(this.isWindowFocused) {
            this.setEventHandlersBlur();
        }
        this.removeEventHandlersWindow();
        var canvas = this.canvas;
        canvas.onmouseover = null;
        canvas.onmouseout = null;
        canvas.onmousedown = null;
    },
    isSupported: function inputDevice_isSupportedFn(name) {
        var canvas = this.canvas;
        if((canvas) && (name === "POINTER_LOCK")) {
            // Currently Firefox requires full screen mode for pointer
            // lock to work.
            var fullscreenEnabled = (document.fullscreenEnabled || document.mozFullScreen || document.webkitIsFullScreen);
            // This check prevents allowing pointer lock in Firefox
            // until this requirement is removed.  Allows chrome to
            // lock whenever.
            var navStr = window.navigator.userAgent;
            var allowPointerLock = (navStr.indexOf('Chrome') >= 0) || fullscreenEnabled;
            var havePointerLock = ('pointerLockElement' in document) || ('mozPointerLockElement' in document) || ('webkitPointerLockElement' in document);
            var requestPointerLock = (canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock);
            if(allowPointerLock && havePointerLock && requestPointerLock) {
                return true;
            }
        }
        return false;
    }
};
// Constructor function
WebGLInputDevice.create = function webGLInputDeviceFn(canvas/*, params */ ) {
    var id = new WebGLInputDevice();
    id.lastX = 0;
    id.lastY = 0;
    id.touches = {
    };
    id.boundFunctions = {
    };
    id.elementEventFlags = {
    };
    id.canvas = canvas;
    id.isMouseLocked = false;
    id.isHovering = false;
    id.isWindowFocused = false;
    id.isCursorHidden = false;
    id.isOutsideEngine = false// Used for determining where we are when unlocking
    ;
    id.previousCursor = '';
    id.ignoreNextMouseMoves = 0;
    // Used to screen out auto-repeats, dictionary from keycode to bool,
    // true for each key currently pressed down
    id.pressedKeys = {
    };
    // Game event handlers
    id.handlers = {
        keydown: [],
        keyup: [],
        mousedown: [],
        mouseup: [],
        mousewheel: [],
        mouseover: [],
        mousemove: [],
        paddown: [],
        padup: [],
        padmove: [],
        mouseenter: [],
        mouseleave: [],
        focus: [],
        blur: [],
        mouselocklost: [],
        touchstart: [],
        touchend: [],
        touchenter: [],
        touchleave: [],
        touchmove: [],
        touchcancel: []
    };
    // Populate the keyCodeToUnicodeTable.  Just use the 'key' part of
    // the keycodes, overriding some special cases.
    var keyCodeToUnicodeTable = {
    };
    var keyCodes = id.keyCodes;
    for(var k in keyCodes) {
        if(keyCodes.hasOwnProperty(k)) {
            var code = keyCodes[k];
            keyCodeToUnicodeTable[code] = k;
        }
    }
    keyCodeToUnicodeTable[keyCodes.SPACE] = ' ';
    keyCodeToUnicodeTable[keyCodes.NUMBER_0] = '0';
    keyCodeToUnicodeTable[keyCodes.NUMBER_1] = '1';
    keyCodeToUnicodeTable[keyCodes.NUMBER_2] = '2';
    keyCodeToUnicodeTable[keyCodes.NUMBER_3] = '3';
    keyCodeToUnicodeTable[keyCodes.NUMBER_4] = '4';
    keyCodeToUnicodeTable[keyCodes.NUMBER_5] = '5';
    keyCodeToUnicodeTable[keyCodes.NUMBER_6] = '6';
    keyCodeToUnicodeTable[keyCodes.NUMBER_7] = '7';
    keyCodeToUnicodeTable[keyCodes.NUMBER_8] = '8';
    keyCodeToUnicodeTable[keyCodes.NUMBER_9] = '9';
    keyCodeToUnicodeTable[keyCodes.GRAVE] = '`';
    keyCodeToUnicodeTable[keyCodes.MINUS] = '-';
    keyCodeToUnicodeTable[keyCodes.EQUALS] = '=';
    keyCodeToUnicodeTable[keyCodes.LEFT_BRACKET] = '[';
    keyCodeToUnicodeTable[keyCodes.RIGHT_BRACKET] = ']';
    keyCodeToUnicodeTable[keyCodes.SEMI_COLON] = ';';
    keyCodeToUnicodeTable[keyCodes.APOSTROPHE] = "'";
    keyCodeToUnicodeTable[keyCodes.COMMA] = ',';
    keyCodeToUnicodeTable[keyCodes.PERIOD] = '.';
    keyCodeToUnicodeTable[keyCodes.SLASH] = '/';
    keyCodeToUnicodeTable[keyCodes.BACKSLASH] = '\\';
    // KeyMap: Maps JavaScript keycodes to Turbulenz keycodes - some
    // keycodes are consistent across all browsers and some mappings
    // are browser specific.
    var keyMap = {
    };
    // A-Z
    keyMap[65] = 0// A
    ;
    keyMap[66] = 1// B
    ;
    keyMap[67] = 2// C
    ;
    keyMap[68] = 3// D
    ;
    keyMap[69] = 4// E
    ;
    keyMap[70] = 5// F
    ;
    keyMap[71] = 6// G
    ;
    keyMap[72] = 7// H
    ;
    keyMap[73] = 8// I
    ;
    keyMap[74] = 9// J
    ;
    keyMap[75] = 10// K
    ;
    keyMap[76] = 11// L
    ;
    keyMap[77] = 12// M
    ;
    keyMap[78] = 13// N
    ;
    keyMap[79] = 14// O
    ;
    keyMap[80] = 15// P
    ;
    keyMap[81] = 16// Q
    ;
    keyMap[82] = 17// R
    ;
    keyMap[83] = 18// S
    ;
    keyMap[84] = 19// T
    ;
    keyMap[85] = 20// U
    ;
    keyMap[86] = 21// V
    ;
    keyMap[87] = 22// X
    ;
    keyMap[88] = 23// W
    ;
    keyMap[89] = 24// Y
    ;
    keyMap[90] = 25// Z
    ;
    // 0-9
    keyMap[48] = 100// 0
    ;
    keyMap[49] = 101// 1
    ;
    keyMap[50] = 102// 2
    ;
    keyMap[51] = 103// 3
    ;
    keyMap[52] = 104// 4
    ;
    keyMap[53] = 105// 5
    ;
    keyMap[54] = 106// 6
    ;
    keyMap[55] = 107// 7
    ;
    keyMap[56] = 108// 8
    ;
    keyMap[57] = 109// 9
    ;
    // Arrow keys
    keyMap[37] = 200// LEFT
    ;
    keyMap[39] = 201// RIGHT
    ;
    keyMap[38] = 202// UP
    ;
    keyMap[40] = 203// DOWN
    ;
    // Modifier keys
    keyMap[16] = 300// LEFT_SHIFT
    ;
    //keyMap[16] = 301; // RIGHT_SHIFT
    keyMap[17] = 302// LEFT_CONTROL
    ;
    //keyMap[17] = 303; // RIGHT_CONTROL
    keyMap[18] = 304// LEFT_ALT
    ;
    keyMap[0] = 305// RIGHT_ALT
    ;
    // Special keys
    keyMap[27] = 400// ESCAPE
    ;
    keyMap[9] = 401// TAB
    ;
    keyMap[32] = 402// SPACE
    ;
    keyMap[8] = 403// BACKSPACE
    ;
    keyMap[13] = 404// RETURN
    ;
    // Punctuation keys
    keyMap[223] = 500// GRAVE
    ;
    keyMap[173] = 501// MINUS (mozilla - gecko)
    ;
    keyMap[189] = 501// MINUS (ie + webkit)
    ;
    keyMap[61] = 502// EQUALS (mozilla - gecko)
    ;
    keyMap[187] = 502// EQUALS (ie + webkit)
    ;
    keyMap[219] = 503// LEFT_BRACKET
    ;
    keyMap[221] = 504// RIGHT_BRACKET
    ;
    keyMap[59] = 505// SEMI_COLON (mozilla - gecko)
    ;
    keyMap[186] = 505// SEMI_COLON (ie + webkit)
    ;
    keyMap[192] = 500// GRAVE
    ;
    keyMap[188] = 507// COMMA
    ;
    keyMap[190] = 508// PERIOD
    ;
    keyMap[222] = 506// APOSTROPHE
    ;
    // if Mac OS GRAVE can sometimes come through as 0
    if(navigator.appVersion.indexOf("Mac") !== -1) {
        keyMap[0] = 500// GRAVE (mac gecko + safari 5.1)
        ;
    }
    // Non-standard keys
    keyMap[112] = 600// F1
    ;
    keyMap[113] = 601// F2
    ;
    keyMap[114] = 602// F3
    ;
    keyMap[115] = 603// F4
    ;
    keyMap[116] = 604// F5
    ;
    keyMap[117] = 605// F6
    ;
    keyMap[118] = 606// F7
    ;
    keyMap[119] = 607// F8
    ;
    keyMap[120] = 608// F9
    ;
    keyMap[121] = 609// F10
    ;
    keyMap[122] = 610// F11
    ;
    keyMap[123] = 611// F12
    ;
    //keyMap[45 : 612, // NUMPAD_0 (numlock on/off)
    keyMap[96] = 612// NUMPAD_0 (numlock on/off)
    ;
    //keyMap[35] = 613;, // NUMPAD_1 (numlock on/off)
    keyMap[97] = 613// NUMPAD_1 (numlock on/off)
    ;
    //keyMap[40] = 614; // NUMPAD_2 (numlock on/off)
    keyMap[98] = 614// NUMPAD_2 (numlock on/off)
    ;
    //keyMap[34] = 615; // NUMPAD_3 (numlock on/off)
    keyMap[99] = 615// NUMPAD_3 (numlock on/off)
    ;
    //keyMap[37] = 616;, // NUMPAD_4 (numlock on/off)
    keyMap[100] = 616// NUMPAD_4 (numlock on/off)
    ;
    keyMap[12] = 617// NUMPAD_5 (numlock on/off)
    ;
    keyMap[101] = 617// NUMPAD_5 (numlock on/off)
    ;
    keyMap[144] = 617// NUMPAD_5 (numlock on/off) and NUMPAD_NUM
    ;
    //keyMap[39] = 618; // NUMPAD_6 (numlock on/off)
    keyMap[102] = 618// NUMPAD_6 (numlock on/off)
    ;
    //keyMap[36] = 619; // NUMPAD_7 (numlock on/off)
    keyMap[103] = 619// NUMPAD_7 (numlock on/off)
    ;
    //keyMap[38] = 620; // NUMPAD_8 (numlock on/off)
    keyMap[104] = 620// NUMPAD_8 (numlock on/off)
    ;
    //keyMap[33] = 621; // NUMPAD_9 (numlock on/off)
    keyMap[105] = 621// NUMPAD_9 (numlock on/off)
    ;
    //keyMap[13] = 622; // NUMPAD_ENTER (numlock on/off)
    keyMap[111] = 623// NUMPAD_DIVIDE (numlock on/off)
    ;
    keyMap[191] = 623// NUMPAD_DIVIDE (numlock on/off), mac chrome
    ;
    keyMap[106] = 624// NUMPAD_MULTIPLY (numlock on/off)
    ;
    keyMap[107] = 625// NUMPAD_ADD (numlock on/off)
    ;
    keyMap[109] = 626// NUMPAD_SUBTRACT (numlock on/off)
    ;
    keyMap[91] = 627// LEFT_WIN
    ;
    keyMap[224] = 627// LEFT_WIN (mac, firefox)
    ;
    keyMap[92] = 628// RIGHT_WIN
    ;
    keyMap[93] = 628// RIGHT_WIN (mac, chrome)
    ;
    //: 629, // LEFT_OPTION
    //: 630, // RIGHT_OPTION
    keyMap[20] = 631// CAPS_LOCK
    ;
    keyMap[45] = 632// INSERT
    ;
    keyMap[46] = 633// DELETE
    ;
    keyMap[36] = 634// HOME
    ;
    keyMap[35] = 635// END
    ;
    keyMap[33] = 636// PAGE_UP
    ;
    keyMap[34] = 637// PAGE_DOWN
    ;
    id.keyMap = keyMap;
    // MouseMap: Maps current mouse controls to new controls
    var mouseMap = {
        0: 0,
        1: 2,
        2: 1
    };
    id.mouseMap = mouseMap;
    // padMap: Maps current pad buttons to new buttons
    var padMap = {
        0: 4,
        1: // A
        5,
        2: // B
        6,
        3: // X
        7,
        4: // Y
        10,
        5: // LEFT_SHOULDER
        11,
        8: // RIGHT_SHOULDER
        19,
        9: // BACK
        18,
        10: // START
        12,
        11: // LEFT_THUMB
        15,
        12: // RIGHT_THUMB
        0,
        13: // UP
        2,
        14: // DOWN
        1,
        15: // LEFT
        3
    };
    // RIGHT
    id.padMap = padMap;
    id.keyCodeToUnicode = keyCodeToUnicodeTable;
    id.padButtons = [
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0
    ];
    id.padMap = padMap;
    id.padAxisDeadZone = 0.26;
    id.maxAxisRange = 1.0;
    id.padTimestampUpdate = 0;
    // Pointer locking
    var requestPointerLock = (canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock);
    if(requestPointerLock) {
        var exitPointerLock = (document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock);
        id.requestBrowserLock = function requestBrowserLockFn() {
            var pointerLockElement = (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
            if(pointerLockElement !== canvas) {
                requestPointerLock.call(canvas);
            }
        };
        id.requestBrowserUnlock = function requestBrowserUnlockFn() {
            var pointerLockElement = (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
            if(pointerLockElement === canvas) {
                exitPointerLock.call(document);
            }
        };
    } else {
        var pointer = (navigator.pointer || navigator.webkitPointer);
        if(pointer) {
            id.requestBrowserLock = function requestBrowserLockFn() {
                if(!pointer.isLocked) {
                    pointer.lock(canvas);
                }
            };
            id.requestBrowserUnlock = function requestBrowserUnlockFn() {
                if(pointer.isLocked) {
                    pointer.unlock();
                }
            };
        } else {
            id.requestBrowserLock = function requestBrowserLockFn() {
            };
            id.requestBrowserUnlock = function requestBrowserUnlockFn() {
            };
        }
    }
    // Add canvas mouse event listeners
    id.setEventHandlersCanvas();
    // Add window blur event listener
    id.setEventHandlersWindow();
    // Add canvas touch event listeners
    id.setEventHandlersTouch();
    // Record the platforms so that we can enable workarounds, etc.
    var sysInfo = TurbulenzEngine.getSystemInfo();
    id.macosx = ("Darwin" === sysInfo.osName);
    id.webkit = (/WebKit/.test(navigator.userAgent));
    return id;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/networkdevice.ts */

// Copyright (c) 2011-2012 Turbulenz Limited
/*global window*/
"use strict";

function WebGLNetworkDevice() {
    return this;
}
WebGLNetworkDevice.prototype = {
    version: 1,
    WebSocketConstructor: (window.WebSocket ? window.WebSocket : window.MozWebSocket),
    createWebSocket: function createWebSocketdFn(url, protocol) {
        var WebSocketConstructor = this.WebSocketConstructor;
        if(WebSocketConstructor) {
            var ws;
            if(protocol) {
                ws = new WebSocketConstructor(url, protocol);
            } else {
                ws = new WebSocketConstructor(url);
            }
            if(typeof ws.destroy === "undefined") {
                ws.destroy = function websocketDestroyFn() {
                    this.onopen = null;
                    this.onerror = null;
                    this.onclose = null;
                    this.onmessage = null;
                    this.close();
                };
            }
            return ws;
        } else {
            return null;
        }
    },
    update: function networkDeviceUpdateFn() {
    }
};
WebGLNetworkDevice.create = function networkDeviceCreateFn() {
    /* params */ var nd = new WebGLNetworkDevice();
    return nd;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/sounddevice.ts */

// Copyright (c) 2011-2013 Turbulenz Limited
/*global TurbulenzEngine: false*/
/*global SoundTARLoader: false*/
/*global Audio: false*/
/*global VMath: false*/
/*global window: false*/
/*global Uint8Array: false*/
"use strict";





//
// WebGLSound
//
function WebGLSound() {
    return this;
}
WebGLSound.prototype = {
    version: 1,
    destroy: function soundDestroyFn() {
        var audioContext = this.audioContext;
        if(audioContext) {
            delete this.audioContext;
            delete this.buffer;
        } else {
            delete this.audio;
        }
    }
};
WebGLSound.create = function webGLSoundCreateFn(sd, params) {
    var sound = new WebGLSound();
    var soundPath = params.src;
    sound.name = (params.name || soundPath);
    sound.frequency = 0;
    sound.channels = 0;
    sound.bitrate = 0;
    sound.length = 0;
    sound.compressed = (!params.uncompress);
    var onload = params.onload;
    var data, numSamples, numChannels, samplerRate;
    var audioContext = sd.audioContext;
    if(audioContext) {
        sound.audioContext = audioContext;
        var buffer;
        if(soundPath) {
            if(!sd.isResourceSupported(soundPath)) {
                if(onload) {
                    onload(null);
                }
                return null;
            }
            var bufferCreated = function bufferCreatedFn(buffer) {
                if(buffer) {
                    sound.buffer = buffer;
                    sound.frequency = buffer.sampleRate;
                    sound.channels = buffer.numberOfChannels;
                    sound.bitrate = (sound.frequency * sound.channels * 2 * 8);
                    sound.length = buffer.duration;
                    if(onload) {
                        onload(sound, 200);
                    }
                } else {
                    if(onload) {
                        onload(null);
                    }
                }
            };
            var bufferFailed = function bufferFailedFn() {
                if(onload) {
                    onload(null);
                }
            };
            data = params.data;
            if(data) {
                if(audioContext.decodeAudioData) {
                    audioContext.decodeAudioData(data, bufferCreated, bufferFailed);
                } else {
                    buffer = audioContext.createBuffer(data, false);
                    bufferCreated(buffer);
                }
            } else {
                var xhr;
                if(window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else if(window.ActiveXObject) {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                } else {
                    if(onload) {
                        onload(null);
                    }
                    return null;
                }
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === 4) {
                        if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                            var xhrStatus = xhr.status;
                            var xhrStatusText = (xhrStatus !== 0 && xhr.statusText || 'No connection');
                            var response = xhr.response;
                            // Sometimes the browser sets status to 200 OK when the connection is closed
                            // before the message is sent (weird!).
                            // In order to address this we fail any completely empty responses.
                            // Hopefully, nobody will get a valid response with no headers and no body!
                            if(xhr.getAllResponseHeaders() === "" && !response && xhrStatus === 200 && xhrStatusText === 'OK') {
                                if(onload) {
                                    onload(null);
                                }
                            } else if(xhrStatus === 200 || xhrStatus === 0) {
                                if(audioContext.decodeAudioData) {
                                    audioContext.decodeAudioData(response, bufferCreated, bufferFailed);
                                } else {
                                    var buffer = audioContext.createBuffer(response, false);
                                    bufferCreated(buffer);
                                }
                            } else {
                                if(onload) {
                                    onload(null);
                                }
                            }
                        }
                        // break circular reference
                        xhr.onreadystatechange = null;
                        xhr = null;
                    }
                };
                xhr.open("GET", soundPath, true);
                xhr.responseType = "arraybuffer";
                xhr.setRequestHeader("Content-Type", "text/plain");
                xhr.send(null);
            }
            return sound;
        } else {
            data = params.data;
            if(data) {
                numSamples = data.length;
                numChannels = (params.channels || 1);
                samplerRate = params.frequency;
                var contextSampleRate = Math.min(audioContext.sampleRate, 96000);
                var c, channel, i, j;
                if(contextSampleRate === samplerRate) {
                    buffer = audioContext.createBuffer(numChannels, (numSamples / numChannels), samplerRate);
                    // De-interleave data
                    for(c = 0; c < numChannels; c += 1) {
                        channel = buffer.getChannelData(c);
                        for(i = c , j = 0; i < numSamples; i += numChannels , j += 1) {
                            channel[j] = data[i];
                        }
                    }
                } else {
                    var ratio = (samplerRate / contextSampleRate);
                    /*jshint bitwise: false*/
                    var bufferLength = ((numSamples / (ratio * numChannels)) | 0);
                    /*jshint bitwise: true*/
                    buffer = audioContext.createBuffer(numChannels, bufferLength, contextSampleRate);
                    // De-interleave data
                    for(c = 0; c < numChannels; c += 1) {
                        channel = buffer.getChannelData(c);
                        for(j = 0; j < bufferLength; j += 1) {
                            /*jshint bitwise: false*/
                            channel[j] = data[c + (((j * ratio) | 0) * numChannels)];
                            /*jshint bitwise: true*/
                                                    }
                    }
                }
                if(buffer) {
                    sound.buffer = buffer;
                    sound.frequency = samplerRate;
                    sound.channels = numChannels;
                    sound.bitrate = (samplerRate * numChannels * 2 * 8);
                    sound.length = (numSamples / (samplerRate * numChannels));
                    if(onload) {
                        onload(sound, 200);
                    }
                    return sound;
                }
            }
        }
    } else {
        var audio;
        if(soundPath) {
            var extension = soundPath.slice(-3);
            data = params.data;
            if(data) {
                var dataArray;
                if(data instanceof Uint8Array) {
                    dataArray = data;
                } else {
                    dataArray = new Uint8Array(data);
                }
                // Check extension based on data
                if(dataArray[0] === 79 && dataArray[1] === 103 && dataArray[2] === 103 && dataArray[3] === 83) {
                    extension = 'ogg';
                    soundPath = 'data:audio/ogg;base64,';
                } else if(dataArray[0] === 82 && dataArray[1] === 73 && dataArray[2] === 70 && dataArray[3] === 70) {
                    extension = 'wav';
                    soundPath = 'data:audio/wav;base64,';
                } else {
                    // Assume it's an mp3?
                    extension = 'mp3';
                    soundPath = 'data:audio/mpeg;base64,';
                }
                // Mangle data into a data URI
                soundPath = soundPath + (TurbulenzEngine).base64Encode(dataArray);
            }
            if(!sd.supportedExtensions[extension]) {
                if(onload) {
                    onload(null);
                }
                return null;
            }
            audio = new Audio();
            audio.preload = 'auto';
            audio.autobuffer = true;
            audio.src = soundPath;
            audio.onerror = function loadingSoundFailedFn() {
                /* e */ if(onload) {
                    onload(null);
                    onload = null;
                }
            };
            sd.addLoadingSound(function checkLoadedFn() {
                if(3 <= audio.readyState) {
                    sound.frequency = (audio.sampleRate || audio.mozSampleRate);
                    sound.channels = (audio.channels || audio.mozChannels);
                    sound.bitrate = (sound.frequency * sound.channels * 2 * 8);
                    sound.length = audio.duration;
                    if(audio.buffered && audio.buffered.length && 0 < audio.buffered.end(0)) {
                        if(isNaN(sound.length) || sound.length === Number.POSITIVE_INFINITY) {
                            sound.length = audio.buffered.end(0);
                        }
                        if(onload) {
                            onload(sound, 200);
                            onload = null;
                        }
                    } else {
                        // Make sure the data is actually loaded
                        var forceLoading = function forceLoadingFn() {
                            audio.pause();
                            audio.removeEventListener('play', forceLoading, false);
                            if(onload) {
                                onload(sound, 200);
                                onload = null;
                            }
                        };
                        audio.addEventListener('play', forceLoading, false);
                        audio.volume = 0;
                        audio.play();
                    }
                    return true;
                }
                return false;
            });
            sound.audio = audio;
            return sound;
        } else {
            data = params.data;
            if(data) {
                audio = new Audio();
                if(audio.mozSetup) {
                    numSamples = data.length;
                    numChannels = (params.channels || 1);
                    samplerRate = params.frequency;
                    audio.mozSetup(numChannels, samplerRate);
                    sound.data = data;
                    sound.frequency = samplerRate;
                    sound.channels = numChannels;
                    sound.bitrate = (samplerRate * numChannels * 2 * 8);
                    sound.length = (numSamples / (samplerRate * numChannels));
                    sound.audio = audio;
                    if(onload) {
                        onload(sound, 200);
                    }
                    return sound;
                } else {
                    audio = null;
                }
            }
        }
    }
    if(onload) {
        onload(null);
    }
    return null;
};
//
// WebGLSoundSource
//
function WebGLSoundSource() {
    return this;
}
WebGLSoundSource.prototype = {
    version: 1,
    play: // Public API
    function sourcePlayFn(sound, seek) {
        var audioContext = this.audioContext;
        if(audioContext) {
            var bufferNode = this.bufferNode;
            if(this.sound !== sound) {
                if(bufferNode) {
                    bufferNode.stop(0);
                }
            } else {
                if(bufferNode) {
                    return this.seek(seek);
                }
            }
            bufferNode = this.createBufferNode(sound);
            this.sound = sound;
            if(!this.playing) {
                this.playing = true;
                this.paused = false;
                this.sd.addPlayingSource(this);
            }
            if(seek === undefined) {
                seek = 0;
            }
            if(0 < seek) {
                var buffer = sound.buffer;
                if(bufferNode.loop) {
                    bufferNode.start(0, seek, buffer.duration);
                } else {
                    bufferNode.start(0, seek, (buffer.duration - seek));
                }
                this.playStart = (audioContext.currentTime - seek);
            } else {
                bufferNode.start(0);
                this.playStart = audioContext.currentTime;
            }
        } else {
            var audio;
            if(this.sound !== sound) {
                this.stop();
                if(sound.data) {
                    audio = new Audio();
                    audio.mozSetup(sound.channels, sound.frequency);
                } else {
                    audio = sound.audio.cloneNode(true);
                }
                this.sound = sound;
                this.audio = audio;
                audio.loop = this.looping;
                audio.addEventListener('ended', this.loopAudio, false);
            } else {
                if(this.playing && !this.paused) {
                    if(this.looping) {
                        return true;
                    }
                }
                audio = this.audio;
            }
            if(!this.playing) {
                this.playing = true;
                this.paused = false;
                this.sd.addPlayingSource(this);
            }
            if(seek === undefined) {
                seek = 0;
            }
            if(0.05 < Math.abs(audio.currentTime - seek)) {
                try  {
                    audio.currentTime = seek;
                } catch (e) {
                    // There does not seem to be any reliable way of seeking
                                    }
            }
            if(sound.data) {
                audio.mozWriteAudio(sound.data);
            } else {
                audio.play();
            }
        }
        return true;
    },
    stop: function sourceStopFn() {
        var playing = this.playing;
        if(playing) {
            this.playing = false;
            this.paused = false;
            var audioContext = this.audioContext;
            if(audioContext) {
                this.sound = null;
                var bufferNode = this.bufferNode;
                if(bufferNode) {
                    bufferNode.stop(0);
                    bufferNode.disconnect();
                    this.bufferNode = null;
                }
            } else {
                var audio = this.audio;
                if(audio) {
                    this.sound = null;
                    this.audio = null;
                    audio.pause();
                    audio.removeEventListener('ended', this.loopAudio, false);
                    audio = null;
                }
            }
            this.sd.removePlayingSource(this);
        }
        return playing;
    },
    pause: function sourcePauseFn() {
        if(this.playing) {
            if(!this.paused) {
                this.paused = true;
                var audioContext = this.audioContext;
                if(audioContext) {
                    this.playPaused = audioContext.currentTime;
                    this.bufferNode.stop(0);
                    this.bufferNode.disconnect();
                    this.bufferNode = null;
                } else {
                    this.audio.pause();
                }
                this.sd.removePlayingSource(this);
            }
            return true;
        }
        return false;
    },
    resume: function sourceResumeFn(seek) {
        if(this.paused) {
            this.paused = false;
            var audioContext = this.audioContext;
            if(audioContext) {
                if(seek === undefined) {
                    seek = (this.playPaused - this.playStart);
                }
                var bufferNode = this.createBufferNode(this.sound);
                if(0 < seek) {
                    var buffer = this.sound.buffer;
                    if(bufferNode.loop) {
                        bufferNode.start(0, seek, buffer.duration);
                    } else {
                        bufferNode.start(0, seek, (buffer.duration - seek));
                    }
                    this.playStart = (audioContext.currentTime - seek);
                } else {
                    bufferNode.start(0);
                    this.playStart = audioContext.currentTime;
                }
            } else {
                var audio = this.audio;
                if(seek !== undefined) {
                    if(0.05 < Math.abs(audio.currentTime - seek)) {
                        try  {
                            audio.currentTime = seek;
                        } catch (e) {
                            // There does not seem to be any reliable way of seeking
                                                    }
                    }
                }
                audio.play();
            }
            this.sd.addPlayingSource(this);
            return true;
        }
        return false;
    },
    rewind: function sourceRewindFn() {
        if(this.playing) {
            var audioContext = this.audioContext;
            if(audioContext) {
                var bufferNode = this.bufferNode;
                if(bufferNode) {
                    bufferNode.stop(0);
                }
                bufferNode = this.createBufferNode(this.sound);
                bufferNode.start(0);
                this.playStart = audioContext.currentTime;
                return true;
            } else {
                var audio = this.audio;
                if(audio) {
                    audio.currentTime = 0;
                    return true;
                }
            }
        }
        return false;
    },
    seek: function sourceSeekFn(seek) {
        if(this.playing) {
            var audioContext = this.audioContext;
            if(audioContext) {
                if(0.05 < Math.abs((audioContext.currentTime - this.playStart) - seek)) {
                    var bufferNode = this.bufferNode;
                    if(bufferNode) {
                        bufferNode.stop(0);
                    }
                    bufferNode = this.createBufferNode(this.sound);
                    if(0 < seek) {
                        var buffer = this.sound.buffer;
                        if(bufferNode.loop) {
                            bufferNode.start(0, seek, buffer.duration);
                        } else {
                            bufferNode.start(0, seek, (buffer.duration - seek));
                        }
                        this.playStart = (audioContext.currentTime - seek);
                    } else {
                        bufferNode.start(0);
                        this.playStart = audioContext.currentTime;
                    }
                }
                return true;
            } else {
                var audio = this.audio;
                if(audio) {
                    // There does not seem to be any reliable way of seeking
                    if(audio.currentTime > seek) {
                        try  {
                            audio.currentTime = seek;
                        } catch (e) {
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    },
    clear: function sourceClearFn() {
        this.stop();
    },
    setAuxiliarySendFilter: function setAuxiliarySendFilterFn() {
    },
    setDirectFilter: function setDirectFilterFn() {
    },
    destroy: function sourceDestroyFn() {
        this.stop();
        var audioContext = this.audioContext;
        if(audioContext) {
            var pannerNode = this.pannerNode;
            if(pannerNode) {
                pannerNode.disconnect();
                delete this.pannerNode;
            }
            delete this.audioContext;
        }
    }
};
WebGLSoundSource.create = function webGLSoundSourceCreateFn(sd, id, params) {
    var source = new WebGLSoundSource();
    source.sd = sd;
    source.id = id;
    source.sound = null;
    source.playing = false;
    source.paused = false;
    var gain = (typeof params.gain === "number" ? params.gain : 1);
    var looping = (params.looping || false);
    var pitch = (params.pitch || 1);
    var position, direction, velocity;
    var audioContext = sd.audioContext;
    if(audioContext) {
        source.audioContext = audioContext;
        source.bufferNode = null;
        source.playStart = -1;
        source.playPaused = -1;
        var masterGainNode = sd.gainNode;
        var pannerNode = audioContext.createPanner();
        source.pannerNode = pannerNode;
        pannerNode.connect(masterGainNode);
        var gainNode = (audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode());
        source.gainNode = gainNode;
        if(sd.linearDistance) {
            if(typeof pannerNode.distanceModel === "string") {
                pannerNode.distanceModel = "linear";
            } else if(typeof pannerNode.LINEAR_DISTANCE === "number") {
                pannerNode.distanceModel = pannerNode.LINEAR_DISTANCE;
            }
        }
        if(typeof pannerNode.panningModel === "string") {
            pannerNode.panningModel = "equalpower";
        } else {
            pannerNode.panningModel = pannerNode.EQUALPOWER;
        }
        Object.defineProperty(source, "position", {
            get: function getPositionFn() {
                return position.slice();
            },
            set: function setPositionFn(newPosition) {
                position = VMath.v3Copy(newPosition, position);
                if(!source.relative) {
                    this.pannerNode.setPosition(newPosition[0], newPosition[1], newPosition[2]);
                }
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "direction", {
            get: function getDirectionFn() {
                return direction.slice();
            },
            set: function setDirectionFn(newDirection) {
                direction = VMath.v3Copy(newDirection, direction);
                this.pannerNode.setOrientation(newDirection[0], newDirection[1], newDirection[2]);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "velocity", {
            get: function getVelocityFn() {
                return velocity.slice();
            },
            set: function setVelocityFn(newVelocity) {
                velocity = VMath.v3Copy(newVelocity, velocity);
                this.pannerNode.setVelocity(newVelocity[0], newVelocity[1], newVelocity[2]);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "gain", {
            get: function getGainFn() {
                return gain;
            },
            set: function setGainFn(newGain) {
                gain = newGain;
                this.gainNode.gain.value = newGain;
            },
            enumerable: true,
            configurable: false
        });
        source.createBufferNode = function createBufferNodeFn(sound) {
            var buffer = sound.buffer;
            var bufferNode = audioContext.createBufferSource();
            bufferNode.buffer = buffer;
            bufferNode.loop = looping;
            bufferNode.playbackRate.value = pitch;
            bufferNode.connect(gainNode);
            gainNode.disconnect();
            if(1 < sound.channels) {
                // We do not support panning of stereo sources
                gainNode.connect(masterGainNode);
            } else {
                gainNode.connect(pannerNode);
            }
            // Backwards compatibility
            if(!bufferNode.start) {
                bufferNode.start = function audioStart(when, offset, duration) {
                    if(arguments.length <= 1) {
                        this.noteOn(when);
                    } else {
                        this.noteGrainOn(when, offset, duration);
                    }
                };
            }
            if(!bufferNode.stop) {
                bufferNode.stop = function audioStop(when) {
                    this.noteOff(when);
                };
            }
            this.bufferNode = bufferNode;
            return bufferNode;
        };
        Object.defineProperty(source, "looping", {
            get: function getLoopingFn() {
                return looping;
            },
            set: function setLoopingFn(newLooping) {
                looping = newLooping;
                var bufferNode = this.bufferNode;
                if(bufferNode) {
                    bufferNode.loop = newLooping;
                }
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "pitch", {
            get: function getPitchFn() {
                return pitch;
            },
            set: function setPitchFn(newPitch) {
                pitch = newPitch;
                var bufferNode = this.bufferNode;
                if(bufferNode) {
                    bufferNode.playbackRate.value = newPitch;
                }
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "tell", {
            get: function tellFn() {
                if(this.playing) {
                    if(this.paused) {
                        return (this.playPaused - this.playStart);
                    } else {
                        return (audioContext.currentTime - this.playStart);
                    }
                } else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "minDistance", {
            get: function getMinDistanceFn() {
                return pannerNode.refDistance;
            },
            set: function setMinDistanceFn(minDistance) {
                if(this.pannerNode.maxDistance === minDistance) {
                    minDistance = this.pannerNode.maxDistance * 0.999;
                }
                this.pannerNode.refDistance = minDistance;
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "maxDistance", {
            get: function getMaxDistanceFn() {
                return pannerNode.maxDistance;
            },
            set: function setMaxDistanceFn(maxDistance) {
                if(this.pannerNode.refDistance === maxDistance) {
                    maxDistance = this.pannerNode.refDistance * 1.001;
                }
                this.pannerNode.maxDistance = maxDistance;
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "rollOff", {
            get: function getRolloffFactorFn() {
                return pannerNode.rolloffFactor;
            },
            set: function setRolloffFactorFn(rollOff) {
                this.pannerNode.rolloffFactor = rollOff;
            },
            enumerable: true,
            configurable: false
        });
    } else {
        source.audio = null;
        source.gainFactor = 1;
        source.pitch = pitch;
        source.updateAudioVolume = function updateAudioVolumeFn() {
            var audio = this.audio;
            if(audio) {
                var volume = Math.min((this.gainFactor * gain), 1);
                audio.volume = volume;
                if(0 >= volume) {
                    audio.muted = true;
                } else {
                    audio.muted = false;
                }
            }
        };
        Object.defineProperty(source, "position", {
            get: function getPositionFn() {
                return position.slice();
            },
            set: function setPositionFn(newPosition) {
                position = VMath.v3Copy(newPosition, position);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "direction", {
            get: function getDirectionFn() {
                return direction.slice();
            },
            set: function setDirectionFn(newDirection) {
                direction = VMath.v3Copy(newDirection, direction);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "velocity", {
            get: function getVelocityFn() {
                return velocity.slice();
            },
            set: function setVelocityFn(newVelocity) {
                velocity = VMath.v3Copy(newVelocity, velocity);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(source, "gain", {
            get: function getGainFn() {
                return gain;
            },
            set: function setGainFn(newGain) {
                gain = newGain;
                source.gainFactor = -1;
            },
            enumerable: true,
            configurable: false
        });
        if(sd.loopingSupported) {
            Object.defineProperty(source, "looping", {
                get: function getLoopingFn() {
                    return looping;
                },
                set: function setLoopingFn(newLooping) {
                    looping = newLooping;
                    var audio = source.audio;
                    if(audio) {
                        audio.loop = newLooping;
                    }
                },
                enumerable: true,
                configurable: false
            });
            source.loopAudio = function loopAudioFn() {
                var audio = source.audio;
                if(audio) {
                    source.playing = false;
                    source.sd.removePlayingSource(source);
                }
            };
        } else {
            source.looping = looping;
            source.loopAudio = function loopAudioFn() {
                var audio = source.audio;
                if(audio) {
                    if(source.looping) {
                        audio.currentTime = 0;
                        audio.play();
                    } else {
                        source.playing = false;
                        source.sd.removePlayingSource(source);
                    }
                }
            };
        }
        Object.defineProperty(source, "tell", {
            get: function tellFn() {
                var audio = source.audio;
                if(audio) {
                    return audio.currentTime;
                } else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: false
        });
    }
    source.relative = params.relative;
    source.position = (params.position || VMath.v3BuildZero());
    source.direction = (params.direction || VMath.v3BuildZero());
    source.velocity = (params.velocity || VMath.v3BuildZero());
    source.minDistance = (params.minDistance || 1);
    source.maxDistance = (params.maxDistance || 3.402823466e+38);
    source.rollOff = (params.rollOff || 1);
    return source;
};
//
// WebGLSoundDevice
//
function WebGLSoundDevice() {
    return this;
}
WebGLSoundDevice.prototype = {
    version: 1,
    vendor: "Turbulenz",
    createSource: // Public API
    function createSourceFn(params) {
        this.lastSourceID += 1;
        return WebGLSoundSource.create(this, this.lastSourceID, params);
    },
    createSound: function createSoundFn(params) {
        return WebGLSound.create(this, params);
    },
    loadSoundsArchive: function loadSoundsArchiveFn(params) {
        var src = params.src;
        if(typeof SoundTARLoader !== 'undefined') {
            SoundTARLoader.create({
                sd: this,
                src: src,
                uncompress: params.uncompress,
                onsoundload: function tarSoundLoadedFn(texture) {
                    params.onsoundload(texture);
                },
                onload: function soundTarLoadedFn(success/*, status */ ) {
                    if(params.onload) {
                        params.onload(success);
                    }
                },
                onerror: function soundTarFailedFn() {
                    if(params.onload) {
                        params.onload(false);
                    }
                }
            });
            return true;
        } else {
            (TurbulenzEngine).callOnError('Missing archive loader required for ' + src);
            return false;
        }
    },
    createEffect: function createEffectFn() {
        /* params */ return null;
    },
    createEffectSlot: function createEffectSlotFn() {
        /* params */ return null;
    },
    createFilter: function createFilterFn() {
        /* params */ return null;
    },
    update: function soundUpdateFn() {
        var sqrt = Math.sqrt;
        var listenerTransform = this.listenerTransform;
        var listenerPosition0 = listenerTransform[9];
        var listenerPosition1 = listenerTransform[10];
        var listenerPosition2 = listenerTransform[11];
        var listenerGain = this.listenerGain;
        var linearDistance = this.linearDistance;
        var playingSources = this.playingSources;
        var id;
        for(id in playingSources) {
            if(playingSources.hasOwnProperty(id)) {
                var source = playingSources[id];
                // Change volume depending on distance to listener
                var minDistance = source.minDistance;
                var maxDistance = source.maxDistance;
                var position = source.position;
                var position0 = position[0];
                var position1 = position[1];
                var position2 = position[2];
                var distanceSq;
                if(source.relative) {
                    distanceSq = ((position0 * position0) + (position1 * position1) + (position2 * position2));
                } else {
                    var delta0 = (listenerPosition0 - position0);
                    var delta1 = (listenerPosition1 - position1);
                    var delta2 = (listenerPosition2 - position2);
                    distanceSq = ((delta0 * delta0) + (delta1 * delta1) + (delta2 * delta2));
                }
                var gainFactor;
                if(distanceSq <= (minDistance * minDistance)) {
                    gainFactor = 1;
                } else if(distanceSq >= (maxDistance * maxDistance)) {
                    gainFactor = 0;
                } else {
                    var distance = sqrt(distanceSq);
                    if(linearDistance) {
                        gainFactor = ((maxDistance - distance) / (maxDistance - minDistance));
                    } else {
                        gainFactor = minDistance / (minDistance + (source.rollOff * (distance - minDistance)));
                    }
                }
                gainFactor *= listenerGain;
                if(source.gainFactor !== gainFactor) {
                    source.gainFactor = gainFactor;
                    source.updateAudioVolume();
                }
            }
        }
    },
    isSupported: function isSupportedFn(name) {
        if("FILEFORMAT_OGG" === name) {
            return this.supportedExtensions.ogg;
        } else if("FILEFORMAT_MP3" === name) {
            return this.supportedExtensions.mp3;
        } else if("FILEFORMAT_WAV" === name) {
            return this.supportedExtensions.wav;
        }
        return false;
    },
    addLoadingSound: // Private API
    function addLoadingSoundFn(soundCheckCall) {
        var loadingSounds = this.loadingSounds;
        loadingSounds[loadingSounds.length] = soundCheckCall;
        var loadingInterval = this.loadingInterval;
        var that = this;
        if(loadingInterval === null) {
            this.loadingInterval = loadingInterval = window.setInterval(function checkLoadingSources() {
                var numLoadingSounds = loadingSounds.length;
                var n = 0;
                do {
                    var soundCheck = loadingSounds[n];
                    if(soundCheck()) {
                        numLoadingSounds -= 1;
                        if(n < numLoadingSounds) {
                            loadingSounds[n] = loadingSounds[numLoadingSounds];
                        }
                        loadingSounds.length = numLoadingSounds;
                    } else {
                        n += 1;
                    }
                }while(n < numLoadingSounds);
                if(numLoadingSounds === 0) {
                    window.clearInterval(loadingInterval);
                    that.loadingInterval = null;
                }
            }, 100);
        }
    },
    addPlayingSource: function addPlayingSourceFn(source) {
        this.playingSources[source.id] = source;
    },
    removePlayingSource: function removePlayingSourceFn(source) {
        delete this.playingSources[source.id];
    },
    isResourceSupported: function isResourceSupportedFn(soundPath) {
        var extension = soundPath.slice(-3).toLowerCase();
        return this.supportedExtensions[extension];
    },
    destroy: function soundDeviceDestroyFn() {
        var loadingInterval = this.loadingInterval;
        if(loadingInterval !== null) {
            window.clearInterval(loadingInterval);
            this.loadingInterval = null;
        }
        var loadingSounds = this.loadingSounds;
        if(loadingSounds) {
            loadingSounds.length = 0;
            this.loadingSounds = null;
        }
        var playingSources = this.playingSources;
        var id;
        if(playingSources) {
            for(id in playingSources) {
                if(playingSources.hasOwnProperty(id)) {
                    var source = playingSources[id];
                    if(source) {
                        source.stop();
                    }
                }
            }
            this.playingSources = null;
        }
    }
};
// Constructor function
WebGLSoundDevice.create = function webGLSoundDeviceFn(params) {
    var sd = new WebGLSoundDevice();
    sd.extensions = '';
    sd.renderer = 'HTML5 Audio';
    sd.alcVersion = "0";
    sd.alcExtensions = '';
    sd.alcEfxVersion = "0";
    sd.alcMaxAuxiliarySends = 0;
    sd.deviceSpecifier = (params.deviceSpecifier || null);
    sd.frequency = (params.frequency || 44100);
    sd.dopplerFactor = (params.dopplerFactor || 1);
    sd.dopplerVelocity = (params.dopplerVelocity || 1);
    sd.speedOfSound = (params.speedOfSound || 343.29998779296875);
    sd.linearDistance = (params.linearDistance !== undefined ? params.linearDistance : true);
    sd.loadingSounds = [];
    sd.loadingInterval = null;
    sd.playingSources = {
    };
    sd.lastSourceID = 0;
    var AudioContextConstructor = (window.AudioContext || window.webkitAudioContext);
    if(AudioContextConstructor) {
        var audioContext;
        try  {
            audioContext = new AudioContextConstructor();
        } catch (error) {
            (TurbulenzEngine).callOnError('Failed to create AudioContext:' + error);
            return null;
        }
        if(audioContext.sampleRate === 0) {
            return null;
        }
        sd.renderer = 'WebAudio';
        sd.audioContext = audioContext;
        sd.frequency = audioContext.sampleRate;
        sd.gainNode = (audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode());
        sd.gainNode.connect(audioContext.destination);
        var listener = audioContext.listener;
        listener.dopplerFactor = sd.dopplerFactor;
        listener.speedOfSound = sd.speedOfSound;
        var listenerTransform, listenerVelocity;
        Object.defineProperty(sd, "listenerTransform", {
            get: function getListenerTransformFn() {
                return listenerTransform.slice();
            },
            set: function setListenerTransformFn(transform) {
                listenerTransform = VMath.m43Copy(transform, listenerTransform);
                var position0 = transform[9];
                var position1 = transform[10];
                var position2 = transform[11];
                listener.setPosition(position0, position1, position2);
                listener.setOrientation(-transform[6], -transform[7], -transform[8], transform[3], transform[4], transform[5]);
            },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(sd, "listenerVelocity", {
            get: function getListenerVelocityFn() {
                return listenerVelocity.slice();
            },
            set: function setListenerVelocityFn(velocity) {
                listenerVelocity = VMath.v3Copy(velocity, listenerVelocity);
                listener.setVelocity(velocity[0], velocity[1], velocity[2]);
            },
            enumerable: true,
            configurable: false
        });
        sd.update = function soundDeviceUpdate() {
            this.gainNode.gain.value = this.listenerGain;
            var listenerPosition0 = listenerTransform[9];
            var listenerPosition1 = listenerTransform[10];
            var listenerPosition2 = listenerTransform[11];
            var playingSources = this.playingSources;
            var stopped = [];
            var id;
            for(id in playingSources) {
                if(playingSources.hasOwnProperty(id)) {
                    var source = playingSources[id];
                    var tell = (audioContext.currentTime - source.playStart);
                    if(source.bufferNode.buffer.duration < tell) {
                        if(source.looping) {
                            source.playStart = (audioContext.currentTime - (tell - source.bufferNode.buffer.duration));
                        } else {
                            source.playing = false;
                            source.sound = null;
                            source.bufferNode.disconnect();
                            source.bufferNode = null;
                            stopped[stopped.length] = id;
                            continue;
                        }
                    }
                    if(source.relative) {
                        var position = source.position;
                        var pannerNode = source.pannerNode;
                        pannerNode.setPosition(position[0] + listenerPosition0, position[1] + listenerPosition1, position[2] + listenerPosition2);
                    }
                }
            }
            var numStopped = stopped.length;
            var n;
            for(n = 0; n < numStopped; n += 1) {
                delete playingSources[stopped[n]];
            }
        };
    }
    sd.listenerTransform = (params.listenerTransform || VMath.m43BuildIdentity());
    sd.listenerVelocity = (params.listenerVelocity || VMath.v3BuildZero());
    sd.listenerGain = (typeof params.listenerGain === "number" ? params.listenerGain : 1);
    // Need a temporary Audio element to test capabilities
    var audio = new Audio();
    if(sd.audioContext) {
        sd.loopingSupported = true;
    } else {
        if(audio.mozSetup) {
            try  {
                audio.mozSetup(1, 22050);
            } catch (e) {
                return null;
            }
        }
        // Check for looping support
        sd.loopingSupported = (typeof audio.loop === 'boolean');
    }
    // Check for supported extensions
    var supportedExtensions = {
        ogg: false,
        mp3: false,
        wav: false
    };
    if(audio.canPlayType('application/ogg')) {
        supportedExtensions.ogg = true;
    }
    if(audio.canPlayType('audio/mp3')) {
        supportedExtensions.mp3 = true;
    }
    if(audio.canPlayType('audio/wav')) {
        supportedExtensions.wav = true;
    }
    sd.supportedExtensions = supportedExtensions;
    audio = null;
    return sd;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/soundtarloader.ts */

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global window*/
"use strict";
/// <reference path="sounddevice.ts" />
// Some old browsers had a broken implementation of ArrayBuffer without a "slice" method
if((typeof ArrayBuffer !== "undefined") && (ArrayBuffer.prototype !== undefined) && (ArrayBuffer.prototype.slice === undefined)) {
    ArrayBuffer.prototype.slice = function ArrayBufferSlice(s, e) {
        var length = this.byteLength;
        if(s === undefined) {
            s = 0;
        } else if(s < 0) {
            s += length;
        }
        if(e === undefined) {
            e = length;
        } else if(e < 0) {
            e += length;
        }
        length = (e - s);
        if(0 < length) {
            var src = new Uint8Array(this, s, length);
            var dst = new Uint8Array(src);
            return dst.buffer;
        } else {
            return new ArrayBuffer(0);
        }
    };
}

function SoundTARLoader() {
    return this;
}
SoundTARLoader.prototype = {
    version: 1,
    processBytes: function processBytesFn(bytes) {
        var offset = 0;
        var totalSize = bytes.length;
        function skip(limit) {
            offset += limit;
        }
        function getString(limit) {
            var index = offset;
            var nextOffset = (index + limit);
            var c = bytes[index];
            var ret;
            if(c && 0 < limit) {
                index += 1;
                var s = new Array(limit);
                var n = 0;
                do {
                    s[n] = c;
                    n += 1;
                    c = bytes[index];
                    index += 1;
                }while(c && n < limit);
                // remove padding whitespace
                while(s[n - 1] === 32) {
                    n -= 1;
                }
                s.length = n;
                ret = String.fromCharCode.apply(null, s);
            } else {
                ret = '';
            }
            offset = nextOffset;
            return ret;
        }
        function getNumber(text) {
            /*jshint regexp: false*/
            text = text.replace(/[^\d]/g, '');
            /*jshint regexp: true*/
            return parseInt('0' + text, 8);
        }
        var header = {
            fileName: null,
            length: //mode : null,
            //uid : null,
            //gid : null,
            0,
            fileType: //lastModified : null,
            //checkSum : null,
            null,
            ustarSignature: //linkName : null,
            null,
            fileNamePrefix: //ustarVersion : null,
            //ownerUserName : null,
            //ownerGroupName : null,
            //deviceMajor : null,
            //deviceMinor : null,
            null
        };
        function parseHeader(header) {
            header.fileName = getString(100);
            skip(8)//header.mode = getString(8);
            ;
            skip(8)//header.uid = getString(8);
            ;
            skip(8)//header.gid = getString(8);
            ;
            header.length = getNumber(getString(12));
            skip(12)//header.lastModified = getString(12);
            ;
            skip(8)//header.checkSum = getString(8);
            ;
            header.fileType = getString(1);
            skip(100)//header.linkName = getString(100);
            ;
            header.ustarSignature = getString(6);
            skip(2)//header.ustarVersion = getString(2);
            ;
            skip(32)//header.ownerUserName = getString(32);
            ;
            skip(32)//header.ownerGroupName = getString(32);
            ;
            skip(8)//header.deviceMajor = getString(8);
            ;
            skip(8)//header.deviceMinor = getString(8);
            ;
            header.fileNamePrefix = getString(155);
            offset += 12;
        }
        var sd = this.sd;
        var uncompress = this.uncompress;
        var onsoundload = this.onsoundload;
        var result = true;
        // This function is called for each sound in the archive,
        // synchronously if there is an immediate error,
        // asynchronously otherwise.  If one fails, the load result
        // for the whole archive is false.
        this.soundsLoading = 0;
        var that = this;
        function onload(sound) {
            that.soundsLoading -= 1;
            if(sound) {
                onsoundload(sound);
            } else {
                result = false;
            }
        }
        while((offset + 512) <= totalSize) {
            parseHeader(header);
            if(0 < header.length) {
                var fileName;
                if(header.fileName === "././@LongLink") {
                    // name in next chunk
                    fileName = getString(256);
                    offset += 256;
                    parseHeader(header);
                } else {
                    if(header.fileNamePrefix && header.ustarSignature === "ustar") {
                        fileName = (header.fileNamePrefix + header.fileName);
                    } else {
                        fileName = header.fileName;
                    }
                }
                if('' === header.fileType || '0' === header.fileType) {
                    //console.log('Loading "' + fileName + '" (' + header.length + ')');
                    this.soundsLoading += 1;
                    sd.createSound({
                        src: fileName,
                        data: (sd.audioContext ? bytes.buffer.slice(offset, (offset + header.length)) : bytes.subarray(offset, (offset + header.length))),
                        uncompress: uncompress,
                        onload: onload
                    });
                }
                offset += (Math.floor((header.length + 511) / 512) * 512);
            }
        }
        bytes = null;
        return result;
    },
    isValidHeader: function isValidHeaderFn() {
        /* header */ return true;
    }
};
// Constructor function
SoundTARLoader.create = function tgaLoaderFn(params) {
    var loader = new SoundTARLoader();
    loader.sd = params.sd;
    loader.uncompress = params.uncompress;
    loader.onsoundload = params.onsoundload;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    loader.soundsLoading = 0;
    var src = params.src;
    if(src) {
        loader.src = src;
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            if(params.onerror) {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';
                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if(xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK') {
                        loader.onload(false, 0);
                        return;
                    }
                    if(xhrStatus === 200 || xhrStatus === 0) {
                        var buffer;
                        if(xhr.responseType === "arraybuffer") {
                            buffer = xhr.response;
                        } else if(xhr.mozResponseArrayBuffer) {
                            buffer = xhr.mozResponseArrayBuffer;
                        } else//if (xhr.responseText !== null)
                         {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            var i;
                            buffer = [];
                            buffer.length = numChars;
                            for(i = 0; i < numChars; i += 1) {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                                                    }
                        // Fix for loading from file
                        if(xhrStatus === 0 && window.location.protocol === "file:") {
                            xhrStatus = 200;
                        }
                        // processBytes returns false if any of the
                        // entries in the archive was not supported or
                        // couldn't be loaded as a sound.
                        var archiveResult = loader.processBytes(new Uint8Array(buffer));
                        // Wait until all sounds have been loaded (or
                        // failed) and return the result.
                        if(loader.onload) {
                            var callOnload = function callOnloadFn() {
                                if(0 < loader.soundsLoading) {
                                    if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                                        window.setTimeout(callOnload, 100);
                                    }
                                } else {
                                    loader.onload(archiveResult, xhrStatus);
                                }
                            };
                            callOnload();
                        }
                    } else {
                        if(loader.onerror) {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if(xhr.hasOwnProperty && xhr.hasOwnProperty("responseType")) {
            xhr.responseType = "arraybuffer";
        } else if(xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        } else {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }
    return loader;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/tarloader.ts */

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global window*/
"use strict";


function TARLoader() {
    return this;
}
TARLoader.prototype = {
    version: 1,
    processBytes: function processBytesFn(bytes) {
        var offset = 0;
        var totalSize = bytes.length;
        function skip(limit) {
            offset += limit;
        }
        function getString(limit) {
            var index = offset;
            var nextOffset = (index + limit);
            var c = bytes[index];
            var ret;
            if(c && 0 < limit) {
                index += 1;
                var s = new Array(limit);
                var n = 0;
                do {
                    s[n] = c;
                    n += 1;
                    c = bytes[index];
                    index += 1;
                }while(c && n < limit);
                // remove padding whitespace
                while(s[n - 1] === 32) {
                    n -= 1;
                }
                s.length = n;
                ret = String.fromCharCode.apply(null, s);
            } else {
                ret = '';
            }
            offset = nextOffset;
            return ret;
        }
        function getNumber(text) {
            /*jshint regexp: false*/
            text = text.replace(/[^\d]/g, '');
            /*jshint regexp: true*/
            return parseInt('0' + text, 8);
        }
        var header = {
            fileName: null,
            length: //mode : null,
            //uid : null,
            //gid : null,
            0,
            fileType: //lastModified : null,
            //checkSum : null,
            null,
            ustarSignature: //linkName : null,
            null,
            fileNamePrefix: //ustarVersion : null,
            //ownerUserName : null,
            //ownerGroupName : null,
            //deviceMajor : null,
            //deviceMinor : null,
            null
        };
        function parseHeader(header) {
            header.fileName = getString(100);
            skip(8)//header.mode = getString(8);
            ;
            skip(8)//header.uid = getString(8);
            ;
            skip(8)//header.gid = getString(8);
            ;
            header.length = getNumber(getString(12));
            skip(12)//header.lastModified = getString(12);
            ;
            skip(8)//header.checkSum = getString(8);
            ;
            header.fileType = getString(1);
            skip(100)//header.linkName = getString(100);
            ;
            header.ustarSignature = getString(6);
            skip(2)//header.ustarVersion = getString(2);
            ;
            skip(32)//header.ownerUserName = getString(32);
            ;
            skip(32)//header.ownerGroupName = getString(32);
            ;
            skip(8)//header.deviceMajor = getString(8);
            ;
            skip(8)//header.deviceMinor = getString(8);
            ;
            header.fileNamePrefix = getString(155);
            offset += 12;
        }
        var gd = this.gd;
        var mipmaps = this.mipmaps;
        var ontextureload = this.ontextureload;
        var result = true;
        this.texturesLoading = 0;
        var that = this;
        function onload(texture) {
            that.texturesLoading -= 1;
            if(texture) {
                ontextureload(texture);
            } else {
                offset = totalSize;
                result = false;
            }
        }
        while((offset + 512) <= totalSize) {
            parseHeader(header);
            if(0 < header.length) {
                var fileName;
                if(header.fileName === "././@LongLink") {
                    // name in next chunk
                    fileName = getString(256);
                    offset += 256;
                    parseHeader(header);
                } else {
                    if(header.fileNamePrefix && header.ustarSignature === "ustar") {
                        fileName = (header.fileNamePrefix + header.fileName);
                    } else {
                        fileName = header.fileName;
                    }
                }
                if('' === header.fileType || '0' === header.fileType) {
                    //console.log('Loading "' + fileName + '" (' + header.length + ')');
                    this.texturesLoading += 1;
                    gd.createTexture({
                        src: fileName,
                        data: bytes.subarray(offset, (offset + header.length)),
                        mipmaps: mipmaps,
                        onload: onload
                    });
                }
                offset += (Math.floor((header.length + 511) / 512) * 512);
            }
        }
        bytes = null;
        return result;
    },
    isValidHeader: function isValidHeaderFn() {
        /* header */ return true;
    }
};
// Constructor function
TARLoader.create = function TarLoaderCreateFn(params) {
    var loader = new TARLoader();
    loader.gd = params.gd;
    loader.mipmaps = params.mipmaps;
    loader.ontextureload = params.ontextureload;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    loader.texturesLoading = 0;
    var src = params.src;
    if(src) {
        loader.src = src;
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            if(params.onerror) {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';
                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if(xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK') {
                        loader.onload(false, 0);
                        return;
                    }
                    if(xhrStatus === 200 || xhrStatus === 0) {
                        var buffer;
                        if(xhr.responseType === "arraybuffer") {
                            buffer = xhr.response;
                        } else if(xhr.mozResponseArrayBuffer) {
                            buffer = xhr.mozResponseArrayBuffer;
                        } else//if (xhr.responseText !== null)
                         {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for(var i = 0; i < numChars; i += 1) {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                                                    }
                        // Fix for loading from file
                        if(xhrStatus === 0 && window.location.protocol === "file:") {
                            xhrStatus = 200;
                        }
                        if(loader.processBytes(new Uint8Array(buffer))) {
                            if(loader.onload) {
                                var callOnload = function callOnloadFn() {
                                    if(0 < loader.texturesLoading) {
                                        if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                                            window.setTimeout(callOnload, 100);
                                        }
                                    } else {
                                        loader.onload(true, xhrStatus);
                                    }
                                };
                                callOnload();
                            }
                        } else {
                            if(loader.onerror) {
                                loader.onerror();
                            }
                        }
                    } else {
                        if(loader.onerror) {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if(xhr.hasOwnProperty && xhr.hasOwnProperty("responseType")) {
            xhr.responseType = "arraybuffer";
        } else if(xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        } else {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }
    return loader;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/tgaloader.ts */

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global Uint16Array*/
/*global window*/
"use strict";

function TGALoader() {
    return this;
}
TGALoader.prototype = {
    version: 1,
    TYPE_MAPPED: 1,
    TYPE_COLOR: 2,
    TYPE_GRAY: 3,
    TYPE_MAPPED_RLE: 9,
    TYPE_COLOR_RLE: 10,
    TYPE_GRAY_RLE: 11,
    DESC_ABITS: 0x0f,
    DESC_HORIZONTAL: 0x10,
    DESC_VERTICAL: 0x20,
    SIGNATURE: "TRUEVISION-XFILE",
    RLE_PACKETSIZE: 0x80,
    processBytes: function processBytesFn(bytes) {
        var header = this.parseHeader(bytes);
        if(!this.isValidHeader(header)) {
            return;
        }
        var offset = 18;
        this.width = header.width;
        this.height = header.height;
        this.bytesPerPixel = Math.floor(header.bpp / 8);
        /*jshint bitwise: false*/
        this.horzRev = (header.descriptor & this.DESC_HORIZONTAL);
        this.vertRev = !(header.descriptor & this.DESC_VERTICAL);
        /*jshint bitwise: true*/
        var rle = false;
        var gd = this.gd;
        switch(header.imageType) {
            case this.TYPE_MAPPED_RLE:
                rle = true;
                if(header.colorMapSize > 24) {
                    this.format = gd.PIXELFORMAT_R8G8B8A8;
                } else if(header.colorMapSize > 16) {
                    this.format = gd.PIXELFORMAT_R8G8B8;
                } else {
                    this.format = gd.PIXELFORMAT_R5G5B5A1;
                }
                break;
            case this.TYPE_MAPPED:
                if(header.colorMapSize > 24) {
                    this.format = gd.PIXELFORMAT_R8G8B8A8;
                } else if(header.colorMapSize > 16) {
                    this.format = gd.PIXELFORMAT_R8G8B8;
                } else {
                    this.format = gd.PIXELFORMAT_R5G5B5A1;
                }
                break;
            case this.TYPE_GRAY_RLE:
                rle = true;
                this.format = gd.PIXELFORMAT_L8;
                break;
            case this.TYPE_GRAY:
                this.format = gd.PIXELFORMAT_L8;
                break;
            case this.TYPE_COLOR_RLE:
                rle = true;
                switch(this.bytesPerPixel) {
                    case 4:
                        this.format = gd.PIXELFORMAT_R8G8B8A8;
                        break;
                    case 3:
                        this.format = gd.PIXELFORMAT_R8G8B8;
                        break;
                    case 2:
                        this.format = gd.PIXELFORMAT_R5G5B5A1;
                        break;
                    default:
                        return;
                }
                break;
            case this.TYPE_COLOR:
                switch(this.bytesPerPixel) {
                    case 4:
                        this.format = gd.PIXELFORMAT_R8G8B8A8;
                        break;
                    case 3:
                        this.format = gd.PIXELFORMAT_R8G8B8;
                        break;
                    case 2:
                        this.format = gd.PIXELFORMAT_R5G5B5A1;
                        break;
                    default:
                        return;
                }
                break;
            default:
                return;
        }
        // Skip the image ID field.
        if(header.idLength) {
            offset += header.idLength;
            if(offset > bytes.length) {
                return;
            }
        }
        if(this.TYPE_MAPPED_RLE === header.imageType || this.TYPE_MAPPED === header.imageType) {
            if(header.colorMapType !== 1) {
                return;
            }
        } else if(header.colorMapType !== 0) {
            return;
        }
        if(header.colorMapType === 1) {
            var index = header.colorMapIndex;
            var length = header.colorMapLength;
            if(length === 0) {
                return;
            }
            var pelbytes = Math.floor(header.colorMapSize / 8);
            var numColors = (length + index);
            var colorMap = [];
            colorMap.length = (numColors * pelbytes);
            this.colorMap = colorMap;
            this.colorMapBytesPerPixel = pelbytes;
            // Zero the entries up to the beginning of the map
            var j;
            for(j = 0; j < (index * pelbytes); j += 1) {
                colorMap[j] = 0;
            }
            // Read in the rest of the colormap
            for(j = (index * pelbytes); j < (index * pelbytes); j += 1 , offset += 1) {
                colorMap[j] = bytes[offset];
            }
            offset += (length * pelbytes);
            if(offset > bytes.length) {
                return;
            }
            if(pelbytes >= 3) {
                // Rearrange the colors from BGR to RGB
                for(j = (index * pelbytes); j < (length * pelbytes); j += pelbytes) {
                    var tmp = colorMap[j];
                    colorMap[j] = colorMap[j + 2];
                    colorMap[j + 2] = tmp;
                }
            }
        }
        var data = bytes.subarray(offset);
        bytes = null;
        if(rle) {
            data = this.expandRLE(data);
        }
        var size = (this.width * this.height * this.bytesPerPixel);
        if(data.length < size) {
            return;
        }
        if(this.horzRev) {
            this.flipHorz(data);
        }
        if(this.vertRev) {
            this.flipVert(data);
        }
        if(this.colorMap) {
            data = this.expandColorMap(data);
        } else if(2 < this.bytesPerPixel) {
            this.convertBGR2RGB(data);
        } else if(2 === this.bytesPerPixel) {
            data = this.convertARGB2RGBA(data);
        }
        this.data = data;
    },
    parseHeader: function parseHeaderFn(bytes) {
        /*jshint bitwise: false*/
        var header = {
            idLength: bytes[0],
            colorMapType: bytes[1],
            imageType: bytes[2],
            colorMapIndex: ((bytes[4] << 8) | bytes[3]),
            colorMapLength: ((bytes[6] << 8) | bytes[5]),
            colorMapSize: bytes[7],
            xOrigin: ((bytes[9] << 8) | bytes[8]),
            yOrigin: ((bytes[11] << 8) | bytes[10]),
            width: ((bytes[13] << 8) | bytes[12]),
            height: ((bytes[15] << 8) | bytes[14]),
            bpp: bytes[16],
            descriptor: // Image descriptor:
            // 3-0: attribute bpp
            // 4:   left-to-right
            // 5:   top-to-bottom
            // 7-6: zero
            bytes[17]
        };
        /*jshint bitwise: true*/
        return header;
    },
    isValidHeader: function isValidHeaderFn(header) {
        if(this.TYPE_MAPPED_RLE === header.imageType || this.TYPE_MAPPED === header.imageType) {
            if(header.colorMapType !== 1) {
                return false;
            }
        } else if(header.colorMapType !== 0) {
            return false;
        }
        if(header.colorMapType === 1) {
            if(header.colorMapLength === 0) {
                return false;
            }
        }
        switch(header.imageType) {
            case this.TYPE_MAPPED_RLE:
            case this.TYPE_MAPPED:
                break;
            case this.TYPE_GRAY_RLE:
            case this.TYPE_GRAY:
                break;
            case this.TYPE_COLOR_RLE:
            case this.TYPE_COLOR:
                switch(Math.floor(header.bpp / 8)) {
                    case 4:
                    case 3:
                    case 2:
                        break;
                    default:
                        return false;
                }
                break;
            default:
                return false;
        }
        if(16384 < header.width) {
            return false;
        }
        if(16384 < header.height) {
            return false;
        }
        return true;
    },
    expandRLE: function expandRLEFn(data) {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var datasize = pelbytes;
        var size = (width * height * pelbytes);
        var RLE_PACKETSIZE = this.RLE_PACKETSIZE;
        var dst = new Uint8Array(size);
        var src = 0, dest = 0, n, k;
        do {
            var count = data[src];
            src += 1;
            /*jshint bitwise: false*/
            var bytes = (((count & ~RLE_PACKETSIZE) + 1) * datasize);
            if(count & RLE_PACKETSIZE) {
                // Optimized case for single-byte encoded data
                if(datasize === 1) {
                    var r = data[src];
                    src += 1;
                    for(n = 0; n < bytes; n += 1) {
                        dst[dest + k] = r;
                    }
                } else {
                    // Fill the buffer with the next value
                    for(n = 0; n < datasize; n += 1) {
                        dst[dest + n] = data[src + n];
                    }
                    src += datasize;
                    for(k = datasize; k < bytes; k += datasize) {
                        for(n = 0; n < datasize; n += 1) {
                            dst[dest + k + n] = dst[dest + n];
                        }
                    }
                }
            } else {
                // Read in the buffer
                for(n = 0; n < bytes; n += 1) {
                    dst[dest + n] = data[src + n];
                }
                src += bytes;
            }
            /*jshint bitwise: true*/
            dest += bytes;
        }while(dest < size);
        return dst;
    },
    expandColorMap: function expandColorMapFn(data) {
        // Unpack image
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var size = (width * height * pelbytes);
        var dst = new Uint8Array(size);
        var dest = 0, src = 0;
        var palette = this.colorMap;
        delete this.colorMap;
        if(pelbytes === 2 || pelbytes === 3 || pelbytes === 4) {
            do {
                var index = (data[src] * pelbytes);
                src += 1;
                for(var n = 0; n < pelbytes; n += 1) {
                    dst[dest] = palette[index + n];
                    dest += 1;
                }
            }while(dest < size);
        }
        if(pelbytes === 2) {
            dst = this.convertARGB2RGBA(dst);
        }
        return dst;
    },
    flipHorz: function flipHorzFn(data) {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var halfWidth = Math.floor(width / 2);
        var pitch = (width * pelbytes);
        for(var i = 0; i < height; i += 1) {
            for(var j = 0; j < halfWidth; j += 1) {
                for(var k = 0; k < pelbytes; k += 1) {
                    var tmp = data[j * pelbytes + k];
                    data[j * pelbytes + k] = data[(width - j - 1) * pelbytes + k];
                    data[(width - j - 1) * pelbytes + k] = tmp;
                }
            }
            data += pitch;
        }
    },
    flipVert: function flipVertFn(data) {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var halfHeight = Math.floor(height / 2);
        var pitch = (width * pelbytes);
        for(var i = 0; i < halfHeight; i += 1) {
            var srcRow = (i * pitch);
            var destRow = ((height - i - 1) * pitch);
            for(var j = 0; j < pitch; j += 1) {
                var tmp = data[srcRow + j];
                data[srcRow + j] = data[destRow + j];
                data[destRow + j] = tmp;
            }
        }
    },
    convertBGR2RGB: function convertBGR2RGBFn(data) {
        // Rearrange the colors from BGR to RGB
        var bytesPerPixel = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var size = (width * height * bytesPerPixel);
        var offset = 0;
        do {
            var tmp = data[offset];
            data[offset] = data[offset + 2];
            data[offset + 2] = tmp;
            offset += bytesPerPixel;
        }while(offset < size);
    },
    convertARGB2RGBA: function convertARGB2RGBAFn(data) {
        // Rearrange the colors from ARGB to RGBA (2 bytes)
        var bytesPerPixel = this.bytesPerPixel;
        if(bytesPerPixel === 2) {
            var width = this.width;
            var height = this.height;
            var size = (width * height * bytesPerPixel);
            var dst = new Uint16Array(width * height);
            var src = 0, dest = 0;
            var r, g, b, a;
            /*jshint bitwise: false*/
            var mask = ((1 << 5) - 1);
            var blueMask = mask;
            var greenMask = (mask << 5);
            var redMask = (mask << 10);
            //var alphaMask = (1 << 15);
            do {
                var value = ((src[1] << 8) | src[0]);
                src += 2;
                b = (value & blueMask) << 1;
                g = (value & greenMask) << 1;
                r = (value & redMask) << 1;
                a = (value >> 15);
                dst[dest] = r | g | b | a;
                dest += 1;
            }while(src < size);
            /*jshint bitwise: true*/
            return dst;
        } else {
            return data;
        }
    }
};
// Constructor function
TGALoader.create = function tgaLoaderFn(params) {
    var loader = new TGALoader();
    loader.gd = params.gd;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    var src = params.src;
    if(src) {
        loader.src = src;
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            if(params.onerror) {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(!TurbulenzEngine || !TurbulenzEngine.isUnloading()) {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';
                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if(xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK') {
                        loader.onload(new Uint8Array(0), 0, 0, 0, 0);
                        return;
                    }
                    if(xhrStatus === 200 || xhrStatus === 0) {
                        var buffer;
                        if(xhr.responseType === "arraybuffer") {
                            buffer = xhr.response;
                        } else if(xhr.mozResponseArrayBuffer) {
                            buffer = xhr.mozResponseArrayBuffer;
                        } else//if (xhr.responseText !== null)
                         {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for(var i = 0; i < numChars; i += 1) {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                                                    }
                        // Fix for loading from file
                        if(xhrStatus === 0 && window.location.protocol === "file:") {
                            xhrStatus = 200;
                        }
                        loader.processBytes(new Uint8Array(buffer));
                        if(loader.data) {
                            if(loader.onload) {
                                loader.onload(loader.data, loader.width, loader.height, loader.format, xhrStatus);
                            }
                        } else {
                            if(loader.onerror) {
                                loader.onerror();
                            }
                        }
                    } else {
                        if(loader.onerror) {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if(xhr.hasOwnProperty && xhr.hasOwnProperty("responseType")) {
            xhr.responseType = "arraybuffer";
        } else if(xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        } else {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    } else {
        loader.processBytes(params.data);
        if(loader.data) {
            if(loader.onload) {
                loader.onload(loader.data, loader.width, loader.height, loader.format, 200);
            }
        } else {
            if(loader.onerror) {
                loader.onerror();
            }
        }
    }
    return loader;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/touch.ts */


// TODO: params should be Touch, but
// that requires decls for W3Touch
function Touch() {
    return this;
}
Touch.create = function touchCreateFn(params) {
    var touch = new Touch();
    touch.force = params.force;
    touch.identifier = params.identifier;
    touch.isGameTouch = params.isGameTouch;
    touch.positionX = params.positionX;
    touch.positionY = params.positionY;
    touch.radiusX = params.radiusX;
    touch.radiusY = params.radiusY;
    touch.rotationAngle = params.rotationAngle;
    return touch;
};
/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/touchevent.ts */

// Copyright (c) 2012 Turbulenz Limited
/// <reference path="../turbulenz.d.ts" />
/// <reference path="touch.ts" />
var WebGLTouchEvent = (function () {
    function WebGLTouchEvent() { }
    WebGLTouchEvent.create = function create(params) {
        var touchEvent = new WebGLTouchEvent();
        touchEvent.changedTouches = params.changedTouches;
        touchEvent.gameTouches = params.gameTouches;
        touchEvent.touches = params.touches;
        return touchEvent;
    };
    return WebGLTouchEvent;
})();

/* This file was generated from TypeScript source C:/Users/autobuild/turbulenz/engine/tslib/webgl/turbulenzengine.ts */





//
// WebGLTurbulenzEngine
//
var WebGLTurbulenzEngine = (function () {
    function WebGLTurbulenzEngine() {
        this.version = '0.26.1.0';
    }
    WebGLTurbulenzEngine.prototype.setInterval = function (f, t) {
        var that = this;
        return window.setInterval(function () {
            that.updateTime();
            f();
        }, t);
    };
    WebGLTurbulenzEngine.prototype.clearInterval = function (i) {
        return window.clearInterval(i);
    };
    WebGLTurbulenzEngine.prototype.createGraphicsDevice = function (params) {
        if(this.graphicsDevice) {
            this.callOnError('GraphicsDevice already created');
            return null;
        } else {
            var graphicsDevice = WebGLGraphicsDevice.create(this.canvas, params);
            this.graphicsDevice = graphicsDevice;
            return graphicsDevice;
        }
    };
    WebGLTurbulenzEngine.prototype.createPhysicsDevice = function (params) {
        if(this.physicsDevice) {
            this.callOnError('PhysicsDevice already created');
            return null;
        } else {
            var physicsDevice;
            var plugin = this.getPluginObject();
            if(plugin) {
                physicsDevice = plugin.createPhysicsDevice(params);
            } else {
                physicsDevice = WebGLPhysicsDevice.create()/* params */ ;
            }
            this.physicsDevice = physicsDevice;
            return physicsDevice;
        }
    };
    WebGLTurbulenzEngine.prototype.createSoundDevice = function (params) {
        if(this.soundDevice) {
            this.callOnError('SoundDevice already created');
            return null;
        } else {
            var soundDevice;
            var plugin = this.getPluginObject();
            if(plugin) {
                soundDevice = plugin.createSoundDevice(params);
            } else {
                soundDevice = WebGLSoundDevice.create(params);
            }
            this.soundDevice = soundDevice;
            return soundDevice;
        }
    };
    WebGLTurbulenzEngine.prototype.createInputDevice = function (params) {
        if(this.inputDevice) {
            this.callOnError('InputDevice already created');
            return null;
        } else {
            var inputDevice = WebGLInputDevice.create(this.canvas/*, params*/ );
            this.inputDevice = inputDevice;
            return inputDevice;
        }
    };
    WebGLTurbulenzEngine.prototype.createNetworkDevice = function (params) {
        if(this.networkDevice) {
            throw 'NetworkDevice already created';
        } else {
            var networkDevice = WebGLNetworkDevice.create()/* params */ ;
            this.networkDevice = networkDevice;
            return networkDevice;
        }
    };
    WebGLTurbulenzEngine.prototype.createMathDevice = function (params) {
        // Check if the browser supports using apply with Float32Array
        try  {
            var testVector = new Float32Array([
                1, 
                2, 
                3
            ]);
            VMath.v3Build.apply(VMath, testVector);
            // Clamp FLOAT_MAX
            testVector[0] = VMath.FLOAT_MAX;
            VMath.FLOAT_MAX = testVector[0];
        } catch (e) {
        }
        return VMath;
    };
    WebGLTurbulenzEngine.prototype.createNativeMathDevice = function (params) {
        return VMath;
    };
    WebGLTurbulenzEngine.prototype.getGraphicsDevice = function () {
        var graphicsDevice = this.graphicsDevice;
        if(graphicsDevice === null) {
            this.callOnError("GraphicsDevice not created yet.");
        }
        return graphicsDevice;
    };
    WebGLTurbulenzEngine.prototype.getPhysicsDevice = function () {
        return this.physicsDevice;
    };
    WebGLTurbulenzEngine.prototype.getSoundDevice = function () {
        return this.soundDevice;
    };
    WebGLTurbulenzEngine.prototype.getInputDevice = function () {
        return this.inputDevice;
    };
    WebGLTurbulenzEngine.prototype.getNetworkDevice = function () {
        return this.networkDevice;
    };
    WebGLTurbulenzEngine.prototype.getMathDevice = function () {
        return VMath;
    };
    WebGLTurbulenzEngine.prototype.getNativeMathDevice = function () {
        return VMath;
    };
    WebGLTurbulenzEngine.prototype.getObjectStats = function () {
        return null;
    };
    WebGLTurbulenzEngine.prototype.flush = function () {
    };
    WebGLTurbulenzEngine.prototype.run = function () {
    };
    WebGLTurbulenzEngine.prototype.encrypt = function (msg) {
        return msg;
    };
    WebGLTurbulenzEngine.prototype.decrypt = function (msg) {
        return msg;
    };
    WebGLTurbulenzEngine.prototype.generateSignature = function (msg) {
        return null;
    };
    WebGLTurbulenzEngine.prototype.verifySignature = function (msg, sig) {
        return true;
    };
    WebGLTurbulenzEngine.prototype.onerror = function (msg) {
        console.error(msg);
    };
    WebGLTurbulenzEngine.prototype.onwarning = function (msg) {
        console.warn(msg);
    };
    WebGLTurbulenzEngine.prototype.getSystemInfo = function () {
        return this.systemInfo;
    };
    WebGLTurbulenzEngine.prototype.request = function (url, callback) {
        var that = this;
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            that.callOnError("No XMLHTTPRequest object could be created");
            return;
        }
        function httpRequestCallback() {
            if(xhr.readyState === 4)/* 4 == complete */
             {
                if(!that.isUnloading()) {
                    var xhrResponseText = xhr.responseText;
                    var xhrStatus = xhr.status;
                    if("" === xhrResponseText) {
                        xhrResponseText = null;
                    }
                    // Fix for loading from file
                    if(xhrStatus === 0 && xhrResponseText && window.location.protocol === "file:") {
                        xhrStatus = 200;
                    } else if(null === xhr.getResponseHeader("Content-Type") && "" === xhr.getAllResponseHeaders()) {
                        // Sometimes the browser sets status to 200 OK
                        // when the connection is closed before the
                        // message is sent (weird!).  In order to address
                        // this we fail any completely empty responses.
                        // Hopefully, nobody will get a valid response
                        // with no headers and no body!
                        // Except that for cross domain requests getAllResponseHeaders ALWAYS returns an empty string
                        // even for valid responses...
                        callback(null, 0);
                        return;
                    }
                    // Invoke the callback
                    if(xhrStatus !== 0) {
                        // Under these conditions, we return a null
                        // response text.
                        if(404 === xhrStatus) {
                            xhrResponseText = null;
                        }
                        callback(xhrResponseText, xhrStatus);
                    } else {
                        // Checking xhr.statusText when xhr.status is
                        // 0 causes a silent error
                        callback(xhrResponseText, 0);
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
                callback = null;
            }
        }
        xhr.open('GET', url, true);
        if(callback) {
            xhr.onreadystatechange = httpRequestCallback;
        }
        xhr.send();
    };
    WebGLTurbulenzEngine.prototype.destroy = // Internals
    function () {
        if(this.networkDevice) {
            delete this.networkDevice;
        }
        if(this.inputDevice) {
            this.inputDevice.destroy();
            delete this.inputDevice;
        }
        if(this.physicsDevice) {
            delete this.physicsDevice;
        }
        if(this.soundDevice) {
            if(this.soundDevice.destroy) {
                this.soundDevice.destroy();
            }
            delete this.soundDevice;
        }
        if(this.graphicsDevice) {
            this.graphicsDevice.destroy();
            delete this.graphicsDevice;
        }
        if(this.canvas) {
            delete this.canvas;
        }
        if(this.resizeCanvas) {
            window.removeEventListener('resize', this.resizeCanvas, false);
        }
    };
    WebGLTurbulenzEngine.prototype.getPluginObject = function () {
        if(!this.plugin && this.pluginId) {
            this.plugin = document.getElementById(this.pluginId);
        }
        return this.plugin;
    };
    WebGLTurbulenzEngine.prototype.unload = function () {
        if(!this.unloading) {
            this.unloading = true;
            if(this.onunload) {
                this.onunload();
            }
            if(this.destroy) {
                this.destroy();
            }
        }
    };
    WebGLTurbulenzEngine.prototype.isUnloading = function () {
        return this.unloading;
    };
    WebGLTurbulenzEngine.prototype.enableProfiling = function () {
    };
    WebGLTurbulenzEngine.prototype.startProfiling = function () {
        if(console && console.profile && console.profileEnd) {
            console.profile("turbulenz");
        }
    };
    WebGLTurbulenzEngine.prototype.stopProfiling = function () {
        // Chrome and Safari return an object. IE and Firefox print to the console/profile tab.
        var result;
        if(console && console.profile && console.profileEnd) {
            console.profileEnd();
            if(console.profiles) {
                result = console.profiles[console.profiles.length - 1];
            }
        }
        return result;
    };
    WebGLTurbulenzEngine.prototype.callOnError = function (msg) {
        var onerror = this.onerror;
        if(onerror) {
            onerror(msg);
        }
    };
    WebGLTurbulenzEngine.create = function create(params) {
        var tz = new WebGLTurbulenzEngine();
        var canvas = params.canvas;
        var fillParent = params.fillParent;
        // To expose unload (the whole interaction needs a re-design)
        window.TurbulenzEngineCanvas = tz;
        tz.pluginId = params.pluginId;
        tz.plugin = null;
        // time property
        var getTime = Date.now;
        var performance = window.performance;
        if(performance) {
            // It seems high resolution "now" requires a proper "this"
            if(performance.now) {
                getTime = function getTimeFn() {
                    return performance.now();
                };
            } else if(performance.webkitNow) {
                getTime = function getTimeFn() {
                    return performance.webkitNow();
                };
            }
        }
        // To be used by the GraphicsDevice for accurate fps calculations
        tz.getTime = getTime;
        var baseTime = getTime();// all in milliseconds (our "time" property is in seconds)
        
        // Safari 6.0 has broken object property defines.
        var canUseDefineProperty = true;
        var navStr = navigator.userAgent;
        var navVersionIdx = navStr.indexOf("Version/6.0");
        if(-1 !== navVersionIdx) {
            if(-1 !== navStr.substring(navVersionIdx).indexOf("Safari/")) {
                canUseDefineProperty = false;
            }
        }
        if(canUseDefineProperty && Object.defineProperty) {
            Object.defineProperty(tz, "time", {
                get: function () {
                    return ((getTime() - baseTime) * 0.001);
                },
                set: function (newValue) {
                    if(typeof newValue === 'number') {
                        // baseTime is in milliseconds, newValue is in seconds
                        baseTime = (getTime() - (newValue * 1000));
                    } else {
                        tz.callOnError("Must set 'time' attribute to a number");
                    }
                },
                enumerable: false,
                configurable: false
            });
            tz.updateTime = function () {
            };
        } else {
            tz.updateTime = function () {
                this.time = ((getTime() - baseTime) * 0.001);
            };
        }
        // fast zero timeouts
        if(window.postMessage) {
            var zeroTimeoutMessageName = "0-timeout-message";
            var timeouts = [];
            var timeId = 0;
            var setZeroTimeout = function setZeroTimeoutFn(fn) {
                timeId += 1;
                var timeout = {
                    id: timeId,
                    fn: fn
                };
                timeouts.push(timeout);
                window.postMessage(zeroTimeoutMessageName, "*");
                return timeout;
            };
            var clearZeroTimeout = function clearZeroTimeoutFn(timeout) {
                var id = timeout;
                var numTimeouts = timeouts.length;
                for(var n = 0; n < numTimeouts; n += 1) {
                    if(timeouts[n].id === id) {
                        timeouts.splice(n, 1);
                        return;
                    }
                }
            };
            var handleZeroTimeoutMessages = function handleZeroTimeoutMessagesFn(event) {
                if(event.source === window && event.data === zeroTimeoutMessageName) {
                    event.stopPropagation();
                    if(timeouts.length && !tz.isUnloading()) {
                        var timeout = timeouts.shift();
                        var fn = timeout.fn;
                        fn();
                    }
                }
            };
            window.addEventListener("message", handleZeroTimeoutMessages, true);
            tz.setTimeout = function (f, t) {
                if(t < 1) {
                    return (setZeroTimeout(f));
                } else {
                    var that = this;
                    return window.setTimeout(function () {
                        that.updateTime();
                        if(!that.isUnloading()) {
                            f();
                        }
                    }, t);
                }
            };
            tz.clearTimeout = function (i) {
                if(typeof i === 'object') {
                    return clearZeroTimeout(i);
                } else {
                    return window.clearTimeout(i);
                }
            };
        } else {
            tz.setTimeout = function (f, t) {
                var that = this;
                return window.setTimeout(function () {
                    that.updateTime();
                    if(!that.isUnloading()) {
                        f();
                    }
                }, t);
            };
            tz.clearTimeout = function (i) {
                return window.clearTimeout(i);
            };
        }
        var requestAnimationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame);
        if(requestAnimationFrame) {
            tz.setInterval = function (f, t) {
                var that = this;
                if(Math.abs(t - (1000 / 60)) <= 1) {
                    var interval = {
                        enabled: true
                    };
                    var nextFrameTime = (getTime() + 16.6);
                    var wrap1 = function wrap1() {
                        if(interval.enabled) {
                            var currentTime = getTime();
                            var diff = (currentTime - nextFrameTime);
                            if(0 <= diff) {
                                if(diff > 50) {
                                    nextFrameTime = (currentTime + 16.6);
                                } else {
                                    nextFrameTime += 16.6;
                                }
                                that.updateTime();
                                if(!that.isUnloading()) {
                                    f();
                                }
                            }
                            requestAnimationFrame(wrap1, that.canvas);
                        }
                    };
                    requestAnimationFrame(wrap1, that.canvas);
                    return interval;
                } else {
                    var wrap2 = function wrap2() {
                        that.updateTime();
                        if(!that.isUnloading()) {
                            f();
                        }
                    };
                    return window.setInterval(wrap2, t);
                }
            };
            tz.clearInterval = function (i) {
                if(typeof i === 'object') {
                    i.enabled = false;
                } else {
                    window.clearInterval(i);
                }
            };
        }
        tz.canvas = canvas;
        tz.networkDevice = null;
        tz.inputDevice = null;
        tz.physicsDevice = null;
        tz.soundDevice = null;
        tz.graphicsDevice = null;
        if(fillParent) {
            // Resize canvas to fill parent
            tz.resizeCanvas = function () {
                canvas.width = canvas.parentNode.clientWidth;
                canvas.height = canvas.parentNode.clientHeight;
            };
            tz.resizeCanvas();
            window.addEventListener('resize', tz.resizeCanvas, false);
        }
        var previousOnBeforeUnload = window.onbeforeunload;
        window.onbeforeunload = function () {
            tz.unload();
            if(previousOnBeforeUnload) {
                previousOnBeforeUnload.call(this);
            }
        };
        tz.time = 0;
        // System info
        var systemInfo = {
            architecture: '',
            cpuDescription: '',
            cpuVendor: '',
            numPhysicalCores: 1,
            numLogicalCores: 1,
            ramInMegabytes: 0,
            frequencyInMegaHZ: 0,
            osVersionMajor: 0,
            osVersionMinor: 0,
            osVersionBuild: 0,
            osName: navigator.platform,
            platformProfile: "desktop",
            userLocale: (navigator.language || navigator.userLanguage).replace('-', '_')
        };
        var looksLikeNetbook = function looksLikeNetbookFn() {
            var minScreenDim = Math.min(window.screen.height, window.screen.width);
            return minScreenDim < 900;
        };
        var userAgent = navigator.userAgent;
        var osIndex = userAgent.indexOf('Windows');
        if(osIndex !== -1) {
            systemInfo.osName = 'Windows';
            if(navigator.platform === 'Win64') {
                systemInfo.architecture = 'x86_64';
            } else if(navigator.platform === 'Win32') {
                systemInfo.architecture = 'x86';
            }
            osIndex += 7;
            if(userAgent.slice(osIndex, (osIndex + 4)) === ' NT ') {
                osIndex += 4;
                systemInfo.osVersionMajor = parseInt(userAgent.slice(osIndex, (osIndex + 1)), 10);
                systemInfo.osVersionMinor = parseInt(userAgent.slice((osIndex + 2), (osIndex + 4)), 10);
            }
            if(looksLikeNetbook()) {
                systemInfo.platformProfile = "tablet";
                debug.log("Setting platformProfile to 'tablet'");
            }
        } else {
            osIndex = userAgent.indexOf('Mac OS X');
            if(osIndex !== -1) {
                systemInfo.osName = 'Darwin';
                if(navigator.platform.indexOf('Intel') !== -1) {
                    systemInfo.architecture = 'x86';
                }
                osIndex += 9;
                systemInfo.osVersionMajor = parseInt(userAgent.slice(osIndex, (osIndex + 2)), 10);
                systemInfo.osVersionMinor = parseInt(userAgent.slice((osIndex + 3), (osIndex + 4)), 10);
                systemInfo.osVersionBuild = (parseInt(userAgent.slice((osIndex + 5), (osIndex + 6)), 10) || 0);
            } else {
                osIndex = userAgent.indexOf('Linux');
                if(osIndex !== -1) {
                    systemInfo.osName = 'Linux';
                    if(navigator.platform.indexOf('64') !== -1) {
                        systemInfo.architecture = 'x86_64';
                    } else if(navigator.platform.indexOf('x86') !== -1) {
                        systemInfo.architecture = 'x86';
                    }
                    if(looksLikeNetbook()) {
                        systemInfo.platformProfile = "tablet";
                        debug.log("Setting platformProfile to 'tablet'");
                    }
                } else {
                    osIndex = userAgent.indexOf('Android');
                    if(-1 !== osIndex) {
                        systemInfo.osName = 'Android';
                        if(navigator.platform.indexOf('arm')) {
                            systemInfo.architecture = 'arm';
                        } else if(navigator.platform.indexOf('x86')) {
                            systemInfo.architecture = 'x86';
                        }
                        if(-1 !== userAgent.indexOf('Mobile')) {
                            systemInfo.platformProfile = "smartphone";
                        } else {
                            systemInfo.platformProfile = "tablet";
                        }
                    } else {
                        if(-1 !== userAgent.indexOf("iPhone") || -1 !== userAgent.indexOf("iPod")) {
                            systemInfo.osName = 'iOS';
                            systemInfo.architecture = 'arm';
                            systemInfo.platformProfile = 'smartphone';
                        } else if(-1 !== userAgent.indexOf("iPad")) {
                            systemInfo.osName = 'iOS';
                            systemInfo.architecture = 'arm';
                            systemInfo.platformProfile = 'tablet';
                        }
                    }
                }
            }
        }
        tz.systemInfo = systemInfo;
        var b64ConversionTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split('');
        tz.base64Encode = function base64EncodeFn(bytes) {
            var output = "";
            var numBytes = bytes.length;
            var valueToChar = b64ConversionTable;
            var n, chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            /*jshint bitwise: false*/
            n = 0;
            while(n < numBytes) {
                chr1 = bytes[n];
                n += 1;
                enc1 = (chr1 >> 2);
                if(n < numBytes) {
                    chr2 = bytes[n];
                    n += 1;
                    if(n < numBytes) {
                        chr3 = bytes[n];
                        n += 1;
                        enc2 = (((chr1 & 3) << 4) | (chr2 >> 4));
                        enc3 = (((chr2 & 15) << 2) | (chr3 >> 6));
                        enc4 = (chr3 & 63);
                    } else {
                        enc2 = (((chr1 & 3) << 4) | (chr2 >> 4));
                        enc3 = ((chr2 & 15) << 2);
                        enc4 = 64;
                    }
                } else {
                    enc2 = ((chr1 & 3) << 4);
                    enc3 = 64;
                    enc4 = 64;
                }
                output += valueToChar[enc1];
                output += valueToChar[enc2];
                output += valueToChar[enc3];
                output += valueToChar[enc4];
            }
            /*jshint bitwise: true*/
            return output;
        };
        return tz;
    };
    return WebGLTurbulenzEngine;
})();

window.WebGLTurbulenzEngine = WebGLTurbulenzEngine;
