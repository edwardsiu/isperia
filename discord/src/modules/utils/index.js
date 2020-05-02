function parseMessage(message) {
    const messageTokens = message.content.substring(1).split(' ');
    const command = messageTokens[0];
    return {
        command,
        argv: messageTokens.slice(1),
    }
}

/**
  * Joins string components into a url.
  * Turns (`myurl.com/api/`,`/myendpoint`) into `myurl.com/api/myendpoint`
  *
  * @function urlJoin
  * @param  {...String} parts Url parts to join by `/`
  * @returns {String} The joined url
  */
function urlJoin(...parts) {
    return parts.map((part) => part.replace(/^\//, '').replace(/\/$/, '')).join('/');
}

module.exports = {
    parseMessage,
    urlJoin,
};
