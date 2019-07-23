/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/
//****************            Persistor namespace values definition           ****************//

//@include "../EASS-Namespace.jsx"

//Possible values returned by an Item object's "typeName" property, identifying the type of object
EASS.Persistor.Constants.itemTypeNames = {
	composition: "Composition",
	layer: "Layer",
	folder: "Folder",
	footage: "Footage",
};

//Default comment to tag a marker created from an object without "comment" entry
EASS.Persistor.Constants.markerDefaultComment = "EASS Marker";