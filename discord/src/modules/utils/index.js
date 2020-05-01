function parseMessage(message) {
    const messageTokens = message.content.substring(1).split(' ');
    const command = messageTokens[0];
    return {
        command,
        argv: messageTokens.slice(1),
    }
}

module.exports = {
    parseMessage,
};
