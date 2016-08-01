/* jslint node: true */
'use strict';

module.exports = function () { 

	this.Given(/^I set headers for clientId (.*), merchantId (.*) and merchantKey (.*)$/, function (clientId, merchantId, merchantKey, callback) {
        this.apickli.addRequestHeader('clientId', clientId);
        this.apickli.addRequestHeader('merchantId', merchantId);
        this.apickli.addRequestHeader('merchantKey', merchantKey);
         callback();
       });

};
