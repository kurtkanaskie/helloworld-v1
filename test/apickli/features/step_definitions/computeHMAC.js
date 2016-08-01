/* jslint node: true */
'use strict';
// Create a new singleton
var hmacTools = new (require("../../../hmacTools.js"))();

module.exports = function () { 

	this.Given(/^I compute hmac with client secret "([^"]*)" using verb "([^"]*)", path, "([^"]*)", body "([^"]*)" and merchantId "([^"]*)"$/, function (clientSecret, verb, pathSuffix, body, merchantId, callback) {
		var timestamp = Date.now() / 1000 + '';
		var nonce = hmacTools.nonce(12);
		var url = this.apickli.domain + pathSuffix;
		var hmac = hmacTools.hmac( clientSecret, verb, url, body, merchantId, nonce, timestamp );
        this.apickli.addRequestHeader('timestamp', timestamp);
        this.apickli.addRequestHeader('nonce', nonce);
        this.apickli.addRequestHeader('Authorization', hmac);
		console.log( "URL: " + url);
		// console.log( "BODY: " + body);
		// console.log( "HMAC: " + hmac);
		// console.log( "merchantId: " + merchantId);
        callback();
    });

	this.Given(/^I store the value "([^"]*)" as (.*) in scenario scope$/, function (value, variable, callback) {
        this.apickli.storeValueInScenarioScope(variable, value);
        callback();
    });

};
