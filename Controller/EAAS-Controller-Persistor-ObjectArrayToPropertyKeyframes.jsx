/**********************************************************************************************\
*                                Edmund's Audio Analysis Suite
*                          Programmed by Héctor Colás Valtueña @2019
*                               ================================
*                                      ObjectArrayToPropertyKeyframes
*           Persists an array of objects {value, time} to new keyframes on a target property
*
\**********************************************************************************************/
{
    //writes every object in srcArr into referenced property. if preWipe = true removes every keyframe in the target property first
    //returns a reference to the target property
        /* DEBUG */ $.writeln("  objectArrayToPropertyKeyframes()");//", srcArr, ", ", tarProp, ", ", preWipe, ")");
    function objectArrayToPropertyKeyframes (srcArr, tarProp, preWipe) {
        
        //default preWipe to false if not included
        if (preWipe === undefined) { preWipe = false; }
        
        //initial wipe of all keyframes in target property
        if (preWipe === true) {
            for (var i = tarProp.numKeys; i > 0; i--) {
                tarProp.removeKey(i);
            }
        }
    
        //now proceed to write every array entry as a new keyframe in the target property
        for (var i= 0, l = srcArr.length; i < l; i++) {
            // TO-DO : Test efficiency/speed by using the method Property.setValuesAtTimes(times[], values[])
            // TO-DO : compare efficiency/speed of declaring a "var" inside and outside for loop
            //tarProp.setValueAtTime(srcArr[i].time, srcArr[i].value);
            //*
            var newKey = tarProp.addKey(srcArr[i].time);
            tarProp.setValueAtKey(newKey, srcArr[i].value);
            //*/
             // TO-DO : implement ease-in/out parametrization
        }
        
        //finally return again a reference to the target property
        return tarProp;
    }
}
