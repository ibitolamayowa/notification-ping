// For use in AWS Lambda function
var settings = require("./settings");
var WebPingToSlackService = require("./web-ping-to-slack");

exports.handler = function(event, context, callback) {
    settings.urls.forEach(function(url) {
        WebPingToSlackService.checkWebsite(url, function(url, success, errorCode, error) {
            if (success == false) {
                WebPingToSlackService.sendErrorMessage(url, errorCode, error);
            }
        });
    });
}