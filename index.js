var url = 'http://teamtreehouse.com/maciejsitko.json',
	ajaxGet = ajaxGetAsync(url);

var incr = document.getElementById('incr');

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
			var div = document.createElement('div');
			div.className = "display";
			div.innerHTML = "<b>" + e.key + ":</b> " + e.name + "<hr>";
			incr.appendChild(div);
		});

}

EventSource.post = function() {
	
	incr.innerHTML= 'Fetching data....';
	ajaxGet(this.target);

};

var	onEvent = bind(filter,EventSource); 


var button = document.getElementById('action');

button.addEventListener('click', function(){
	trigger('post');
}, false);



