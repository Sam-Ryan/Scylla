const Discord = require('discord.js');
const client = new Discord.Client();
const ddiff = require('deep-diff');
const chalk = require('chalk');
const weather = require("weather-js");
const Wiki = require("wikijs");
const express = require("express");
var app = express();
var yt = require("./youtube_plugin");
var allfunction = require("./allfunction.js");
var youtube_plugin = new yt();
var AuthDetails = require("./auth.json");
var RedisSessions = require("redis-sessions");
var rs = new RedisSessions();
var Music = require("./Music.js");
var functionhelper = require("./functionhelper.js");
var ffmpeg = require("ffmpeg");
search = require("youtube-search"),
music = new Music();
con = console.log;
var aide = "help";
var prefix = "!";
var moment = require("moment");
var mention = "<291698785178877962>"
var scylla = ["Scylla", "The Black Box", "The black box", "The Black box", "scylla", "the black box"];
const opts = {
  maxResults: 3,
  key: AuthDetails.youtube_api_key
};
var jsonObj = {
	"!chuck": "getChuck"
}; 




client.on('ready', () => {
  var servers = client.guilds.array().map(g => g.name).join(',');
  var memberCount = client.users.size;
	var servercount = client.guilds.size;
	
	console.log("--------------------------------------");
	console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :)  \n[!]Les préfix actuelle:  ' + prefix + "\n[!]Mentions = " + mention + "\n[!]Nombre de membres: " + memberCount + "\n[!]Nombre de serveurs: " + servercount);
	console.log('I am ready!');
// Create an event listener for new guild members
	client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
	  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
	  const msgc = message.content;
	  if (msgc.author === client.user) return;

	  // If you want to send the message to a designated channel on a server instead
	  // you can do the following:
	  const channel = member.guild.channels.find('name', 'member-log');
	  // Do nothing if the channel wasn't found on this server
	  if (!channel) return;
	  // Send the message, mentioning the member
	  channel.send(`Welcome to the server, ${member}`);
	});

});


client.on("guildcreation" , member => {
	let guild = member.guild;
	guild.defaultChannel.send("Bienvenue ${member.user.username} sur ce server ;) ");
});
        	

client.on('rolecreate' , role => {
	let guild = role.guild
	guild.defaultChannel.sendMessage(`Un nouveau role nommé ${role.name} a été créé`);

});

client.on('roleDelete' , role => {
	let guild = role.guild;
	guild.defaultChannel.sendMessage(`Un role nommé ${role.name} a été supprimé`);
});

client.on('roleUpdate' , (oRole, nRole) =>{
	console.log(ddiff(oRole, nRole));
});



client.on("message" , message => {
	const msgc = message.content;
	console.log("J'ai vu le message")
	let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');
	var guild = message.guild;
	var messages = [];

	
	//Musique 
   music.setVoiceChannel(message.member.voiceChannel);
    var array_msg = msgc.split(' ');
            messages.push(message);
            switch (array_msg[0]) {
        case (prefix +"play") :
            con("Play");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.voice();
            break;
        case (prefix +"pause") :
            con("Pause");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.pause();
            break;
        case (prefix + "resume") :
            con("Resume");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.resume();
            break;
        case (prefix + "stop") :
            con("Stop");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.stop();
            message.reply("La queue à était vidé !");
            break;
        case (prefix +"add") :
            con("Add");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            search(link, opts, function(err, results) {
                if(err) return con(err);
                for (var y = 0; results[y].kind == 'youtube#channel'; y++);
                message.channel.sendMessage(results[y].link);
                music.setTabEnd(results[y].link);
            });
            break;
        case (prefix +"link") :
            con("Link");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            con(link);
            music.setTabEnd(link);
            break;
        case (prefix +"volume") :
            con("Volume");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            message.reply("le volume et maintenant à :" + link);
            break;
        case (prefix +"next") :
            con("Next");
            message.delete(message.author);
            if (music.getI() < music.getLengthTab()) music.setI(this.i + 1);
            if (music.getI() >= music.getLengthTab()) music.setI(0);
            music.next();
            break;
        }

 
		//JSON Chuck
        var functionName = jsonObj[msgc];
        if (functionName) {
			allfunction[functionName](message);
        }
        

       if(msgc.startsWith(prefix +"info")) {
	    var memberavatar = message.author.avatarURL
	    var membername = message.author.username
	       var mentionned = message.mentions.users.first();
	      var getvalueof;
	      if(mentionned){
	          var getvalueof = mentionned;
	      } else {
	          var getvalueof = message.author;
	      }

	      if(getvalueof.bot == true){
	          var checkbot = "L'utilisateur est un bot";
	      } else if (getvalueof.id == 286977405149511683) {
	      	var checkbot = "Vous êtes l'Admin de ce serveur respect à vous!";

	      } else if (getvalueof.id == 145702927099494400) {
	      	var checkbot = "You are a very kind person who is always to help a French friend ty for all";
	      } else if (getvalueof.id == 286591024518660096){
	      	var checkbot = "Du bist eine sehr nette Person, die immer einem französischen Freund danke für alle helfen soll";
	  	  } else {
	  	    var checkbot = "N'est pas un bot";
	      } 
	      if(getvalueof.presence.status == 'online'){
	        var status = "En ligne"; 
	      }else {
	        var status = "Hors ligne";
	      }
	message.channel.sendMessage({
	        embed: {
	          type: 'rich',
	          description: '',
	          fields: [{
	            name: 'Pseudo',
	            value: getvalueof.username,
	            inline: true
	          }, {
	            name: 'User id',
	            value: getvalueof.id,
	            inline: true
	          },{
	            name: 'Discriminateur',
	            value: getvalueof.discriminator,
	            inline: true
	},{
	            name: 'Status',
	            value: status,
	            inline: true
	},{
	            name: 'Bot',
	            value: checkbot,
	            inline: true
	}],
	        image: {
	      url: getvalueof.avatarURL
	        },
	          color: 0xE46525,
	          timestamp: new Date(),
	          footer: {
	            text: 'by Ryan[]',
	            proxy_icon_url: ' '
	          },

	          author: {
	            name: membername,
	            icon_url: memberavatar,
	            proxy_icon_url: ''
	          }
	        }
	});
	}
	
	if (message.author.bot) return;

	//Ping
	if (msgc ==(prefix + 'ping')) {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms \``);
	} else
	
	//Avertissement => liste
	for (var i = 0; i < liste.length; i++) {
	if (message.content.includes(liste[i])) {
		message.delete();
  	  	message.reply("Attention tu utilises des mots innapropriés sur ce serveur!!! \n 1er Avertisstement");
  		}
	
	 }

	 //Bonjour
	if (message.content === "Bonjour") {
		message.channel.send("Bonjour à toi ");
	} else 

	if (message.content === "Bot-Scylla1") {
				message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: "Faites vos suggestions et réclamations ici :warning: ",
            value: "Please do your suggestion and claim here :warning: ",
            inline: true
          }],
          color: 0xE46525,
          timestamp: new Date(),
          footer: {
            text: 'by Ryan[]',
        },
    }
});

	} else


	for (var i = 0; i < scylla.length; i++) {
	if (message.content.includes(scylla[i])) {
		message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: "Vous avez reveillez la boîte noire, l'enregistrement commence, attention à vos propos. :record_button: ",
            value: "You have awaked The Black Box, recording in process be careful of what you said. ",
            inline: true
          }],
          color: 0xE46525,
          timestamp: new Date(),
          footer: {
            text: 'by Ryan[]',
        },

	}
});
	}
}

	//Appel du Bot
	if (message.author != client.user && message.isMentioned(client.user)) {
        message.channel.sendMessage(message.author + ", you called The Black Box?");
	} else 

	//Rôle
	if (message.content.startsWith(prefix + 'giverolefrench')) {
		guild.member(message.mentions.users.first()).addRole('Staff').cacth(error => console.log(error));
	} else

	if(message.content.startsWith(prefix + "you 'rebeautiful")) {
		message.reply("It's true!:flag_gb:  C'est vrai!:flag_fr:  Das ist richtig!:flag_de: ");
	} else


	//Statistiques
    if (message.content === '!stats') {
    var memberCount = client.users.size;
    var servercount = client.guilds.size;
	let m = " ";
	m += '``` Je suis en compagnie de '+ memberCount +' membres ';
	m += ' et je suis présent dans '+ servercount+' serveurs \n```';
	m += new Date(),
	message.channel.send(m).catch(console.log)
	
 	} else 

 	//Méteo
    if (message.content.startsWith(prefix + 'meteo')) {
        var location = message.content.substr(6);
        var unit = "C";
        try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.warn(Date.now(), "DANGER", "Je ne peut pas trouvé d'information pour la méteo de " + location);
                message.reply("\n" + "Je ne peut pas trouvé d'information pour la méteo de " + location);
            } else {
                data = data[0];
               console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
               message.reply("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
            }
        });
    } catch(err) {
        console.error(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
        message.reply("Problème avec le bot");
        }

    } else

    //Addition
    if (message.content.startsWith(prefix + "addition")) {
    	let numArray = args.map(n=> parseInt(n));
    	let total = numArray.reduce( (p, c) => p+c);

    	message.channel.send(total);
    } else  

    if (message.content.startsWith(prefix + "yt")) {
        youtube_plugin.respond(message.content, message.channel , client);
    } else 

    //Wiki
    if (message.content.startsWith(prefix + 'wiki')) {
        if(!message.content.substr(5)) {
            console.log(Date.now(), "Danger", "Wikipedia ne trouve pas ce que vous avez demandé : " + message.content.substr(5));
            message.reply("Vous devez fournir un terme de recherche.");
            return;
        }
         var wiki = new Wiki.default();
            wiki.search(message.content.substr(5)).then(function(data) {
                if(data.results.length==0) {
                    console.log(Date.now(), "DANGER","Wikipedia ne trouve pas ce que vous avez demandée : " + message.content.substr(5));
                    message.reply("Je ne peut trouvé ce que vous voulez dans Wikipedia :(");
                    return;
                }
                wiki.page(data.results[0]).then(function(page) {
                    page.summary().then(function(summary) {
                        if(summary.indexOf(" may refer to:") > -1 || summary.indexOf(" may stand for:") > -1) {
                            var options = summary.split("\n").slice(1);
                            var info = "Selectioné une options parmis celle-ci :";
                            for(var i=0; i<options.length; i++) {
                                info += "\n\t" + i + ") " + options[i];
                            }
                            message.reply(info);
                            selectMenu(message.channel, message.author.id, function(i) {
                                commands.wiki.process(Client, message, options[i].substring(0, options[i].indexOf(",")));
                            }, options.length-1);
                        } else {
                            var sumText = summary.split("\n");
                            var count = 0;
                            var continuation = function() {
                                var paragraph = sumText.shift();
                                if(paragraph && count<3) {
                                    count++;
                                    message.reply(message.channel, paragraph, continuation);
                                }
                            };
                            message.reply("**Trouvé " + page.raw.fullurl + "**", continuation);
                        }
                    });
                });
            }, function(err) {
                console.log(Date.now(), "ERREUR","Impossible de se connecté a Wikipédia");
                message.reply("Uhhh...Something went wrong :(");
            });
    } else 

    //Definir le statut du bot
	if (message.content.startsWith(prefix + 'setstatus')) {
		client.user.setStatus(argresult);
	} else 

	//Definir le jeu du bot (ici live twitch)
	if (message.content.startsWith(prefix + "setgame")) {
		client.user.setGame('!help to call the BlackBox', 'https://twitch.tv/')
		
	} else 
    
    //Random blague de Chuck Norris
    if (message.content ==(prefix + 'chuck')) {
        /*message.channel.send('Chuck')
                var unirest = require('unirest');
                unirest.get("http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris")
                    .header("Accept", "application/json")
                    .end(function(result) {
                        console.log("Running Command for Chuck Norris");
                        message.channel.send(result.body.value["joke"]);
        });*/
    } else 

    //Recherche Google 
     if (msgc.startsWith(prefix +'google')){
	const google = require("google");
	const unirest = require("unirest");

	  if(msgc.substr(8)) {
    let query = msgc.substr(8);
      con(query);
    let num = (msgc.substr(8).lastIndexOf(" ") + 1);
    if(!query || isNaN(num)) {
      query = msgc.substr(8);
      num = 0;
    }
    if(num < 0 || num > 2) {
      num = 0;
    } else {
      num = parseInt(num);
    }
    unirest.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${AuthDetails.youtube_api_key}&limit=1&indent=True`).header("Accept", "application/json").end(res => {
      const doSearch = () => {
        google(query, (err, res) => {
          if(err || res.links.length == 0) {
            message.channel.sendMessage("🙅 No results!");
          } else {
            const results = [];
            if(num == 0) {
              num = 1;
            }
            for(let i=0; i < Math.min(res.links.length, num); i++) {
              if([`News for ${query}`, `Images for ${query}`].indexOf(res.links[i].title)>-1) {
                res.links.splice(i, 1);
                i--;
                continue;
              }
          message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Result Google',
            value: `[${res.links[i].title}](`+`${res.links[i].href})`,
            inline: true
          },{
            name: '** **',
            value: `${res.links[i].description}`,
            inline: true
          }],
           thumbnail: {
             url: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
                },
          color: 3447003,
          timestamp: new Date(),
          footer: {
            text: 'by Ryan[]',
            proxy_icon_url: ' '
          }
        }
});
            }

          }
        });
      };
      
      if(res.status == 200 && res.body.itemListElement[0] && res.body.itemListElement[0].result && res.body.itemListElement[0].result.detailedDescription) {
        message.channel.sendMessage(`\`\`\`${res.body.itemListElement[0].result.detailedDescription.articleBody}\`\`\`<${res.body.itemListElement[0].result.detailedDescription.url}>`).then(() => {
          if(num > 0) {
            doSearch();
          }
        });
      } else {
        doSearch();
      }
    });
  } else {
    con(`Parameters not provided for !google command`);
    message.channel.sendMessage(` ❓❓❓`);
  }

} else 

    //Gif !! a finir
	if (message.content.startsWith(prefix + 'gif')) {
        message.channel.sendMessage('Recherche de votre Gif')
        var unirest = require('unirest');
        exports.run = function(client, message, args) {
    let argscmd = message.content.split(" ").slice(1);
    let word = argscmd.slice(0).join(" ");
    if (!word) return message.reply("Donnez moi des mots à rechercher");
    unirest.post("http://grwh.ga/api/gif.php?term=" + word)
        .header("Accept", "application/json")
        .end(function(result) {
            console.log("Running Command for Google Images | Params: " + word);
            if (!result.body.value["response"]) return message.reply("Je n'ai rien trouver!");
             message.reply("Ton GIF arrive");


            message.channel.send(" ", {
              file: result.body.value["response"] // Or replace with FileOptions object
          });
        });
    }

    //Imdb recherche de film à finir
    } else if (msgc.startsWith(prefix +'imdb')){
const unirest = require("unirest");

let  query = msgc.substr(6);
  let type = "";
  if(query.toLowerCase().indexOf("series ")==0 || query.toLowerCase().indexOf("episode ")==0 || query.toLowerCase().indexOf("movie ")==0) {
    type = `&type=${query.substring(0, query.indexOf(" ")).toLowerCase()}`;
    query = query.substring(query.indexOf(" ")+1);
  }
  if(query) {
    unirest.get(`http://www.omdbapi.com/?t=${encodeURIComponent(query)}&r=json${type}`).header("Accept", "application/json").end(res => {
      if(res.status==200 && res.body.Response=="True") {
        message.channel.sendMessage({
                  embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: 'Results Imdb :film_frames:',
            value:  `[${res.body.Title}${type ? "" : (` (${res.body.Type.charAt(0).toUpperCase()}${res.body.Type.slice(1)})`)}](http://www.imdb.com/title/${res.body.imdbID}/)`,
            inline: false
          },{
            name: '** **',
            value:  `\`\`\`${res.body.Plot}\`\`\``,
            inline: false
          },{
            name: 'Year',
            value:  `${res.body.Year}`,
            inline: true
          },{
            name: 'Rated',
            value:  `${res.body.Rated}`,
            inline: true
          },{
            name: 'Runtime',
            value:  `${res.body.Runtime}`,
            inline: true
          },{
            name: 'Director',
            value:  `${res.body.Director}`,
            inline: true
          },{
            name: 'Writer',
            value:  `${res.body.Writer}`,
            inline: true
          },{
            name: 'Actors',
            value:  `${res.body.Actors}`,
            inline: true
          },{
            name: 'Genre(s)',
            value:  `${res.body.Genre}`,
            inline: false
          },{
            name: 'Rating',
            value:  `${res.body.imdbRating} out of ${res.body.imdbVotes} votes`,
            inline: true
          },{
            name: 'Awards',
            value:  `${res.body.Awards}`,
            inline: true
          },{
            name: 'Country',
            value:  `${res.body.Country}`,
            inline: true
          }],
          color: 3447003,
          footer: {
            text: 'by Ryan[]',
            proxy_icon_url: ' '
          },
           author: {
            name: message.author.username,
            icon_url: message.author.avatarURL,
            proxy_icon_url: ' '
          }
        }
        })
      } else {
        con(`No IMDB entries found for ` + msgc.substr(6));
        message.channel.sendMessage("Nothing found in IMDB 😶🚫");
      }
    });
  } else {
    message.channel.sendMessage(`U WOT M8... you need to use !imdb name film`);
  }
} else 

	//Random cat image
	if(msgc ===(prefix + 'cat')){
		var randomCat = require('random-cat');
		var url = randomCat.get();
		message.channel.send({
	            embed: {
	                author: {
	                    name: "Scylla",
	                    icon_url: client.user.avatarURL,
	                    url: "http://imgur.com/t/cat/iqYmR",
	                },
	                color: 0x00FF00,
	                image: {
	                    url: url,
	                }
	            }
	        });
	    

	} else

	//Random dog image
	if (msgc === (prefix +'dog')){
	const randomPuppy = require('random-puppy')

		randomPuppy().then(url => {
	        message.channel.sendMessage({
	            embed: {
	                author: {
	                    name: "Scylla",
	                    icon_url: client.user.avatarURL,
	                    url: "http://imgur.com/t/cat/iqYmR",
	                },
	                color: 0x00FF00,
	                image: {
	                    url: url,
	                }
	            }
	        });
	    });
	    
} else

	//Random Quotes
	 if(msgc === (prefix + 'quotes')){
		var quotes = require('random-movie-quotes')
		message.reply(quotes.getQuote())

} else 
	
	//Random Faits
	if(msgc ===(prefix + 'facts')){
		var WikiFakt = require('wikifakt');
 		// Get a fact
 	 	WikiFakt.getRandomFact().then(function(fact) {
	  	message.reply(fact);
});

} else 
	//TeamAlert
	if(msgc ===("Team1")){
		message.channel.sendMessage({
			embed: {
				type: 'rich',
				description: '',
				fields: [{
					name: "Welcome to the IPS Official channel. If you are here it is because you have the skills. :white_check_mark: ",
					value: "Please make sure to add your programming languages below to define roles", 
					inline: true,
				}],
				color: 0xE46525,
          timestamp: new Date(),
          footer: {
            text: 'By Ryan[], TS by Matrixxx',
			},
		}
	});

} else
	if(msgc ===("Bot-Scylla4")){
		message.channel.sendMessage({
        embed: {
          type: 'rich',
          description: '',
          fields: [{
            name: "Ici vous retrouverez quelques support avec qui nous travaillons :white_check_mark: :part_alternation_mark:  ",
            value: "You will find our support here :white_check_mark: :part_alternation_mark: ",
            inline: true
          }],
          color: 0xE46525,
          timestamp: new Date(),
          footer: {
            text: 'by Ryan[]',
        },
    }
});

} else

	if(msgc ===("Bot-Scylla7")){
		message.channel.sendMessage({
			embed: {
				type:'rich',
				description: '',
				fields: [{
					name: "Hey What's up, Team are now allowed here! :scales: :tools:  ",
					value: "You can now create your work team around which you can talk about your ideas and work around your projects in #projets. Enjoy :moneybag:  ",
					inline: true
				}],
			color: 0xE46525,
          timestamp: new Date(),
          footer: {
            text: 'by Ryan[], TS by Matrixxx',
        },
			}
		})

} else

	if(msgc ===(prefix + 'whois')){
		var whois = require('whois')
	whois.lookup('google.com', function(err, data) {
	    console.log(data)
})

} else 
	//Urban dictionnary
	if(msgc ===("urban"+'stringhere')){
	  let argscmd = message.content.split(" ").slice(1);
    let word = argscmd.slice(0).join(" "); 
		if (!word) return message.reply("Please give me a word to look up.");
    var urban = require('urban'),
        dict = urban(word);
    dict.first(function(json) {
        //co.nsole.log(json.definition);
        // console.log(result.status, result.headers, result.body);
        console.log("Running Command for Urban | Params: " + word);
        if (!json) return message.reply("That word does not exist");
        message.channel.send(json.word + ": " + json.definition + "\n\nExample:\n" + json.example);
    });
	
} else 

	//RandomNames
	if(msgc ===(prefix + 'starwars')){
		var names = require('starwars-names');
		var randomName = names.random();
		message.reply(randomName);

} else 
	
	if(msgc ===(prefix + 'wallpaper')){
		const randomAnimeWallpapers = require('random-anime-wallpapers')
		randomAnimeWallpapers().then(function(images) {
		    message.reply(images)
		})
} else
	
	//RandomWord
	if (msgc ===(prefix + "word")){
		var randomWord = require('random-word');
		var url = randomWord();
		message.channel.sendMessage(url);
} else 
	
	if(msgc ===(prefix + "urban")){
		const urban = require('relevant-urban');
		message.channel.sendMessage(urban.geturban.random());



		
} else

	if(msgc ===(prefix +"9gag")){
		var gagScraper = require('9gag-scraper')
		new gagScraper().getRandom(function (error, data) {
    console.log(data.id); // 9GAG post ID 
    console.log(data.url); // 9GAG post URL
 	message.channel.send(data.title +  data.image)
    
});
 
new gagScraper("random").getGags(function (error, data) {
});


	

} else 
    //Aide
	if (message.content.startsWith(prefix + 'help')) {
			message.channel.sendEmbed({
			color: 0xE46525,

	        title: 'HELP!',
	        description: 'Here is a list of all user commands.',
	        fields: [{
	                name: 'Urban Dictonary',
	                value: '.urban (keyword)'
	            },
	            {
	                name: 'Random Facts',
	                value: '!facts'
	            },
	            {
	                name: 'Random Facts for Today',
	                value: '.today'
	            },
	            {
	                name: 'Random Movie Quotes',
	                value: '.movies'
	            },
	            {
	                name: 'Random Quotes',
	                value: '!quotes'
	            },
	            {
	                name: 'Whois Website Lookup',
	                value: '!whois google.com'
	            },
	            {
	                name: 'Lookup Hashtag Meanings',
	                value: '!hashtag (hashtag)'
	            },
	            {
	                name: 'Random Chuck Norris jokes',
	                value: '!chuck'
	            },
	            {
	                name: 'Random 9gag jokes',
	                value: '!9gag'
	            },

	            {
	                name: 'Google Image Search - Random',
	                value: '.gi (search term)'
	            },
	            {
	                name: 'Ping Test',
	                value: '!ping'
	            },
	            {
	                name: 'Your Beautiful',
	                value: '!you\'rebeautiful'
	            },
	            {
	                name: 'Get a random word in English',
	                value: '!word'
	            },
	            {
	                name: 'Its Too Late.',
	                value: '.itstoolate'
	            },
	            {
	                name: 'Never Gonna',
	                value: '.nevergonna'
	            },
	            {
	                name: 'If you Like It',
	                value: '.ifyoulikeit'
	            },

	        ],
	        timestamp: new Date(),
	        footer: {
	            text: '© 2017 Scylla created by Ryan!'
	        }
	    })}});



	app.get('/', function (req, res) {
	    var obj = new Object();
	    obj.test = "Test moi";
	    obj.rep = "test réussi !";
	    var json = JSON.stringify(obj);
	    res.send(json);
	});


	app.get('/playlist', function (req, res) {
	    var json = JSON.stringify(music.tab);
	    res.send(json);
	});

	app.listen(AuthDetails.port);

client.login
