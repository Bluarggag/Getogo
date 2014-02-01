

//Object.prototype.getKeyByValue = function (value) {
//    for (var prop in this) {
//        if (this.hasOwnProperty(prop)) {
//            if (this[prop] === value)
//                return prop;
//        }
//    }
//}
/* One word of caution: Even if the above works, its generally a bad idea to extend any host or native object's .prototype. 
I did it here because it fits the issue very well. Anyway, you should probably use this function outside the .prototype and 
pass the object into it instead.*/

var getKeyByValue = function (object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value)
                return prop;
        }
    }
}


function assert(outcome, description) {
    var li = document.createElement('li');
    var result = outcome ? 'pass' : 'fail';
    result += ": " + description;
    li.appendChild(document.createTextNode(result));

    output.appendChild(li);
};

//function log(outcome, description) {
//    var li = document.createElement('li');
//    var result = "";
//    result += outcome + ": " + description;
//    li.appendChild(document.createTextNode(result));

//    output.appendChild(li);
//};
