/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

/** @function readPropertyKeyframesToObjectArray
 *  Reads keyframe values from received AE Property, returns a {value, time} Object array.
 *
 *  @param {Property} srcProp - Reference to an AE Property. Keyframe data within this property will be read into a new array.
 *  @returns {Array.<{value, time}>} - New Object array. All output objects will have {value, time} properties, representing the value and time of origin keyframe.
 */
EASS.Persistor.readPropertyKeyframesToObjectArray = function (srcProp) {
    var tarArr = new Array();
    var numKeys = srcProp.numKeys;
    for (var i = 1; i <= numKeys; i++) {
        tarArr.push({
            value : srcProp.keyValue(i),
            time : srcProp.keyTime(i),
        });
    }
    return tarArr;
};