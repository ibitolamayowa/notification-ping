var settings = require("./settings");
var request = require("request");
var IncomingWebhook = require('@slack/client').IncomingWebhook;

// Setup Slack
var url = process.env.SLACK_WEBHOOK_URL || '';
var webhook = new IncomingWebhook(url);

// Function which tries hitting the given url
function checkWebsite(url, callback) {
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
            callback(url, success, errorCode);
        });  
};

// Function that sends error message via Slack
function sendErrorMessage(url, errorCode) {
    var message = "Site down: " + url + " (" + errorCode + ")";
    webhook.send(message, function(err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });
}

settings.urls.forEach(function(url) {
    checkWebsite(url, function(url, success, errorCode) {
        if (success == false) {
            sendErrorMessage(url, errorCode);
        }
    });
});










