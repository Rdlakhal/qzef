const chalk = require('chalk');
const colors = ['blue', 'yellow', 'red', 'magenta', 'cyan'];
module.exports = (data, option) => {
	switch (option) {
		case "𝆹𝅥𝅯𝆋𝆅ᏔᎯᎡᏁ𝆹𝅥𝅯𝆋𝆅":
			console.log(chalk.yellow('[ ❕ ] » ') + data);
			break;
		case "𝆹𝅥𝅯𝆋𝆅ᎬᎡᎡᏫᏫᎡ𝆹𝅥𝅯𝆋𝆅":
			console.log(chalk.red('[ ❕ ] » ') + data);
			break;
		default:
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`${option} » `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "𝆹𝅥𝅯𝆋𝆅ᏔᎯᎡᏁ𝆹𝅥𝅯𝆋𝆅":
			console.log(chalk.blue('[ 𝆹𝅥𝅯𝆋𝆅ᏃᏫᎡᏫ𝆹𝅥𝅯𝆋𝆅 𝆹𝅥𝅯𝆋𝆅ᏰᏫᎿ𝆹𝅥𝅯𝆋𝆅 ] » ') + chalk.blue(data));
			break;
		case "𝆹𝅥𝅯𝆋𝆅ᎬᎡᎡᏫᏫᎡ𝆹𝅥𝅯𝆋𝆅":
			console.log(chalk.red('[ 𝆹𝅥𝅯𝆋𝆅ᎬᎡᎡᏫᏫᎡ𝆹𝅥𝅯𝆋𝆅 ] » ') + chalk.red(data));
			break;
		default:
			console.log(chalk.blue(`[ 𝆹𝅥𝅯𝆋𝆅ᏃᏫᎡᏫ𝆹𝅥𝅯𝆋𝆅 𝆹𝅥𝅯𝆋𝆅ᏰᏫᎿ𝆹𝅥𝅯𝆋𝆅 ] » `) + chalk.blue(data));
			break;
	}
}
