/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/
    
//@include "./EASS-Persistor-WipePropertyKeyframes.jsx"

/** @function writeObjectArrayToPropertyKeyframes
 *  Writes every entry from an array of objects {value, time}, each into a new keyframe in target property.
 *  Optionally deletes previous keyframe data from the property.
 *  Returns the same reference to target property
 *
 *  @param {Array.<{value, time, ...}>} srcArr - Data array to be written into keyframes. Every object instance within must contain at least a "value" and "time" field.
 *  @param {Property} tarProp - Reference to an AE Property. Keyframes will be written into this property.
 *  @param {boolean} [preWipe=false] - If true, all prior keyframe data will be deleted from property tarProp. Default=false.
 *  @returns {boolean} - Returns true on success.
 */    
EASS.Persistor.writeObjectArrayToPropertyKeyframes = function (srcArr, tarProp, preWipe) {
    //skip the process if no or invalid input data, return target property as normal
    if (srcArr === undefined || srcArr === null || tarProp === undefined || tarProp === null) {
        /* DEBUG */ $.writeln("??writeObjectArrayToPropertyKeyframes() received null or undefined srcArr or tarProp: ", srcArr, tarProp);
        return false;
    }

    //default preWipe to false if not included
    if (preWipe === undefined) { preWipe = false; }
    
    //initial wipe of all keyframes in target property
    if (preWipe) { EASS.Persistor.wipePropertyKeyframes(tarProp); }

    //now proceed to write every array entry as a new keyframe in the target property
    for (var i= 0, l = srcArr.length; i < l; i++) {
        // TO-DO : Test efficiency/speed by using the method Property.setValuesAtTimes(times[], values[])
        //tarProp.setValueAtTime(srcArr[i].time, srcArr[i].value);
        //*
        var newKey = tarProp.addKey(srcArr[i].time);
        tarProp.setValueAtKey(newKey, srcArr[i].value);
        //*/
         // TO-DO : implement ease-in/out parametrization
         /* DEBUG */ if (i%100 == 0) { $.writeln("  writeObjectArrayToPropertyKeyframes() cycle #", i); }
    }
    
    return true;
};