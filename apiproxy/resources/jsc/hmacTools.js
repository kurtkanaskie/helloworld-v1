(function (){
    var hmacTools = {
		hmac : function(apiSecret, data) {
		    print('DATA: ' + data);
			var hashSign = CryptoJS.HmacSHA512(data, apiSecret);
			var hmac = CryptoJS.enc.Base64.stringify(hashSign);
			return hmac;
		},
        nonce : function(length) {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i = 0; i < length; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
    };

  // export into the global namespace
  if (typeof exports === "object" && exports) {
    // works for nodejs
    exports.hmacTools = hmacTools;
  }
  else {
    // works in rhino
    var globalScope = (function(){ return this; }).call(null);
    globalScope.hmacTools = hmacTools;
  }

}());
