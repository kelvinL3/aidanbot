var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                return;
                
            case 'balance':
                ppl = []
                weights = []
                // aidan 2 kelvin 2 vedankt 2 ankur 2
                // already checked {double number, not same amount numbers and names}
                args = message.substring(message.indexOf(' ')) // get only args substring
                var names = args.split(/[\d]+/); // split by numbers
                names.pop()
                var i;
                for (i=0; i<names.length; i++) {
                    names[i] = names[i].trim();
                    // console.log(typeof(names[i]) + " - " + names[i]);
                    if (String(names[i]).includes(' ')) {
                        bot.sendMessage({
                            to: channelID,
                            message: `Improperly formatted arguments (${names[i]})`
                        });
                        return;
                    }
                }
                var weights = args.match(/(\d+)/gi); // check against this
                
                // console.log(names);
                // console.log(typeof(weights));
                // console.log(weights);
                
                
                if (weights == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: `Names and Weights not provided`
                    });
                    return;
                }
                if (names.length != weights.length) {
                    bot.sendMessage({
                        to: channelID,
                        message: `Number of names and weights not same (${names.length} names and ${weights.length} weights)`
                    });
                    return;
                }
                var nameWeights = []
                for (i=0; i<names.length; i++) {
                    nameWeights.push([names[i], weights[i]]);
                }
                // console.log("nameWeights: " + nameWeights);
                
                // balancing
                // type 1 balancing, simple snakeing
                nameWeights.sort(function(a, b) {
                    return b[1] - a[1];
                });
                
                
                // console.log("nameWeights: " + nameWeights);
                
                var team1 = []
                var team2 = []
                var c = 1;
                var isTeam1 = true;
                for (const nw of nameWeights) {
                    // console.log("wtf is this shit -- " + nw)
                    if (c == 0) {
                        isTeam1 = !isTeam1;
                        c = 2
                    }
                    if (isTeam1) {
                        team1.push(nw);
                    } else {
                        team2.push(nw);
                    }
                    c--;
                }
                // console.log("TEAM1  " + team1);
                // console.log("TEAM1  " + team2);
                
                var retmsg = ""
                for (i=0; i<team1.length; i++) {
                    retmsg = retmsg.concat(String(team1[i][0]) + "\t\t");
                    // console.log("1: " + retmsg);
                    if (!(i<team2.length)) {
                        break;
                    }
                    retmsg = retmsg.concat(String(team2[i][0]) + "\n");
                    // console.log("2: " + retmsg);
                }
                if (i<team2.length) {
                    retmsg = retmsg.concat("\t\t\t\t\t" + team2[i][0]);
                } else {
                    retmsg = retmsg.substring(0, retmsg.length-1);
                }
                // console.log("RETMSG" + retmsg);
                bot.sendMessage({
                    to: channelID,
                    message: retmsg
                });
                return;
            break;
            // Just add any case commands if you want to..
         }
     }
});