var JSONHttpRequest = function(url, successHandler, errorHandler) {
	var req = new XMLHttpRequest();
	req.open('get', url, true);
	req.responseType = 'json';
	req.onload = function() {
		var status = req.status;
		if (status == 200) {
			successHandler && successHandler(req.response);
		} else {
			errorHandler && errorHandler(status);
		}
	};
	req.send();
};

var input = document.querySelector("#input");
if (input && input.addEventListener) {
  input.addEventListener("input", function(){
    var output = document.querySelector("#appel");
    JSONHttpRequest('/api?firstname='+input.value, function(data) {
      console.log(data);
      if(data[0].status == 'ok'){
        data.shift();
        let span = "";
        console.log(data);
        for(var i = 0; i < data.length; i++){
          span += "<span>" + data[i].firstname + "</span><br>"
        }
        output.innerHTML = span;
      }else {
				output.innerHTML = "";
      }
    }, function(err) {
      //erorrrrr
    });
  }, false);
}
