const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../ui/icons/musicicons.js');

module.exports = {
    name: "support",
    description: "Get support server link",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction, lang) => {
        try {
            const supportServerLink = "https://discord.gg/HhCy5Vm";
            const githubLink = "https://github.com/shishirahm3d";
            const youtubeLink = "https://www.youtube.com/@BFLGamingBD";
            const facebookLink = "https://www.facebook.com/BrothersForLifeBD";
            const websiteLink = "http://bflmusic.shishirahmed.me";

            const embed = new EmbedBuilder()
                .setColor('#b300ff')
                .setAuthor({
                    name: lang.support.embed.authorName,
                    iconURL: musicIcons.beats2Icon, 
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.description
                    .replace("{supportServerLink}", supportServerLink)
                    .replace("{githubLink}", githubLink)
                    .replace("{youtubeLink}", youtubeLink)
                    .replace("{facebookLink}", facebookLink)
                    .replace("{websiteLink}", websiteLink)
                )
                .setImage('https://media.discordapp.net/attachments/674531732929904640/788440918256123974/BFL-Official.jpg?ex=6879cc13&is=68787a93&hm=21fef225201d2dcd46717d21dcb32d202a2fb96781b160eea260685a7fb5ba1c&=&format=webp')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.support.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.errorDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon });

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};