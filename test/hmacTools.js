var CryptoJS = require("crypto-js");

var hmacTools = function () {
		var self = this;

		self.hmac = function(apiSecret, verb, url, body, merchantId, nonce, timestamp) {
				var data = verb + url + body + merchantId + nonce + timestamp;
				var hashSign = CryptoJS.HmacSHA512(data, apiSecret);
				var hmac = CryptoJS.enc.Base64.stringify(hashSign);
				// console.log('hmacTools-DATA: ' + data);
				// console.log('HMAC: ' + hmac);
				// console.log('timestamp: ' + timestamp);
				// console.log('merchantId: ' + merchantId);
				return hmac;
		}

		self.nonce = function(length) {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for(var i = 0; i < length; i++) {
						text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
		}
}

module.exports = hmacTools;

