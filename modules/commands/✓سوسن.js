module.exports.config = {
    name: "زورو",
    version: "4.3.7",
    hasPermssion: 0,
    credits: "عمر", 
    description: "سوسن",
    commandCategory: "خدمات",
    usages: "[نص]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    }
};

async function simsimi(a, b, c) {
    const d = global.nodemodule.axios, g = (a) => encodeURIComponent(a);
    try {
        var { data: j } = await d({ url: `https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${g(a)}&filter=true`, method: "GET" });
        return { error: !1, data: j };
    } catch (p) {
        return { error: !0, data: {} };
    }
}

module.exports.onLoad = async function () {
    "undefined" == typeof global && (global = {}), "undefined" == typeof global.simsimi && (global.simsimi = new Map);
};

module.exports.handleEvent = async function ({ api: b, event: a }) {
    const { threadID: c, messageID: d, senderID: e, body: f } = a, g = (e) => b.sendMessage(e, c, d);
    if (global.simsimi.has(c)) {
        if (e == b.getCurrentUserID() || "" == f || d == global.simsimi.get(c)) return;
        var { data: h, error: i } = await simsimi(f, b, a);
        if (i) return;
        if (!h.success) return g(h.error);
        return g(h.success);
    }
};

module.exports.run = async function ({ api: b, event: a, args: c }) {
    const { threadID: d, messageID: e } = a, f = (c) => b.sendMessage(c, d, e);
    if (0 == c.length) return f("نعم");
    switch (c[0]) {
        case "تشغيل":
            return global.simsimi.has(d) ? f("نعم.") : (global.simsimi.set(d, e), f("تم تشغيل البوت تفضل 🎶."));
        case "ايقاف":
            return global.simsimi.has(d) ? (global.simsimi.delete(d), f("تم ايقاف تشغيل سوسن.")) : f("تم ايقاف تشغيل البوت🦫.");
        default:
            var { data: g, error: h } = await simsimi(c.join(" "), b, a);
            if (h) return;
            if (!g.success) return f(g.error);
            return f(g.success);
    }
};
