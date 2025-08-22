const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require('../config.js');
const musicIcons = require('../ui/icons/musicicons.js');

function createProgressBar(current, total, length = 20) {
    const progress = Math.round((current / total) * length);
    const emptyProgress = length - progress;

    const progressText = '▓'.repeat(progress); 
    const emptyProgressText = '░'.repeat(emptyProgress); 
    const time = new Date(current * 1000).toISOString().substr(11, 8);
    const endTime = new Date(total * 1000).toISOString().substr(11, 8);

    return `\`${time}\` ${progressText}${emptyProgressText} \`${endTime}\``;
}

async function nowPlaying(client, interaction, lang) {
    try {
        const player = client.audioManager.getPlayer(interaction.guildId);
        const currentTrack = client.audioManager.getCurrentTrack(interaction.guildId);

        if (!player || !currentTrack) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.nowPlaying.embed.error, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.nowPlaying.embed.noSong);

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        // For now, we'll show a simplified now playing without progress bar
        // since getting exact playback position requires more complex implementation
        const progressBar = createProgressBar(0, currentTrack.duration / 1000);

        const npEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({ 
                name: lang.nowPlaying.embed.nowPlaying, 
                iconURL: musicIcons.beats2Icon,
                url: config.SupportServer
            })
            .setDescription(`- [${currentTrack.title} - ${currentTrack.author}](${currentTrack.url})\n\n${progressBar}`)
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setThumbnail(currentTrack.thumbnail);

        await interaction.reply({ embeds: [npEmbed] });

    } catch (error) {
        console.error('Error processing now playing command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.nowPlaying.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.nowPlaying.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "np",
    description: "Displays the currently playing song with a progress bar",
    permissions: "0x0000000000000800",
    options: [],
    run: nowPlaying,
};