const Discord = require(discord.js);
const {
	prefix,
	token,
} = require('.config.json');
cheerio = require('cheerio');
request('https://w2g.tv', function (error, response, html) {
	if(!error && response.statusCode == 200){
		const $ = cheerio.load(html);
		const title = $('title').text();
		const song = $('#player-title').text();
		const artist = $('#player-artist').text();
		const album = $('#player-album').text();
		const url = $('#player-cover').attr('src');
		const embed = new Discord.RichEmbed()
			.setTitle(title)
			.setURL(url)
			.setDescription(`${song} - ${artist}`)
			.setThumbnail(url)
			.setColor(0x00AE86)
			.setFooter(album)
			.setTimestamp();
		return embed;
	}
});

const client = new Discord.Client();
client.login(token);

client.once(ready, () => {
	console.log('Ready!');
});
client.once('reconnecting', () => {
	console.log('Reconnecting!');
});
client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if(message.content.startsWith('${prefix}start')) {
		execute(message);
		return;
	}
});

async function execute(message){
	const args = message.content.split(" ");
	return message.channel.send(` started the song!`);
}