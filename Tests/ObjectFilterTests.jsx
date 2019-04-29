//@include "../Support/EASS-Support-FilterObjectAttributes.jsx"

$.writeln("====");

var ovejota1 = { a: "dolf", hit: "ler", fas: undefined, ju: undefined };
var mask1 = { a: null, hit: undefined, fas: "cismo", ju: null , co: "ño", und:undefined, nul:null};

printObject(ovejota1);
$.writeln("----");
printObject(EASS.Support.filterObjectAttributes(ovejota1, mask1));




function printObject (obj) {
    for (var i in obj) {
        $.writeln(i, ":", obj[i]);
     }
}    