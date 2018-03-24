const Discord = require('discord.js');
const client = new Discord.Client();
var app = require('./app.js');
prefix = !
client.on("message" , message => {
	const msgc = message.content;
	if (msgc === (prefix +'dog')){
	const randomPuppy = require("random-puppy");

	      randomPuppy().then(url => {
	        message.channel.sendMessage({
	            embed: {
	                author: {
	                    name: "Scylla",
	                    icon_url: client.user.avatarURL,
	                    url: "http://takohell.com:3000/",
	                },
	                color: 0x00FF00,
	                image: {
	                    url: url,
	                }
	            }
	        });
	    })}
	 })