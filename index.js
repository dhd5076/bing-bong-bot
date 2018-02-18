const Discord = require('discord.js');
var fs = require('fs');
const bot = new Discord.Client();

bot.on('ready', () => {
});

bot.on('message', (message) => {
    switch(message.content.split(' ')[0]) {
        case '!bing':
            message.channel.sendMessage('Bong!');
            break;
        case '!play':
            song = message.content.split(' ')[1]; 
            if (fs.existsSync('./music/' + song + '.mp3') && 
                typeof message.member.voiceChannelID != 'undefined');
            {  
                message.channel.sendMessage("You're about to get memed!");
                message.member.voiceChannel.join().then(async (voiceConnection) => { 
                    voiceConnection.playFile('./music/'+ song +'.mp3');
                    voiceConnection.dispatcher.setVolume(0.5);
                }).catch((err) => {
                    console.log(err)
                });
            }
            break;
        case '!volume':
            bot.voiceConnections.forEach(voiceConnection => {
                volume = parseFloat(message.content.split(' ')[1]);
                if (volume <= 50 && typeof volume != 'undefined') {
                    voiceConnection.dispatcher.setVolume(volume/100.0);
                }
                else if (volume <= 100) {
                    if(message.member.hasPermission("ADMINISTRATOR")) {
                        voiceConnection.dispatcher.setVolume(volume/100);
                    }
                }
                else if (volume > 100 && 
                        message.member.lastMessage.content.split(' ')[0] == "!volume") {
                    message.reply("No, Asshole!");
                }
            });
            break;
        case "!name":
            message.channel.sendMessage(message.member.displayName) //CJ, JOIN!
        case "!songs":
            let reply1 = "::OPTIONS:: \n\n";
            fs.readdir('./music', (err, items) => {
                items.forEach( (file) => {
                    reply1 = reply1 + file.replace(".mp3", "") + "\n";
                });
                message.channel.sendMessage(reply1);
            });
        default:
            if (message.author.displayName != bot.displayName) {
                message.channel.sendMessage("What?");
            }
    }


});

bot.login('NDE0NTQ0MzE3ODk0NDkyMTcw.DWo7-A.lUgR2j8Tn3y7wkpDO_Az8QqyVpw');