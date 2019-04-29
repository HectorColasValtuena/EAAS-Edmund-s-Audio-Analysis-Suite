/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"
//@include "./EASS-Support-CloneObject.jsx"

/** @function filterObjectAttributes
 *  Returns a copy of originalObj validating every property against maskObj.
 *  If no mask is received (UNDEFINED) originalObj will be copied and returned as-is.
 *
 *  Only fields present in the mask will be kept in the new object.
 *  NULL-valued mask fields will ONLY be kept in the new object if not null or undefined.
 *	UNDEFINED-valued mask fields will be kept in the new object regardless of value.
 *	Any-other-valued mask fields will be kept and use that value as a default if corresponding value is null or undefined.
 *
 *  @param {Object} originalObj - Object to duplicate and filter
 *  @param {Object} maskObj - Filtering mask
 *  @returns {Object} - Filtered object
 */
EASS.Support.filterObjectAttributes = function (originalObj, maskObj) {
	if (maskObj === undefined || maskObj === null) {
		return this.shallowCloneObject(originalObj);
	}

	var returnObj = {};

	for (var key in maskObj) {
		if (maskObj[key] === null) {
			if ((originalObj[key] !== undefined) && (originalObj[key] !== null)) {
				returnObj[key] = originalObj[key];
			}
		}
		else {
			returnObj[key] = originalObj[key];
			if (maskObj[key] !== undefined && returnObj[key] === undefined) {
				returnObj[key] = maskObj[key];
			}
		}
	}

	return returnObj;
}
