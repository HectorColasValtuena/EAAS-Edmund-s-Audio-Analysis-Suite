/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

/** @function keyframeArrayToTimeRangeIndexes
 *  Takes an array of keyframes, markers, or any frame-like object with at least a time property.
 *  Returns an object containing the indexes of the first and last array entries
 *  within the time range defined by startTime and endTime.
 *  Entries without or undefined time property will be ignored but included.
 *	Returns NULL if no frames within defined time range.
 *
 *  @param {Array.<{time, ...}>} frameArray - Array of frame-type objects containing at least time properties.
 *  @param {number} startTime - In seconds. Beginning time of the required time range. Will correspond to frameArray start index if undefined or omitted.
 *  @param {number} endTime - In seconds. Ending time of the required time range. Will correspond to frameArray final index if undefined or omitted.
 *  @returns {<{startIndex, endIndex}>} - Object containing the index of the first (startIndex) and last (endIndex) entries within defined time range.
 */
EASS.Controller.keyframeArrayToTimeRangeIndexesLinearSearch = function (frameArray, startTime, endTime) {
	//if endTime parameter is not after startTime log an error and return null
	if ((startTime !== undefined && endTime !== undefined) && startTime > endTime) {
		/*LOG*/ $.writeln("? keyframeArrayToTimeRangeIndexes(): endTime must be after startTime");
		return null;
	}

	returnObj = {};
	inputLength = frameArray.length;

	if (startTime === undefined) { //if undefined startTime get first frame
		returnObj.startIndex = 0;
	}
	else {	//otherwise linearly search for the first frame at or after startTime
		curIndex = 0;
		while (curIndex < inputLength) {
			//if this frame has a time property and its the first frame at or after  startTime save its index as startIndex
			if ((frameArray[curIndex].time !== undefined) && (frameArray[curIndex].time >= startTime)) {
				returnObj.startIndex = curIndex;
				break;
			}
			curIndex++;
		}
	}

	if (endTime === undefined) {	//if undefined endTime get last frame
		returnObj.endIndex = inputLength - 1;
	}
	else {
		curIndex = inputLength - 1;
		while (curIndex >= 0) {
			//if this frame has a time property and its the last frame at or before endTime save its index as endIndex
			if ((frameArray[curIndex].time !== undefined) && (frameArray[curIndex].time <= endTime)) {
				returnObj.endIndex = curIndex;
				break;
			}
			curIndex--;
		}
	}

	//if found indexes don't delimit a valid range return null instead
	if (returnObj.startIndex > returnObj.endIndex) {
		return null;
	}
}