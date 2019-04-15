/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

/** @function wipePropertyKeyframes
 *  Deletes every keyframe from received AE Property.
 *
 *  @param {Property} tarProp - Reference to an AE Property. Every keyframe in the property will be removed
 *  @returns {Property} - Returns again a reference to target property so as to allow chained invocation.
 */
EASS.Persistor.wipePropertyKeyframes = function (tarProp) {
    if (tarProp === undefined || tarProp === null) {
        /* DEBUG */ $.writeln("??wipePropertyKeyframes() received null or undefined tarProp: ", tarProp);
        return tarProp;
    }

    for (var i = tarProp.numKeys; i > 0; i--) {
        tarProp.removeKey(i);
    }

    return tarProp;
 };