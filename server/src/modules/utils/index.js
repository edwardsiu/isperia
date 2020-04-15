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
    urlJoin,
};
