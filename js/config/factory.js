var ajaxEvents, eventList, trigger;

ajaxEvents = eventEmitter();
ajaxEvents.setHandler(function(data) {
    eventList(data);
})

eventList = observe([]); // Convert to object  
eventList.subscribe(function() {
    onEvent(this.value);
}) // Subscribes a function invoked on Custom Event 

triggerAjax = curry(triggerEvents)(ajaxEvents);