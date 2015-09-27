// OVERALL TODO: --->>> Will depend heavily on data.task through Browserify/CommonJS

function ajax() {
    return new XMLHttpRequest();
}


//Refactor the GET to take composed callback-->> ajaxGET(url,target)

function ajaxGET(url,target) {
		target = target || {};
	    url = str(url);
        var xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
            	// return cb(xhr.responseText);
                var json = JSON.parse(xhr.responseText);
                return lens(extendData, function() {
                        throw new Error('Getter Not Permitted');
                    })
                    .set(target, obj(json)),
                    trigger('GET');
            }
            if (xhr.status == 404) throw new Error('Sever responded with 404: Not Found');
            if (xhr.status == 500) throw new Error('Sever responded with 500: Internal Error');
        }
        xhr.open('GET', url);
        xhr.send(null);
}



// Refactor POST like get -->> ajaxPOST(url,params)

function ajaxPOST(url, cb) {
		target = target || {};
	    url = str(url);
        var xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
            	return cb(xhr.responseText);
                // var json = JSON.parse(xhr.responseText);
                // return lens(extendData, function() {
                //         throw new Error('Getter Not Permitted');
                //     })
                //     .set(target, obj(json)),
                //     trigger('POST');
            }
            if (xhr.status == 404) throw new Error('Sever responded with 404: Not Found');
            if (xhr.status == 500) throw new Error('Sever responded with 500: Internal Error');
        }
        xhr.open('POST', url);
        xhr.send(params);
}



// Create ajaxJSONP out of it: -->>

function success(data) {
  // code
}
// var scr = document.createElement('script')
// scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
// document.body.appendChild(scr)