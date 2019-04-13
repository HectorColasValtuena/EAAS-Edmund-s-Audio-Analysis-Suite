{
//Property source to keyframe values array
    //takes a reference to a layer property with keyframes
    //returns an array of {value, time} objects representing those keyframes
    function propertyKeyframesToObjectArray (srcProp) {
        var tarArr = new Array();
        var numKeys = srcProp.numKeys;
        for (var i = 1; i <= numKeys; i++) {
            tarArr.push({
                value : srcProp.keyValue(i),
                time : srcProp.keyTime(i),
            });
        }
        return tarArr;
    }
}