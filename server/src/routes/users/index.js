const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const KoaRouter = require('koa-router');
const { UserController } = require('./controller');
const { DeckService } = require('../../services');

const usersRouter = new KoaRouter();

// Returns a user with the given userId
usersRouter.get('getUser', '/:userId', async (ctx) => {
    const user = await UserController.getUser(ctx);
    ctx.status = HttpStatus.OK;
    ctx.body = UserController.maskUser(user);
});

/**
 * Updates the user with a deck link.
 * Max saved links: 50
 * Response Codes:
 * HttpStatus.OK if successful.
 * HttpStatus.BAD_REQUEST if saved links are full
 * HttpStatus.BAD_REQUEST if link is invalid
 * @param {String} ctx.request.body.deckName
 * @param {String} ctx.request.body.deckLink
 */
usersRouter.post('saveDeckLink', '/:userId', async (ctx) => {
    const user = await UserController.getUser(ctx);
    const { deckName, deckLink } = ctx.request.body;
    if (!_.has(user.saved_decks, deckName) && UserController.isAtSavedDecksLimit(user)) {
        ctx.throw(HttpStatus.BAD_REQUEST, 'User has reached the maximum available deck links. Delete an existing one first.');
    }
    if (!DeckService.isSupported(deckLink)) {
        ctx.throw(HttpStatus.BAD_REQUEST, 'Unsupported deck link');
    }
    user.saved_decks[deckName] = deckLink;
    await user.save();
    ctx.status = HttpStatus.OK;
});

/**
 * Deletes a saved deck from a user's save list.
 * @param {String} ctx.request.body.deckName
 */
usersRouter.post('deleteDeckLink', '/:userId', async (ctx) => {
    const user = await UserController.getUser(ctx);
    const { deckName } = ctx.request.body;
    if (_.has(user.saved_decks, deckName)) {
        delete user.saved_decks[deckName];
        await user.save();
    }
    ctx.status = HttpStatus.OK;
});

module.exports = {
    usersRouter,
};
