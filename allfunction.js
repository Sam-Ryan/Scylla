var allfunction = module.exports = {};
    allfunction.getChuck = function (message) {
        message.channel.send('Chuck')
                var unirest = require('unirest');
                unirest.get("http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris")
                    .header("Accept", "application/json")
                    .end(function(result) {
                        console.log("Running Command for Chuck Norris");
                        message.channel.send(result.body.value["joke"]);
                    });
        }
