'use strict';

const Discord = require('discord.js');
const CleverbotAPI = require('cleverbot-api');

const client = new Discord.Client();
const cleverbot = new CleverbotAPI('YOURAPIKEY');

let cs = {};

client.on('message', message => {
    try {
        if(message.mentions.users.first()) {
            if(message.mentions.users.first().id === client.user.id) {
                if(message.content.startsWith(message.mentions.users.first())) {
                    message.channel.startTyping();
                    const input = message.content.split(' ').slice(1, this.length).join(' ');
                    let options = {};
                    options.input = (input ? input : undefined);
                    options.cs = (cs[message.author.id] ? cs[message.author.id] : undefined);
                    cleverbot.getReply(options, (error, response) => {
                        if(error) throw error;
                        message.reply(response.output);
                        cs[message.author.id] = response.cs;
                    });
                }
            }
        }
    } catch(error) {
        console.error(error);
        message.reply('wystąpił błąd!');
    } finally {
        message.channel.stopTyping();
    }
});

client.login('DISCORD-TOKEN');