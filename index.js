var url = 'http://teamtreehouse.com/maciejsitko.json',
	ajaxGet = ajaxGetAsync(url);

var incr = document.getElementById('incr'),
	button = document.getElementById('action');

var Data = {}; 

var EventSource = new Events(Data);
EventSource.fetched = function() {
	incr.innerHTML = "";
	var data = Lazy(this.target.badges)
		.map(function(e) {
			return {
				name: e.name,
				key: 'Name'
			}
		})
		.take(5)
		.each(function(e) {
			var div = document.createElement('p');
			div.className = "display";
			div.innerHTML = "<b>" + e.key + ":</b> " + e.name;
			incr.appendChild(div);
		});

}

EventSource.post = function() {
	
	incr.innerHTML= '<div id="spinner"><div class="block-1"></div><div class="block-2"></div><div class="block-3"></div><div class="block-4"></div><div class="block-5"></div><div class="block-6"></div><div class="block-7"></div><div class="block-8"></div></div>';
	ajaxGet(this.target);

};

EventSource.load = function() {
	this.post();
}

var	onEvent = bind(filter,EventSource); 


window.onload = trigger('load');
button.addEventListener('click', function(){
	trigger('post');
}, false);



