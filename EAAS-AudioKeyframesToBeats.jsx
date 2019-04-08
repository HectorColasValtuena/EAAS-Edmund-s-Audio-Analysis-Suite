{
//Imports
    //@include "./EAAS-AudioKeyframesToPeakArray.jsx"
//dialog defaults
    var defThreshold = 50.0;
    var defMinInterval = 0.15;
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
        audioLayerToPeakNullLayer(inputSmoothRate.text, inputThreshold.text, inputMinInterval.text, inputSrcLayer.text, inputTarLayerName.text)
        //(inputSmoothRate, inputThreshold, inputMinInterval, inputSrcLayer, inputTarLayerName)
    }
}