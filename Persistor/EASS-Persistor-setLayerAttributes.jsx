/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

/** @function setLayerAttributes
 *  Sets the desired attributes of target layer. Omitted attributes will be left as they were.
 *
 *  @param {Object} layerAttributes - Object containing data of layer's configuration. Every property is optional.
 *  	@param {string} [layerAttributes.name] - Display name of the new layer. No name will be set if omitted (Defaults to "Null##")
 *  	@param {number} [layerAttributes.inPoint] - Layer's start point in time (seconds). Defaults to containing composition's start point.
 *  	@param {number} [layerAttributes.outPoint] - Layer's end point in time (seconds). Defaults to containing composition's end point.
 *  	@param {string} [layerAttributes.comment] - A descriptive comment for the layer.
 *  	@param {boolean} [layerAttributes.enabled] - When true, the layer is enabled; otherwise false. This corresponds to the video switch state of the layer in the Timeline panel.
 *  	@param {boolean} [layerAttributes.locked] - When true, the layer is locked; otherwise false. This corresponds to the lock toggle in the Layer panel.
 *  	@param {boolean} [layerAttributes.shy] - When true, the layer is “shy,” meaning that it is hidden in the Layer panel if the composition’s “Hide all shy layers” option is toggled on.
 *		@param {number} [layerAttributes.stretch] - The layer’s time stretch, expressed as a percentage. A value of 100 means no stretch. Values between 0 and 1 are set to 1, and values between -1 and 0 (not including 0) are set to -1.
 *  @param {Layer} targetLayer - Reference to Layer.
 *  @returns {Layer} - Returns again a reference to target layer so as to allow nested invocation.
 */
 EASS.Persistor.setLayerAttributes = function (targetLayer, layerAttributes) {
 	if (layerAttributes === null || layerAttributes === undefined || targetLayer === null || targetLayer === undefined) {
 		/* DEBUG */ $.writeln("EASS.Persistor.setLayerAttributes received no layerAttributes or targetLayer object.")
 		return targetLayer;
 	}

 	if (layerAttributes.name !== undefined) { targetLayer.name = layerAttributes.name; }
 	if (layerAttributes.inPoint !== undefined) { targetLayer.inPoint = layerAttributes.inPoint; }
 	if (layerAttributes.outPoint !== undefined) { targetLayer.outPoint = layerAttributes.outPoint; }
 	if (layerAttributes.comment !== undefined) { targetLayer.comment = layerAttributes.comment; }
 	if (layerAttributes.enabled !== undefined) { targetLayer.enabled = layerAttributes.enabled; }
 	if (layerAttributes.locked !== undefined) { targetLayer.locked = layerAttributes.locked; }
 	if (layerAttributes.shy !== undefined) { targetLayer.shy = layerAttributes.shy; }
 	if (layerAttributes.stretch !== undefined) { targetLayer.stretch = layerAttributes.stretch; }

 	return targetLayer;
 }