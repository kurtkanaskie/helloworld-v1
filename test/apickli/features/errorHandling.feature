@intg
Feature: Error handling
	As an API consumer
	I want consistent and meaningful error responses
	So that I can handle the errors correctly

	@invalidhmac
    Scenario: GET with invalid hmac
        Given I set clientId header to `clientId`
        And I set merchantId header to 12345
        And I set merchantKey header to 67890
        And I set nonce header to `nonce`
        And I set timestamp header to `timestamp`
        And I set Authorization header to invalid-hmac
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be missing or invalid hmac

	@invalidclientid
    Scenario: GET with invalid clientId
        Given I set clientId header to badapikey
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be missing or invalid clientId

	@invalid-clientid-for-resource
    Scenario: GET with invalid clientId for resource
        Given I set clientId header to `invalidClientId`
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.code should be 400.01.001
        And response body path $.message should be missing or invalid clientId

    @missingrequiredfields
    Scenario: GET with missing required field merchantId
        Given I set clientId header to `clientId`
        And I set merchantKey header to 67890
        And I set nonce header to `nonce`
        And I set timestamp header to `timestamp`
        And I set Authorization header to invalid-hmac
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be required fields are missing
	@missingrequiredfields

    Scenario: GET with missing required field merchantKey
        Given I set clientId header to `clientId`
        And I set merchantId header to 12345
        And I set nonce header to `nonce`
        And I set timestamp header to `timestamp`
        And I set Authorization header to invalid-hmac
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be required fields are missing

	@missingrequiredfields
    Scenario: GET with missing required field nonce
        Given I set clientId header to `clientId`
        And I set merchantId header to 12345
        And I set merchantKey header to 67890
        And I set timestamp header to `timestamp`
        And I set Authorization header to invalid-hmac
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be required fields are missing

	@missingrequiredfields
    Scenario: GET with missing required field timestamp
        Given I set clientId header to `clientId`
        And I set merchantId header to 12345
        And I set merchantKey header to 67890
        And I set nonce header to `nonce`
        And I set Authorization header to invalid-hmac
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be required fields are missing

	@missingrequiredfields
    Scenario: GET with missing required field Authorization
        Given I set clientId header to `clientId`
        And I set merchantId header to 12345
        And I set merchantKey header to 67890
        And I set nonce header to `nonce`
        And I set timestamp header to `timestamp`
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be required fields are missing

	@foo
    Scenario: GET /foo request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
        When I use HMAC and GET /foo
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body path $.message should be Resource not found at /foo
        
	@foobar
    Scenario: GET /foo/bar request
        Given I set clientId header to `clientId`
        And I set merchantId header to `merchantId`
        And I set merchantKey header to `merchantKey`
        When I use HMAC and GET /foo/bar
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body path $.message should be Resource not found at /foo/bar
        
