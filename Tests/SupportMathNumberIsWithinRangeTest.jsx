//@include "../Support/EASS-Support-Math.jsx"

tests = [
	{ number: 5, rangeLimitA: 0, rangeLimitB: 10, inclusiveCheck: undefined, expectedResult: true },
	{ number: 5, rangeLimitA: 10, rangeLimitB: 0, inclusiveCheck: undefined, expectedResult: true },
	{ number: 5, rangeLimitA: 0, rangeLimitB: 10, inclusiveCheck: false, expectedResult: true },
	{ number: 5, rangeLimitA: -10, rangeLimitB: 10, inclusiveCheck: undefined, expectedResult: true },
	{ number: 5, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: undefined, expectedResult: true },
	{ number: 10, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: undefined, expectedResult: true },
	{ number: 10, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: true, expectedResult: true },
	{ number: 10, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: false, expectedResult: false },
	{ number: -11, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: undefined, expectedResult: false },
	{ number: 11, rangeLimitA: 10, rangeLimitB: -10, inclusiveCheck: undefined, expectedResult: false },
];
//	{ number: , rangeLimitA: , rangeLimitB: , inclusiveCheck: , expectedResult:  },


$.writeln("- Starting numberIsWithinRange tests")
var successes = 0;
for(var i = 0, l = tests.length; i < l; i++){
	if (EASS.Support.Math.numberIsWithinRange(tests[i].number, tests[i].rangeLimitA, tests[i].rangeLimitB, tests[i].inclusiveCheck) == tests[i].expectedResult) {
		$.writeln("!!Test Successful!\n", tests[i]);
		successes++;
	}
	else {
		$.writeln("??Test failure\n", tests[i]);
	}
}
$.writeln("- tests finished. ", successes, "/", tests.length, " successful tests\n========");
