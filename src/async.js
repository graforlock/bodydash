// NOTE: Currently relies on data.task module of Folktale.js

var Http = {};

function ajax() {
    return new XMLHttpRequest();
}

function JSONparse(res) {
    return JSON.parse(res);
}

Http.JSON = function(url, params) { 
            return new Task(function(reject,result) {
                return $.getJSON(url, params, result).fail(reject);
            });
};

// Refactor POST like get -->> ajaxPOST(url,cb)

Http.POST = function() {
 	//todo...
}

Http.GET = function(url) {
	//todo...
}

// Create JSONP function -->> Http.JSONP(url,cb)
