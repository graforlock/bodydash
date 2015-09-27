
function ajax() {
    return new XMLHttpRequest();
}

function ajaxAsync(url, target, method) {
	    url = str(url);
        method = str(method);
        var xhr = ajax();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                return lens(extendData, function() {
                        throw new Error('Getter Not Permitted');
                    })
                    .set(target, obj(json)),
                    trigger(method);
            }
            if (xhr.status == 404) throw new Error('Sever responded with 404: Not Found');
            if (xhr.status == 500) throw new Error('Sever responded with 500: Internal Error');
        }
        xhr.open(method, url);
        xhr.send(null);
}