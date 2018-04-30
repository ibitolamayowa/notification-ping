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

## AWS Lambda function

You can also run the checker as a AWS Lambda function, rather than on your own server.

How I do this is:

1. Set up an AWS Lambda function, and zip and upload the code (including the node_modules code)
2. N.B. If on a Mac, don't just use the "Compress this folder ..." command in Finder as the zip it produces doesn't work - see [this Stack Overflow page](https://stackoverflow.com/questions/41750026/aws-lambda-error-cannot-find-module-var-task-index)
3. The Handler needs to point to the lambda.js file e.g. set it to be "lambda.handler"
4. Setup a CloudWatch Events as the trigger, where the scheduled expression is ```rate(5 minutes)``` to run the function every 5 minutes
5. Add the URL for your Slack web hook as an SLACK_WEBHOOK_URL environment variable



