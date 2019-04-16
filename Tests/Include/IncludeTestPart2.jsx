//var testObj2 = (testObj2 !== undefined) ? testObj : { contador: { val: 0 }}
var testObj3 = testObj3;
testObj3 = (testObj3 === undefined) ? { contador: { val: 0 }} : testObj3;
/*
    var testVal = testVal;
    testVal = (testVal === undefined) ? 0 : testVal;
    //*/
    $.writeln ("executed IncludeTestPart2.jsx. Grand totale: ", testObj3.contador.val++);
