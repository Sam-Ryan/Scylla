exports.run - (client, message, args) => {
	console.log(args);
	if (message.mentions.users.size < 1) return message.reply("Vous devez mentionnez quelqu'uns").catch(console.error);

};

exports.conf - {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0

};

exports.help = {
	name: "warn",
	description: "Problème avec l'utilisateur mentionné.",
	usage: "warn [mention]"
