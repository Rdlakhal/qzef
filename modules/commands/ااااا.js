module.exports.config = {
	name: "قاعدة",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "تخصيص القانون لكل مجموعة",
	commandCategory: "مسؤولي االمجموعات,
	usages: "[إضافة/إزالة/الكل] [المحتوى/آيدي]",
  usePrefix:true,
	cooldowns: 5,
	dependencies: {
        "fs-extra": "",
        "path": ""
    }
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "rules.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = ({ event, api, args, permssion }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "rules.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "إضافة": {
            if (permssion == 0) return api.sendMessage("[قاعدة] ليس لديك الصلاحيات الكافية لاستخدام المزيد من القواعد!", threadID, messageID);
            if (content.length == 0) return api.sendMessage("[قاعدة] يرجى إدخال المعلومات لا يجب أن يترك فارغا", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('[قاعدة] لقد تم إصافة قانون جديد إلى المجموعة!', threadID, messageID);
            break;
        }
        case "قائمة":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("[قاعدة] ليس لدى فريقك قائمة قانونية لعرضها.!", threadID, messageID);
            api.sendMessage(`=== القانون الداخلي للمجموعة ===\n\n${msg}`, threadID, messageID);
            break;
        }
        case "rm":
        case "إزالة":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                if (permssion == 0) return api.sendMessage("[قاعدة] ليس لديك الصلاحيات الكافية لتتمكن من استخدام القانون!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[قاعدة] ليس لدى فريقك قائمة القواعد ليتمكن من حذفها!", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`[قاعدة] لقد تم حذف قائمة القواعد بنجاح ${content}`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                if (permssion == 0) return api.sendMessage("[قاعدة] ليس لديك الصلاحيات الكافية لتتمكن من استخدام القانون!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[قاعدة] ليس لدى فريقك قائمة قوانين ليتمكن من حذفها!", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`[قاعدة] ليس لدى فريقك قائمة قوانين ليتمكن من حذفها!`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`=== قواعد المجموعة ===\n\n${msg} \n[إن الالتزام بقانون المجموعة سيساهم بشكل إيجابي في مجتمعك!]`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            }