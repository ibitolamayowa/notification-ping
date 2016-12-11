# Web Ping To Stack
A simple script to check if a list of websites are up, and send a Slack message if they are down.

## Instructions

1. First, install the dependencies by running ```npm install```
2. Add the list of sites you want to monitor in the ```urls``` property in the settings.js
3. Set the ```SLACK_WEBHOOK_URL``` environment variable to the URL of the incoming webhook you've setup in your Slack team
4. Run the script

The simplest way of running the script (on Mac/Linux) is something like:

```SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXXX/YYYYY node checker.js```

i.e. passing the webhook environment variable in before running the script

Run this script regularly via a cron job, and you get a simple check your websites are
reachable, and a Slack message when they aren't.



