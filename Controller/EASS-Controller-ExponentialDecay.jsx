/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

/** @function arrayBidirectionalExponentialDecay
 *  Applies a continuous exponential decay on a densely populated array (i.e.: it's assumed there's input values for every possible keyframe in time)
 *  in both directions, from start to finish and from finish to start.
 *  Every value property in each entry of the array will be at least as big as the value in last entry minus itself*decayRate.
 *  This method DOES NOT create new arrays, directly altering previous contents of the array.
 *
 *  @param {Array.<{value, time, ...}>} dataArray - Data array to transform.
 *  @param {number} decayRate - Rate of decay, between 0 and 1 inclusively. The bigger the rate of decay the faster value peaks will decay. (0.1 - 0.01 recommended)
 *  @returns {Array.<{value, time, ...}>} - Returns again a reference to the received data array for convenience
 */
EASS.Controller.arrayBidirectionalExponentialDecay = function (dataArray, decayRate) {
	return this.arrayStartToEndExponentialDecay(this.arrayEndToStartExponentialDecay(dataArray, decayRate), decayRate);
}

/** @function arrayStartToEndExponentialDecay
 *  Applies a continuous exponential decay on a densely populated array
 *  in the default direction, from the start of the array (pos 0) to the end.
 *  This method DOES NOT create new arrays, directly altering previous contents of the array.
 *
 *  @param {Array.<{value, time, ...}>} dataArray - Data array to transform.
 *  @param {number} decayRate - Rate of decay, between 0 and 1 inclusively. The bigger the rate of decay the faster value peaks will decay. (0.1 - 0.01 recommended)
 *  @returns {Array.<{value, time, ...}>} - Returns again a reference to the received data array for convenience
 */
EASS.Controller.arrayStartToEndExponentialDecay = function (dataArray, decayRate) {
	var lastValue = 0;

	for (var i = 0, l = dataArray.length; i++; i < l) {
		dataArray[i].value = lastValue = this.exponentialDecayComparator(dataArray[i].value, lastValue, decayRate);
	}

	return dataArray;
}

 /** @function arrayEndToStartExponentialDecay
 *  Applies a continuous exponential decay on a densely populated array
 *  in the opposite direction, from the end of the array to the start of the array (pos 0).
 *  This method DOES NOT create new arrays, directly altering previous contents of the array.
 *
 *  @param {Array.<{value, time, ...}>} dataArray - Data array to transform.
 *  @param {number} decayRate - Rate of decay, between 0 and 1 inclusively. The bigger the rate of decay the faster value peaks will decay. (0.1 - 0.01 recommended)
 *  @returns {Array.<{value, time, ...}>} - Returns again a reference to the received data array for convenience
 */
EASS.Controller.arrayEndToStartExponentialDecay = function (dataArray, decayRate) {
	var lastValue = 0;

	for (var i = dataArray.length-1; i--; i >= 0) {
		dataArray[i].value = lastValue = this.exponentialDecayComparator(dataArray[i].value, lastValue, decayRate);
	}

	return dataArray;
}

/** @function exponentialDecayComparator
 *  Proportionally reduces lastValue by a ratio indicated by decayRate. Returns the largest of currentValue and decayed lastValue.
 *  This is the core operation of the array exponential decay methods.
 *
 *  @param {number} currentValue - Current entry value. Will be kept if it's larger than last value after decay.
 *  @param {number} lastValue - Last entry value. Will be kept if, after decay, it's larger than current value.
 *  @param {number} decayRate - Rate of decay, between 0 and 1 inclusively. The bigger the rate of decay the faster value peaks will decay. (0.1 - 0.01 recommended)
 *  @returns {number} - Returns the biggest of the decayed previous value and current value.
 */
EASS.Controller.exponentialDecayComparator = function (currentValue, lastValue, decayRate) {
	return Math.max(currentValue, lastValue * (1 - decayRate));
}