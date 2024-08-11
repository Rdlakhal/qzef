module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "CatalizCS",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinGif");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `${global.config.BOTNAME}\n─────────────────. ▂▃▅▆تحميل...𝟏𝟎𝟎%▆▅▃▂
⫸ تم الاتصال بنجاح ⫷
●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●
[⚜️]  𝆹𝅥𝅯𝆋𝆅ᏃᏫᎡᏫ ᏰᏫᎿ  المالك:-𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊 [⚜️]
[⚜️] 1-لا تقم بعمل سبام
[⚜️] 2-لا تقم بطرد واعادة اضافة البوت
[⚜️] لترى قائمة الاوامر اكتب [ .الاوامر/اوامر الكل/دليل مع رقم الصفحة] 
●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●

❛━━･❪ البادئة [  .  ]❫･━━❜
[⚜️] اذا كان لديك استفسار يمكنك التواصل معي : https://www.facebook.com/profile.php?id=100089045198484
◆━━━━━━━━━━━━━◆
[⚜️] تم صنع هذا البوت بواسطة  ﺷﹻٰ۬ٗۦٰ۪۫ﹻٰ۬ٗﺮﯾۦٰ۪۫ﹻٰ۬ۛﺄﺂن ۦٰ۪ۦٰ۪۫٭ٴﮩۦٰ۪۫ . شكرا لاستخدامه 
[⚜️] 𝙰𝚍𝚖𝚒𝚗:𝒚𝒐𝒅𝒂 𝒕𝒂𝒌𝒂𝒉𝒂𝒔𝒉𝒊 \n ─────────────────`, attachment: fs.createReadStream(__dirname + "https://i.imgur.com/nwyC08J.gif")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "{name} هلا يا ,\n─────────────────\n   ✨ {soThanhVien} انت عضو رقم ✨  ─────────────────\    ✨ {threadName} في المجموعة ✨  \n─────────────────\n  ✨ من فضلك استمتع بأقامتك ✨  \n─────────────────\n  ✨ وتكوين الكثير من الأصدقاء ✨ \n─────────────────" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
      }