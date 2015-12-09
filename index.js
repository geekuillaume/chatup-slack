var superagent = require('superagent');
var _ = require('lodash');
var debug = require('debug')('ChatUp-Slack');

module.exports = function chatupSlack(options) {
  if (!options.slackUrl) {
    throw new Error('slackUrl option required');
  }
  if (!Array.isArray(options.triggers)) {
    throw new Error('triggers option required')
  }
  var slackUsernameTemplate = _.template(options.slackUsername || 'Chat user: ${user.name}');
  var slackPretextTemplate = _.template(options.slackPretext || 'A user on channel ${room._name} said:');
  return function(ctx, next) {
    for (var i = 0; i < options.triggers.length; i++) {
      if (_.contains(ctx.msg.msg, options.triggers[i])) {
        debug('Found trigger in message', ctx.msg.msg);
        var slackMessage = {};
        superagent.post(options.slackUrl).send({
          username: slackUsernameTemplate(ctx),
          pretext: slackPretextTemplate(ctx),
          text: ctx.msg.msg,
          fallback: ctx.msg.msg
        }).end((err, data) => {
          if (err) {
            return console.error('Error while sending message to slack', err);
          }
          debug('Sended message to slack');
        });
        return next({status: 'ok', message: 'messageRedirected'});
      }
    }
    return next();
  }
}
