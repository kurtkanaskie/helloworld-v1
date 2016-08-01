/* jslint node: true */
'use strict';

module.exports = function () { 
    this.Given(/^I have a valid credit card and valid amount$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
	});
    this.Given(/^I have a valid credit card number and invalid amount$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
        });
    this.Given(/^I have an invalid credit card number and valid amount$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
	});
    this.Given(/^I have an invalid credit card expiration date and valid amount$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
	});
    this.Given(/^I have an invalid credit card security code and valid amount$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
	});
};
