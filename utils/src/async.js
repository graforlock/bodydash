// OVERALL TODO: --->>> Will depend heavily on data.task through Browserify/CommonJS
var Http = {};

function ajax() {
    return new XMLHttpRequest();
}

function JSONparse(res) {
    return JSON.parse(res);
}


//Refactor the GET to take composed callback-->> ajaxGET(url,target)
// function parametrize(params) {
//     params = obj(params);
//     var result = "";
//     keys = Object.keys(params);
//     keys.forEach(function(e,i) {
//             if(i !== 0) result += concat(concat('&',String(e)),concat('=',params[e]));
//             else result += concat(concat('?',String(e)),concat('=',params[e]));
//     });    
//     return result;
// }
// function getJSON(url) {
//         // params = params || "";
//         // if(params.toString() === '[ object Object ]') params = parametrize(params);
//         url = str(url);
//         xhr = ajax();
//         xhr.onreadystatechange = function() {
//             if (xhr.status == 200 && xhr.readyState == 4) {
//                 return JSONparse(xhr.responseText); // remove callack dependency
//             }
//             if (xhr.status == 404) return new Error('404: Not Found');
//             if (xhr.status == 500) return new Error('500: Internal server Error.');
//         }
//         xhr.open('GET', url /*+ params*/);
//         xhr.send(null);
// }

Http.JSON = function(url, params) { 
            return new Task(function(reject,result) {
                return $.getJSON(url, params, result).fail(reject);
            });
};

// Refactor POST like get -->> ajaxPOST(url,cb)

Http.POST = function() {

}

Http.GET = function(url) {
	
}

// -->>

// Create ajaxJSONP out of it: -->>

// var scr = document.createElement('script')
// scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
// document.body.appendChild(scr)