//@include "../EASS-Namespace.jsx"
//@include "../Persistor/EASS-Persistor-ReadPropertyKeyframesToObjectArray.jsx"
//@include "../Persistor/EASS-Persistor-WipePropertyKeyframes.jsx"
//@include "../Persistor/EASS-Persistor-WriteObjectArrayToPropertyKeyframes.jsx"

app.beginUndoGroup("tests");

var mainComp = app.project.activeItem;
if (mainComp === undefined) { $.writeln("Main composition not found"); }

var readProperty = mainComp.layer("readLayer").transform.opacity;
var writeProperty = mainComp.layer("writeLayer").transform.opacity;
var wipeProperty = mainComp.layer("wipeLayer").transform.opacity;
if (readProperty === undefined || writeProperty === undefined || wipeProperty === undefined) { $.writeln("Required property not found: ", readProperty, writeProperty, wipeProperty); }

var writeArray = [
	{ value: 1, time: 0 },
	{ value: 2, time: 0.033 },
	{ value: 3, time: 0.066},
	{ value: 4, time: 0.1 },
	{ value: 5, time: 0.133},
	{ value: 6, time: 0.166},
	{ value: 7, time: 0.2},
];

$.writeln("writing to layer");
EASS.Persistor.writeObjectArrayToPropertyKeyframes(writeArray, writeProperty, false);

$.writeln("reading to layer");
var readArray = EASS.Persistor.readPropertyKeyframesToObjectArray(readProperty);
$.writeln(readArray);
$.writeln(readArray[0].value, readArray[0].time);
$.writeln(readArray[1].value, readArray[1].time);
$.writeln(readArray[2].value, readArray[2].time);

$.writeln("wiping layer");
EASS.Persistor.wipePropertyKeyframes(wipeProperty);