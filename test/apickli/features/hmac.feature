@hmac
Feature: Ping feature
	As API admin
	I want to monitor Apigee health
	So I can alert when it is down
    
	@hmac-get
    Scenario: Ping GET request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
        When I use HMAC and GET /ping
        Then response code should be 200
        And response header Content-Type should be application/json
        # And response body path $.environment should be dev
        And response body path $.apiproxy should be helloworld-v1
        And response body path $.client should be ^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$
        And response body path $.latency should be ^\d{1,2}
        And response body path $.message should be PONG
        
	@hmac-post
    Scenario: Ping POST request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
		And I set body to {'hello':'world'}
        When I use HMAC and POST to /ping
        Then response code should be 200
        And response header Content-Type should be application/json
        And response body path $.message should be PONG
        
	@hmac-put
    Scenario: Ping PUT request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
		And I set body to {'hello':'world'}
        When I use HMAC and PUT to /ping
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body path $.message should be Resource not found at /ping
        
	@hmac-delete
    Scenario: Ping DELETE request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
		And I set body to {'hello':'world'}
        When I use HMAC and DELETE /ping
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body path $.message should be Resource not found at /ping
        
