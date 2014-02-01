
//for-in loops through the enumerable properties of an object, not the indexes of an array.
//Still, it can be useful, particularly for sparse arrays, if you use appropriate safeguards:
//1. That the object has its own property by that name (not one it inherits from its prototype), and
//2. That the key is a base-10 numeric string in its normal string form and its value is <= 2^32 - 2 (which is 4,294,967,294).
function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
}

//"0" is a string, not a number so it will give you result ha . In javaScript there are only six falsy values:
//false, null, undefined, number 0, NaN, the empty string.
function isValid(value){
    return !(typeof value === "undefined" || value === null);
}

//One of the weird behaviour and spec in Javascript is the typeof Array is Object.
//You can check if the variable is an array in couple of ways:
//var isArr = data instanceof Array;
//var isArr = Array.isArray(data);
//But the most reliable way is:
//isArr = Object.prototype.toString.call(data) == '[object Array]';
//Since you tagged your question with jQuery, you can use jQuery isArray function:
//var isArr = $.isArray(data);
function isArray(data) {
    return (Object.prototype.toString.call(data) == '[object Array]');
}

function arrayContains(haystack, needle) {
    return (haystack.indexOf(needle) > -1);
}

function isNumber(value){
    return !(isNaN(value));
}

//log output

var LogType = {
    INFO: 1,
    WARNING: 2,
    FAILED: 3,
    ERROR: 4,
    IMPORTANT: 5
}

var logInfoOn = true;
var logFailedOn = true;
var logErrorOn = true;
var logImportantOn = true;




function log(message, type) { }
function dump(object, headline) { }



// comment out the following before hub deploy

function log(message, type) {
    type = (typeof type === "undefined") ? LogType.INFO : type;
    if (type === LogType.INFO && logInfoOn) console.log("[" + Date.now() + "] INFO   : " + message);
    if (type === LogType.FAILED && logFailedOn) console.log("[" + Date.now() + "] FAILED : " + message);
    if (type === LogType.ERROR && logErrorOn) console.log("[" + Date.now() + "] ERROR  : " + message);
    if (type === LogType.IMPORTANT && logImportantOn) console.log("[" + Date.now() + "] IMPORTANT: " + message);
}
var dumpOn = true;
function dump(object, headline) {
    headline = (typeof headline === "undefined") ? "" : "                 " + headline;
    if (dumpOn) {
        if (headline.length > 0) console.log(headline);
        console.log(object);
    }
}

