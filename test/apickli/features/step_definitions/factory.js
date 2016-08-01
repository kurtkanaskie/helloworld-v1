var apickli = require('apickli');
var config = require('../../config/config.json');

var defaultBasePath = config.helloworld.basepath;
var defaultDomain = config.helloworld.domain;

console.log('helloworld api: [' + config.helloworld.domain + ', ' + config.helloworld.basepath + ']');

var getNewApickliInstance = function(basepath, domain) {
	basepath = basepath || defaultBasePath;
	domain = domain || defaultDomain;

	return new apickli.Apickli('https', domain + basepath);
};

exports.getNewApickliInstance = getNewApickliInstance;
