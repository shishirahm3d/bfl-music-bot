const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { playlistCollection } = require('../mongodb.js');
const config = require("../config.js");
const musicIcons = require('../ui/icons/musicicons.js');

async function playCustomPlaylist(client, interaction, lang) {
    try {
        const playlistName = interaction.options.getString('name');
        const userId = interaction.user.id;

        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.playCustomPlaylist.embed.error, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.playCustomPlaylist.embed.noVoiceChannel);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const playlist = await playlistCollection.findOne({ name: playlistName });
        if (!playlist) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.playCustomPlaylist.embed.error, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.playCustomPlaylist.embed.playlistNotFound);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        if (playlist.isPrivate && playlist.userId !== userId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.playCustomPlaylist.embed.accessDenied, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.playCustomPlaylist.embed.noPermission);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        if (!playlist.songs.length) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.playCustomPlaylist.embed.error, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.playCustomPlaylist.embed.emptyPlaylist);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const player = client.audioManager.getPlayer(interaction.guildId);
        if (!player) {
            await client.audioManager.joinChannel(interaction.member.voice.channelId, interaction.guildId, interaction.channelId);
        }

        await interaction.deferReply();

        for (const song of playlist.songs) {
            const query = song.url ? song.url : song.name;
            try {
                await client.audioManager.play(interaction.guildId, query, interaction.user.username);
            } catch (err) {
                console.error(`Error adding song to queue: ${query}`, err);
                // Continue with next song if one fails
                continue;
            }
        }

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({
                name: lang.playCustomPlaylist.embed.playingPlaylist,
                iconURL: musicIcons.beats2Icon,
                url: config.SupportServer
            })
            .setDescription(lang.playCustomPlaylist.embed.playlistPlaying.replace("{playlistName}", playlistName))
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

        await interaction.followUp({ embeds: [embed] });

    } catch (error) {
        console.error('Error playing custom playlist:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.playCustomPlaylist.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.playCustomPlaylist.embed.errorPlayingPlaylist);

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}

module.exports = {
    name: 'playcustomplaylist',
    description: 'Play a custom playlist',
    permissions: '0x0000000000000800',
    options: [
        {
            name: 'name',
            description: 'Enter playlist name',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: playCustomPlaylist
};