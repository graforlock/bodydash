

function observe(value) {
    var listeners = [];

    function notify(newValue) {
        listeners.forEach(function(listener) {
            listener(newValue);
        });
    }

    function accessor(newValue) {
        if (arguments.length && newValue !== value) {
            this.value = newValue;
            notify(newValue);
        }
        return this.value;
    }

    accessor.subscribe = function(listener) {
        listeners.push(listener);
    };

    return accessor;
}