// OVERALL TODO: --->>> Will depend heavily on data.task through Browserify/CommonJS

function ajax() {
    return new XMLHttpRequest();
}

function JSONparse(res) {
    return JSON.parse(res);
}

//Refactor the GET to take composed callback-->> ajaxGET(url,target)
function parametrize(params) {
    params = obj(params);
    var result = "";
    keys = Object.keys(params);
    keys.forEach(function(e,i) {
            if(i !== 0) result += concat(concat('&',String(e)),concat('=',params[e]));
            else result += concat(concat('?',String(e)),concat('=',params[e]));
    });    
    return result;
}
function getJSON(url,cb, params) {
        params = params || "";
        if(params) params = parametrize(params);
        url = str(url);
        xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                return cb(JSONparse(xhr.responseText));
            }
            if (xhr.status == 404) return new Error('404: Not Found');
            if (xhr.status == 500) return new Error('500: Internal server Error.');
        }
        xhr.open('GET', url + params);
        xhr.send(null);
}

// Refactor POST like get -->> ajaxPOST(url,cb)

function httpPOST(url) {
// code here...
}

// -->>

// Create ajaxJSONP out of it: -->>

// var scr = document.createElement('script')
// scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
// document.body.appendChild(scr)