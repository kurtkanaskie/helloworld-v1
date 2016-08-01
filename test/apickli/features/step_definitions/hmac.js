/* jslint node: true */
'use strict';

// Create a new singleton
var hmacTools = new (require("../../../hmacTools.js"))();

module.exports = function () { 

	var setupCommon = function(apickli, verb, pathSuffix) {
        var timestamp = Date.now() / 1000 + '';
		var nonce = hmacTools.nonce(12);
		var url = apickli.domain + pathSuffix;
		var clientSecret = apickli.scenarioVariables['clientSecret'];
		var merchantId = apickli.scenarioVariables['merchantId'];
		var body = apickli.requestBody;
		var hmac = hmacTools.hmac( clientSecret, verb, url, body, merchantId, nonce, timestamp );
		// console.log( "URL: " + url);
		// console.log( "BODY: " + body);
		// console.log( "HMAC: " + hmac);
		// console.log( "merchantId: " + merchantId);
        apickli.addRequestHeader('nonce', nonce);
        apickli.addRequestHeader('timestamp', timestamp);
        apickli.addRequestHeader('Authorization', hmac);
	};

	this.When(/^I use HMAC and GET (.*)$/, function (pathSuffix, callback) {
	setupCommon(this.apickli, "GET", pathSuffix);
		this.apickli.get(pathSuffix, function(err, response) {
			callback(err);
/* Want to do the equivalent of this just for /ping
			if ( response ) {
                console.log( response.body);
            }
*/
		});
       });

	this.When(/^I use HMAC and PUT to (.*)$/, function (pathSuffix, callback) {
	setupCommon(this.apickli, "PUT", pathSuffix);
		this.apickli.put(pathSuffix, function(err, response) {
			callback(err);
		});
       });

	this.When(/^I use HMAC and POST to (.*)$/, function (pathSuffix, callback) {
	setupCommon(this.apickli, "POST", pathSuffix);
		this.apickli.post(pathSuffix, function(err, response) {
			callback(err);
		});
       });

	this.When(/^I use HMAC and DELETE (.*)$/, function (pathSuffix, callback) {
	setupCommon(this.apickli, "DELETE", pathSuffix);
		this.apickli.delete(pathSuffix, function(err, response) {
			callback(err);
		});
       });

};
