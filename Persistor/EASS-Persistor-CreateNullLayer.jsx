/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "../EASS-Persistor-SetLayerAttributes.jsx"

/** @function createNullLayer
 *  Creates and returns a new null layer with the desired attributes within the desired composition or currently active composition.
 *  Returns null if no composition available.
 *
 *  @param {Object} [layerAttributes] - [Optional] Object containing data of new layer's configuration. Every property is optional.
 *  	@param {string} [layerAttributes.name] - Display name of the new layer. No name will be set if omitted (Defaults to "Null##")
 *  	@param {number} [layerAttributes.inPoint] - Layer's start point in time (seconds). Defaults to containing composition's start point.
 *  	@param {number} [layerAttributes.outPoint] - Layer's end point in time (seconds). Defaults to containing composition's end point.
 *  	@param {string} [layerAttributes.comment] - A descriptive comment for the layer.
 *  	@param {boolean} [layerAttributes.enabled] - When true, the layer is enabled; otherwise false. This corresponds to the video switch state of the layer in the Timeline panel.
 *  	@param {boolean} [layerAttributes.locked] - When true, the layer is locked; otherwise false. This corresponds to the lock toggle in the Layer panel.
 *  	@param {boolean} [layerAttributes.shy] - When true, the layer is “shy,” meaning that it is hidden in the Layer panel if the composition’s “Hide all shy layers” option is toggled on.
 *  @param {CompItem} [parentComposition] - [Optional] Reference to Composition object within which to create new layer.
 *		If omitted, will try to fetch AE's currently active composition. If no composition available will fail and return null.
 *  @returns {Layer} - Reference to newly created layer. Null if no composition available.
 */
EASS.Persistor.createNullLayer = function (layerAttributes, parentComposition) {
	if (parentComposition === undefined || parentComposition === null) {
		parentComposition = this.getActiveComposition();
		if (parentComposition === null) {
			/* DEBUG */ $.writeln("EASS.Persistor.createNullLayer: No active composition could be found");
			return null;
		}
	}
	return this.setLayerAttributes(layerAttributes, parentComposition.layers.addNull());
}