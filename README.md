# BFL Music Bot

A powerful Discord music bot built with Discord.js v14 and Lavalink, providing high-quality music streaming with advanced features like custom playlists, autoplay, and multi-language support.

## 🎵 Features

- **High-Quality Audio Streaming** - Powered by Lavalink for superior sound quality
- **Multi-Platform Support** - YouTube, Spotify, SoundCloud
- **Custom Playlists** - Create, manage, and share your music collections
- **Advanced Controls** - Play, pause, skip, shuffle, volume control, and more
- **Audio Filters** - Various audio effects and filters
- **Multi-Language Support** - 2 languages supported (English & Bengali)
- **Database Integration** - MongoDB for persistent data storage
- **User-Friendly Interface** - Interactive buttons and embeds

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- Discord Bot Token
- Lavalink Server (included in config)
- MongoDB Database (optional, for playlists)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shishirahm3d/BFL-Music-Bot.git
   cd BFL-Music-Bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   
   Create a `.env` file in the root directory:
   ```env
   # Discord Bot Configuration
   TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
   OWNER_ID=YOUR_DISCORD_USER_ID_HERE

   # Database Configuration (Optional - for playlist functionality)
   MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE

   # Spotify API Configuration (Optional - for Spotify support)
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID_HERE
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET_HERE

   # Lavalink Node Configuration
   LAVALINK_PASSWORD=YOUR_LAVALINK_PASSWORD_HERE
   LAVALINK_HOST=YOUR_LAVALINK_HOST_HERE
   LAVALINK_PORT=YOUR_LAVALINK_PORT_HERE
   ```

   You can also copy the example file:
   ```bash
   cp .env.example .env
   ```
   
   Then edit the language in `config.js` (default is "en", change to "bn" for Bengali)

4. **Start the bot**
   ```bash
   npm start
   ```

## 🎛️ Commands

### Music Commands
- `/play <song/url>` - Play a song or playlist
- `/pause` - Pause the current track
- `/resume` - Resume playback
- `/skip` - Skip to the next song
- `/stop` - Stop playback and clear queue
- `/queue` - Show the current queue
- `/nowplaying` - Display current playing song
- `/volume <1-100>` - Set playback volume
- `/shuffle` - Shuffle the queue
- `/remove <position>` - Remove a song from queue

### Playlist Commands
- `/createplaylist <name>` - Create a new playlist
- `/deleteplaylist <name>` - Delete a playlist
- `/myplaylists` - Show your playlists
- `/allplaylists` - Show all public playlists
- `/playcustomplaylist <name>` - Play a custom playlist
- `/addsong <playlist> <song>` - Add song to playlist
- `/deletesong <playlist> <song>` - Remove song from playlist
- `/showsongs <playlist>` - Show songs in playlist

### Other Commands
- `/filters` - Apply audio filters
- `/autoplay` - Toggle autoplay mode
- `/ping` - Check bot latency
- `/help` - Show all commands
- `/support` - Get support links

## 🌍 Supported Languages

- 🇺🇸 **English (en)** - Default language
- 🇧🇩 **Bengali (bn)** - বাংলা ভাষা সাপোর্ট

To change language, edit `language: "en"` to `language: "bn"` in `config.js`

## 🎵 Supported Platforms

- **YouTube** - Songs, playlists, live streams
- **Spotify** - Tracks and playlists (requires API keys)
- **SoundCloud** - Tracks and playlists
- **Direct Links** - MP3, MP4, and other audio formats

## ⚙️ Configuration

### Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application and bot
3. Copy the bot token
4. Enable these intents:
   - Message Content Intent
   - Server Members Intent
   - Presence Intent

### MongoDB Setup (Optional)

For playlist functionality, set up MongoDB:

1. Create a MongoDB database (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
2. Get your connection URI
3. Add it to your `.env` file as `MONGODB_URI`

### Spotify Integration (Optional)

For Spotify support:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app and get Client ID & Secret
3. Add them to your `.env` file as `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`

### Lavalink Server Setup

The bot requires a Lavalink server for music functionality:

**Option 1: Use Public Lavalink (Quick Start)**
- A working Lavalink server is pre-configured
- Update your `.env` with the provided credentials

**Option 2: Self-Hosted Lavalink (Recommended)**
- Deploy your own Lavalink server
- Update `.env` with your server details

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TOKEN` | Discord Bot Token | ✅ Yes |
| `OWNER_ID` | Your Discord User ID | ✅ Yes |
| `MONGODB_URI` | MongoDB Connection String | ❌ Optional |
| `SPOTIFY_CLIENT_ID` | Spotify App Client ID | ❌ Optional |
| `SPOTIFY_CLIENT_SECRET` | Spotify App Secret | ❌ Optional |
| `LAVALINK_PASSWORD` | Lavalink Server Password | ✅ Yes |
| `LAVALINK_HOST` | Lavalink Server Host | ✅ Yes |
| `LAVALINK_PORT` | Lavalink Server Port | ✅ Yes |

## 🛠️ Dependencies

- **dotenv** ^16.4.7 - Environment variable management
- **discord.js** ^14.15.1 - Discord API library
- **riffy** ^1.0.3 - Lavalink client
- **mongodb** ^6.12.0 - Database driver
- **spotify-web-api-node** ^5.0.2 - Spotify API
- **axios** ^1.8.1 - HTTP client
- **express** ^4.19.2 - Web server
- **musicard** ^2.0.5 - Music card generation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- **Website**: [BFL Music Bot Official](http://bflmusic.shishirahmed.me/)
- **Discord Server**: [Join our support server](https://discord.gg/HhCy5Vm)
- **GitHub**: [Issues & Bug Reports](https://github.com/shishirahm3d/BFL-Music-Bot/issues)
- **YouTube**: [BFL Gaming BD](https://www.youtube.com/@BFLGamingBD)
- **Facebook**: [Brothers For Life BD](https://www.facebook.com/BrothersForLifeBD)

## 👨‍💻 Author

**Shishir Ahmed**
- GitHub: [@shishirahm3d](https://github.com/shishirahm3d)
- Discord: Contact via support server

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

*Made with ❤️ by Shishir Ahmed*
