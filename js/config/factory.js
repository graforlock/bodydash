// TODO: Event emitter integrated with the bd library

var eventEmitter = {
    triggerEvent: function(data) {
        eventEmitter.eventHandler(data);
    },
    setHandler: function(eventHandler) {
        eventEmitter.eventHandler = eventHandler;
    },
    eventHandler: function() {

    }
}

var eventList = observe([]); // Observe the Array of Elements and Apply Data Binding
eventList.subscribe(function() {
    onEvent(this.value);
}) // Subscribes a function invoked on Custom Event 

var factory = Lazy.createWrapper(function(eventSource) {
    var sequence = this;

    eventSource.setHandler(function(data) {
        sequence.emit(data);
    });
});

factory(eventEmitter).each(function(e) {
    eventList(e);
});

var trigger = function(event) {
    event = str(event);
    return eventEmitter.triggerEvent(event);
}

var ajaxGetAsync = function(url) {
    url = str(url);
    return function(target, method) {
        method = str(method);
        var xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                return lens(extendData, function() {
                        throw new Error('Getter Not Permitted');
                    })
                    .set(target, obj(json)),
                    trigger(method);
            }
            if (xhr.status == 404) throw new Error('Sever responded with 404: Not Found');
            if (xhr.status == 500) throw new Error('Sever responded with 500: Internal Error');
        }
        xhr.open(method, url);
        xhr.send(null);
    }
}