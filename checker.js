var settings = require("./settings");
var WebPingToSlackService = require("./web-ping-to-slack");

settings.urls.forEach(function(url) {
    WebPingToSlackService.checkWebsite(url, function(url, success, errorCode, error) {
        if (success == false) {
            WebPingToSlackService.sendErrorMessage(url, errorCode, error);
        }
    });
});
