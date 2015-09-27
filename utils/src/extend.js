function extend(destination, source) {

    for (var property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

function extendData(target, data) {
    return extendObj(target, data);
}

function extendObj(destination, source) {
    return extend(obj(destination), obj(source));
}

function mergeObj(toExtend) { // A.K.A. Extend Many
    return objArr(toExtend)
        .map(function(e) {
            return extendObj({}, e)
        })
        .reduce(function(a, b) {
            return extendObj(a, b)
        });
}

function newObj() {
    return extendObj({}, {});
}