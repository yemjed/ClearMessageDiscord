const fs = require("fs");
const { Client } = require("discord.js-selfbot-v13");

const token = fs.readFileSync("token.txt", "utf8").trim();
if (!token) {
  console.log("token.txt vide");
  process.exit(1);
}

const channelId = process.argv[2];
if (!channelId) {
  console.log("Usage : node clear.js <channel_id>");
  process.exit(1);
}

const client = new Client();

const PAGE_SIZE = 100;      // messages récupérés par vague
const PAUSE_MS = 500;       // pause entre les vagues (le fetch est un autre bucket, pas le DELETE)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

client.once("ready", () => {
  console.log(`[+] Connecté : ${client.user.tag}`);

  const channel = client.channels.cache.get(channelId);
  if (!channel) {
    console.log(`Channel ${channelId} introuvable`);
    process.exit(1);
  }

  console.log(`[+] Channel : ${channel.name}`);

  const myId = client.user.id;
  let deleted = 0;
  let skipped = 0;

  const deleteLoop = async () => {
    let lastId = null;

    while (true) {
      const messages = await channel.messages.fetch({
        limit: PAGE_SIZE,
        before: lastId,
      });

      if (messages.size === 0) break;

      const mine = messages.filter((m) => m.author.id === myId);

      // ⚡ Toutes les suppressions envoyées en parallèle.
      // La lib les met en file et les cadence au rythme autorisé par Discord.
      // allSettled attend que TOUTES soient terminées, puis on compte exactement.
      const results = await Promise.allSettled(
        [...mine.values()].map((m) => m.delete())
      );

      for (const r of results) {
        if (r.status === "fulfilled") deleted++;
        else skipped++;
      }

      process.stdout.write(
        `\r${deleted} supprimés | ${skipped} ignorés | total traité : ${deleted + skipped}`
      );

      lastId = messages.last().id;

      // Si Discord a répondu "ralenti" (429), pause plus longue
      if (results.some((r) => r.reason?.name === "RateLimitError" || r.reason?.httpStatus === 429)) {
        await sleep(3000);
      } else {
        await sleep(PAUSE_MS);
      }
    }

    console.log(`\n[+] Terminé : ${deleted} supprimés, ${skipped} ignorés.`);
    process.exit(0);
  };

  deleteLoop().catch((err) => {
    console.log("\nErreur loop :", err.message);
    process.exit(1);
  });
});

// Log discret des rate-limits gérés par la lib (mode debug)
client.on("rateLimit", (info) => {
  console.log(`\n[rate-limit] pause ${info.timeout}ms imposée par Discord`);
});

client.on("error", (err) => console.log("Erreur :", err.message));
client.on("disconnect", () => console.log("Déconnecté."));

client.login(token).catch((err) => {
  console.log("Erreur login :", err.message);
  process.exit(1);
});