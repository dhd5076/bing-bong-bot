const Discord = require('discord.js');
const CleverbotAPI = require('cleverbot-api');
var fs = require('fs');
const bot = new Discord.Client();
const cleverbot = new CleverbotAPI('CLEVERBOT_API');
bot.on('ready', () => {
    bot.user.setActivity("Memes");
});

bot.on('message', (message) => {
    if (message.isMentioned(bot.user)) {
        cleverbot.getReply({
            input: message.content
        }, (err, response) => {
            console.log(err);
            message.reply(response.output);
        });
    }
    switch(message.content.split(' ')[0]) {
        case '!bing':
            message.channel.sendMessage('Bong!');
            break;
        case '!play':
            song = message.content.split(' ')[1]; 
            if (fs.existsSync('./music/' + song + '.mp3') && 
                typeof message.member.voiceChannelID != 'undefined');
            {  
                try {
                    message.member.voiceChannel.join().then(async (voiceConnection) => {
                        voiceConnection.playFile('./music/'+ song +'.mp3');
                        voiceConnection.dispatcher.setVolume(0.5);
                    });
                } catch(e) {
                    console.log(e);
                }
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
                    message.reply("You can't do that");
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
        case '!help':
            message.reply(
                "\n!bing\n" +
                "!volume {0-100}\n" +
                "!play {song}\n" +
                "!songs\n" + 
                "and more...\n"
                );
        default:
            if (message.author.displayName != bot.displayName) {
                message.channel.sendMessage("What?");
            }
    }


});

bot.login('DISCORD_API_KEY');
