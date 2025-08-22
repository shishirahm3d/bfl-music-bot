const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../ui/icons/musicicons.js');

async function remove(client, interaction, lang) {
    try {
        const position = interaction.options.getInteger('position');
        const player = client.audioManager.getPlayer(interaction.guildId);
        const queue = client.audioManager.getQueue(interaction.guildId);

        if (!player || !queue || queue.length === 0) {
            const emptyQueueEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: lang.remove.embed.queueEmpty,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.remove.embed.queueEmptyDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [emptyQueueEmbed], ephemeral: true });
            return;
        }

        if (position < 1 || position > queue.length) {
            const invalidPositionEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.remove.embed.invalidPosition,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.remove.embed.invalidPositionDescription.replace("{queueLength}", queue.length))
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [invalidPositionEmbed], ephemeral: true });
            return;
        }

        const removedTrack = client.audioManager.removeTrack(interaction.guildId, position);

        if (!removedTrack) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription("❌ Unable to remove track from queue.");
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({
                name: lang.remove.embed.songRemoved,
                iconURL: musicIcons.correctIcon,
                url: config.SupportServer
            })
            .setDescription(lang.remove.embed.songRemovedDescription.replace("{songTitle}", removedTrack.title))
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error processing remove command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({
                name: lang.remove.embed.error,
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.remove.embed.errorDescription);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "remove",
    description: "Remove a song from the queue by its position",
    permissions: "0x0000000000000800",
    options: [
        {
            name: 'position',
            description: 'Position of the song to remove from the queue',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    run: remove
};
