const Discord = require('discord.js');
const client = new Discord.Client();
var aide = "help";
var prefix = "!";
var chuck = "chuck";

client.on("message" , message => {
console.log("Commande Chuck demandee")
if (!message.content.startsWith(prefix)) return;
if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'chuck')) {
        message.channel.sendMessage('Chuck')
                var unirest = require('unirest');
                unirest.get("http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris")
                    .header("Accept", "application/json")
                    .end(function(result) {
                        console.log("Running Command for Chuck Norris");
                        message.channel.send(result.body.value["joke"]);
        });
    } else 

}});






client.login('MjkxNjk4Nzg1MTc4ODc3OTYy.C7BPLQ.H1BynYSd4RetIfqjNLIEFcxUzPU');