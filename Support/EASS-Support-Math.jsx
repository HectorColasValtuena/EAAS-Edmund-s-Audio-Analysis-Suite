/**********************************************************************************************\
*                             Edmund's Audio Synchronization Suite
*                          Programmed by Héctor Colás Valtueña @2019
\**********************************************************************************************/

//@include "../EASS-Namespace.jsx"

/* Various mathematical operations and numerical comparisons */

/** @function numberIsWithinRange
 *	Takes a single number and two values delimiting a range. Returns TRUE if the first number is within that range.
 *  The range delimiters may be in any order, so either A or B can be the largest.
 *	If inclusiveCheck is true or omitted, if number equals any of the range delimiters it will be considered within the range.
 *
 *  @param {number} number - A numerical value
 *  @param {number} rangeLimitA - An outer limit for the valid value range. May be the upper or lower limit.
 *  @param {number} rangeLimitB - An outer limit for the valid value range. May be the upper or lower limit.
 *  @param {boolean} [inclusiveCheck] - [Optional] if true or omitted the valid range will include the rangeLimit values.
 *  @returns {boolean} - TRUE if number is between range limits A and B, FALSE otherwise.
 */
EASS.Support.Math.numberIsWithinRange = function (number, rangeLimitA, rangeLimitB, inclusiveCheck) {
	//if inclusiveCheck is omitted or true return true if number equals any of the limits
	if (inclusiveCheck !== false && (number == rangeLimitA || number == rangeLimitB)) {
		return true;
	}

	//check if number is between rangeLimitA and rangeLimitB
	if ((number > rangeLimitA && number < rangeLimitB) ||
		(number < rangeLimitA && number > rangeLimitB)) {
		return true;
	}

	return false;
}