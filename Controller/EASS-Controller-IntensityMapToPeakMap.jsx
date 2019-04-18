/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "./EASS-Controller-Support.jsx"

/** @function intensityMapToPeakMap
 *  Transforms a dense array of {value, time} objects into a sparsely populated array of {value, time} objects representing peaks in the value attribute 
 *  This methods creates new arrays, leaving input arrays unaltered.
 *
 *  @param {Array.<{value, time, ...}>} intensityMap - Array representing a map of intensities.
 *  @param {number} exponentialDecayRate - Floating number between 0 and 1 (inclusive). 1 = no effect at all; 0 = no decay (recommended 0.01-0.1)
 *  @param {number} minThreshold - Any value below this can't be considered a peak.
 *  @param {number} minInterval - Minimum time between peaks (seconds). If two or more peaks are closer in time than this, only the first will be considered.
 *  @returns {Array.<{value, time, ...}>} - Array representing a map of peaks.
 */
EASS.Controller.intensityMapToPeakMap = function (paramIntensityMap, exponentialDecayRate, minThreshold, minInterval) {
    if (paramIntensityMap === undefined || paramIntensityMap === null) {
        /* DEBUG */ $.writeln("!!intensityMapToPeakMap() received null intensityMap: ", paramIntensityMap);
        return null;
    }

    //duplicate input array so as to not alter original contents
    var intensityMap = this.Support.cloneObjectArray(srcIntensityMap); 


};





//Check an array of {value, time} objects for peaks and return an array of {value, time} objects representing each peak
//first and last keyframes are considered peaks for the sake of convenience
//DIS is da magick
    function valueArrayToPeakArray (tarArr, smoothRate, minThreshold, minInterval) {
        if (tarArr === undefined || tarArr === null || tarArr.length <= 0) { $.writeln("!!rightToLeftSmoother can't take a null or 0-length array: ", tarArr); return; }
        tarArr = rightToLeftSmoother (tarArr, smoothRate);
        var prevVal = 0;
        var outArr = new Array();
        var lastPeak = tarArr[0].time - minInterval;
        
        //loop over the array. while applying a continuous falloff, If current value is larger than the last and the next create a {value, time} object in the output array.
        for (var i = 0, l = tarArr.length; i < l; i++) {
            if (tarArr[i].value > prevVal && tarArr[i].value >= minThreshold) { //if current value is higher than the last  AND higher than minimum threshold
                if ((i + 1 >= l) || tarArr[i].value > tarArr[i+1].value) { //if the next position is out of the array OR of a lower value than current position the current position is treated as a peak
                    if ((lastPeak + minInterval) <= tarArr[i].time) { //save this peak only if it is out of minInterval seconds of the last detected peak
                        //Peak Found
                        outArr.push(tarArr[i]);
                        lastPeak = tarArr[i].time;
                    }
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