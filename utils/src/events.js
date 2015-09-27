
function eventMap(target) {
    return bind(findEvent, target);
}

function findEvent(event) {
    event = event.toLowerCase();
    if (this.hasOwnProperty(event))
        return this[event]();
    else
        throw new Error(this.constructor.name + ': Property "' + event +'" Not Found on the Object');
}

function Events(target) {

    this.target = target;
    this.fetched = function() {
        // On GET do:
        console.log('Executing on fetched!');
    };
    this.save = function() {
        // On SAVE/UPDATE do:
        console.log('Executing on save!');
    };
    this.post = function() {
        // On POST do:
        console.log('Executing on post!');
    };
}


function eventEmitter() {
    if(this instanceof eventEmitter) {
        this.triggerEvent = function(data) {
            eventEmitter.eventHandler(data);
        },
        this.setHandler = function(eventHandler) {
            eventEmitter.eventHandler = eventHandler;
        },
        this.eventHandler = function() {

        }
    } else {
        return new eventEmitter();
    }
}

function triggerEvents(src, event) {
    event = str(event);
    return src.triggerEvent(event);
}
