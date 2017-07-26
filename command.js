if (message.content.startsWith(prefix + 'help')) {
			message.channel.sendEmbed({
			color: 0xE46525,

	        title: 'HELP!',
	        description: 'Here is a list of all user commands.',
	        fields: [{
	                name: 'Urban Dictonary',
	                value: '!urban (keyword)'
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
	                value: '!movies'
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
	                value: '!gi (search term)'
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
	                value: '!itstoolate'
	            },
	            {
	                name: 'Never Gonna',
	                value: '!nevergonna'
	            },
	            {
	                name: 'If you Like It',
	                value: '!ifyoulikeit'
	            },

	        ],
	        timestamp: new Date(),
	        footer: {
	            text: '© 2017 Scylla created by Ryan!'
	        }
