function urlJoin(...parts) {
    return parts.map((part) => part.replace(/^\//, '').replace(/\/$/, '')).join('/');
}

module.exports = {
    urlJoin,
};
