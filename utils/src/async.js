// OVERALL TODO: --->>> Will depend heavily on data.task through Browserify/CommonJS

function ajax() {
    return new XMLHttpRequest();
}


function JSONparse(res) {
    return JSON.parse(res);
}

//Refactor the GET to take composed callback-->> ajaxGET(url,target)

function ajaxGET(url, cb) {
        url = str(url);
        var xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                return cb(xhr.responseText);
            }
            if (xhr.status == 404) throw new Error('Sever responded with 404: Not Found');
            if (xhr.status == 500) throw new Error('Sever responded with 500: Internal Error');
        }
        xhr.open('GET', url);
        xhr.send(null);
}

// Refactor POST like get -->> ajaxPOST(url,cb)

// code here...

// -->>

// Create ajaxJSONP out of it: -->>

// var scr = document.createElement('script')
// scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
// document.body.appendChild(scr)