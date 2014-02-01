
// mathdeviceconvert can do the same
// research how to better use arrays & math objects together

//also use function caching

var custommath = {
    
    mathDevice: null,
    initialize: function(params) {
        mathDevice = params.mathDevice;
    },
    
    a3tov3: function(array3) {
        return mathDevice.v3Build(array3[0], array3[1], array3[2]);
    },
    a4toQuat: function(array4) {
        return mathDevice.quatBuild(array4[0], array4[1], array4[2], array4[3]);
    }
}