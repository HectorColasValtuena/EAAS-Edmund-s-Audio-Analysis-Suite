/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
*                                    Marker writer methods                                     
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "./EASS-Persistor-WriteObjectArrayToPropertyKeyframes.jsx"
//@include "./EASS-Persistor-KeyframeObjectToMarkerValue.jsx"
//@include "./EASS-Persistor-GetActiveComposition.jsx"

/** @function writeObjectArrayToLayerMarkers
 *  Writes an array of keyframe objects as markers to a layer's markers property.
 *
 *  @param {Array.<{value, time, ...}>} objectArray - Array of keyframe objects to write. "comment" and "duration" attributes will be used to set some marker attributes.
 *  @param {AVLayer} targetLayer - Target layer.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 */
EASS.Persistor.writeObjectArrayToLayerMarkers = function (objectArray, targetLayer, maskObj) {
	var markerArray = this.keyframeObjectArrayToMarkerValueArray(objectArray, maskObj);
	this.writeMarkerArrayToLayerMarkers(markerArray, targetLayer);
}

/** @function writeObjectArrayToCompositionMarkers
 *  Writes an array of keyframe objects as markers to a composition maker row.
 *	If no composition assigned, markers will be written to active composition if found.
 *
 *  @param {Array.<{value, time, ...}>} objectArray - Array of keyframe objects to write. "comment" and "duration" attributes will be used to set some marker attributes.
 *  @param {CompItem} [targetComp] - [OPTIONAL] Composition to write markers to. Will try to find active composition if omitted.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 */
EASS.Persistor.writeObjectArrayToCompositionMarkers = function (objectArray, targetComp, maskObj) {
	var markerArray = this.keyframeObjectArrayToMarkerValueArray(objectArray, maskObj);
	this.writeMarkerArrayToCompositionMarkers(markerArray, targetComp);
}

/** @function writeObjectArrayToCompositionMarkers
 *  Writes an array of keyframe objects as markers to a composition maker row.
 *	If no composition assigned, markers will be written to active composition if found.
 *
 *  @param {Array.<{value, time, ...}>} objectArray - Array of keyframe objects to write. "comment" and "duration" attributes will be used to set some marker attributes.
 *  @param {CompItem} [targetComp] - [OPTIONAL] Composition to write markers to. Will try to find active composition if omitted.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 */
EASS.Persistor.writeObjectArrayToPropertyMarkers = function (objectArray, targetProp, maskObj) {
	var markerArray = this.keyframeObjectArrayToMarkerValueArray(objectArray, maskObj);
	this.writeMarkerArrayToPropertyMarkers(markerArray, targetProp);
}

/** @function writeMarkerArrayToLayerMarkers
 *  Writes an array of MarkerValue objects to a layer's markers property.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {AVLayer} targetLayer - Target layer.
 */
EASS.Persistor.writeMarkerArrayToLayerMarkers = function (markerArray, targetLayer) {
	this.writeMarkerArrayToPropertyMarkers(markerArray, targetLayer.property("Marker"));
}

/** @function writeMarkerArrayToCompositionMarkers
 *  Writes an array of MarkerValue objects to a composition maker row.
 *	If no composition assigned, markers will be written to active composition if found.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {CompItem} [targetComp] - [OPTIONAL] Composition to write markers to. Will try to find active composition if omitted.
 */
EASS.Persistor.writeMarkerArrayToCompositionMarkers = function (markerArray, targetComp) {
	if (targetComp === undefined || targetComp === null) {
		targetComp = this.getActiveComposition();
	}

	this.writeMarkerArrayToPropertyMarkers(markerArray, targetComp.property("Marker"));
}

/** @function writeMarkerArrayToPropertyMarkers
 *  Writes an array of MarkerValue objects to a target property.
 *	Property should correspond to a marker property.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {AVLayer} targetLayer - Target layer.
 */
 EASS.Persistor.writeMarkerArrayToPropertyMarkers = function (markerArray, targetProp) {
 	var timeArray = new Array();
 	for (var i = 0, l = markerArray.length; i < l; i++) {
 		timeArray.push(markerArray[i].getParameters().time);
 	}

 	targetProp.setValuesAtTimes(timeArray, markerArray);
 }