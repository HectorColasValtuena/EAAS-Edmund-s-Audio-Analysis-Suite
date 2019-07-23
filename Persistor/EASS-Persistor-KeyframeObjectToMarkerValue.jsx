/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "./EASS-Persistor-Constants.jsx"
//@include "../Support/EASS-Support-FilterObjectAttributes.jsx"

/** @function keyframeObjectToMarkerValue
 *  Creates a new MarkerValue object taking its parameters from a values object and an optional parameters mask object
 *  The following paramObj attributes are used to define marker parameters: time, comment, duration.
 *
 *	If no mask is received (undefined), every value in parameters will be set in the new MarkerValue.
 *  If a mask is received, only properties present in the mask will be transfered from parameters to the new MarkerValue.
 *	Mask fields with a non-undefined value will use that value if corresponding parameter is not defined
 *
 *  @param {Object} paramObj - Object containing info to set into a new marker. time and value properties expected
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value
 *  @returns {MarkerValue} - New MarkerValue object with its parameters set to match received values
 */
EASS.Persistor.keyframeObjectToMarkerValue = function (paramObj, maskObj) {
	paramObj = EASS.Support.filterObjectAttributes(paramObj, maskObj);

	//var newMarker = new MarkerValue(paramObj.comment, paramObj.chapter, paramObj.url, paramObj.frameTarget, paramObj.cuePointName, paramObj);
	//Create a new marker object. It requires a comment so default will be used if no paramObj.comment available
	var newMarker = new MarkerValue(
		(paramObj.comment !== undefined && paramObj.comment !== null) ?
		paramObj.comment : EASS.Persistor.Constants.markerDefaultComment
	);

	if (paramObj.duration !== undefined) {
		newMarker.duration = paramObj.duration;
	}

	newMarker.setParameters(paramObj);
	return newMarker;
}

/** @function keyframeObjectArrayToMarkerValueArray
 *  Creates a new MarkerValue array from an array of keyframe objects {value, time, ...}
 *
 *  @param {Array.<Object>} paramObjArray - Object array containing info to set into new markers. time and value properties expected.
 *  @param {Object} [maskObj] - [OPTIONAL] Mask indicating what object properties to persist into a marker value.
 *  @returns {Array.<MarkerValue>} - Array of new MarkerValue object with their parameters set to match received values.
 */
EASS.Persistor.keyframeObjectArrayToMarkerValueArray = function (paramObjArray, maskObj) {
	var returnArr = new Array();
	for (var i = 0, l = paramObjArray.length; i < l; i++) {
		returnArr.push(this.keyframeObjectToMarkerValue(paramObjArray[i], maskObj));
	}
	return returnArr;
}