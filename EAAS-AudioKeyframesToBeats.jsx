//dialog defaults
    var defThreshold = 50.0;
    var defMinInterval = 0.5;
    var defSrcLayer = "Audio Amplitude";
    var defTarLayer = "Audio Smoothie";
    
    var defTarProperty = "Both Channels";


//Window setup
    var mainWindow = new Window("dialog", "SEXperimento"); //("palette")
    mainWindow.add("statictext", undefined, "Input parameters and press 'magic' for hitler");
    //threshold input group
    var winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "Threshold");
    var inputThreshold = winGrpTmp.add("edittext", [0, 0, 150, 35], defThreshold);
    //winGrpTmp.add("statictext", undefined "")
    //minimum interval input group
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "Min interval");
    var inputMinInterval = winGrpTmp.add("edittext", [0, 0, 150, 35], defMinInterval);
    //source Layer Input group
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "Input layer name");
    var inputSrcLayer = winGrpTmp.add("edittext", [0, 0, 150, 35], defSrcLayer);
    //target Layer Input group
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "New layer name");
    var inputTarLayerName = winGrpTmp.add("edittext", [0, 0, 75, 35], defTarLayer);
    
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.add("button", undefined, "MAGIC").onClick = JUSTDOIT;
    

    mainWindow.show();
    //mainWindow.center();
//Endof Window setup


function JUSTDOIT () {
//constants and definitions
    var mainComp = app.project.activeItem;

//input initialization and validity check
    var threshold = parseFloat(inputThreshold.text);
    var minInterval = parseFloat(inputMinInterval.text);
    var tarLayerName = inputTarLayerName.text;
    if (mainComp === null || mainComp === undefined) { $.writeln("!!Couldn't find target composition, aborted."); alert("Couldn't find target composition, aborted."); return; }
    var srcLayer = mainComp.layer(inputSrcLayer.text);

    if (isNaN(threshold)) { $.writeln("Wrong threshold input: ", threshold); return; }
    if (isNaN(minInterval)) { $.writeln("Wrong min interval input: ", minInterval); return; }
    if (tarLayerName == "") {$.writeln("Must input non-empty string for target layer name"); return; }
    if (srcLayer === null) { $.writeln("Wrong source layer input - not found: ", inputSrcLayer.text); return; }
    //if (tarLayer === null) { $.writeln("Wrong target layer input - not found: ", inputTarLayer.text); return; }
        
//echo input to console
    $.writeln("================");
    $.writeln("input values:\r  threshold: ", threshold, "\r  minInterval: ", minInterval, "\r  tarLayerName:", tarLayerName, "\n  srcLayer", srcLayer);
    $.writeln("  srcLayer name: \"", srcLayer.name, "\"");
    $.writeln("  tarLayerName: \"", tarLayerName, "\"");

//Process initialization
    app.beginUndoGroup("MAGIC");
    
    //Create and set up a new destination layer and property
    var tarLayer = mainComp.layers.addNull();
        tarLayer.name = tarLayerName;
        tarLayer.inPoint = srcLayer.inPoint;
        tarLayer.outPoint = srcLayer.outPoint;
    var tarProp = tarLayer.effect.addProperty("Slider Control").slider;    //<<====
    
    //gather a reference to the source property and validate
    var srcProp = srcLayer.effect("Both Channels").slider;  //<<====
        $.writeln("  Source Property  # keys: ", srcProp.numKeys);
    if (srcProp.numKeys <= 0) { $.writeln("!!Source property has no keyframes!"); alert("Error: Source property has no keyframes!"); return; }
    
    //Setup initial keyframe and data before main loop
    var prevValue = srcProp.keyValue(1);
    $.writeln(tarProp);
    tarProp.setValueAtTime(srcProp.keyTime(1), prevValue);
    
    //main loop
    var numKeys = srcProp.numKeys;
    var smoothedValue, newValue;
    for (var keyIndex = 2; keyIndex <= numKeys; keyIndex++) {
         //<<====
        smoothedValue = prevValue * 0.99;    //<<====
         //<<====
        
        //Create a new key with the largest value out of the smoothed curve or sample
        prevValue = largest(smoothedValue, srcProp.keyValue(keyIndex))
        tarProp.setValueAtTime(srcProp.keyTime(keyIndex), prevValue);
        
        $.writeln("  Processed key #", keyIndex);
    }
    
    alert("ALAKHAZAM!\r(done)");
    //

//finishing clean-up
    app.endUndoGroup();
 
 
 //support function definitions
    //returns the biggest number of the two
    function largest (firstVal, secondVal) {
        return (firstVal > secondVal) ? firstVal : secondVal;
    } 
}
