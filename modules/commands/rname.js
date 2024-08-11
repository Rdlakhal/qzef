module.exports.config = {
	name:"مقطع_أنمي",
	version: "1",
	hasPermssion: 0,
	credits: "𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊", // WAG MO PALITAN CRED KUNDI MAG SISISI KA
	description: "مجموعة من فيديوهات انمي",
  usePrefix: false,
	commandCategory: "خدمات",
	cooldowns: 0
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  
axios.get('https://jhunapi.mrbaylon4.repl.co/snauzk/?apikey=Marjhunapi').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `إليك الفيديو اللذي طلبت سينسي ♥️`,
						attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
			}) .catch(err => {
                     api.sendMessage("[ أنمي ]\nهناك خطأ: 200", event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
                  })     
}