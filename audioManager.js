const { 
    createAudioPlayer, 
    createAudioResource, 
    joinVoiceChannel, 
    AudioPlayerStatus, 
    VoiceConnectionStatus,
    getVoiceConnection,
    entersState
} = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const ytsr = require('youtube-sr').default;
const { EmbedBuilder } = require('discord.js');
const EventEmitter = require('events');

class AudioManager extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.players = new Map(); // guildId -> player data
        this.queues = new Map();  // guildId -> queue array
        this.connections = new Map(); // guildId -> voice connection
        this.currentTracks = new Map(); // guildId -> current track info
        
        console.log('🎵 Node.js Audio Manager initialized (ytdl-core only)');
    }

    async joinChannel(guildId, channelId, textChannelId) {
        try {
            const channel = this.client.channels.cache.get(channelId);
            if (!channel) throw new Error('Voice channel not found');

            const connection = joinVoiceChannel({
                channelId: channelId,
                guildId: guildId,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            // Wait for connection to be ready
            await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

            const player = createAudioPlayer();
            connection.subscribe(player);

            // Store connection and player data
            this.connections.set(guildId, connection);
            this.players.set(guildId, {
                player: player,
                textChannel: textChannelId,
                voiceChannel: channelId,
                guildId: guildId,
                isPlaying: false,
                isPaused: false,
                volume: 100,
                loop: false,
                autoplay: false
            });

            if (!this.queues.has(guildId)) {
                this.queues.set(guildId, []);
            }

            // Set up event listeners
            this.setupPlayerEvents(guildId, player);
            this.setupConnectionEvents(guildId, connection);

            return this.players.get(guildId);
        } catch (error) {
            console.error('Error joining voice channel:', error);
            throw error;
        }
    }

    setupPlayerEvents(guildId, player) {
        player.on(AudioPlayerStatus.Playing, () => {
            const playerData = this.players.get(guildId);
            if (playerData) {
                playerData.isPlaying = true;
                playerData.isPaused = false;
                this.emit('trackStart', playerData, this.currentTracks.get(guildId));
            }
        });

        player.on(AudioPlayerStatus.Idle, () => {
            const playerData = this.players.get(guildId);
            if (playerData && playerData.isPlaying) {
                playerData.isPlaying = false;
                this.emit('trackEnd', playerData, this.currentTracks.get(guildId));
                this.playNext(guildId);
            }
        });

        player.on(AudioPlayerStatus.Paused, () => {
            const playerData = this.players.get(guildId);
            if (playerData) {
                playerData.isPaused = true;
                this.emit('trackPause', playerData);
            }
        });

        player.on('error', (error) => {
            console.error('Audio player error:', error);
            this.emit('trackError', this.players.get(guildId), error);
            this.playNext(guildId);
        });
    }

    setupConnectionEvents(guildId, connection) {
        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            } catch (error) {
                connection.destroy();
                this.cleanup(guildId);
            }
        });

        connection.on('error', (error) => {
            console.error('Voice connection error:', error);
            this.emit('connectionError', guildId, error);
        });
    }

    async searchTrack(query, platform = 'youtube') {
        try {
            // Check if it's a direct YouTube URL
            if (ytdl.validateURL(query)) {
                try {
                    const info = await ytdl.getInfo(query);
                    return [{
                        title: info.videoDetails.title,
                        url: info.videoDetails.video_url,
                        duration: parseInt(info.videoDetails.lengthSeconds) * 1000,
                        thumbnail: info.videoDetails.thumbnails[0]?.url,
                        author: info.videoDetails.author.name,
                        platform: 'youtube'
                    }];
                } catch (ytdlError) {
                    console.log('ytdl getInfo failed for URL:', ytdlError.message);
                    throw new Error(`Failed to get video info: ${ytdlError.message}`);
                }
            }
            
            // Use youtube-sr for text search
            try {
                const searchResults = await ytsr.search(query, { 
                    limit: 1,
                    type: 'video'
                });
                
                if (!searchResults || searchResults.length === 0) {
                    throw new Error('No search results found');
                }
                
                const result = searchResults[0];
                return [{
                    title: result.title,
                    url: result.url,
                    duration: result.duration || 0,
                    thumbnail: result.thumbnail?.url || result.thumbnail,
                    author: result.channel?.name || 'Unknown',
                    platform: 'youtube'
                }];
                
            } catch (searchError) {
                console.log('YouTube search failed:', searchError.message);
                throw new Error(`Search failed: ${searchError.message}`);
            }
            
        } catch (error) {
            console.error('Search error:', error);
            throw new Error(`Failed to search: ${error.message}`);
        }
    }

    async play(guildId, track, requester) {
        try {
            const playerData = this.players.get(guildId);
            if (!playerData) {
                throw new Error('Player not found. Join a voice channel first.');
            }

            // Add track info with requester
            const trackWithRequester = {
                ...track,
                requester: requester
            };

            const queue = this.queues.get(guildId);
            queue.push(trackWithRequester);

            if (!playerData.isPlaying && queue.length === 1) {
                await this.playTrack(guildId, trackWithRequester);
            }

            return trackWithRequester;
        } catch (error) {
            console.error('Play error:', error);
            throw error;
        }
    }

    async playTrack(guildId, track) {
        try {
            const playerData = this.players.get(guildId);
            if (!playerData) return;

            let resource;
            
            // Use only ytdl-core for streaming
            if (ytdl.validateURL(track.url)) {
                try {
                    const stream = ytdl(track.url, {
                        filter: 'audioonly',
                        quality: 'highestaudio',
                        highWaterMark: 1 << 25
                    });

                    resource = createAudioResource(stream, {
                        inlineVolume: true
                    });
                    
                    console.log('✅ Using ytdl-core stream for:', track.title);
                    
                } catch (ytdlError) {
                    console.log('❌ ytdl-core failed:', ytdlError.message);
                    throw new Error('Failed to create audio stream');
                }
            } else {
                throw new Error('Invalid YouTube URL');
            }

            // Set volume if available
            if (resource.volume) {
                resource.volume.setVolume(playerData.volume / 100);
            }

            // Store current track
            this.currentTracks.set(guildId, track);

            // Play the resource
            playerData.player.play(resource);
            
        } catch (error) {
            console.error('❌ Play track error:', error.message);
            this.emit('trackError', this.players.get(guildId), error);
            this.playNext(guildId);
        }
    }

    async playNext(guildId) {
        const queue = this.queues.get(guildId);
        const playerData = this.players.get(guildId);
        
        if (!queue || !playerData) return;

        // Remove current track
        if (queue.length > 0) {
            const finishedTrack = queue.shift();
            
            // Handle loop
            if (playerData.loop && finishedTrack) {
                queue.unshift(finishedTrack);
            }
        }

        // Play next track
        if (queue.length > 0) {
            await this.playTrack(guildId, queue[0]);
        } else if (playerData.autoplay) {
            // Implement autoplay logic here if needed
            await this.handleAutoplay(guildId);
        } else {
            playerData.isPlaying = false;
            this.emit('queueEnd', playerData);
        }
    }

    async handleAutoplay(guildId) {
        // Placeholder for autoplay functionality
        // You can implement logic to find related songs here
        console.log('Autoplay not implemented yet');
    }

    pause(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData && playerData.player) {
            playerData.player.pause();
            return true;
        }
        return false;
    }

    resume(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData && playerData.player) {
            playerData.player.unpause();
            return true;
        }
        return false;
    }

    stop(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData && playerData.player) {
            const queue = this.queues.get(guildId);
            if (queue) queue.length = 0; // Clear queue
            playerData.player.stop();
            return true;
        }
        return false;
    }

    skip(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData && playerData.player) {
            playerData.player.stop(); // This will trigger playNext
            return true;
        }
        return false;
    }

    setVolume(guildId, volume) {
        const playerData = this.players.get(guildId);
        if (playerData) {
            playerData.volume = Math.max(0, Math.min(100, volume));
            
            // Apply volume to current track if playing
            if (playerData.player.state.resource && playerData.player.state.resource.volume) {
                playerData.player.state.resource.volume.setVolume(playerData.volume / 100);
            }
            return playerData.volume;
        }
        return null;
    }

    toggleLoop(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData) {
            playerData.loop = !playerData.loop;
            return playerData.loop;
        }
        return null;
    }

    toggleAutoplay(guildId) {
        const playerData = this.players.get(guildId);
        if (playerData) {
            playerData.autoplay = !playerData.autoplay;
            return playerData.autoplay;
        }
        return null;
    }

    getQueue(guildId) {
        return this.queues.get(guildId) || [];
    }

    getCurrentTrack(guildId) {
        return this.currentTracks.get(guildId);
    }

    getPlayer(guildId) {
        return this.players.get(guildId);
    }

    shuffle(guildId) {
        const queue = this.queues.get(guildId);
        if (!queue || queue.length <= 1) return false;

        // Keep the first song (currently playing) and shuffle the rest
        const currentTrack = queue.shift();
        for (let i = queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
        queue.unshift(currentTrack);
        return true;
    }

    removeTrack(guildId, index) {
        const queue = this.queues.get(guildId);
        if (!queue || index < 1 || index >= queue.length) return null;
        
        return queue.splice(index, 1)[0];
    }

    disconnect(guildId) {
        const connection = this.connections.get(guildId);
        if (connection) {
            connection.destroy();
        }
        this.cleanup(guildId);
    }

    cleanup(guildId) {
        this.players.delete(guildId);
        this.queues.delete(guildId);
        this.connections.delete(guildId);
        this.currentTracks.delete(guildId);
    }

    // Compatibility methods for existing code
    updateVoiceState(data) {
        // Handle voice state updates if needed
        // This method exists for compatibility with the old riffy system
    }

    init(userId) {
        // Initialize method for compatibility
        console.log('🎵 Node.js Audio Manager initialized');
    }
}

module.exports = { AudioManager };
