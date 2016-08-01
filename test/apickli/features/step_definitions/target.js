/* jslint node: true */
'use strict';

var factory = require('./factory.js');
var config = require('../../config/config.json');

var env = config.helloworld.env;
var mgmtCredentials = config.helloworld.mgmtCredentials;

module.exports = function () { 

    this.Given(/^I have a valid target server connection$/, function (callback) {

        var a = factory.getNewApickliInstance("/v1/o/sage/e/"+env+"/targetservers", "api.enterprise.apigee.com");
        // console.log("URL: " + "/v1/o/sage/e/"+env+"/targetservers");

        a.setRequestBody('<TargetServer name="hw-secure"><Host>www.sagepayments.net</Host><Port>443</Port><IsEnabled>true</IsEnabled><SSLInfo><Enabled>true</Enabled></SSLInfo></TargetServer>');
        a.addRequestHeader('Content-Type', 'text/xml');
        a.addRequestHeader('Authorization', 'Basic ' + mgmtCredentials);
        a.put('/hw-secure', function(err, response) {
            if( response ) { console.log(        "env: " + env + " server: " + JSON.parse(response.body).name + " enabled: " + JSON.parse(response.body).isEnabled); }

            if (err) {
                callback(err);
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.body);
                return;
            }

            callback();
        });
    });


    this.When(/^I have an invalid target server connection$/, function (callback) {

        var a = factory.getNewApickliInstance("/v1/o/sage/e/"+env+"/targetservers", "api.enterprise.apigee.com");
        // console.log("URL: " + "/v1/o/sage/e/"+env+"/targetservers");

        a.setRequestBody('<TargetServer name="hw-secure"><Host>www.sagepayments.net</Host><Port>443</Port><IsEnabled>false</IsEnabled><SSLInfo><Enabled>true</Enabled></SSLInfo></TargetServer>');
        a.addRequestHeader('Content-Type', 'text/xml');
        a.addRequestHeader('Authorization', 'Basic ' + mgmtCredentials);
        a.put('/hw-secure', function(err, response) {
            if( response ) { console.log(        "env: " + env + " server: " + JSON.parse(response.body).name + " enabled: " + JSON.parse(response.body).isEnabled); }
            if (err) {
                callback(err);
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.body);
                return;
            }

            callback();
        });
    });
};
