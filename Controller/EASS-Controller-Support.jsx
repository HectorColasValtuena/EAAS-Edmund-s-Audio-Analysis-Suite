/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

/** Controller Support Methods **/

/** @function cloneObjectArray
 *  Duplicates an array non-recursively. Creates a new instance of Array and new, cloned instances of the objects in the original array.
 *
 *  @param {Array.<Object>} srcArr - Array of objects to clone.
 *  @returns {Array.<Object>} - New array populated by copies of the objects in the source array.
 */
EASS.Controller.Support.cloneObjectArray = function (srcArr) {
	return srcArr.map(this.shallowCloneObject);
};

/** @function shallowCloneObject
 *  Performs a shallow duplication of the object.
 *
 *  @param {Object} srcObj - Source object to clone
 *  @returns {Object} - Duplicate of the original object
 */
EASS.Controller.Support.shallowCloneObject = function (srcObj) {
	return Object.assign({}, srcObj);
}