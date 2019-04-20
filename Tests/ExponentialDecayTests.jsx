//@include "../Persistor/EASS-Persistor-GetActiveComposition.jsx"
//@include "../Persistor/EASS-Persistor-ReadPropertyKeyframesToObjectArray.jsx"
//@include "../Persistor/EASS-Persistor-WriteObjectArrayToPropertyKeyframes.jsx"
//@include "../Persistor/EASS-Persistor-CreateNullLayer.jsx"
//@include "../Controller/EASS-Controller-ExponentialDecay.jsx"

$.writeln("========");

var mainComp = EASS.Persistor.getActiveComposition();
if (mainComp === null) { $.writeln("Main composition not found"); }

var audioAmplitudeProperty = mainComp.layer("Audio Amplitude").effect("Both Channels").slider;
if (audioAmplitudeProperty === undefined) { $.writeln("Required Audio Amplitude layer not found"); }

var outputLayer = EASS.Persistor.createNullLayer(undefined, {name: "Exponential Decay", comment: "dis is a test"});

var dataArray = EASS.Persistor.readPropertyKeyframesToObjectArray(audioAmplitudeProperty);

EASS.Controller.arrayBidirectionalExponentialDecay(dataArray, 0.01);
//EASS.Controller.arrayStartToEndExponentialDecay(dataArray, 0.01);

$.writeln("----");

EASS.Persistor.writeObjectArrayToPropertyKeyframes(dataArray, outputLayer.effect.addProperty("Slider Control").slider);
