module.exports.config = {
	name: "اسم",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊",
	description: "تغير اسم المجموعة",
	commandCategory: "مسؤولي المجموعات", 
	usages: "groupname [الاسم]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("❌ ادخل الامر وبعدها الاسم", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🤖قام البوت بتغير اسم المجموعة إلى: ${name}`, event.threadID, event.messageID));
}