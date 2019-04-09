{
    var defTarLayer = "TimeTestBaseLoop";

    var mainWindow = new Window("dialog", "Layer keyframe logger"); //("palette")
    mainWindow.add("statictext", undefined, "Type the name of target layer. Keyframes and values will be logged to console.");
    var inputTarLayerName = mainWindow.add("edittext", [0, 0, 400, 35], defTarLayer);
    
    mainWindow.add("button", undefined, "MAGIC").onClick = function () {
        startKeyframeCount(inputTarLayerName);
    }

    mainWindow.show();
    
    //iterate over the layer's keyframes and log them to console output one by one
    function startKeyframeCount () {
        //get a reference to current composition
        var mainComp = app.project.activeItem;
        if (mainComp === null || mainComp === undefined) { $.writeln("!!Couldn't find target composition, aborted."); alert("Couldn't find target composition, aborted."); return; }
        
        //get a reference to the layer to iterate over
        var srcLayer = mainComp.layer(inputTarLayerName.text);
        if (srcLayer === null || srcLayer === undefined) { $.writeln("Wrong source layer input - not found: ", srcLayer); return; }

        //var srcProp = srcLayer.effect("Slider Control").slider;
        
        var srcProp = srcLayer.timeRemap;

        $.writeln("========\rBegining output of #", srcProp.numKeys, " keyframes\r========");
        
        for (var i = 1, l = srcProp.numKeys; i <= l; i++) {
            $.writeln(" Key #", i, " time:", srcProp.keyTime(i), " val:", srcProp.keyValue(i));
        }
    
        $.writeln("========\r Finished logging #", srcProp.numKeys, " keyframes");
        alert("Finished logging #" + srcProp.numKeys + " keyframes to javascript console");
        mainWindow.close();
    }
}