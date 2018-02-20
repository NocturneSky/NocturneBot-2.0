const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDE1MjgyNjY1ODgxNjAwMDAw.DWzptw.o21uUBGj8OswDC66sC80oZjfAwc";
const PREFIX = "noct!";




function play(connection, message) 
{
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function()
    {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "Fuckin, idk."
];

var bot = new Discord.Client();

var servers = {}; 

bot.on("ready", function() {
    console.log("Ready");

    
});

bot.on('ready', () => {
    bot.user.setActivity('with your soul!');
  })




bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.substring(PREFIX.length).split(" ");

switch (args[0].toLowerCase()) {
    //bullshit
    
    case "fortune":
        if(args[1]) 
        {
            message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
        }
        else 
        {
            message.channel.send("Can't read question.  `n!fortune (question)`")
        }
        break;
    case "dab":
    const embed1 = new Discord.RichEmbed()
        
       .setImage("https://media1.tenor.com/images/9b2147e6ad5a8c7f0ae0f39d37230a56/tenor.gif?itemid=9672617")
            .setColor(0xc46dff)
            
            

            
            message.channel.send(embed1);
        break;
        case "help":
        const embed2 = new Discord.RichEmbed()
       
  .setTitle("The public version of the bot from NocturneSky.")
  .setAuthor("NocturneBot 2.0!", "https://i.imgur.com/4MPwyMs.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0xc46dff)
  .setDescription("As of this moment, it can play music, tell fortunes, and dab on the haters lmao xddd")
  .setFooter("A bot created by Nocturne#3043", "https://i.imgur.com/SortXaO.png")
  .setThumbnail("https://i.imgur.com/mpk4rSn.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .addField("General Commands",
    "`noct!fortune` - Ask a Yes or No question and get your answer! \n\ `noct!dab` - Luigi dabs. Greatest gif ever. \n\ `noct!help` - Opens up this embed for commands.")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Music Commands", "`noct!play` - Add a youtube link to play in a voice chat! \n\ `noct!skip` - Skip the current song. \n\ `noct!stop` - Stop the bot from playing music.", true)
  /*
   * Blank field, useful to create some space.
   */
  .addField("Add the bot to your server!", "https://tinyurl.com/nocturnebot")
  .addField("Problems", "If you are having problems with the bot, DM me directly.", true);

  message.channel.send(embed2);
        break;
    case "noticeme":
        message.channel.send(message.author.toString( + " You are noticed!"));
        break;
   
// music 
    case "play":
        if (!args[1])
        {
            message.channel.send("**Please provide a youtube link!**");
            return;
        }
        
        if (!message.member.voiceChannel) 
        {
            message.channel.send("**You must be in a voice channel!**")
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = 
        {
            queue: []
        };
        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection)
        {
            play(connection, message);
            message.channel.send("**Joining voice channel,**" + "<@"+ message.author.id + "> **!**");
        });
        break;
    case "skip":
        var server = servers[message.guild.id];

        if (server.dispatcher) server.dispatcher.end();
        message.channel.send("**Skipping song...** " + "<@"+ message.author.id + ">" );
    break;
    case "stop":
    var server = servers[message.guild.id];

    if (message.guild.voiceConnection ) message.guild.voiceConnection.disconnect();
    message.channel.send("**Stopping music...**" + "<@"+ message.author.id + ">");
    break;
    default:
        message.channel.send("`Unknown Command, n!help for commands.`");
}

});

// node index

bot.login(TOKEN);
