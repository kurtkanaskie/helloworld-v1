// from client
var clientId = context.getVariable('sage.clientId');
var clientSecret = context.getVariable('sage.clientSecret');

var req_merchantId = context.getVariable('sage.merchantId');
var req_hmac = context.getVariable('sage.hmac');
var req_nonce = context.getVariable('sage.nonce');
var req_timestamp = context.getVariable('sage.timestamp');
var req_body = context.getVariable('request.content');
var req_host = context.getVariable('request.header.host');

// from context
// var clientSecret = context.getVariable('verifyapikey.AC-Verify-API-Key.client_secret'); // sage.clientSecret
var req_verb = context.getVariable('request.verb');
var req_scheme = context.getVariable('client.scheme');
var req_message_uri = context.getVariable('message.uri');

// construct full URL
var req_url = req_scheme + "://" + req_host + req_message_uri;

// date.now returns value in ms; standard unix timestamp is in seconds
var now_timestamp = Date.now() / 1000; 

var timeDiff = now_timestamp - req_timestamp;
var timestampMaxAge = 60; // context.getVariable("sage.timestampMaxAge");
var timestampMinAge = -30; //context.getVariable("sage.timestampMinAge");
// take advantage of short-circuiting to avoid unnecessary work
var valid_HMAC =
    timeDiff <= timestampMaxAge &&
    timeDiff >= timestampMinAge &&
    req_hmac === hmacTools.hmac(clientSecret, req_verb + req_url + req_body + req_merchantId + req_nonce + req_timestamp);

var built_hmac = hmacTools.hmac(clientSecret, req_verb + req_url + req_body + req_merchantId + req_nonce + req_timestamp);
print('timestampMaxAge: ' + timestampMaxAge); 
print('timestampMinAge: ' + timestampMinAge); 
print('merchantId: ' + req_merchantId);
print('Request HMAC: ' + req_hmac); 
print('Built   HMAC: ' + built_hmac);
print('Request: ' + req_timestamp);
print('Now: ' + now_timestamp);
print('Diff: ' + Math.abs(now_timestamp - req_timestamp));


context.setVariable('sage.invalid.hmac', !valid_HMAC);
