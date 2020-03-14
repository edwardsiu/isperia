const HttpStatus = require('http-status-codes');
const enums = require('../../modules/enums');

async function getUser(ctx) {
    const { userId } = ctx.params;
    const user = await ctx.db.User.findByPk(userId);
    if (!user) {
        ctx.throw(HttpStatus.NOT_FOUND);
    }
    return user;
}

function maskUser(user) {
    return {
        id: user.id,
        name: user.name,
        saved_decks: user.saved_decks,
    };
}

function isAtSavedDecksLimit(user) {
    return Object.keys(user.saved_decks).length >= enums.MAX_SAVED_DECKS;
}


module.exports = {
    UserController: {
        getUser,
        maskUser,
        isAtSavedDecksLimit,
    },
};
