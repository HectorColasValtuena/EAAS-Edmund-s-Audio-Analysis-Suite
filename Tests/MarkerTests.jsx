//@include "../EASS-Namespace.jsx"
//@include "../Persistor/EASS-Persistor-WriteMarkers.jsx"
//- @include "../Persistor/EASS-Persistor-ReadMarkers.jsx" /*TO-DO*/
//- @include "../Persistor/EASS-Persistor-WipeMarkers.jsx" /*TO-DO*/


app.beginUndoGroup("tests");

var mainComp = app.project.activeItem;
if (mainComp === undefined) { $.writeln("Main composition not found"); }

var writeLayer = mainComp.layer("writeLayer");
//var readLayer = mainComp.layer("readLayer");
//var wipeLayer = mainComp.layer("wipeLayer");
if (writeLayer === undefined
	//|| readLayer === undefined
	//|| wipeLayer === undefined
	) { $.writeln("Required Layer not found: ", readLayer, writeLayer, wipeLayer); }

var writeArray = [
	{ value: 1, time: 0, comment: "5mentarios" },
	{ value: 7, time: 0.2, duration: 0.2},
	{ value: 88, time: 0.5, comment: "fascism", duration: 0.5, heil:"hitler", nein: 14.88 },
	{ value: 69, time: 1.5, duration: 1, sex:"ual" },
	{ value: 0, time: 2, duration: 0.25, text:"texto" },
	{ value: 42, time: 2.1, comment: 42},
];

$.writeln("writing to layer");
EASS.Persistor.writeObjectArrayToLayerMarkers(writeArray, writeLayer, undefined);
//EASS.Persistor.writeObjectArrayToCompositionMarkers(writeArray, mainComp, undefined)

/*
$.writeln("reading to layer");
var readArray = EASS.Persistor.readPropertyKeyframesToObjectArray(readProperty);
$.writeln(readArray);
$.writeln(readArray[0].value, readArray[0].time);
$.writeln(readArray[1].value, readArray[1].time);
$.writeln(readArray[2].value, readArray[2].time);
//*/

/*
$.writeln("wiping layer");
EASS.Persistor.wipePropertyKeyframes(wipeProperty);
//*/