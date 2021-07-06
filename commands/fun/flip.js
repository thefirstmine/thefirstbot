module.exports = {
	name: 'flip',
	description: 'Flip a coin!',
    category: "Fun",
	execute(client, message, args) {
        function randomFlip(){
            const flip = ['Heads.', 'Tails.'];
            return flip[Math.floor(Math.random()*flip.length)];
        }
        message.reply(`Flip! I call ${randomFlip()}`)
	},
};