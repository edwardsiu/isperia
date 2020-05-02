const { MessageEmbed } = require('discord.js');
const { Color } = require('./enums');

function success(options = {}) {
    options.color = Color.GREEN;
    return new MessageEmbed(options);
}

function ok(options = {}) {
    options.color = Color.BLUE;
    return new MessageEmbed(options);
}

function info(options = {}) {
    options.color = Color.YELLOW;
    return new MessageEmbed(options);
}

function error(options = {}) {
    options.color = Color.RED;
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
