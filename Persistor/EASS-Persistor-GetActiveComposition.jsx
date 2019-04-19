/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

//@include "./EASS-Constants.jsx"

/** @function getActiveComposition
 *  Fetches and returns a reference to currently active composition. Returns null if no active item or active item is not a Composition.
 *
 *  @returns {Composition} - Reference to active Composition object or null.
 */
EASS.Persistor.getActiveComposition = function () {
	//?If active item is a layer, could we fetch active composition through activeItem.containingComp
	return (app.project.activeItem !== null && app.project.activeItem.typeName == this.Constants.itemTypeNames.composition)
		? app.project.activeItem
		: null
	;
}