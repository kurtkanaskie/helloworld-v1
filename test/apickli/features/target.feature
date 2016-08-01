@target
Feature: API proxy target error handling
    As an API developer, 
    I want to test error responses when the target is unavailable,
    So I know they are consistent.

Response:
    {
      "code": "100000",
      "message": "Service is currently not available",
      "info": "https://developer.sage.com/docs/helloworld/v1/errors/100000",
      "detail": "Service is temporarily unavailable."
    }

    @target
    Scenario: Target error response
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
        And I set X-bypassHMAC header to true
        Given I have a valid target server connection
        When I use HMAC and GET /status
        Then response code should be 200
        When I have an invalid target server connection
        And I use HMAC and GET /status
        Then response code should be 503
        And response body path $.code should be 100000
	And response body path $.message should be Service is currently not available
        Then I have a valid target server connection
        When I use HMAC and GET /status
        Then response code should be 200

    @ensure-target
    Scenario: Ensure target is restored
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
        And I set X-bypassHMAC header to true
        Given I have a valid target server connection
        When I use HMAC and GET /status
        Then response code should be 200
