module.exports.config = {
  name: "ردود_المطور",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊",
  description: "البوت سوف يرد إذا تم ذكر المالك أو البوت عن طريق المنشن ",
  commandCategory: "المطور",
  usages: "",
  usePrefix:false,
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "") {
    var aid = ["61557088640142"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["حسنا ساعلم مطوري ارجو الانتظار ⌚🔮🚬"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
      }