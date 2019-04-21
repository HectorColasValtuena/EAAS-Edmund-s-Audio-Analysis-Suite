//@include "../Persistor/EASS-Persistor-GetActiveComposition.jsx"
//@include "../Persistor/EASS-Persistor-CreateNullLayer.jsx"


$.writeln("========");

var mainComp = EASS.Persistor.getActiveComposition();
if (mainComp === null) { $.writeln("Main composition not found"); }


var outputProp1 = EASS.Persistor.createNullLayer(undefined, {name: "Keyframe writer test 1", comment: "dis is a test"}).effect.addProperty("Slider Control").slider;
var outputProp2 = EASS.Persistor.createNullLayer(undefined, {name: "Keyframe writer test 2", comment: "dis is a test"}).effect.addProperty("Slider Control").slider;

var dataArray = new Array();

var timeDist = 0.001;

for (var i = 0; i < 1000; i++) {
	dataArray.push({
		value: i * timeDist,
		time: i * timeDist
	});
}

var separateTimer, atOnceTimer;

$.writeln($.hiresTimer);

$.writeln($.hiresTimer);
writeKeyframeByKeyframe(dataArray, outputProp1);
$.writeln(separateTimer = $.hiresTimer);
writeKeyframesAtOnce(dataArray, outputProp2);
$.writeln(atOnceTimer = $.hiresTimer);

$.writeln("----");
$.writeln("Key-by-key time:  ", separateTimer / 1000000);
$.writeln("All at once time: ", atOnceTimer / 1000000);

$.writeln("difference factor: ", separateTimer / atOnceTimer);

$.writeln("property 1 numKeys: ", outputProp1.numKeys);
$.writeln("property 2 numKeys: ", outputProp2.numKeys);

$.writeln("========");

function writeKeyframeByKeyframe (srcArr, tarProp) { 
    //now proceed to write every array entry as a new keyframe in the target property
    for (var i = 0, l = srcArr.length; i < l; i++) {
        var newKey = tarProp.addKey(srcArr[i].time);
        tarProp.setValueAtKey(newKey, srcArr[i].value);
    }

};

function writeKeyframesAtOnce (srcArr, tarProp, preWipe) {
    var times = new Array();
    var values = new Array();

    for (var i = 0, l = srcArr.length; i < l; i++) {
    	times.push(srcArr[i].time);
    	values.push(srcArr[i].value);
    }

    tarProp.setValuesAtTimes(times, values);
};