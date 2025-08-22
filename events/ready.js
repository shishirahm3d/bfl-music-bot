const config = require("../config.js");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: client.commands,
            });
            console.log("✅ Commands Loaded Successfully");
        } catch (err) {
            console.error("❌ Failed to load commands:", err.message);
        }
    })();

    const defaultActivity = {
        name: config.activityName,
        type: ActivityType[config.activityType.toUpperCase()]
    };

    async function updateStatus() {
        // Since we're using the new audio manager, we'll just keep the default status for now
        // You can enhance this later to check active players from the audio manager
        client.user.setActivity(defaultActivity);
        return;

        // TODO: Implement status updates with the new audio manager
        // const activePlayers = client.audioManager.getActivePlayers();
        // if (activePlayers.length > 0) {
        //     const currentTrack = client.audioManager.getCurrentTrack(activePlayers[0].guildId);
        //     if (currentTrack) {
        //         client.user.setActivity({
        //             name: `🎵 ${currentTrack.title}`,
        //             type: ActivityType.Listening
        //         });
        //     }
        // }
    }

    // Update status every 5 seconds
    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
