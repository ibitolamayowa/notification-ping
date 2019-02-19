var request = require("request");
var IncomingWebhook = require('@slack/client').IncomingWebhook;

var WebPingToSlackService = function () {}

// Setup Slack
var url = process.env.SLACK_WEBHOOK_URL || '';
var webhook = new IncomingWebhook(url);

// Function which tries hitting the given url
WebPingToSlackService.checkWebsite = function (url, callback) {
    request(
        {uri: url, method: "GET", timeout: 30000, followRedirect: false}, 
        function(error, response) {
            var success = false;
            var errorCode = 999;
    
            if (response) {
                errorCode = response.statusCode;

                if (error == null && response.statusCode == 200) {
                    success = true;
                }
            }

            console.log(url + ": " + success + " (" + errorCode + ")");
            callback(url, success, errorCode, error);
        });  
};

// Function that sends error message via Slack
WebPingToSlackService.sendErrorMessage = function(url, errorCode, error) {
    var message = "Site down: " + url + " (" + errorCode + "): " + error;
    webhook.send(message, function(err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });
}

module.exports = WebPingToSlackService;