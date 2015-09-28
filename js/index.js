var incr = document.getElementById('incr'),
	button = document.getElementById('action');

var EventSource = new Events(newObj()); // Thin-air Object creation; NO State reliance
EventSource.get = function() {
	incr.innerHTML = "";
	Container.of(this.target.badges)
		.map(map(function(e) { 
			return { 
				name : e.name, 
				key: 'Name'
			};
		}))
		.map(take(5))
		.map(map(function(e) {
			var div = document.createElement('p');
			div.className = "display";
			div.innerHTML = "<b>" + e.key + ":</b> " + e.name;
			incr.appendChild(div);
		}));
}
EventSource.url = 'http://teamtreehouse.com/maciejsitko.json';

EventSource.load = function() {
	
	incr.innerHTML = '<div id="spinner"><div class="block-1"></div><div class="block-2"></div><div class="block-3"></div><div class="block-4"></div><div class="block-5"></div><div class="block-6"></div><div class="block-7"></div><div class="block-8"></div></div>';
	
	//--> Functions declared for composition:
	var extendTarget = curry(extendData);
	var triggerGet = triggerAjax.bind(null,'GET');
	
	//--> Composing above functions
	var callback = compose(triggerGet,extendTarget(this.target),JSONparse);

	return ajaxGET(this.url,callback);

};



var	onEvent = eventMap(EventSource);

window.onload = triggerAjax('load');
button.addEventListener('click', function(){
	triggerAjax('load');
}, false);


// Useful Externals for Node.js ->> moment, accounting, 
// Other ->> requirejs


