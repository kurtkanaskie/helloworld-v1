/* jshint node:true */
'use strict';

var factory = require('./factory.js');
var config = require('../../config/config.json');

var apiproxy = config.helloworld.apiproxy;
var basepath = config.helloworld.basepath;
var clientId = config.helloworld.clientId;
var clientSecret = config.helloworld.clientSecret;
var merchantId = config.helloworld.merchantId;
var merchantKey = config.helloworld.merchantKey;

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        this.apickli = factory.getNewApickliInstance();
        // this.apickli.storeValueInScenarioScope("clientId", "Uvz7ahhlaer3zhOp25BGmAzSQVEbsJNw");
        // this.apickli.storeValueInScenarioScope("clientSecret", "LOoE2q6enoqlTuBT");
		// this.apickli.storeValueInScenarioScope("merchantId", "299659842982");
        // this.apickli.storeValueInScenarioScope("merchantKey", "N3H5G9X7Q3Q5");
        this.apickli.storeValueInScenarioScope("apiproxy", apiproxy);
        this.apickli.storeValueInScenarioScope("basepath", basepath);
        this.apickli.storeValueInScenarioScope("clientId", clientId);
        this.apickli.storeValueInScenarioScope("clientSecret", clientSecret);
		this.apickli.storeValueInScenarioScope("merchantId", merchantId);
        this.apickli.storeValueInScenarioScope("merchantKey", merchantKey);
        callback();
    });
};

