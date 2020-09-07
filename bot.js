const Discord = require('discord.js');
const client = new Discord.Client();
// var auth = require('./auth.json');
const { prefix, token } = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);

bot.on('message', function(message) {
    // Now, you can use the message variable inside
    if (message.content === "$loop") { 
        var interval = setInterval (function () {
            // use the message's channel (TextChannel) to send a new message
            message.channel.send("owo")
            message.channel.send("owo balance")
            .catch(console.error); // add error handling here
        }, 5 * 1000); 
    }
});


// client.on('message', message => {
    
//     console.log(message.content);
    
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     if (!(message.channel.name === 'bot') && !(message.author.id === message.guild.ownerID)) {
//         return message.reply("You're not in the bot channel");
//     }
    
//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();


//     if (command === 'balance') {
//         // TODO
//         message.channel.send("to do");
//     } else if (command === 'rroulette') {

//         if (!message.guild.me.hasPermission('MOVE_MEMBERS')) return message.reply('Missing the required `Move Members` permission.');
        
//         var vc = message.member.voice.channel;
//         if (!vc) return message.reply("You're not in a voice channel");
        
//         var mem = vc.members.random();
//         mem.voice.kick();
//         message.reply(`Disconnected ${mem.displayName} from the voice channel`);
//     } else if (command === 'rename') {
//         const taggedMember = message.mentions.members.first();
//         if (!taggedMember) {
//             return message.channel.send(`No member mentioned...`);
//         }
//         const oldName = taggedMember.displayName;
//         var strmsg = message.content;
//         const newName = strmsg.substring(strmsg.indexOf(args[1]));
//         taggedMember.setNickname(newName)
//         .then(ret => {
//             message.channel.send(`Renamed: _${oldName}_ to _${newName}_`);
//         })
//         .catch(e => {
//             return message.channel.send(`Something went wrong when running this command! -- (${e})`);
//         });
//     }

// });
