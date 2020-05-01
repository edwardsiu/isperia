const { MessageEmbed } = require('discord.js');

function success(options = {}) {
    options.color = 1828126;
    return new MessageEmbed(options);
}

function ok(options = {}) {
    options.color = 4385012;
    return new MessageEmbed(options);
}

function info(options = {}) {
    options.color = 16768028;
    return new MessageEmbed(options);
}

function error(options = {}) {
    options.color = 16711680;
    return new MessageEmbed(options);
}

module.exports = {
    Embed: {
        success,
        ok,
        info,
        error,
    },
};
