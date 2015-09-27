var url = 'http://teamtreehouse.com/maciejsitko.json',
	ajaxGet = ajaxGetAsync(url);

var incr = document.getElementById('incr'),
	button = document.getElementById('action');

var EventSource = new Events(newObj()); // Thin-air Object creation; NO State reliance
EventSource.get = function() {
	incr.innerHTML = "";
	var data = pipe(this.target.badges)
		.pipe(map(function(e) { 
			return { 
				name : e.name, 
				key: 'Name'
			};
		}))
		.pipe(take(5))
		.exec(map(function(e) {
			var div = document.createElement('p');
			div.className = "display";
			div.innerHTML = "<b>" + e.key + ":</b> " + e.name;
			incr.appendChild(div);
		}));
}

EventSource.post = function() {
	
	incr.innerHTML= '<div id="spinner"><div class="block-1"></div><div class="block-2"></div><div class="block-3"></div><div class="block-4"></div><div class="block-5"></div><div class="block-6"></div><div class="block-7"></div><div class="block-8"></div></div>';
	ajaxGet(this.target, 'GET');

};

EventSource.load = function() {
	this.post();
}


var	onEvent = eventMap(EventSource);

window.onload = trigger('load');
button.addEventListener('click', function(){
	trigger('post');
}, false);


// Useful Externals for Node.js ->> moment, accounting, 
// Other ->> requirejs


