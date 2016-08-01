var logging = context.getVariable("sage.logging");
var loggingUrl = context.getVariable("sage.loggingUrl");

if (logging == 'true') {
    print('LOGGING ' + loggingUrl);

    var logServerURL = context.getVariable("sage.loggingUrl");

    var logObject = {
        "organization": context.getVariable("organization.name"),
        "environment": context.getVariable("environment.name"),
        "apiProduct": context.getVariable("apiproduct.name"),
        "proxyName": context.getVariable("apiproxy.name"),
        "appName": context.getVariable("developer.app.name"),
        "merchantId": context.getVariable("sage.merchantId"),
        "verb": context.getVariable("request.verb"),
        "url": '' + context.getVariable("client.scheme") + '://' + context.getVariable("sage.host") + context.getVariable("sage.uri"),
        "responseCode": context.getVariable("message.status.code"),
        "responseReason": context.getVariable("message.reason.phrase"),
        "clientLatency": context.getVariable("total_client_time"),
        "targetLatency": context.getVariable("total_target_time"),
        "totalLatency": context.getVariable("total_request_time")
    };

    var headers = {
        'Content-Type': 'application/json'
    }; 

    var myLoggingRequest = new Request(logServerURL, "POST", headers, JSON.stringify(logObject));

    httpClient.send(myLoggingRequest);
}