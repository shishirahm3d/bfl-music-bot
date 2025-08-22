module.exports = {
  TOKEN: process.env.TOKEN,
  language: "en",
  ownerID: [process.env.OWNER_ID], 
  mongodbUri : process.env.MONGODB_URI,
  spotifyClientId : process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret : process.env.SPOTIFY_CLIENT_SECRET,
  setupFilePath: './commands/setup.json',
  commandsDir: './commands',  
  embedColor: "#1db954",
  activityName: "BFL Music", 
  activityType: "LISTENING",  // Available activity types : LISTENING , PLAYING
  SupportServer: "https://discord.gg/HhCy5Vm",
  embedTimeout: 5, 
  errorLog: ""
}
