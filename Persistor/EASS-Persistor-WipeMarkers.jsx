/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "../EASS-WipePropertyKeyframes.jsx"

/** @function wipePropertyMarkers
 *  Deletes every keyframe from received AE Property.
 *
 *  @param {Property} tarProp - Reference to an AE Property. Every keyframe in the property will be removed
 *  @returns {Property} - Returns again a reference to target property so as to allow chained invocation.
 */
 EASS.Persistor.wipeLayerMarkers = function (targetLayer) {
 	this.wipePropertyKeyframes(targetLayer.property("Marker"));
 }