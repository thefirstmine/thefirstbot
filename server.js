const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname+'/index.html')
});
app.listen(process.env.PORT);

const ownerID = 347342453633712128
const https = require('http')
const fs = require("fs")
const config = require('./config.json')
const Discord = require('discord.js')
const bot = new Discord.Client();
const enmap = require('enmap')
const snekfetch = require('snekfetch');
bot.commands = new Discord.Collection();
let prefix = config.prefix
let timeout = new Set()



//bot is on
bot.on("ready", () => {
console.log("Bot is up and running with username: " + bot.user.username);
bot.user.setActivity(`t!help | Serving ${bot.users.size} users!`, {type: "PLAYING"})
  setInterval (function (){
        var u, user;
        for(u in bot.users){
           user = bot.users[u] ;
           if(user instanceof Discord.user) console.log("["+u+"] "+user.username);
        }
    }, 10000);
})

bot.on("message", async (message) => {
  let perms = message.member.permissions;
     
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(!message.content.startsWith(prefix)) return;

  const args = message.content .slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
//commands
  
  if(command === "ping") {
    message.channel.send(":ping_pong: Pong! " + Math.round(bot.ping) + "ms!")
  }
  if(command === "servers") {
    if(message.author.id == ownerID || message.author.id === "439223656200273932"){
  message.channel.send(`Serving ${bot.guilds.size} servers`)
  message.channel.send(bot.guilds.map(g=>g.name).join('\n'))
    }else{
      message.channel.send(`Wait a minute, you dont have access to that command!`)
    }}
  if(command === "uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;
    const embed = new Discord.RichEmbed()
    .setTitle('Uptime!')
    .setDescription(uptime)
    .setColor('#fcba03')
   message.channel.send(embed)
  }
  if(command === "status") {
    if(message.author.id == 347342453633712128) {
    bot.user.setActivity(`${args.join(' ')}`)
    message.channel.send(':white_check_mark: Successfully changed status')
  }else{
    message.reply('You cannot use this command')
  }}

  if(command === "resetstatus") {
if(message.author.id == 347342453633712128) {
bot.user.setActivity(`Over ${bot.guilds.size} servers | ${config.prefix}help`, {type: "WATCHING"})
message.channel.send(':white_check_mark: Successfully reset bot status')
  }else{
    message.reply('You cannot use this command')
  }}
  
 if(command === "restart") {
if(message.author.id == 347342453633712128) {
resetBot(message.channel);
function resetBot(channel) {
message.channel.send(' :tfmloading: Bot is restarting pls wait uwu :tfmloading: ')
bot.user.setActivity(`Restarting......`)
message.reply('⛏ Bot has been restarted successfully!')
.then(msg => bot.destroy())
.then(() => bot.login(process.env.TOKEN))
}}else{
  message.reply('You cannot use this comamnd')
}}

  


  
if(command == "ht")
{
      function doRandHT() {
var rand = ['HEADS!','TAILS!'];

return rand[Math.floor(Math.random()*rand.length)];
}
 const embed = {
"title": `Here is the winner!`,
"description": doRandHT(),
"Color": 0xfcba03,
};
message.channel.send({ embed });
};
  
  if(command === "say"){
message.channel.send(args.join(" "))
    message.delete()
  }
  
  if(command === "pokegif") {
      function doRandcommand() {
var rand = ['https://tenor.com/view/pikachu-hmph-pout-sad-cute-gif-14383506','https://tenor.com/view/pokemon-gif-13951495', 'https://tenor.com/view/pokemon-jigglypuff-gif-13270599','https://tenor.com/view/beyonce-pokemon-pokemon-go-gif-5930000',
           'https://tenor.com/view/pokemon-cute-dancing-dance-gif-14340770','httpshttps://tenor.com/view/pikachu-pokemon-happy-gif-3417193','https://tenor.com/view/vulpix-alola-pokemon-yawn-sleepy-gif-7710902','https://tenor.com/view/high-five-wave-pokemon-eevee-gif-14387774',
           'https://tenor.com/view/vacation-gif-5684350','https://tenor.com/view/eevee-pokemon-cute-anime-gif-11909109','https://tenor.com/view/pokemon-table-tap-cute-annoyed-headbang-gif-14084688','https://tenor.com/view/pokemon-pikachu-surprised-what-confused-gif-14439948',
           'https://tenor.com/view/lolol-laughing-hysterically-anime-lmfao-rofl-gif-14494883','https://cdn.discordapp.com/attachments/510945160012496906/597770751109759016/vulpixsparkle.gif','https://tenor.com/view/pikachu-dancing-pikachu-hotline-bling-pikachu-drake-pikachu-hotline-drake-gif-14139710'];

return rand[Math.floor(Math.random()*rand.length)];
}

message.channel.send(doRandcommand())
}

if(command === 'kick'){
let has_kick = perms.has("KICK_MEMBERS")
if(has_kick){
const user = message.mentions.users.first()
if(user){
const member = message.guild.member(user)
if(member){
if(member.kickable)
await member.kick({
reason: `${args.join(' ')}`,
}).then(() => {
message.channel.send(`${message.author.username} kicked ${member.username} for ${member.kick.reason}`)
}).catch(err => message.channel.send(`Error: ${err}`)
)
}else{
message.channel.send('That user isn\'t in this server')
}}else{
message.channel.send("You didn't mention a user to kick")
}}else{
message.channel.send("You can't use this command")
}}
 
  if(command === 'help'){
    const embed = new Discord.RichEmbed()
.setTitle('Help Commands!')
.setDescription('**help**\nObv lol.\n\n**helpfun**\nFun commands for the bot!\n\n**helpmisc**\nMiscellaneous commands for the bot.\n\n**helpmod**\nModeration Commands for the bot.\n\n**helpdev**\nDeveloper only commands. dont touch ok\n\n**helpticket**\nShows help for the ticket commands!')
.setColor ('#fcba03')
.setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
.setTimestamp()
.setThumbnail('https://cdn.glitch.com/e631048d-6754-4a68-91a4-a563f43ab363%2F5a4613ddd099a2ad03f9c994.png?v=1565154446241')
message.channel.send(embed)}
  
  if(command === 'helpfun'){
    const embed = new Discord.RichEmbed()
.setTitle('Help for the Fun Commands!')
.setDescription('**helpfun**\nThis message lmao.\n\n**roll**\nRolls a dice! 1-6.\n\n**ht**\nHeads or Tails!\n\n**pokegif**\nA random pokemon gif!\n\n**say**\nMake the bot say anything! dont make the bot say anything bad ok\n\n**meme**\nA random meme on reddit!\n\n**sg**\nA random r/softwaregore.\n\n**reddit**\nSearch a subreddit!\n\n**8ball**\nAsk the magical ball a question.\n\n**rps**\nRock,paper,scissors!')
.setColor('#fcba03')
.setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
  .setTimestamp()  
    .setThumbnail('https://cdn.glitch.com/e631048d-6754-4a68-91a4-a563f43ab363%2F5a4613ddd099a2ad03f9c994.png?v=1565154446241')
message.channel.send(embed)}
  
  if(command === 'roll') {
    function doRandcommand() {
var rand = [':game_die: 1!',':game_die: 2!',':game_die: 3!',':game_die: 4!',':game_die: 5!',':game_die: 6!']
 return rand[Math.floor(Math.random()*rand.length)];
    }
  
message.channel.send(doRandcommand())
  }

  if(command === 'helpmisc'){
    const embed = new Discord.RichEmbed()
.setTitle('Help for the Miscellaneous Commands!')
.setDescription('**helpmisc**\nThis message smh\n\n**invite**\nSends an invite link for the bot.\n\n**ping**\nCheck what is your ping.\n\n**uptime**\nCheck the uptime of the bot!\n\n**dm**\nDM the user by using the bot.\n\n**socials**\nCheck what are my social medias!\n\n**support**\nSends an invite link for the support server.\n\n**userinfo**\nShows the info of the user.Mention the user for the command to work.\n\n**serverinfo**\nShows the server info.')
.setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
.setColor('#fcba03')
  .setTimestamp()  
message.channel.send(embed)}
  
 if(command === 'helpmod'){
   const embed = new Discord.RichEmbed()
.setTitle('Help for the Moderation Commands!')
.setDescription('**helpmod**\nShows this lol\n\n**kick**\nKick the member from the server.\n\n**ban**\nBan the member from the server. Must used when needed!🔨\n\n**purge**\nDeletes messages from 2-100!\n\n**warn**\nWarns the user.')
.setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
.setColor('#fcba03')
   .setTimestamp()
message.channel.send(embed)}
  
  if(command === 'helpticket'){
     let embed = new Discord.RichEmbed()
     .setTitle('Help for the Ticket Commands!')
     .setDescription('**helpticket**\nDoes this even help you\n\n**ticketsetup**\nThis will guide you on how to setup the ticket command.')
     .addField('ticket new', 'This will create a new ticket.')
     .addField('ticket close', 'This will close the ticket you are currently in.')
     .setColor('#fcba03')
     .setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
     message.channel.send(embed)
  }
  
  if(command === 'helpdev'){
    if(message.author.id == ownerID){
    const embed = new Discord.RichEmbed()
.setTitle('Developer only Commands!')
.setDescription('**helpdev**\nWell you got pass security lol\n\n**eval**\nType in some code and the bot will do it.\n\n**restart**\nRestart the bot using this command.\n\n**status**\nUse this command to set the status of the bot.\n\n**resetstatus**\nReset the status of the bot.\n\n**servers**\nCheck what servers the bot is in!')
.setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
.setColor('#fcba03')
    .setTimestamp()
message.channel.send(embed)
      
    }else{
      message.channel.send('I said, DONT TOUCH!')
    }}
  
 if(command === 'invite') {
   const embed = new Discord.RichEmbed()
.setTitle('Invite my bots here! Click the button right below.')
   .setDescription('[Main Bot](https://discordapp.com/api/oauth2/authorize?client_id=595513926523944973&permissions=2146958847&scope=bot)\n\n[Music Bot](https://discordapp.com/api/oauth2/authorize?client_id=608561453611614209&permissions=8&scope=bot)')
   .setColor('#fcba03')
   .setTimestamp()
 message.delete()
  message.channel.send(embed)}
  
  if(command === 'purge') {
    if(perms.has("MANAGE_MESSAGES"))
    {
    const deleteCount = parseInt(args[0], 10);
  
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to be deleted.")
    
    const fetched = await message.channel.fetchMessages({limit : deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }else{
      message.channel.send('You dont have permissions to use this command.')
    }}
  
  if(command === 'dm'){
const user = message.mentions.users.first()
const member = message.guild.member(user)
if(user){
if(member){
message.delete()
member.send('From: '+message.author.tag+' '+args.join(" ").slice(0))
}else{
message.reply('That user is not in this guild')
}}else{
message.reply('Mention a user to DM')
}}
  
if (command === 'testdm') {
if (timeout.has(message.author.id)) {
message.channel.send("Please wait before reusing this.")
} else {

const user = message.mention.users.first()
const member = message.guild.member(user)
if(user){
if(member){
message.delete()
member.sene(args.join(" ").slice(0))
}else{
message.reply('That user is not in this guild.')
}}else{
message.reply('Mention a user to DM.')
}

timeout.add(message.author.id)
setTimeout(() => {
timeout.delete(message.author.id)
}, 5000)
}
}
  
  if(command === 'socials') {
    const embed = new Discord.RichEmbed()
  .setTitle('My Social Media Accounts!')
  .setDescription('[My Instagram!](https://www.instagram.com/thefirstmine_ph/?hl=en)\n\n[My Twitter!](https://twitter.com/thefirstmine)\n\n[My Reddit](https://www.reddit.com/user/TheFirstMine_PH)\n\n[My Subreddit!](https://www.reddit.com/r/thefirstmine/)\n\n[My Twitch!](https://www.twitch.tv/thefirstmine_ph)\n\n[My YouTube Channel!](https://www.youtube.com/channel/UCm1m_TqZ2EkrsL7OjpI3zWQ)\n\n[My Patreon!](https://www.patreon.com/thefirstmine)')
  .setColor('#fcba03')
    .setTimestamp()
    message.channel.send(embed)
  }
  
  if(command === 'support'){
    const embed = new Discord.RichEmbed()
    .setTitle('The support server. Click the blue blob below to join.')
    .setDescription('[The Support Server.](https://discord.gg/y3PZj46)')
    .setFooter('Need help? Contact TheFirstMine_PH#6062 on Discord.')
    .setColor('#fcba03')
    .setTimestamp()
    message.channel.send(embed)
  }
  
    if(command === 'ban'){
let has_ban = perms.has("BAN_MEMBERS")
if(has_ban){
const user = message.mentions.users.first()
if(user){
const member = message.guild.member(user)
if(member){
if(member.bannable)
await member.ban({
reason: `${args.join(' ')}`,
}).then(() => {
message.channel.send(`${message.author.username} banned ${user.username} for ${args.join(' ')}`)
}).catch(err => message.channel.send(`Error: ${err}`)
)
}else{
message.channel.send('That user isn\'t in this server')
}}else{
message.channel.send("You didn't mention a user to ban")
}}else{
message.channel.send("You can't use this command")
}}
  
  if(command === 'userinfo'){
    const user = message.mentions.users.first() || bot.fetchUser()
    const member = message.guild.member(user)
    const embed = new Discord.RichEmbed()
    .setTitle('User Info!')
    .addField('Name and User Tag', user.tag)
    .addField('User ID', user.id)
    .addField('Joined this server at', message.guild.joinedAt)
    .addField('Joined Discord at', user.createdAt)
    .addField('Roles:', member.roles.map(role => role.name))
    .setThumbnail(user.displayAvatarURL)
    .setColor('#fcba03')
    .setTimestamp()
    message.channel.send(embed)
  }
  
  if(command === 'serverinfo'){
    const embed = new Discord.RichEmbed()
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .setDescription('Server Info!')
    .addField('Server ID', message.guild.id)
    .addField('Server Owner', message.guild.owner)
    .addField('Server Region', message.guild.region)
    .addField('You joined at', message.guild.joinedAt)
    .addField('Created at', message.guild.createdAt)
    .setColor('#fcba03')
    .setTimestamp()
    message.channel.send(embed)
  }
  
  if(command === 'meme'){
    const request = require("request")
request("https://reddit.com/r/dankmemes/random.json", function (error, response, body) {
    body = JSON.parse(body)
    let bod = body[0]
    let data = bod["data"]
    let children = data["children"]
    let childre = children[0]
    let data2 = childre["data"]
    if(data2["url"].match(".jpg") || data2["url"].match(".png")) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Here is your random meme")
    .setTitle("r/dankmemes")
    .setURL(`https://reddit.com${data2["permalink"]}`)
    .setFooter(`Meme by ${data2["author"]}`)
    .setImage(data2["url"])
    message.channel.send({embed});
    } else {
     let embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setAuthor("Here is your random meme")
     .setTitle("r/dankmemes")
     .setURL(`https://reddit.com${data2["permalink"]}`)
     .setFooter(`Meme by ${data2["author"]}`)
     .setImage(data2["url"]+".jpg")
     .setTimestamp()
     message.channel.send({embed});
    }
 })
  }
  
  if(command === 'sg'){
    const request = require("request")
request("https://reddit.com/r/softwaregore/random.json", function (error, response, body) {
    body = JSON.parse(body)
    let bod = body[0]
    let data = bod["data"]
    let children = data["children"]
    let childre = children[0]
    let data2 = childre["data"] 
    if(data2["url"].match(".jpg") || data2["url"].match(".png")) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Here is your random r/softwaregore")
    .setTitle("r/softwaregore")
    .setURL(`https://reddit.com${data2["permalink"]}`)
    .setFooter(`Software Gore by ${data2["author"]}`)
    .setImage(data2["url"])
    message.channel.send({embed});
    } else {
     let embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setAuthor("Here is your random r/softwaregore")
     .setTitle("r/softwaregore")
     .setURL(`https://reddit.com${data2["permalink"]}`)
     .setFooter(`Software Gore by ${data2["author"]}`)
     .setImage(data2["url"]+".jpg")
     .setTimestamp()
     message.channel.send({embed});
    }
 })}
  
  if(command === 'reddit'){
    if(args[0]){
      const {body} = await snekfetch
      .get(`https://www.reddit.com/r/${args[0]}.json?sort=top&t=week`)
      .query({ limit: 800 });
      const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return message.channel.send('It seems we are out of fresh posts!, Try again later.');
      const randomnumber = Math.floor(Math.random() * allowed.length)
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(allowed[randomnumber].data.title)
      .setDescription("Posted by: " + allowed[randomnumber].data.author)
      .setImage(allowed[randomnumber].data.url)
      .addField("Other info:", "Upvotes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
      .setFooter(`Posts provided by r/${args[0]}`)
      .setTimestamp()
      message.channel.send(embed)
    }else{
      message.channel.send("Please type the name of a subreddit, without the r/")
  }}
  
   if (command === "8ball") {
    let question = message.content.split(/\s+/g).slice(1).join(" ");

    if (!question) {
      return message.channel.send(`You must provide a question.`);

    }

    var answer = ['It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes, definitely',
      'You may rely on it',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don\'t count on it',
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful',
      'IDK bro'            
    ];
    const ballEmbed = new Discord.RichEmbed()
      .setAuthor(question)
      .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
      .setColor('#fcba03')
      .setTimestamp();
    message.channel.send(ballEmbed);
  }
  
  if(command === 'poll'){
    let question = args.join(" ")
    message.channel.send(question).then(m => m.react("✔").then(m.react("✖")))
    message.delete()
  }
  
if (command === "rps") {
    let rock2 = ['Paper! I win!', 'Scissors! You win!']
    let rock1 = Math.floor(Math.random() * rock2.length);

    let paper2 = ['Rock! You win!', 'Scissors! I win!']
    let paper1 = Math.floor(Math.random() * paper2.length);

    let scissors2 = ['Rock! I win', 'Paper! You win!']
    let scissors1 = Math.floor(Math.random() * scissors2.length);

    let rock = new Discord.RichEmbed()
      .setAuthor('Rock, Paper, Scissors')
      .setColor('#fcba03')
      .addField('You choose', `${args[0]}`)
      .addField('I choose', rock2[rock1])
      .setTimestamp()

    let paper = new Discord.RichEmbed()
      .setAuthor('Rock, Paper, Scissors')
      .setColor('#fcba03')
      .addField('You choose', `${args[0]}`)
      .addField('I choose', paper2[paper1])
      .setTimestamp()

    let scissors = new Discord.RichEmbed()
      .setAuthor('Rock, Paper, Scissors')
      .setColor('#fcba03')
      .addField('You choose', `${args[0]}`)
      .addField('I choose', scissors2[scissors1])
      .setTimestamp()

    if (message.content === prefix + 'rps rock') message.channel.send(rock)
    if (message.content === prefix + 'rps Rock') message.channel.send(rock)

    if (message.content === prefix + 'rps paper') message.channel.send(paper)
    if (message.content === prefix + 'rps Paper') message.channel.send(paper)

    if (message.content === prefix + 'rps scissors') message.channel.send(scissors)
    if (message.content === prefix + 'rps Scissors') message.channel.send(scissors)


    if (message.content === prefix + 'rps') message.channel.send(`Please pick either rock, paper, or Scissors.`)
  }
  
  if(command === "ticket"){
    if(args[0] == "new"){
    const category = message.guild.channels.find(c=>c.name == "Tickets" && c.type == "category")
    if(category){
     const everyone2 = message.guild.roles.find(r=>r.name == "@everyone")
     const ticket = await message.guild.createChannel("ticket-"+message.author.username+"-"+message.author.discriminator)
     const everyone = message.guild.roles.find(r=>r.name == "@everyone")
     const modRole = message.guild.roles.find(r=>r.name == "TicketUse")
     const botRole = message.guild.roles.find(r=>r.name == "TheFirstBot")
     ticket.setParent(category.id)
      ticket.setTopic(`\'t!ticket close\'to close ticket.Author ID:${message.author.id}`)
       ticket.overwritePermissions(message.author, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: true,
         READ_MESSAGE_HISTORY: true,
         ATTACH_FILES: true
       });
        ticket.overwritePermissions(everyone, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      });
        ticket.overwritePermissions(botRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true
      });
        ticket.overwritePermissions(modRole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
        ATTACH_FILES: true
      });
    
     message.reply(`Your ticket has been created, <#${ticket.id}>`)
      const embed = new Discord.RichEmbed()
      .setTitle('Opened!')
      .setThumbnail(message.author.avatarURL)
      .setColor("#fcba03")
      .setDescription(`This ticket has been opened by ${message.author.tag}`+".\n\n"+`Subject: ${args.slice(1).join(" ")}`)
      bot.channels.get(ticket.id).send(embed)
  }else{
    message.channel.send("Please ask one of the admins to make a category named \"Tickets\"")
  }}else if(args[0] == "close" && message.channel.name.startsWith("ticket")){//these 2 lines
    message.author.send(`Ticket closed.`)
    if(!message.channel.name.startsWith("ticket"))return message.reply("That command only works inside a ticket")//and this one
    message.channel.delete()
  }}
 
  if(command === 'ticketsetup'){
    const embed =new Discord.RichEmbed()
    .setTitle('How to setup the ticket command.')
    .setDescription('**1.**\nCreate a category called \"Tickets\"')
    .addField('2.', 'Make the category access to Moderators only in your server.')
    .addField('3.', 'Create a role named \"TicketUse\" and apply the role to all mods.')
    .addField('4.', 'If there isn\'t, create a role name TheFirstBot and apply it to the bot.')
    .setColor('#fcba03')
    message.channel.send(embed)
  }
  
  if(command === 'warn'){
    var embedColor = '#FF0000' // Change this to change the color of the embeds!
   
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `KICK_MEMBERS` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: t!warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channel.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning
 
    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
       .addField('Warned by', message.author.tag)
       .addField('Reason', reason)
       .setTimestamp();
   mentioned.send(warningEmbed); // DMs the user the above embed!
   var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
       .setColor('#00ff00')
       .setTitle('User Successfully Warned!');
   message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
   message.delete(); // Deletes the command
  }
  
  
  
})//bot login to application
bot.login(process.env.TOKEN) 