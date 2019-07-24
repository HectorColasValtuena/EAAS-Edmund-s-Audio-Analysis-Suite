/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
*                                    Marker writer methods                                     
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "./EASS-Persistor-WriteObjectArrayToPropertyKeyframes.jsx"
//@include "./EASS-Persistor-KeyframeObjectToMarkerValue.jsx"
//@include "./EASS-Persistor-GetActiveComposition.jsx"
//@include "./EASS-Persistor-WipePropertyKeyframes.jsx"

/** @function writeObjectArrayToLayerMarkers
 *  Writes an array of keyframe objects as markers to a layer's markers property.
 *
 *  @param {Array.<{value, time, ...}>} objectArray - Array of keyframe objects to write. "comment" and "duration" attributes will be used to set some marker attributes.
 *  @param {AVLayer} targetLayer - Target layer.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 *  @param {boolean} [preWipe=false] - If true, all prior marker data will be deleted. Default=false.
 */
EASS.Persistor.writeObjectArrayToLayerMarkers = function (objectArray, targetLayer, maskObj, preWipe) {
	var markerArray = this.keyframeObjectArrayToMarkerValueArray(objectArray, maskObj);
	this.writeMarkerArrayToLayerMarkers(markerArray, targetLayer, preWipe);
}

/** @function writeObjectArrayToCompositionMarkers
 *  Writes an array of keyframe objects as markers to a composition maker row.
 *	If no composition assigned, markers will be written to active composition if found.
 *
 *  @param {Array.<{value, time, ...}>} objectArray - Array of keyframe objects to write. "comment" and "duration" attributes will be used to set some marker attributes.
 *  @param {CompItem} [targetComp] - [OPTIONAL] Composition to write markers to. Will try to find active composition if omitted.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 *  @param {boolean} [preWipe=false] - If true, all prior marker data will be deleted. Default=false.
 */
EASS.Persistor.writeObjectArrayToCompositionMarkers = function (objectArray, targetComp, maskObj, preWipe) {
	var markerArray = this.keyframeObjectArrayToMarkerValueArray(objectArray, maskObj);
	this.writeMarkerArrayToCompositionMarkers(markerArray, targetComp, preWipe);
}

/** @function writeMarkerArrayToLayerMarkers
 *  Writes an array of MarkerValue objects to a layer's markers property.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {AVLayer} targetLayer - Target layer.
 *  @param {boolean} [preWipe=false] - If true, all prior marker data will be deleted. Default=false.
 */
EASS.Persistor.writeMarkerArrayToLayerMarkers = function (markerArray, targetLayer, preWipe) {
	this.writeMarkerArrayToPropertyMarkers(markerArray, targetLayer.property("Marker"), preWipe);
}

/** @function writeMarkerArrayToCompositionMarkers
 *  Writes an array of MarkerValue objects to a composition maker row.
 *	If no composition assigned, markers will be written to active composition if found.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {CompItem} [targetComp] - [OPTIONAL] Composition to write markers to. Will try to find active composition if omitted.
 *  @param {boolean} [preWipe=false] - If true, all prior marker data will be deleted. Default=false.
 */
EASS.Persistor.writeMarkerArrayToCompositionMarkers = function (markerArray, targetComp, preWipe) {
	if (targetComp === undefined || targetComp === null) {
		targetComp = this.getActiveComposition();
	}

	/*TO-DO*/ /*FIX*/ //Find a proper way to access a composition's markers
	this.writeMarkerArrayToPropertyMarkers(markerArray, targetComp.layer("Marker"), preWipe);
}

/** @function writeMarkerArrayToPropertyMarkers
 *  Writes an array of MarkerValue objects to a target property.
 *	Property should correspond to a marker property.
 *
 *  @param {Array.<MarkerValue>} markerArray - Array of MarkerValue objects to write.
 *  @param {AVLayer} targetLayer - Target layer.
 *  @param {boolean} [preWipe=false] - If true, all prior marker data will be deleted. Default=false.
 */
EASS.Persistor.writeMarkerArrayToPropertyMarkers = function (markerArray, targetProp, preWipe) {
	if (preWipe === true) {
		this.wipePropertyKeyframes(targetProp);
	}

	for (var i = 0, l = markerArray.length; i < l; i++) {
		//Delete the time from the marker parameters and rewrite them
		var markerParams = markerArray[i].getParameters();
		var markerTime = markerParams.time;
		delete markerParams.time;
		markerArray[i].setParameters(markerParams);
		//Write the marker object at the target time
		targetProp.setValueAtTime(markerTime, markerArray[i]);		
	}
}