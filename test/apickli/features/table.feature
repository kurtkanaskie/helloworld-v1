@table
Feature: Demomstrate table usage
	As an Apickli test developer
	I would like an example table usage
	So I can easily build my own.

    Scenario Outline: Table populated merchantId
        Given I compute hmac with client secret "LOoE2q6enoqlTuBT" using verb "GET", path, "/ping", body "" and merchantId "<merchantId>"
        And I set headers for clientId <clientId>, merchantId <merchantId> and merchantKey <merchantKey>
        When I GET /ping
        Then response code should be 200
        And response header Content-Type should be application/json
        And response body path $.message should be PONG

        Examples:
            | clientId                         | merchantId    | merchantKey |
            | Uvz7ahhlaer3zhOp25BGmAzSQVEbsJNw | 1234567890    | 66666       |
            | Uvz7ahhlaer3zhOp25BGmAzSQVEbsJNw | 299659842982  | 77777       |

