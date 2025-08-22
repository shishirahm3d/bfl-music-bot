const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require('../config.js');
const musicIcons = require('../ui/icons/musicicons.js');
const SpotifyWebApi = require('spotify-web-api-node');
const { getData } = require('spotify-url-info')(require('node-fetch'));
const requesters = new Map();


const spotifyApi = new SpotifyWebApi({
    clientId: config.spotifyClientId, 
    clientSecret: config.spotifyClientSecret,
});


async function getSpotifyPlaylistTracks(playlistId) {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body.access_token);

        let tracks = [];
        let offset = 0;
        let limit = 100;
        let total = 0;

        do {
            const response = await spotifyApi.getPlaylistTracks(playlistId, { limit, offset });
            total = response.body.total;
            offset += limit;

            for (const item of response.body.items) {
                if (item.track && item.track.name && item.track.artists) {
                    const trackName = `${item.track.name} - ${item.track.artists.map(a => a.name).join(', ')}`;
                    tracks.push(trackName);
                }
            }
        } while (tracks.length < total);

        return tracks;
    } catch (error) {
        console.error("Error fetching Spotify playlist tracks:", error);
        return [];
    }
}

async function play(client, interaction, lang) {
    try {
        const query = interaction.options.getString('name');

        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.play.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.play.embed.noVoiceChannel);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        // Check if audio manager is available
        if (!client.audioManager) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.play.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription("Audio manager not initialized. Please try again.");

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        // Get or create player
        let player = client.audioManager.getPlayer(interaction.guild.id);

        if (!player) {
            try {
                player = await client.audioManager.joinChannel(
                    interaction.guild.id,
                    interaction.member.voice.channelId,
                    interaction.channel.id
                );
            } catch (error) {
                console.error('Error joining voice channel:', error);
                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription("❌ Failed to join voice channel.");
                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }
        }

        await interaction.deferReply();

        let tracksToQueue = [];
        let isPlaylist = false;
        let queuedTracks = 0;

        if (query.includes('spotify.com')) {
            try {
                const spotifyData = await getData(query);

                if (spotifyData.type === 'track') {
                    const trackName = `${spotifyData.name} - ${spotifyData.artists.map(a => a.name).join(', ')}`;
                    tracksToQueue.push(trackName);
                } else if (spotifyData.type === 'playlist') {
                    isPlaylist = true;
                    const playlistId = query.split('/playlist/')[1].split('?')[0]; 
                    tracksToQueue = await getSpotifyPlaylistTracks(playlistId);
                }
            } catch (err) {
                console.error('Error fetching Spotify data:', err);
                await interaction.followUp({ content: "❌ Failed to fetch Spotify data." });
                return;
            }
        } else {
            // Use our new audio manager to search
            try {
                const searchResults = await client.audioManager.searchTrack(query);
                if (searchResults.length === 0) {
                    const errorEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setAuthor({ 
                        name: lang.play.embed.error,
                        iconURL: musicIcons.alertIcon,
                        url: config.SupportServer
                    })
                    .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                    .setDescription(lang.play.embed.noResults);

                    await interaction.followUp({ embeds: [errorEmbed] });
                    return;
                }
                
                // Add the track to the queue
                await client.audioManager.play(interaction.guild.id, searchResults[0], interaction.user);
                requesters.set(searchResults[0].url, interaction.user);
                queuedTracks = 1;
            } catch (error) {
                console.error('Search error:', error);
                await interaction.followUp({ content: "❌ Failed to search for tracks." });
                return;
            }
        }

        // Process Spotify tracks if any
        for (const trackQuery of tracksToQueue) {
            try {
                const searchResults = await client.audioManager.searchTrack(trackQuery);
                if (searchResults.length > 0) {
                    await client.audioManager.play(interaction.guild.id, searchResults[0], interaction.user);
                    requesters.set(searchResults[0].url, interaction.user);
                    queuedTracks++;
                }
            } catch (error) {
                console.error('Error queueing track:', error);
            }
        }

        // Send success message
        const randomEmbed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setAuthor({
            name: lang.play.embed.requestUpdated,
            iconURL: musicIcons.beats2Icon,
            url: config.SupportServer
        })
        .setDescription(isPlaylist ? 
            `🎵 Added **${queuedTracks}** tracks to the queue` : 
            `🎵 Added **1** track to the queue`)
        .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });
    
        const message = await interaction.followUp({ embeds: [randomEmbed] });

        setTimeout(() => {
            message.delete().catch(() => {}); 
        }, 3000);
        
    

    } catch (error) {
        console.error('Error processing play command:', error);
        await interaction.followUp({ content: "❌ An error occurred while processing the request." });
    }
}

module.exports = {
    name: "play",
    description: "Play a song from a name or link",
    permissions: "0x0000000000000800",
    options: [{
        name: 'name',
        description: 'Enter song name / link or playlist',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: play,
    requesters: requesters,
};
