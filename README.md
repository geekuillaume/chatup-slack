# Chatup Slack Plugin

This plugin sends a message to a Slack Webhook URL when a message containing a specific string is sent on ChatUp.

You need to configure a new webhook on Slack before using this plugin.

## Example

```js
var conf = {}; // Your configuration
var worker = new ChatUp.ChatWorker(conf);

worker.registerMiddleware(require('chatup-slack')({
  slackUrl: 'YOUR SLACK URL',
  triggers: [
    '#911',
    '#emergency',
    '#support',
    '#help'
  ], // These are your trigger words
  slackPretext: 'A user on channel ${room.name} said:', // You can use whatever string is in the context of a ChatUp Middleware, look at the documentation on ChatUp repository
  slackUsername: 'User: ${user.name}'
}));

worker.listen();
```
