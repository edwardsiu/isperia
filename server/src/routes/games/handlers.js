const HttpStatus = require('http-status-codes');
const { GameController } = require('./controller');

async function createGame(ctx) {
    const {
        eventId,
        userIds,
        winnerId,
        source,
    } = ctx.request.body;

    const {
        game,
        players,
    } = await GameController.createGameWithPlayers(eventId, userIds, winnerId, source);

    ctx.status = HttpStatus.CREATED;
    ctx.body = {
        game,
        players,
    };
}

module.exports = {
    createGame,
};
