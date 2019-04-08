{
//dialog defaults
    var defThreshold = 50.0;
    var defMinInterval = 0.1;
    var defSmoothRate = 0.99;
    var defSrcLayer = "Audio Amplitude";
    var defTarLayer = "Audio Peaks";

//Window setup
    var mainWindow = new Window("dialog", "SEXperimento"); //("palette")
    mainWindow.add("statictext", undefined, "Input parameters and press 'magic' for hitler");
    var winGrpTmp;
    //smoothing rate input
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "Smooth rate (0.0 - 1.0)");
    var inputSmoothRate = winGrpTmp.add("edittext", [0, 0, 150, 35], defSmoothRate);
    //threshold input group
    winGrpTmp = mainWindow.add("group");
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
    var inputSrcLayer = winGrpTmp.add("edittext", [0, 0, 200, 35], defSrcLayer);
    //target Layer Input group
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.orientation = "row";
    winGrpTmp.add("statictext", undefined,  "New layer name");
    var inputTarLayerName = winGrpTmp.add("edittext", [0, 0, 200, 35], defTarLayer);
    
    winGrpTmp = mainWindow.add("group");
    winGrpTmp.add("button", undefined, "MAGIC").onClick = JUSTDOIT;

    mainWindow.show();
    //mainWindow.center();
//Endof Window setup

//Main Processing function
    function JUSTDOIT () {
    //constants and definitions
        var mainComp = app.project.activeItem;

    //input initialization and validity check
        var smoothRate = parseFloat(inputSmoothRate.text);
        var threshold = parseFloat(inputThreshold.text);
        var minInterval = parseFloat(inputMinInterval.text);
        var tarLayerName = inputTarLayerName.text;
        if (mainComp === null || mainComp === undefined) { $.writeln("!!Couldn't find target composition, aborted."); alert("Couldn't find target composition, aborted."); return; }
        var srcLayer = mainComp.layer(inputSrcLayer.text);

        if (isNaN(smoothRate)) { $.writeln("Wrong smoothRate input: ", smoothRate); return; }
        if (isNaN(threshold)) { $.writeln("Wrong threshold input: ", threshold); return; }
        if (isNaN(minInterval)) { $.writeln("Wrong min interval input: ", minInterval); return; }
        if (tarLayerName == "") {$.writeln("Must input non-empty string for target layer name"); return; }
        if (srcLayer === null) { $.writeln("Wrong source layer input - not found: ", inputSrcLayer.text); return; }
        //if (tarLayer === null) { $.writeln("Wrong target layer input - not found: ", inputTarLayer.text); return; }
            
    //echo input to console /*DEBUG*/ 
        $.writeln("================");
        $.writeln("input values:\r  threshold: ", threshold, "\r  minInterval: ", minInterval, "\r  tarLayerName:", tarLayerName, "\n  srcLayer", srcLayer);
        $.writeln("  srcLayer name: \"", srcLayer.name, "\"");
        $.writeln("  tarLayerName: \"", tarLayerName, "\"");

    //Process initialization
        app.beginUndoGroup("MAGIC");
        
        //gather a reference to the source property and validate
        var srcProp = srcLayer.effect("Both Channels").slider;  //<<====
            /*DEBUG*/ $.writeln("  Source Property  # keys: ", srcProp.numKeys);
        if (srcProp.numKeys <= 0) { $.writeln("!!Source property has no keyframes!"); alert("Error: Source property has no keyframes!"); return; }
        
    //Main process
        //first gather source property keyframes to an object array, and extract the peaks to a new array
        var peakArray = valueArrayToPeakArray(propertyToArray(srcProp), smoothRate, threshold);
        //store the peak array as keyframes on a new null layer
        valueArrayToNewKeyframedNullLayer(peakArray, mainComp, tarLayerName, srcLayer.inPoint, srcLayer.outPoint);
        //========

    //finishing clean-up
        app.endUndoGroup();
        alert("ALAKHAZAM!\r(done)");
        $.writeln("All done!");
    }

//Property source to keyframe values array
    //takes a reference to a layer property with keyframes
    //returns an array of {value, time} objects representing those keyframes
    function propertyToArray (srcProp) {
        var tarArr = new Array();
        var numKeys = srcProp.numKeys;
        for (var i = 1; i <= numKeys; i++) {
            tarArr.push({
                value : srcProp.keyValue(i),
                time : srcProp.keyTime(i),
            });
        }
        return tarArr;
    }


//Check an array of {value, time} objects for peaks and return an array of {value, time} objects representing each peak
//DIS is da magick
    function valueArrayToPeakArray (tarArr, smoothRate, minThreshold) {//, minInterval) {
        if (tarArr === undefined || tarArr === null || tarArr.length <= 0) { $.writeln("!!rightToLeftSmoother can't take a null or 0-length array: ", tarArr); return; }
        tarArr = rightToLeftSmoother (tarArr, smoothRate);
        var prevVal = 0;
        var outArr = new Array();
        
        //loop over the array. while applying a continuous falloff, If current value is larger than the last and the next create a {value, time} object in the output array.
        for (var i = 0, l = tarArr.length; i < l; i++) {
            if (tarArr[i].value > prevVal && tarArr[i].value >= minThreshold) { //if current value is higher than the last  AND higher than minimum threshold
                if ((i + 1 >= l) || tarArr[i].value > tarArr[i+1].value) { //if the next position is out of the array OR of a lower value than current position the current position is treated as a peak
                    //Peak Found
                    outArr.push(tarArr[i]);
                }
            }
            tarArr[i].value = prevVal = Math.max(tarArr[i].value, prevVal * smoothRate);
            
            /*DEBUG*/ if((i%10) == 0) { $.writeln("  valueArrayToPeakArray() pass #", i); }
        }
            /*DEBUG*/ //================================================================================================
                //Dump an intermediary  of the mid-process smooth-off array
                valueArrayToNewKeyframedNullLayer(tarArr, app.project.activeItem, "PeakArrayMidProcessDebug", tarArr[0].time, tarArr[tarArr.length -1].time);
            /*DEBUG*/ //================================================================================================
        return outArr;
    }

//Right-to-left rolloff pass
    //takes an array of {value, time} objects and rolls off their values from the end to the begining
    //returns another reference to target array
    function rightToLeftSmoother (tarArr, smoothRate) {
        if (tarArr === undefined || tarArr === null || tarArr.length <= 0) { $.writeln("!!rightToLeftSmoother can't take a null or 0-length array: ", tarArr); return; }
        var prevVal = 0;
        var nextVal;
        
        //loop over the array keeping highest value between smoothed last value and next value
        for (var i = tarArr.length-1; i >= 0; i--) {
            nextVal = prevVal * smoothRate; //================================================================================================
            nextVal = Math.max(tarArr[i].value, nextVal);
            tarArr[i].value = prevVal = nextVal;
        
            /*DEBUG*/ if((i%10) == 0) { $.writeln("  rightToLeftSmoother() pass on value #", i); }
        }
        return tarArr;
    }

//Transform a processed array of {value, time} objects into a new null layer with keyframes for each entry
    //Takes an array of {value, time} objects, a reference to a composition, a name for the new layer, and in and out points for the newly created layer
    //returns a reference to the created property in the new array
    function valueArrayToNewKeyframedNullLayer (srcArr, tarComp, newLayerName, newLayerInPoint, newLayerOutPoint) {
        /*DEBUG*/ $.writeln(" valueArrayToNewKeyframedNullLayer() is saving #", srcArr.length, " entries into new NULL layer named ", newLayerName);

        //input data validation
        if (tarComp === null || tarComp === undefined) { $.writeln("!!no target composition available. aborting layer creation"); return; }
        if (srcArr === null || srcArr === undefined) { $.writeln("!!null or undefined data available. aborting layer creation"); return; }
        if (srcArr.length == 0) { $.writeln("!!0 input data length. aborting layer creation"); alert("No data to create new layer. No new layer created."); return; }
        
        //Create and set up a new destination layer and property
        var tarLayer = tarComp.layers.addNull();
        tarLayer.name = newLayerName;
        tarLayer.inPoint = newLayerInPoint;
        tarLayer.outPoint = newLayerOutPoint;
        var tarProp = tarLayer.effect.addProperty("Slider Control").slider;    //<<====
        
        //create keyframes in the new layer
        for (var i = 0, l = srcArr.length; i < l; i++) {
            tarProp.setValueAtTime(srcArr[i].time, srcArr[i].value);
            /*DEBUG*/ if((i%10) == 0) { $.writeln("  valueArrayToNewKeyframedNullLayer() pass #", i); }
        }
        return tarProp;
    }

 //support function definitions
}