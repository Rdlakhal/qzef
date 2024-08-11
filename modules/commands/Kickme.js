module.exports.config = {
name: "اطردني",
version: "1.0.0",
hasPermssion: 0,
credits: "𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊",
description: "يطردك من المجموعة",
commandCategory: "خدمات",
usages: "  اذا انت ادمن ومتريد الامر يشتغل ببساطه نزل البوت من الادمن",
cooldowns: 3
}; 

module.exports.run = async function({ api, event, args }) {
var info = await api.getThreadInfo(event.threadID);
if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('هات ادمن وتدلل ', event.threadID, event.messageID);
var threadInfo = await api.getThreadInfo(event.threadID)
    {
    
   api.removeUserFromGroup(event.senderID, event.threadID)
    }
api.sendMessage(`امرك ابلع`, event.threadID);
}