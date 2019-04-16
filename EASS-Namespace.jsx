/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

/** Namespace definition **/

if (EASS === undefined) {
	EASS = {
		Interface: {},
		Plan: {},
		Persistor: {},
		Controller: {
			Support: {},
		},
	};
}

/* DEBUG */
else {
	$.writeln("!!!!!!!!!!!!!!!!");
	$.writeln("!!Attempted namespace overwrite");
	$.writeln("!!!!!!!!!!!!!!!!");
}
