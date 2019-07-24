/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"    
//@include "./EASS-Persistor-WipePropertyKeyframes.jsx"

/** @function writeObjectArrayToPropertyKeyframes
 *  Writes every entry from an array of objects {value, time}, each into a new keyframe in target property.
 *  Optionally deletes previous keyframe data from the property.
 *  Returns the same reference to target property
 *
 *  @param {Array.<{value, time, ...}>} srcArr - Data array to be written into keyframes. Every object instance within must contain at least a "value" and "time" field.
 *  @param {Property} tarProp - Reference to an AE Property. Keyframes will be written into this property.
 *  @param {boolean} [preWipe=false] - If true, all prior keyframe data will be deleted from property tarProp. Default=false.
 *  @returns {Property} - Returns reference to target property
 */    
EASS.Persistor.writeObjectArrayToPropertyKeyframes = function (srcArr, tarProp, preWipe) {
    //skip the process if no or invalid input data, return target property as normal
    if (srcArr === undefined || srcArr === null || tarProp === undefined || tarProp === null) {
        /* DEBUG */ $.writeln("??writeObjectArrayToPropertyKeyframes() received null or undefined srcArr or tarProp: ", srcArr, tarProp);
        return tarProp;
    }

    //default preWipe to false if not included
    if (preWipe === undefined) { preWipe = false; }
    
    //initial wipe of all keyframes in target property
    if (preWipe) { this.wipePropertyKeyframes(tarProp); }

    //separate values and times into arrays to feed them into the setValuesAtTimes method
    var times = new Array(), values = new Array();
    for (var i = 0, l = srcArr.length; i < l; i++) {
        times.push(srcArr[i].time);
        values.push(srcArr[i].value);
    }

    tarProp.setValuesAtTimes(times, values);
    
    return tarProp;
};