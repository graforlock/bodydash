
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

function listener(ev,node) {
    // or again return IO wrap, Remove 'f' dependency, include .__value dependency for a final call
    // would have to include next function that is basically eventListener(ev,node,f) -> IO
    return new IO(curry(function(f) {
        return node.addEventListener(ev,f,false);
    }));
}

var listener = curry(listener);


function on(event) {
    return new IO(function() {
        return event;
    });
}

// var EventStream = curry(function(node,ev) {
//    return liftA2(listener,on(ev),select(node));
// });

function EventStream(node,ev) {
   return liftA2(listener,on(ev),select(node));
};

var EventStream = curry(EventStream);

function Events(target) {
//Some Lame OOP...

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
